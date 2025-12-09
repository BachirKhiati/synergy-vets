import type { JobLocation, PublicJob } from "@/lib/types/jobs";

export function formatLocation(location: JobLocation): string {
  const parts = [location.city, location.region, location.country].filter((part): part is string => Boolean(part));
  return parts.join(", ");
}

export function formatCompensation(job: Pick<PublicJob, "salary_min" | "salary_max" | "currency">): string | null {
  const { salary_min, salary_max, currency } = job;

  if (salary_min && salary_max && currency) {
    return `${currency} ${salary_min.toLocaleString()} - ${salary_max.toLocaleString()}`;
  }

  if (salary_min && currency) {
    return `${currency} ${salary_min.toLocaleString()}+`;
  }

  if (salary_max && currency) {
    return `${currency} up to ${salary_max.toLocaleString()}`;
  }

  return null;
}

export function formatDate(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
