import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  Clock,
  ArrowLeft,
  Building2,
  Send,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Job } from "@/lib/jobsData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/jobs/JobCard";
import { useToast } from "@/hooks/use-toast";

const JobDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applyOpen, setApplyOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
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
            data.location.region ||
            (data.location.country === "United Kingdom"
              ? "UK"
              : data.location.country || "UK"),
          coordinates: [0, 0],
          description: data.description,
          postedAt: data.posted_at,
          expiresAt: data.expires_at,
          featured: false,
        };

        setJob(mappedJob);

        // Fetch similar jobs
        const similarResponse = await fetch(
          `http://localhost:8080/api/v1/public/jobs?page_size=4`
        );
        if (similarResponse.ok) {
          const similarData = await similarResponse.json();
          const mapped: Job[] = similarData.jobs
            .filter((j: any) => j.id !== data.id)
            .slice(0, 3)
            .map((apiJob: any) => ({
              id: apiJob.id,
              slug: apiJob.slug,
              title: apiJob.title,
              location: `${apiJob.location.city || ""}, ${apiJob.location.country || "UK"}`.replace(
                /^, /,
                ""
              ),
              type: apiJob.contract_type === "Locum" ? "Locum" : "Permanent",
              salary:
                apiJob.salary_min && apiJob.salary_max
                  ? `£${apiJob.salary_min.toLocaleString()} - £${apiJob.salary_max.toLocaleString()}`
                  : "Competitive",
              salaryMin: apiJob.salary_min || 0,
              salaryMax: apiJob.salary_max || 0,
              specialty: "General Practice",
              region:
                apiJob.location.country === "United Kingdom"
                  ? "UK"
                  : apiJob.location.country || "UK",
              coordinates: [0, 0] as [number, number],
            }));
          setSimilarJobs(mapped);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [slug]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setApplyOpen(false);
      setSubmitted(false);
      toast({
        title: "Application Submitted!",
        description: "We'll be in touch within 24 hours.",
      });
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="bg-card/50 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="h-4 bg-muted rounded w-32 animate-pulse" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-1/2 mb-8" />
            <div className="h-64 bg-muted rounded" />
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
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {error === "Job not found" ? "Job Not Found" : "Error"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {error === "Job not found"
              ? "The job you're looking for doesn't exist or has been removed."
              : "Something went wrong while loading this job."}
          </p>
          <Link to="/jobs">
            <Button variant="hero">Browse All Jobs</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-card/50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Jobs</span>
          </button>
        </div>
      </div>

      {/* Job Header */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {job.featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  <Star className="w-3 h-3" />
                  Featured
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  job.type === "Permanent"
                    ? "bg-secondary/20 text-secondary"
                    : "bg-accent/20 text-accent"
                }`}
              >
                <Briefcase className="w-3 h-3" />
                {job.type}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                {job.specialty}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <span>{job.region}</span>
              </div>
            </div>

            <Button variant="hero" size="lg" onClick={() => setApplyOpen(true)}>
              <Send className="w-4 h-4 mr-2" />
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Job Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="card-gradient rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  About This Role
                </h2>
                {job.description ? (
                  <div
                    className="prose prose-invert max-w-none text-muted-foreground
                      prose-headings:text-foreground prose-headings:font-semibold
                      prose-p:leading-relaxed prose-li:leading-relaxed
                      prose-strong:text-foreground prose-ul:space-y-2"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                ) : (
                  <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>
                      We are looking for an experienced {job.specialty}{" "}
                      professional to join our team in {job.location}. This is a
                      fantastic opportunity for someone passionate about
                      veterinary care who wants to make a real difference.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                      Key Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      <li>Provide exceptional clinical care to patients</li>
                      <li>Work collaboratively with the veterinary team</li>
                      <li>Maintain accurate medical records</li>
                      <li>Communicate effectively with pet owners</li>
                      <li>Participate in continuous professional development</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      <li>RCVS registered (for veterinary roles)</li>
                      <li>Excellent communication skills</li>
                      <li>Team player with a positive attitude</li>
                      <li>Passion for animal welfare</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      <li>Competitive salary: {job.salary}</li>
                      <li>CPD allowance and support</li>
                      <li>Generous holiday allowance</li>
                      <li>Pension scheme</li>
                      <li>Professional development opportunities</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card-gradient rounded-2xl p-6 border border-border sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Quick Apply
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Interested in this role? Apply now and we'll get back to you
                  within 24 hours.
                </p>
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={() => setApplyOpen(true)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Job Summary
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Job Type</span>
                      <span className="text-foreground font-medium">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Salary</span>
                      <span className="text-foreground font-medium">
                        {job.salary}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Specialty</span>
                      <span className="text-foreground font-medium">
                        {job.specialty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Region</span>
                      <span className="text-foreground font-medium">
                        {job.region}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Jobs */}
      {similarJobs.length > 0 && (
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Similar Opportunities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarJobs.map((similarJob) => (
                <JobCard key={similarJob.id} job={similarJob} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Apply Dialog */}
      <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
        <DialogContent className="sm:max-w-md">
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Application Submitted!
              </h3>
              <p className="text-muted-foreground">
                We'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Apply for this Role</DialogTitle>
                <DialogDescription>
                  Submit your details and we'll get back to you within 24 hours.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleApply} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+44 7123 456789"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your experience and why you're interested in this role..."
                    rows={3}
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobDetail;
