import { Search, MapPin, Briefcase, DollarSign, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { salaryRanges } from "@/lib/jobsData";

// Define the options based on user request
const categories = ["Vet", "Nurse"];
const contractTypes = ["Locum", "Permanent", "Odd Days"];
const regions = [
  "Northern Ireland",
  "East Midlands",
  "Eastern",
  "London",
  "North East",
  "North West",
  "Scotland",
  "South East",
  "South West",
  "Wales",
  "West Midlands",
  "Yorks And The Humber",
];

interface JobFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedSalary: string;
  setSelectedSalary: (value: string) => void;
}

const JobFilters = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  selectedSalary,
  setSelectedSalary,
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

      {/* Category Filter */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Stethoscope className="w-4 h-4" />
          Category
        </label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="bg-background/50 border-border">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Categories">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat} Jobs
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
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Types">All Types</SelectItem>
            {contractTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Region Filter */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          Region
        </label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="bg-background/50 border-border">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Regions">All Regions</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
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
            <SelectValue placeholder="All Salaries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Salaries">All Salaries</SelectItem>
            {salaryRanges.map((range) => (
              <SelectItem key={range.label} value={range.label}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobFilters;
