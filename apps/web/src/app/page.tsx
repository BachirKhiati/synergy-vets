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
  HeartPulse,
  MapPin,
  Sparkle,
  Users2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  { value: "12k+", label: "Placements delivered" },
  { value: "92%", label: "Candidate satisfaction" },
  { value: "48 hrs", label: "Average shortlist" },
];

const partnerLogos = [
  "VetNova",
  "Animalia Collective",
  "Northstar Clinics",
  "Horizon Referrals",
  "Bluecrest Group",
];

const featureHighlights = [
  {
    icon: <Globe2 size={24} />,
    title: "Market intelligence engine",
    copy:
      "Live salary indexes, visa pathways, and pipeline insights give teams confidence to mobilise across continents.",
    accent: "Global coverage",
  },
  {
    icon: <Users2 size={24} />,
    title: "Experience-led journeys",
    copy:
      "Candidates manage preferences, documents, and interviews in a guided workspace tuned for clinical talent.",
    accent: "Personalised touchpoints",
  },
  {
    icon: <Briefcase size={24} />,
    title: "Growth-ready employer hub",
    copy:
      "Launch collaborative campaigns with branded microsites, analytics, and automated compliance workflows.",
    accent: "Launch in minutes",
  },
];

const designMotifs = [
  {
    title: "Immersive onboarding kits",
    copy: "White-labelled journeys, digital handbooks, and cultural primers keep clinicians confident through every step.",
    asset: "/window.svg",
  },
  {
    title: "Global compliance vault",
    copy: "Secure storage for credentials and licences with automated reminders ensures teams stay ready to deploy.",
    asset: "/file.svg",
  },
  {
    title: "Signal-driven outreach",
    copy: "Design-led campaigns, motion assets, and smart segmentation spark interest across talent communities.",
    asset: "/globe.svg",
  },
];

const journeySteps = [
  {
    title: "Discover",
    copy:
      "Signal hiring goals and market focus. We enrich demand with live benchmarking and talent forecasting.",
  },
  {
    title: "Engage",
    copy:
      "Automations nurture talent pools while consultants curate shortlists with relocation-ready clinicians.",
  },
  {
    title: "Delight",
    copy:
      "Offer design, onboarding playbooks, and performance feedback loops help retain newly placed teams.",
  },
];

const testimonials = [
  {
    quote:
      "The Synergy portal replaced four legacy tools overnight. Our vets feel genuinely supported before they even land on site.",
    name: "Dr. Maya Kendrick",
    role: "Clinical Director, Horizon Referrals",
  },
  {
    quote:
      "Candidate journeys feel bespoke without adding to our workload. The analytics dashboard has become our hiring compass.",
    name: "Elena Cruz",
    role: "Group People Lead, Northstar Clinics",
  },
];

export default function Home() {
  return (
    <main className="space-y-24">
      <Section size="3" className="relative overflow-hidden px-4 pb-28 pt-20 md:px-8">
        <Box className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(114,230,255,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(130,88,255,0.22),transparent_55%)]" />
        <Box className="pointer-events-none absolute -right-24 top-16 hidden h-[520px] w-[520px] rotate-6 md:block">
          <Image
            src="/globe.svg"
            alt="Decorative globe illustration"
            fill
            priority
            sizes="520px"
            className="object-contain opacity-45 mix-blend-screen"
          />
        </Box>
        <Box className="pointer-events-none absolute bottom-[-120px] left-1/2 h-[300px] w-[360px] -translate-x-1/2 md:hidden">
          <Image
            src="/globe.svg"
            alt="Decorative globe illustration"
            fill
            sizes="(min-width: 768px) 360px, 240px"
            className="object-contain opacity-35 mix-blend-screen"
          />
        </Box>
        <Container size="3" className="relative">
          <Grid columns={{ initial: "1", lg: "[minmax(0,1.1fr)_minmax(0,1fr)]" }} gap="12">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-10"
            >
              <Flex align="center" gap="3" wrap="wrap">
                <Badge color="cyan" radius="full" variant="surface" className="text-sm">
                  Veterinary talent, reimagined
                </Badge>
                <Flex align="center" gap="2" className="text-sm text-cyan-200">
                  <Sparkle size={16} />
                  Always-on delivery squads
                </Flex>
              </Flex>
              <Heading as="h1" size="9" className="font-heading leading-[1.05] tracking-tight">
                Build veterinary teams that feel future-ready from day one.
              </Heading>
              <Text size="5" className="max-w-2xl text-white/75">
                Synergy Vets blends human expertise with intelligent automations so you can discover, engage, and onboard clinicians across the globe without losing the personal touch they expect.
              </Text>
              <Flex gap="3" wrap="wrap">
                <Button
                  asChild
                  color="cyan"
                  radius="full"
                  size="3"
                  className="shadow-[0_0_42px_rgba(114,230,255,0.45)]"
                >
                  <Link href="/contact">Design my hiring blueprint</Link>
                </Button>
                <Button asChild variant="soft" color="purple" radius="full" size="3">
                  <Link href="#jobs" className="flex items-center gap-2">
                    View open roles <ArrowUpRight size={18} />
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
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              className="glass-card h-fit overflow-hidden rounded-xl"
            >
              <Inset clip="padding-box" className="bg-[linear-gradient(135deg,rgba(114,230,255,0.42),rgba(130,88,255,0.36))] p-[1px]">
                <Box className="rounded-xl bg-[rgba(6,14,26,0.85)] p-6 backdrop-blur-xl">
                  <Flex direction="column" gap="5">
                    <Flex align="center" justify="between" wrap="wrap" gap="3">
                      <Flex align="center" gap="2" className="text-sm text-cyan-200">
                        <HeartPulse size={18} />
                        Clinician shortlists in motion
                      </Flex>
                      <Badge variant="soft" color="purple" radius="full">
                        Updated hourly
                      </Badge>
                    </Flex>
                    <Separator size="4" className="border-white/10" />
                    <Flex direction="column" gap="4">
                      {jobHighlights.map((job) => (
                        <Flex
                          key={job.title}
                          direction="column"
                          className="rounded-lg border border-white/8 bg-white/5 p-4"
                        >
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
                    <Button asChild variant="ghost" color="cyan" size="3">
                      <Link href="/jobs" className="flex items-center gap-2">
                        Explore the talent roster <ArrowUpRight size={18} />
                      </Link>
                    </Button>
                  </Flex>
                </Box>
              </Inset>
            </motion.div>
          </Grid>
        </Container>
      </Section>

      <Section size="2" className="px-4 md:px-8">
        <Container size="3">
          <Flex direction="column" gap="4">
            <Text size="3" className="text-white/60">
              Trusted by progressive veterinary groups scaling across continents
            </Text>
            <Flex wrap="wrap" gap="6" className="text-white/50">
              {partnerLogos.map((logo) => (
                <Text key={logo} size="4" weight="medium" className="tracking-wide">
                  {logo}
                </Text>
              ))}
            </Flex>
          </Flex>
        </Container>
      </Section>

      <Section size="3" className="px-4 md:px-8">
        <Container size="3">
          <Flex direction="column" gap="5">
            <Heading size="7" className="font-heading">
              Detail-rich experiences that feel beautifully crafted.
            </Heading>
            <Text size="4" className="text-white/70">
              We design every touchpoint with illustrated moments, motion accents, and content kits that reflect your brand voice.
            </Text>
            <Grid columns={{ initial: "1", md: "3" }} gap="5">
              {designMotifs.map((motif) => (
                <Card
                  key={motif.title}
                  className="glass-card-muted relative overflow-hidden rounded-xl border border-white/10"
                >
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(114,230,255,0.18),transparent_65%)]" />
                  <Flex direction="column" gap="3" className="relative h-full p-5">
                    <div className="relative h-14 w-14">
                      <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 blur-[1px]" />
                      <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/15 via-transparent to-purple-500/20">
                        <span className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-cyan-400/15 blur" />
                        <Image src={motif.asset} alt={motif.title} width={30} height={30} className="relative" />
                      </div>
                    </div>
                    <Heading size="4">{motif.title}</Heading>
                    <Text size="3" className="text-white/70">
                      {motif.copy}
                    </Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>

      <Section id="employers" size="3" className="px-4 md:px-8">
        <Container size="3">
          <Grid columns={{ initial: "1", lg: "[minmax(0,0.9fr)_minmax(0,1.1fr)]" }} gap="8" align="start">
            <Flex direction="column" gap="5">
              <Heading size="7" className="font-heading">
                Platform tools designed for decisive employer teams.
              </Heading>
              <Text size="4" className="text-white/70">
                Replace fragmented workflows with a single operating system for talent intelligence, campaign execution, and compliant placements. Every feature is co-built with clinicians and hiring leads.
              </Text>
              <Button asChild color="cyan" radius="full" size="3">
                <Link href="/employers">See employer capabilities</Link>
              </Button>
            </Flex>
            <Grid columns={{ initial: "1", sm: "3" }} gap="4">
              {featureHighlights.map((feature) => (
                <Card key={feature.title} className="glass-card-muted h-full rounded-xl">
                  <Flex direction="column" gap="3" p="4" className="h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-200">
                      {feature.icon}
                    </div>
                    <Heading size="4">{feature.title}</Heading>
                    <Text size="3" className="text-white/70">
                      {feature.copy}
                    </Text>
                    <Separator size="4" className="border-white/10" />
                    <Text size="2" className="text-cyan-200">
                      {feature.accent}
                    </Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Section>

      <Section size="3" className="px-4 md:px-8">
        <Container size="3">
          <Grid columns={{ initial: "1", lg: "[minmax(0,0.95fr)_minmax(0,1.05fr)]" }} gap="8" align="center">
            <Flex direction="column" gap="5">
              <Heading size="7" className="font-heading">
                A guided journey for every clinician and employer touchpoint.
              </Heading>
              <Text size="4" className="text-white/70">
                From the first conversation to post-placement feedback, every moment is orchestrated to feel seamless, measured, and meaningful.
              </Text>
              <Button asChild variant="outline" color="purple" radius="full" size="3">
                <Link href="/about">Meet the delivery team</Link>
              </Button>
            </Flex>
            <Card className="glass-card-muted rounded-xl">
              <Flex direction="column" p="5" gap="5">
                {journeySteps.map((step, index) => (
                  <Flex key={step.title} direction="column" gap="2">
                    <Flex align="center" gap="3">
                      <Badge color="cyan" variant="surface" radius="full">
                        {String(index + 1).padStart(2, "0")}
                      </Badge>
                      <Heading size="4">{step.title}</Heading>
                    </Flex>
                    <Text size="3" className="text-white/70">
                      {step.copy}
                    </Text>
                    {index < journeySteps.length - 1 && <Separator size="4" className="border-white/10" />}
                  </Flex>
                ))}
              </Flex>
            </Card>
          </Grid>
        </Container>
      </Section>

      <Section id="jobs" size="3" className="px-4 md:px-8">
        <Container size="3">
          <Flex direction="column" gap="6">
            <Flex justify="between" align="center" wrap="wrap" gap="4">
              <div className="space-y-2">
                <Heading size="7" className="font-heading">
                  Featured opportunities from our global roster
                </Heading>
                <Text size="4" className="text-white/70">
                  Permanent, locum, and leadership roles landing in your inbox before they surface elsewhere.
                </Text>
              </div>
              <Button asChild variant="outline" color="cyan" radius="full">
                <Link href="/jobs">Browse the full board</Link>
              </Button>
            </Flex>
            <Grid columns={{ initial: "1", md: "3" }} gap="5">
              {jobHighlights.map((job) => (
                <Card key={`${job.title}-${job.location}`} className="glass-card-muted h-full rounded-xl">
                  <Flex direction="column" gap="3" className="h-full p-5">
                    <Badge color="purple" radius="full" variant="surface" className="self-start uppercase tracking-wide">
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

      <Section size="3" className="px-4 md:px-8">
        <Container size="3">
          <Grid columns={{ initial: "1", md: "2" }} gap="6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="glass-card-muted h-full rounded-xl">
                <Flex direction="column" gap="4" className="h-full p-5">
                  <Text size="4" className="text-white/80">
                    “{testimonial.quote}”
                  </Text>
                  <Separator size="4" className="border-white/10" />
                  <div>
                    <Text weight="medium">{testimonial.name}</Text>
                    <Text size="2" className="text-white/60">
                      {testimonial.role}
                    </Text>
                  </div>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section size="3" className="px-4 pb-24 md:px-8">
        <Container size="3">
          <Card className="glass-card rounded-xl">
            <Inset p="1px">
              <Box className="rounded-[28px] bg-[linear-gradient(135deg,rgba(114,230,255,0.24),rgba(130,88,255,0.34))] p-10">
                <Grid columns={{ initial: "1", md: "[minmax(0,1fr)_minmax(0,0.65fr)]" }} gap="6" align="center">
                  <div className="space-y-4">
                    <Badge color="purple" radius="full" variant="soft">
                      Let’s partner
                    </Badge>
                    <Heading size="7" className="font-heading">
                      Ready to orchestrate your next wave of veterinary growth?
                    </Heading>
                    <Text size="4" className="text-white/75">
                      Book a discovery session with our VetXperts to co-create an activation plan across sourcing, relocation, and ongoing clinician care.
                    </Text>
                  </div>
                  <Flex direction="column" gap="3">
                    <Button asChild color="cyan" radius="full" size="3">
                      <Link href="/contact">Schedule discovery call</Link>
                    </Button>
                    <Button asChild variant="ghost" color="gray" size="3">
                      <Link href="/about">See how we partner</Link>
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
