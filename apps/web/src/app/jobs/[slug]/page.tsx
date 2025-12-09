import Link from "next/link";
import { notFound } from "next/navigation";
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

import { API_BASE_URL } from "@/lib/config";
import { formatCompensation, formatDate, formatLocation } from "@/lib/jobs/utils";
import type { PublicJobDetail } from "@/lib/types/jobs";

async function getJobDetail(slug: string): Promise<PublicJobDetail | null> {
  const response = await fetch(`${API_BASE_URL}/api/v1/public/jobs/${slug}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load job detail (status ${response.status})`);
  }

  return (await response.json()) as PublicJobDetail;
}

function buildDescriptionSegments(description: string): string[] {
  const paragraphs = description
    .split(/\r?\n{2,}/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (paragraphs.length > 1) {
    return paragraphs;
  }

  return description
    .split(/\r?\n/)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Text size="2" color="gray">
        {label}
      </Text>
      <Text size="3" weight="medium">
        {value}
      </Text>
    </Box>
  );
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await getJobDetail(params.slug);

  if (!job) {
    notFound();
  }

  const location = formatLocation(job.location);
  const compensation = formatCompensation(job);
  const postedAt = formatDate(job.posted_at);
  const closingOn = formatDate(job.expires_at);
  const updatedAt = formatDate(job.updated_at);
  const summary = job.summary ?? null;
  const descriptionSegments = buildDescriptionSegments(job.description);

  return (
    <Section size="3" className="px-4 py-20 md:px-8">
      <Container size="3">
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="3">
            <Flex justify="between" align="start" wrap="wrap" gap="3">
              <div>
                <Heading size="8" className="font-heading">
                  {job.title}
                </Heading>
                {location ? (
                  <Text size="3" className="text-white/70">
                    {location}
                  </Text>
                ) : null}
                <Text size="2" className="text-white/50">
                  {postedAt ? `Published ${postedAt}` : "Live opportunity"}
                  {closingOn ? ` · Closes ${closingOn}` : ""}
                </Text>
              </div>
              {job.contract_type ? (
                <Badge color="cyan" variant="soft" radius="full">
                  {job.contract_type}
                </Badge>
              ) : null}
            </Flex>

            {summary ? (
              <Text size="4" className="text-white/75">
                {summary}
              </Text>
            ) : null}

            <Flex gap="3" wrap="wrap">
              <Button asChild color="cyan" radius="full">
                <Link href="/contact">Apply for this role</Link>
              </Button>
              <Button asChild variant="soft" color="gray" radius="full">
                <Link href="/jobs">Back to job board</Link>
              </Button>
            </Flex>
          </Flex>

          <Card className="glass-card-muted">
            <Flex direction="column" gap="4" p="6">
              <Text size="4" weight="medium">
                Role snapshot
              </Text>
              <Grid columns={{ initial: "1", sm: "2" }} gap="4">
                <MetadataItem label="Location" value={location || "Global"} />
                <MetadataItem label="Work pattern" value={job.work_pattern ?? "Flexible"} />
                <MetadataItem label="Contract" value={job.contract_type ?? "Varied"} />
                <MetadataItem label="Compensation" value={compensation ?? "Discussed with recruiter"} />
                <MetadataItem label="Published" value={postedAt ?? "Recently added"} />
                <MetadataItem label="Last updated" value={updatedAt ?? "Current"} />
              </Grid>
              {job.source ? (
                <Text size="2" className="text-white/50">
                  Sourced via {job.source}
                  {job.source_ref ? ` · Reference ${job.source_ref}` : ""}
                </Text>
              ) : null}
            </Flex>
          </Card>

          <Card className="glass-card">
            <Flex direction="column" gap="4" p="6">
              <Heading size="6" className="font-heading">
                The opportunity
              </Heading>
              <Separator size="4" className="border-white/10" />
              <Flex direction="column" gap="3">
                {descriptionSegments.length > 0 ? (
                  descriptionSegments.map((paragraph, index) => (
                    <Text key={`paragraph-${index}`} size="3" className="text-white/80 leading-relaxed">
                      {paragraph}
                    </Text>
                  ))
                ) : (
                  <Text size="3" className="text-white/70">
                    Detailed description coming soon.
                  </Text>
                )}
              </Flex>
            </Flex>
          </Card>

          {closingOn ? (
            <Card className="glass-card-muted">
              <Box p="5">
                <Text size="3" className="text-white/70">
                  Applications close on{" "}
                  <Text as="span" weight="medium" color="cyan">
                    {closingOn}
                  </Text>
                  . Submit your interest early to connect with the Synergy recruiters team.
                </Text>
              </Box>
            </Card>
          ) : null}
        </Flex>
      </Container>
    </Section>
  );
}
