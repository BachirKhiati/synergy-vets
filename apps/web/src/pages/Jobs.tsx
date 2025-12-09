import { useState, useMemo, useEffect } from "react";
import { List, Map as MapIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "@/components/jobs/JobCard";
import JobsMap from "@/components/jobs/JobsMap";
import TalentSpotlight from "@/components/jobs/TalentSpotlight";
import FeaturedRoles from "@/components/jobs/FeaturedRoles";
import { Button } from "@/components/ui/button";
import { jobsData, salaryRanges, Job } from "@/lib/jobsData";

const Jobs = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedSalary, setSelectedSalary] = useState("All Salaries");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Handle region from navigation state
  useEffect(() => {
    if (location.state?.selectedRegion) {
      setSelectedRegion(location.state.selectedRegion);
    }
  }, [location.state]);

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      // Search filter
      if (
        searchQuery &&
        !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Region filter
      if (selectedRegion !== "All Regions" && job.region !== selectedRegion) {
        return false;
      }

      // Type filter
      if (selectedType !== "All Types" && job.type !== selectedType) {
        return false;
      }

      // Specialty filter
      if (
        selectedSpecialty !== "All Specialties" &&
        job.specialty !== selectedSpecialty
      ) {
        return false;
      }

      // Salary filter
      if (selectedSalary !== "All Salaries") {
        const range = salaryRanges.find((r) => r.label === selectedSalary);
        if (range && (job.salaryMax < range.min || job.salaryMin > range.max)) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedRegion, selectedType, selectedSalary, selectedSpecialty]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-8 lg:pt-32 lg:pb-12 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground">
              Find Your Perfect <span className="gradient-text">Veterinary Role</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Browse {jobsData.length}+ opportunities worldwide. Use filters or explore
              the map to find your next career move.
            </p>
          </div>
        </div>
      </section>

      <FeaturedRoles />

      <TalentSpotlight />

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              <span className="text-primary font-semibold">{filteredJobs.length}</span>{" "}
              jobs found
            </p>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "hero" : "heroOutline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "hero" : "heroOutline"}
                size="sm"
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="w-4 h-4 mr-2" />
                Map
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <JobFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedSalary={selectedSalary}
                setSelectedSalary={setSelectedSalary}
                selectedSpecialty={selectedSpecialty}
                setSelectedSpecialty={setSelectedSpecialty}
              />
            </div>

            {/* Jobs Content */}
            <div className="lg:col-span-3">
              {viewMode === "list" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        isSelected={selectedJob?.id === job.id}
                        onClick={() => setSelectedJob(job)}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-muted-foreground text-lg">
                        No jobs match your filters. Try adjusting your search.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-[600px] lg:h-[700px]">
                  <JobsMap
                    jobs={filteredJobs}
                    selectedJob={selectedJob}
                    onJobSelect={setSelectedJob}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Jobs;
