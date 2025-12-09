import { Search, MapPin, Briefcase, DollarSign, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { specialties, regions, jobTypes, salaryRanges } from "@/lib/jobsData";

interface JobFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedSalary: string;
  setSelectedSalary: (value: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (value: string) => void;
}

const JobFilters = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedType,
  setSelectedType,
  selectedSalary,
  setSelectedSalary,
  selectedSpecialty,
  setSelectedSpecialty,
}: JobFiltersProps) => {
  return (
    <div className="card-gradient rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Filter Jobs</h3>
      
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background/50 border-border focus:border-primary"
        />
      </div>

      {/* Region Filter */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          Location
        </label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="bg-background/50 border-border">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Job Type Filter */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Briefcase className="w-4 h-4" />
          Job Type
        </label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="bg-background/50 border-border">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Salary Range Filter */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <DollarSign className="w-4 h-4" />
          Salary Range
        </label>
        <Select value={selectedSalary} onValueChange={setSelectedSalary}>
          <SelectTrigger className="bg-background/50 border-border">
            <SelectValue placeholder="Select salary" />
          </SelectTrigger>
          <SelectContent>
            {salaryRanges.map((range) => (
              <SelectItem key={range.label} value={range.label}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Specialty Filter */}
      <div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Stethoscope className="w-4 h-4" />
          Specialty
        </label>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="bg-background/50 border-border">
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobFilters;
