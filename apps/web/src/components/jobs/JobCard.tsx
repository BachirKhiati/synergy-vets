import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/jobsData";

interface JobCardProps {
  job: Job;
  isSelected?: boolean;
  onClick?: () => void;
}

const JobCard = ({ job, isSelected, onClick }: JobCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`group relative card-gradient rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-primary shadow-[0_0_40px_hsl(3,90%,68%,0.2)]"
          : "border-border hover:border-primary/30 hover:shadow-[0_0_40px_hsl(3,90%,68%,0.1)]"
      } ${job.featured ? "ring-2 ring-primary/30" : ""}`}
    >
      {job.featured && (
        <div className="absolute -top-3 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
          Featured
        </div>
      )}

      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 pr-4">
        {job.title}
      </h3>

      <div className="mt-3 flex items-center gap-2 text-muted-foreground">
        <MapPin className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm truncate">{job.location}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            job.type === "Permanent"
              ? "bg-secondary/20 text-secondary"
              : "bg-accent/20 text-accent"
          }`}
        >
          <Briefcase className="w-3 h-3" />
          {job.type}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          <Clock className="w-3 h-3" />
          {job.salary}
        </span>
      </div>

      <div className="mt-2">
        <span className="text-xs text-primary/80 font-medium">{job.specialty}</span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="mt-4 w-full justify-between group/btn text-sm"
        asChild
      >
        <Link to={`/jobs/${job.slug || job.id}`}>
          <span>MORE INFO</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  );
};

export default JobCard;
