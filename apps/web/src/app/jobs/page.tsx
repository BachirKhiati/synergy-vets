import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";

import { FilterControls, InitialFilters } from "./filter-controls";
import { API_BASE_URL } from "@/lib/config";
import type { JobsResponse, PublicJob } from "@/lib/types/jobs";
import { formatCompensation, formatDate, formatLocation } from "@/lib/jobs/utils";

const PAGE_SIZE = 9;

type NormalizedFilters = {
  page: number;
  q: string;
  country: string;
  contractType: string;
};

function normalizeFilters(searchParams: Record<string, string | string[] | undefined>): NormalizedFilters {
  const first = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) {
      return value[0] ?? "";
    }
    return value ?? "";
  };

  const pageRaw = parseInt(first(searchParams.page), 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  return {
    page,
    q: first(searchParams.q).trim(),
    country: first(searchParams.country).trim(),
    contractType: first(searchParams.contract_type).trim(),
  };
}

function buildApiQuery(filters: NormalizedFilters): URLSearchParams {
  const params = new URLSearchParams();
  params.set("page", String(filters.page));
  params.set("page_size", String(PAGE_SIZE));

  if (filters.q) {
    params.set("q", filters.q);
  }

  if (filters.country) {
    params.append("country", filters.country);
  }

  if (filters.contractType) {
    params.append("contract_type", filters.contractType);
  }

  return params;
}

async function fetchJobs(filters: NormalizedFilters): Promise<JobsResponse | null> {
  const query = buildApiQuery(filters);
  const url = `${API_BASE_URL}/api/v1/public/jobs?${query.toString()}`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`request failed with status ${response.status}`);
    }

    const data = (await response.json()) as JobsResponse;
    return data;
  } catch (error) {
    console.error("Failed to load jobs", error);
    return null;
  }
}

function buildFiltersQuery(filters: NormalizedFilters, overrides: Partial<NormalizedFilters>): string {
  const next: NormalizedFilters = {
    ...filters,
    ...overrides,
  };

  const params = new URLSearchParams();

  if (next.q) {
    params.set("q", next.q);
  }

  if (next.country) {
    params.set("country", next.country);
  }

  if (next.contractType) {
    params.set("contract_type", next.contractType);
  }

  if (next.page > 1) {
    params.set("page", String(next.page));
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

function extractFilterOptions(jobs: PublicJob[]) {
  const countries = new Set<string>();
  const contractTypes = new Set<string>();

  for (const job of jobs) {
    if (job.location.country) {
      countries.add(job.location.country);
    }
    if (job.contract_type) {
      contractTypes.add(job.contract_type);
    }
  }

  return {
    countries: Array.from(countries),
    contractTypes: Array.from(contractTypes),
  };
}

function buildInitialFilters(filters: NormalizedFilters): InitialFilters {
  return {
    q: filters.q || undefined,
    country: filters.country || undefined,
    contractType: filters.contractType || undefined,
  };
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = normalizeFilters(searchParams);
  const data = await fetchJobs(filters);

  const jobs = data?.jobs ?? [];
  const total = data?.total ?? 0;
  const page = data?.page ?? filters.page;
  const pageSize = data?.page_size ?? PAGE_SIZE;
  const hasMore = data?.has_more ?? false;
  const totalPages = pageSize > 0 ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const options = extractFilterOptions(jobs);

  return (
    <Section size="3" className="px-4 py-16 md:px-8">
      <Container size="4">
        <Flex direction="column" gap="6">
          <Box>
            <Heading size="8" className="font-heading">
              Global veterinary opportunities
            </Heading>
            <Text size="4" className="text-white/70">
              Browse live roles across Synergy Vets partner hospitals with fresh listings added daily.
            </Text>
          </Box>

          <FilterControls initial={buildInitialFilters(filters)} options={options} />

          {jobs.length === 0 ? (
            <Card className="glass-card-muted">
              <Box p="5">
                <Heading size="5">No roles match your filters</Heading>
                <Text size="3" className="text-white/70">
                  Try broadening your search or clearing filters to explore the latest opportunities.
                </Text>
              </Box>
            </Card>
          ) : (
            <>
              <Flex justify="between" align="center" wrap="wrap" gap="3">
                <Text size="3" className="text-white/70">
                  Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} of {total.toLocaleString()} roles
                </Text>
                <Text size="2" className="text-white/50">
                  Page {page} of {totalPages}
                </Text>
              </Flex>

              <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="5">
                {jobs.map((job) => {
                  const location = formatLocation(job.location);
                  const compensation = formatCompensation(job);
                  const postedAt = formatDate(job.posted_at);
                  const excerpt = job.summary || `${job.description.slice(0, 160)}…`;

                  return (
                    <Card key={job.id} className="glass-card-muted h-full">
                      <Flex direction="column" gap="3" p="5" className="h-full">
                        <Flex justify="between" align="center">
                          <Heading size="4" className="font-heading">
                            {job.title}
                          </Heading>
                          {job.contract_type ? (
                            <Badge color="cyan" variant="soft" radius="full">
                              {job.contract_type}
                            </Badge>
                          ) : null}
                        </Flex>
                        {location ? (
                          <Text size="3" className="text-white/70">
                            {location}
                          </Text>
                        ) : null}
                        {postedAt ? (
                          <Text size="2" className="text-white/50">
                            Posted {postedAt}
                          </Text>
                        ) : null}
                        <Separator size="4" className="border-white/10" />
                        <Text size="3" className="text-white/80">
                          {excerpt}
                        </Text>
                        <Flex direction="column" gap="3" mt="auto">
                          {compensation ? (
                            <Text weight="medium" size="3">
                              {compensation}
                            </Text>
                          ) : null}
                          {job.work_pattern ? (
                            <Text size="2" className="text-white/60">
                              Work pattern: {job.work_pattern}
                            </Text>
                          ) : null}
                          <Button asChild variant="outline" color="cyan" size="3" className="mt-2 self-start">
                            <Link href={`/jobs/${job.slug}`}>View details</Link>
                          </Button>
                        </Flex>
                      </Flex>
                    </Card>
                  );
                })}
              </Grid>

              <Flex justify="between" align="center" mt="4" wrap="wrap" gap="3">
                <Button
                  asChild
                  variant="soft"
                  color="gray"
                  disabled={page <= 1}
                >
                  <Link href={`/jobs${buildFiltersQuery(filters, { page: Math.max(1, page - 1) })}`} prefetch={false}>
                    Previous
                  </Link>
                </Button>
                <Flex gap="2" align="center">
                  <Text size="2" className="text-white/60">
                    Page {page} of {totalPages}
                  </Text>
                </Flex>
                <Button
                  asChild
                  variant="soft"
                  color="cyan"
                  disabled={!hasMore && page >= totalPages}
                >
                  <Link href={`/jobs${buildFiltersQuery(filters, { page: page + 1 })}`} prefetch={false}>
                    Next
                  </Link>
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      </Container>
    </Section>
  );
}
