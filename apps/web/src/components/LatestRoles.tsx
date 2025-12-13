import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  title: string;
  location: string;
  type: "Permanent" | "Locum";
  salary: string;
  featured?: boolean;
}

const JobCard = ({ title, location, type, salary, featured }: JobCardProps) => {
  return (
    <div className={`group relative card-gradient rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_hsl(3,90%,68%,0.1)] ${featured ? 'ring-2 ring-primary/30' : ''}`}>
      {featured && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
          Featured
        </div>
      )}
      
      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 pr-8">
        {title}
      </h3>
      
      <div className="mt-4 flex items-center gap-2 text-muted-foreground">
        <MapPin className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm truncate">{location}</span>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${type === 'Permanent' ? 'bg-secondary/20 text-secondary' : 'bg-accent/20 text-accent'}`}>
          <Briefcase className="w-3 h-3" />
          {type}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          <Clock className="w-3 h-3" />
          {salary}
        </span>
      </div>
      
      <Button variant="ghost" size="sm" className="mt-6 w-full justify-between group/btn">
        <span>MORE INFO</span>
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

const featuredJobs = [
  {
    title: "Locum Veterinary Surgeon job – SW London – Start ASAP",
    location: "SW London, United Kingdom",
    type: "Locum" as const,
    salary: "Competitive",
    featured: true,
  },
  {
    title: "Veterinary Surgeon job – Berkshire (Multi-Site Role)",
    location: "Berkshire, United Kingdom",
    type: "Permanent" as const,
    salary: "Competitive",
  },
  {
    title: "Ongoing locum Vet job in South London",
    location: "South London, United Kingdom",
    type: "Locum" as const,
    salary: "Competitive",
  },
  {
    title: "Senior Veterinary Nurse job in Wiltshire Independent practice",
    location: "Wiltshire, United Kingdom",
    type: "Permanent" as const,
    salary: "Competitive",
  },
  {
    title: "PDSA Locum Vet work in Hampshire",
    location: "Hampshire, United Kingdom",
    type: "Locum" as const,
    salary: "Competitive",
  },
  {
    title: "Permanent RVN vacancy in Hampshire",
    location: "Hampshire, United Kingdom",
    type: "Permanent" as const,
    salary: "Competitive",
    featured: true,
  },
];

const LatestRoles = () => {
  return (
    <section id="jobs" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Our latest <span className="gradient-text">roles</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover exciting opportunities with leading veterinary practices worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/jobs">
            <Button variant="hero" size="lg">
              EXPLORE JOBS
            </Button>
          </a>
          <a href="/jobs?view=map">
            <Button variant="heroOutline" size="lg">
              EXPLORE MAP
            </Button>
          </a>
        </div>

        <p className="mt-8 text-center text-muted-foreground">
          <span className="text-primary font-semibold">720+</span> more opportunities available
        </p>
      </div>
    </section>
  );
};

export default LatestRoles;
