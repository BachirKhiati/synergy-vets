export type JobLocation = {
  country?: string | null;
  region?: string | null;
  city?: string | null;
};

export type PublicJob = {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  description: string;
  contract_type?: string | null;
  work_pattern?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  currency?: string | null;
  posted_at?: string | null;
  expires_at?: string | null;
  location: JobLocation;
};

export type JobsResponse = {
  jobs: PublicJob[];
  page: number;
  page_size: number;
  total: number;
  has_more: boolean;
};

export type PublicJobDetail = PublicJob & {
  source?: string | null;
  source_ref?: string | null;
  created_at: string;
  updated_at: string;
};
