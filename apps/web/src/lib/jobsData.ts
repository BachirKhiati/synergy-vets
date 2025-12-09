export interface Job {
  id: string;
  title: string;
  location: string;
  type: "Permanent" | "Locum";
  salary: string;
  salaryMin: number;
  salaryMax: number;
  specialty: string;
  region: string;
  coordinates: [number, number];
  featured?: boolean;
  description?: string;
}

export const jobsData: Job[] = [
  {
    id: "1",
    title: "Registered RVN for a theatre focused role – East London – Hospital",
    location: "East London, London, United Kingdom",
    type: "Permanent",
    salary: "£30K - £35K",
    salaryMin: 30000,
    salaryMax: 35000,
    specialty: "Nursing",
    region: "UK",
    coordinates: [-0.0276, 51.5314],
    featured: true,
  },
  {
    id: "2",
    title: "Veterinary Surgeon – South London – Clinical Freedom",
    location: "South London, London, United Kingdom",
    type: "Permanent",
    salary: "£50K - £75K",
    salaryMin: 50000,
    salaryMax: 75000,
    specialty: "General Practice",
    region: "UK",
    coordinates: [-0.1278, 51.4545],
  },
  {
    id: "3",
    title: "Locum Vet – South Yorkshire – January Dates",
    location: "Barnsley, S70, United Kingdom",
    type: "Locum",
    salary: "£450 - £500/day",
    salaryMin: 450,
    salaryMax: 500,
    specialty: "General Practice",
    region: "UK",
    coordinates: [-1.4792, 53.5529],
  },
  {
    id: "4",
    title: "Locum Vet – Lincolnshire – January",
    location: "Lincoln, Lincolnshire, LN2, United Kingdom",
    type: "Locum",
    salary: "£450 - £500/day",
    salaryMin: 450,
    salaryMax: 500,
    specialty: "General Practice",
    region: "UK",
    coordinates: [-0.5401, 53.2307],
  },
  {
    id: "5",
    title: "Senior Veterinarian – Sydney Practice",
    location: "Sydney, NSW, Australia",
    type: "Permanent",
    salary: "$100K - $130K AUD",
    salaryMin: 100000,
    salaryMax: 130000,
    specialty: "General Practice",
    region: "Australia",
    coordinates: [151.2093, -33.8688],
  },
  {
    id: "6",
    title: "Emergency Vet – 24hr Hospital – Manchester",
    location: "Manchester, United Kingdom",
    type: "Permanent",
    salary: "£55K - £70K",
    salaryMin: 55000,
    salaryMax: 70000,
    specialty: "Emergency",
    region: "UK",
    coordinates: [-2.2426, 53.4808],
    featured: true,
  },
  {
    id: "7",
    title: "Feline Specialist – Cats Only Clinic",
    location: "Edinburgh, Scotland, United Kingdom",
    type: "Permanent",
    salary: "£60K - £80K",
    salaryMin: 60000,
    salaryMax: 80000,
    specialty: "Feline",
    region: "UK",
    coordinates: [-3.1883, 55.9533],
  },
  {
    id: "8",
    title: "Equine Vet – Rural Practice",
    location: "Dublin, Ireland",
    type: "Permanent",
    salary: "€55K - €70K",
    salaryMin: 55000,
    salaryMax: 70000,
    specialty: "Equine",
    region: "Europe",
    coordinates: [-6.2603, 53.3498],
  },
  {
    id: "9",
    title: "Exotic Animal Veterinarian",
    location: "Auckland, New Zealand",
    type: "Permanent",
    salary: "$90K - $120K NZD",
    salaryMin: 90000,
    salaryMax: 120000,
    specialty: "Exotic",
    region: "New Zealand",
    coordinates: [174.7633, -36.8485],
  },
  {
    id: "10",
    title: "Veterinary Dermatologist",
    location: "Toronto, Ontario, Canada",
    type: "Permanent",
    salary: "$120K - $160K CAD",
    salaryMin: 120000,
    salaryMax: 160000,
    specialty: "Dermatology",
    region: "North America",
    coordinates: [-79.3832, 43.6532],
  },
  {
    id: "11",
    title: "Oncology Specialist – Referral Hospital",
    location: "Birmingham, United Kingdom",
    type: "Permanent",
    salary: "£70K - £95K",
    salaryMin: 70000,
    salaryMax: 95000,
    specialty: "Oncology",
    region: "UK",
    coordinates: [-1.8904, 52.4862],
    featured: true,
  },
  {
    id: "12",
    title: "Locum RVN – Small Animal Practice",
    location: "Bristol, United Kingdom",
    type: "Locum",
    salary: "£180 - £220/day",
    salaryMin: 180,
    salaryMax: 220,
    specialty: "Nursing",
    region: "UK",
    coordinates: [-2.5879, 51.4545],
  },
];

export const specialties = [
  "All Specialties",
  "General Practice",
  "Emergency",
  "Nursing",
  "Feline",
  "Equine",
  "Exotic",
  "Dermatology",
  "Oncology",
  "Surgery",
  "Cardiology",
];

export const regions = [
  "All Regions",
  "UK",
  "Europe",
  "Australia",
  "New Zealand",
  "North America",
  "Middle East",
];

export const jobTypes = ["All Types", "Permanent", "Locum"];

export const salaryRanges = [
  { label: "All Salaries", min: 0, max: Infinity },
  { label: "£30K - £50K", min: 30000, max: 50000 },
  { label: "£50K - £75K", min: 50000, max: 75000 },
  { label: "£75K - £100K", min: 75000, max: 100000 },
  { label: "£100K+", min: 100000, max: Infinity },
];
