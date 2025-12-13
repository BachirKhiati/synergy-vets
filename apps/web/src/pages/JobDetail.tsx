import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  ArrowLeft,
  Building2,
  Share2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/jobsData";

const JobDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/public/jobs/${slug}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Job not found");
          }
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();

        const mappedJob: Job = {
          id: data.id,
          slug: data.slug,
          title: data.title,
          location: `${data.location.city || ""}, ${data.location.country || "UK"}`.replace(
            /^, /,
            ""
          ),
          type: data.contract_type === "Locum" ? "Locum" : "Permanent",
          salary:
            data.salary_min && data.salary_max
              ? `£${data.salary_min.toLocaleString()} - £${data.salary_max.toLocaleString()}`
              : "Competitive",
          salaryMin: data.salary_min || 0,
          salaryMax: data.salary_max || 0,
          specialty: "General Practice",
          region:
            data.location.country === "United Kingdom"
              ? "UK"
              : data.location.country || "UK",
          coordinates: [0, 0],
          description: data.description,
          postedAt: data.posted_at,
          expiresAt: data.expires_at,
        };

        setJob(mappedJob);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [slug]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: job?.title,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-1/2 mb-8" />
              <div className="h-64 bg-muted rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {error === "Job not found" ? "Job Not Found" : "Error"}
            </h1>
            <p className="text-muted-foreground mb-8">
              {error === "Job not found"
                ? "This job posting may have been removed or is no longer available."
                : "Something went wrong while loading this job."}
            </p>
            <Button variant="hero" asChild>
              <Link to="/jobs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all jobs
          </Link>
        </div>
      </section>

      {/* Job Header */}
      <section className="py-8 lg:py-12 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  job.type === "Permanent"
                    ? "bg-secondary/20 text-secondary"
                    : "bg-accent/20 text-accent"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                {job.type}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                <Clock className="w-4 h-4" />
                {job.salary}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{job.location}</span>
              </div>
              {job.postedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Posted {formatDate(job.postedAt)}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Apply Now</Link>
              </Button>
              <Button variant="heroOutline" size="lg" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="card-gradient rounded-2xl p-6 lg:p-8 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Job Description
                </h2>
                {job.description ? (
                  <div
                    className="prose prose-invert max-w-none text-muted-foreground
                      prose-headings:text-foreground prose-headings:font-semibold
                      prose-p:leading-relaxed prose-li:leading-relaxed
                      prose-strong:text-foreground"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                ) : (
                  <p className="text-muted-foreground">
                    No description available for this position. Please contact
                    us for more information.
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-gradient rounded-2xl p-6 border border-border sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Job Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Job Type</p>
                      <p className="font-medium text-foreground">{job.type}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Salary</p>
                      <p className="font-medium text-foreground">{job.salary}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">
                        {job.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Specialty</p>
                      <p className="font-medium text-foreground">
                        {job.specialty}
                      </p>
                    </div>
                  </div>

                  {job.expiresAt && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Closing Date
                        </p>
                        <p className="font-medium text-foreground">
                          {formatDate(job.expiresAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button variant="hero" className="w-full" asChild>
                    <Link to="/contact">Apply for this role</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobDetail;
