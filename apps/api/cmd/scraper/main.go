package main

import (
	"context"
	"database/sql"
	"fmt"
	"io"
	"log"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/synergyvets/platform/internal/config"
	"github.com/synergyvets/platform/internal/db"
	"github.com/synergyvets/platform/internal/queries"
)

func main() {
	cfg := config.Load()
	ctx := context.Background()

	log.Printf("Connecting to database: %s", cfg.DatabaseURL)
	database, err := db.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer database.Close()

	q := queries.New(database)

	// Scrape pages
	// Loop until we find no jobs on a page or hit a safety limit
	for i := 1; i <= 50; i++ {
		url := fmt.Sprintf("https://www.synergyvets.com/vets-jobs-listing.asp?vets-page=%d", i)
		if i == 1 {
			url = "https://www.synergyvets.com/vets-jobs-listing.asp"
		}

		log.Printf("Scraping page %d: %s", i, url)
		count, err := scrapePage(ctx, database, q, url)
		if err != nil {
			log.Printf("Failed to scrape page %d: %v", i, err)
		}

		if count == 0 {
			log.Printf("No jobs found on page %d, stopping.", i)
			break
		}

		time.Sleep(2 * time.Second) // Be polite
	}
}

func scrapePage(ctx context.Context, db *sql.DB, q *queries.Queries, url string) (int, error) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return 0, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

	resp, err := client.Do(req)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 0, err
	}

	html := string(body)

	// Regex patterns
	jobBlockRegex := regexp.MustCompile(`(?s)<div class="job">(.*?)</div>\s*</td>`)
	titleRegex := regexp.MustCompile(`(?s)<h2>(.*?)</h2>`)
	linkRegex := regexp.MustCompile(`(?s)<a[^>]*href="([^"]+)"[^>]*><h2>`)
	locationRegex := regexp.MustCompile(`(?s)in <b>(.*?)</b>`)
	refRegex := regexp.MustCompile(`Job Ref: (SV\d+)`)
	typeRegex := regexp.MustCompile(`(Perm|Locum)`)

	matches := jobBlockRegex.FindAllStringSubmatch(html, -1)
	log.Printf("Found %d jobs on page", len(matches))

	for _, match := range matches {
		block := match[1]

		titleMatches := titleRegex.FindAllStringSubmatch(block, -1)
		title := ""
		for _, tm := range titleMatches {
			if len(tm) >= 2 && strings.TrimSpace(tm[1]) != "" {
				title = strings.TrimSpace(tm[1])
				break
			}
		}

		if title == "" {
			continue
		}

		refMatch := refRegex.FindStringSubmatch(block)
		ref := ""
		if len(refMatch) >= 2 {
			ref = refMatch[1]
		}

		// Check if job exists
		slug := strings.ToLower(strings.ReplaceAll(title+"-"+ref, " ", "-"))
		slug = regexp.MustCompile(`[^a-z0-9-]`).ReplaceAllString(slug, "")
		if len(slug) > 50 {
			slug = slug[:50]
		}

		_, err := q.GetJobBySlug(ctx, slug)
		if err == nil {
			log.Printf("Job already exists: %s", slug)
			continue
		}

		linkMatch := linkRegex.FindStringSubmatch(block)
		link := ""
		if len(linkMatch) >= 2 {
			link = linkMatch[1]
		} else {
			log.Printf("Specific regex failed for job: %s", title)
			// Fallback to simple href if complex one fails
			simpleLinkRegex := regexp.MustCompile(`href="([^"]+)"`)
			simpleMatch := simpleLinkRegex.FindStringSubmatch(block)
			if len(simpleMatch) >= 2 {
				link = simpleMatch[1]
				log.Printf("Fallback found link: %s", link)
			}
		}

		locationMatch := locationRegex.FindStringSubmatch(block)
		locationName := "Unknown"
		if len(locationMatch) >= 2 {
			locationName = strings.TrimSpace(locationMatch[1])
		}

		typeMatch := typeRegex.FindStringSubmatch(block)
		contractType := "Permanent"
		if len(typeMatch) >= 2 {
			if typeMatch[1] == "Locum" {
				contractType = "Locum"
			}
		}

		// Fetch full details
		description := "Imported from SynergyVets. Ref: " + ref + ". Link: " + link
		var salaryMin, salaryMax int32

		if link != "" {
			// Handle relative links if necessary (though they seem absolute)
			if !strings.HasPrefix(link, "http") {
				link = "https://www.synergyvets.com/" + strings.TrimPrefix(link, "/")
			}

			log.Printf("Fetching details for %s", link)
			details, err := scrapeJobDetails(link)
			if err != nil {
				log.Printf("Failed to scrape details for %s: %v", link, err)
			} else {
				if details.Description != "" {
					description = details.Description
				}
				salaryMin = details.SalaryMin
				salaryMax = details.SalaryMax
			}
			time.Sleep(500 * time.Millisecond) // Polite delay between details fetches
		}

		// Insert Location
		var locationID int64
		err = db.QueryRowContext(ctx, `
			INSERT INTO job_locations (country, city) 
			VALUES ($1, $2) 
			RETURNING id`, "United Kingdom", locationName).Scan(&locationID)

		if err != nil {
			log.Printf("Failed to insert location: %v", err)
			continue
		}

		// Insert Job
		params := queries.CreateJobParams{
			Title:        title,
			Slug:         slug,
			Description:  description,
			LocationID:   sql.NullInt64{Int64: locationID, Valid: true},
			ContractType: sql.NullString{String: contractType, Valid: true},
			Status:       sql.NullString{String: "published", Valid: true},
			Source:       sql.NullString{String: "synergyvets", Valid: true},
			SourceRef:    sql.NullString{String: ref, Valid: true},
			PostedAt:     sql.NullTime{Time: time.Now(), Valid: true},
			SalaryMin:    sql.NullInt32{Int32: salaryMin, Valid: salaryMin > 0},
			SalaryMax:    sql.NullInt32{Int32: salaryMax, Valid: salaryMax > 0},
		}

		_, err = q.CreateJob(ctx, params)
		if err != nil {
			log.Printf("Failed to create job %s: %v", title, err)
		} else {
			log.Printf("Created job: %s", title)
		}
	}

	return len(matches), nil
}

type JobDetails struct {
	Description string
	SalaryMin   int32
	SalaryMax   int32
}

func scrapeJobDetails(url string) (JobDetails, error) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return JobDetails{}, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

	resp, err := client.Do(req)
	if err != nil {
		return JobDetails{}, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return JobDetails{}, err
	}

	html := string(body)
	details := JobDetails{}

	// Extract Description
	descRegex := regexp.MustCompile(`(?s)<div class="job-desc">(.*?)</div>`)
	descMatch := descRegex.FindStringSubmatch(html)
	if len(descMatch) >= 2 {
		details.Description = strings.TrimSpace(descMatch[1])

		// Try to extract salary from description
		// Pattern: £26,655 - £31,027
		salaryRegex := regexp.MustCompile(`£([\d,]+)\s*-\s*£([\d,]+)`)
		salaryMatch := salaryRegex.FindStringSubmatch(details.Description)
		if len(salaryMatch) >= 3 {
			minStr := strings.ReplaceAll(salaryMatch[1], ",", "")
			maxStr := strings.ReplaceAll(salaryMatch[2], ",", "")

			if min, err := strconv.Atoi(minStr); err == nil {
				details.SalaryMin = int32(min)
			}
			if max, err := strconv.Atoi(maxStr); err == nil {
				details.SalaryMax = int32(max)
			}
		}
	}

	return details, nil
}
