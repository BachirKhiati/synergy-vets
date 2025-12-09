"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Inset,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Globe2,
  MapPin,
  Megaphone,
  Sparkle,
  Users2,
} from "lucide-react";
import Link from "next/link";

const jobHighlights = [
  {
    title: "Lead Veterinary Surgeon — Advanced Referral",
    location: "Sydney, Australia",
    type: "Permanent",
    compensation: "AUD 140K - 170K",
  },
  {
    title: "Locum ECC Specialist — Flagship Hospital",
    location: "London, United Kingdom",
    type: "Locum",
    compensation: "GBP 500 / day",
  },
  {
    title: "Regional Clinical Director — Multi-site",
    location: "Austin, United States",
    type: "Permanent",
    compensation: "USD 180K - 210K",
  },
];

const stats = [
  { value: "10k+", label: "Global placements" },
  { value: "6", label: "Continents supported" },
  { value: "2500+", label: "Partner practices" },
];

const insightCards = [
  {
    title: "Thinking Global: Veterinary Careers in APAC",
    description:
      "Visa insights, relocation strategies, and onboarding frameworks for clinicians relocating to Asia-Pacific.",
  },
  {
    title: "Building Future-Ready Veterinary Teams",
    description:
      "How data-backed workforce planning keeps hospitals resilient and responsive to emerging clinical demands.",
  },
];

const servicePillars = [
  {
    icon: <Globe2 size={24} />,
    title: "Global talent intelligence",
    copy:
      "Discover curated shortlists across 18 markets with compliance support, visa advisory, and relocation playbooks.",
  },
  {
    icon: <Users2 size={24} />,
    title: "Immersive candidate journeys",
    copy:
      "Personalised dashboards let veterinary professionals manage profiles, preferences, and live applications in one place.",
  },
  {
    icon: <Megaphone size={24} />,
    title: "Staff announcement hub",
    copy:
      "Equip internal teams with a secure space to launch updates, share CPD opportunities, and orchestrate hiring campaigns.",
  },
  {
    icon: <Briefcase size={24} />,
    title: "Employer growth engine",
    copy:
      "Dynamic microsites, multi-channel activation, and analytics translate pipeline visibility into lasting hires.",
  },
];

export default function Home() {
  return (
    <main>
      <Section size="3" className="px-4 pb-24 pt-16 md:px-8">
        <Container size="3">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-8"
            >
              <Badge color="cyan" variant="soft" radius="full" className="self-start">
                Veterinary Futures Platform
              </Badge>
              <Heading as="h1" size="9" className="font-heading leading-tight tracking-tight">
                We connect veterinary teams with talent, technology, and tomorrow’s opportunities.
              </Heading>
              <Text size="5" className="max-w-2xl text-[color:var(--color-muted)]">
                Synergy Vets reimagines veterinary recruitment with a modern candidate experience, data-rich employer insights,
                and a dedicated staff portal to broadcast announcements, roles, and events across the globe.
              </Text>
              <Flex gap="3" align="center" wrap="wrap">
                <Button asChild color="cyan" radius="full" size="3" className="shadow-[0_0_32px_rgba(114,230,255,0.45)]">
                  <Link href="#jobs">Explore jobs</Link>
                </Button>
                <Button asChild variant="soft" color="purple" radius="full" size="3">
                  <Link href="#employers" className="flex items-center gap-2">
                    Build your team <ArrowUpRight size={18} />
                  </Link>
                </Button>
              </Flex>
              <Grid columns={{ initial: "1", sm: "3" }} gap="4">
                {stats.map((stat) => (
                  <Card key={stat.label} className="glass-card-muted text-center">
                    <Flex direction="column" gap="1" align="center" py="4">
                      <Text size="7" weight="medium">
                        {stat.value}
                      </Text>
                      <Text size="3" color="gray">
                        {stat.label}
                      </Text>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              className="glass-card h-fit overflow-hidden"
            >
              <Inset clip="padding-box" className="bg-[linear-gradient(135deg,rgba(114,230,255,0.35),rgba(130,88,255,0.32))] p-[1px]">
                <Box className="rounded-[26px] bg-[rgba(8,16,32,0.78)] p-6 backdrop-blur-xl">
                  <Flex direction="column" gap="5">
                    <Flex align="center" gap="3">
                      <Sparkle size={20} className="text-[color:var(--color-accent)]" />
                      <Text weight="medium">Active opportunities spotlight</Text>
                    </Flex>
                    <Separator size="4" className="border-white/10" />
                    <Flex direction="column" gap="4">
                      {jobHighlights.map((job) => (
                        <Flex key={job.title} direction="column" className="rounded-2xl border border-white/8 bg-black/15 p-4">
                          <Text size="4" weight="medium">
                            {job.title}
                          </Text>
                          <Flex gap="3" wrap="wrap" className="text-sm text-white/70">
                            <Flex align="center" gap="2">
                              <MapPin size={16} />
                              {job.location}
                            </Flex>
                            <Flex align="center" gap="2">
                              <Briefcase size={16} />
                              {job.type}
                            </Flex>
                            <Flex align="center" gap="2">
                              <Globe2 size={16} />
                              {job.compensation}
                            </Flex>
                          </Flex>
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                </Box>
              </Inset>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section id="jobs" size="3" className="px-4 pb-24 md:px-8">
        <Container size="3">
          <Flex direction="column" gap="6">
            <Flex justify="between" align="center" wrap="wrap" gap="4">
              <div>
                <Heading size="7" className="font-heading">
                  Latest roles across the Synergy network
                </Heading>
                <Text size="4" className="text-white/70">
                  Browse curated locum and permanent positions across hospitals, referral centres, and community clinics globally.
                </Text>
              </div>
              <Button asChild variant="outline" color="cyan" radius="full">
                <Link href="/jobs">View global job board</Link>
              </Button>
            </Flex>
            <Grid columns={{ initial: "1", md: "3" }} gap="5">
              {jobHighlights.map((job) => (
                <Card key={`${job.title}-${job.location}`} className="glass-card-muted h-full">
                  <Flex direction="column" gap="3" className="h-full p-5">
                    <Badge color="purple" radius="full" variant="surface" className="self-start">
                      {job.type}
                    </Badge>
                    <Heading size="5">{job.title}</Heading>
                    <Text size="3" className="text-white/70">
                      {job.location}
                    </Text>
                    <Separator size="4" className="border-white/10" />
                    <Flex justify="between" align="center" mt="auto">
                      <Text weight="medium">{job.compensation}</Text>
                      <Button variant="ghost" color="cyan" size="2" asChild>
                        <Link href="/jobs" className="flex items-center gap-2">
                          Details <ArrowUpRight size={16} />
                        </Link>
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>

      <Section id="employers" size="3" className="px-4 pb-24 md:px-8">
        <Container size="3">
          <Grid columns={{ initial: "1", lg: "2" }} gap="8" align="start">
            <Flex direction="column" gap="4">
              <Heading size="7" className="font-heading">
                Built for employers, powered by data.
              </Heading>
              <Text size="4" className="text-white/70">
                From executive search to rapid locum deployment, Synergy Vets combines market intelligence, announcement workflows, and applicant tracking into a single secure portal.
              </Text>
              <Button asChild color="cyan" radius="full" size="3">
                <Link href="/employers">Launch employer hub</Link>
              </Button>
            </Flex>
            <Grid columns={{ initial: "1", md: "2" }} gap="4">
              {servicePillars.map((pillar) => (
                <Card key={pillar.title} className="glass-card-muted h-full">
                  <Flex direction="column" gap="3" p="4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-200">
                      {pillar.icon}
                    </div>
                    <Heading size="4">{pillar.title}</Heading>
                    <Text size="3" className="text-white/70">
                      {pillar.copy}
                    </Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Section>

      <Section size="3" className="px-4 pb-24 md:px-8">
        <Container size="3">
          <Grid columns={{ initial: "1", md: "2" }} gap="6">
            {insightCards.map((insight) => (
              <Card key={insight.title} className="glass-card-muted">
                <Flex direction="column" gap="4" p="5">
                  <Heading size="5">{insight.title}</Heading>
                  <Text size="3" className="text-white/70">
                    {insight.description}
                  </Text>
                  <Button variant="ghost" color="purple" size="2" asChild>
                    <Link href="/insights" className="flex items-center gap-2">
                      Read insight <ArrowUpRight size={16} />
                    </Link>
                  </Button>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section size="3" className="px-4 pb-24 md:px-8">
        <Container size="3">
          <Card className="glass-card">
            <Inset p="1px">
              <Box className="rounded-[26px] bg-[linear-gradient(135deg,rgba(114,230,255,0.28),rgba(130,88,255,0.36))] p-10">
                <Grid columns={{ initial: "1", md: "2" }} gap="6" align="center">
                  <div className="space-y-4">
                    <Heading size="7" className="font-heading">
                      Ready to replatform your veterinary recruitment?
                    </Heading>
                    <Text size="4" className="text-white/75">
                      Book a consultation with our VetXperts to design a bespoke roadmap across talent attraction, staff communications, and data-backed reporting.
                    </Text>
                  </div>
                  <Flex direction="column" gap="3">
                    <Button asChild color="cyan" radius="full" size="3">
                      <Link href="/contact">Schedule discovery call</Link>
                    </Button>
                    <Button asChild variant="ghost" color="gray" size="3">
                      <Link href="/about">Meet the VetXperts</Link>
                    </Button>
                  </Flex>
                </Grid>
              </Box>
            </Inset>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
