import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

import { API_BASE_URL } from "@/lib/config";
import type { PublicJobDetail } from "@/lib/types/jobs";
import JobDetailPage from "../[slug]/page";
import LoadingJobDetail from "../[slug]/loading";

const notFoundMock = vi.hoisted(() =>
  vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  })
);

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
}));

describe("JobDetailPage", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    notFoundMock.mockClear();
  });

  afterEach(() => {
    if (originalFetch) {
      global.fetch = originalFetch;
    } else {
      // @ts-expect-error restore when fetch is undefined
      delete global.fetch;
    }
  });

  it("renders job detail content for a published role", async () => {
    const job: PublicJobDetail = {
      id: "job-1",
      title: "Senior Product Manager",
      slug: "senior-product-manager",
      summary: "Drive product strategy across the platform portfolio.",
      description: "Lead cross-functional teams.\n\nDefine product vision.",
      contract_type: "Full-time",
      work_pattern: "Remote-first",
      salary_min: 90000,
      salary_max: 120000,
      currency: "USD",
      posted_at: "2025-01-05T00:00:00Z",
      expires_at: "2025-02-01T00:00:00Z",
      location: {
        city: "New York",
        region: "NY",
        country: "USA",
      },
      source: "Internal",
      source_ref: "SPM-2025",
      created_at: "2024-12-15T00:00:00Z",
      updated_at: "2025-01-06T00:00:00Z",
    };


    const mockResponse = new Response(JSON.stringify(job), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    global.fetch = vi.fn().mockResolvedValue(mockResponse) as unknown as typeof fetch;

    const ui = await JobDetailPage({ params: { slug: job.slug } });
    render(<Suspense fallback={<LoadingJobDetail />}>{ui}</Suspense>);

    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/v1/public/jobs/${job.slug}`, {
      cache: "no-store",
    });

    expect(await screen.findByRole("heading", { name: job.title })).toBeInTheDocument();
    expect(screen.getByText(job.summary!)).toBeInTheDocument();
    expect(screen.getByText("Role snapshot")).toBeInTheDocument();
    expect(screen.getByText("Senior Product Manager")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Apply for this role" })).toHaveAttribute("href", "/contact");
    expect(screen.getByText(/Applications close on/i)).toBeInTheDocument();
  });

  it("delegates to the Next notFound helper when the job is missing", async () => {
    global.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 404 })) as unknown as typeof fetch;

    await expect(JobDetailPage({ params: { slug: "unknown-role" } })).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  it("throws when the API responds with an unexpected error", async () => {
    global.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 500 })) as unknown as typeof fetch;

    await expect(JobDetailPage({ params: { slug: "error-role" } })).rejects.toThrow(
      /Failed to load job detail\s*\(status 500\)/
    );
    expect(notFoundMock).not.toHaveBeenCalled();
  });

  it("renders the loading skeleton while waiting for data", () => {
    render(<LoadingJobDetail />);

    expect(screen.getByRole("button", { name: /Loading/ })).toBeDisabled();
    expect(screen.getByRole("heading", { name: "Role snapshot" })).toBeInTheDocument();
  });
});
