import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Target, Lightbulb, Globe2, HeartHandshake, Compass } from "lucide-react";

const values = [
  {
    title: "Compassion first",
    description: "We advocate for people and animals in every interaction, ensuring empathy guides each placement.",
    icon: HeartHandshake,
  },
  {
    title: "Insight driven",
    description: "Decisions are powered by data, market intelligence, and lived experience from veterinary experts.",
    icon: Lightbulb,
  },
  {
    title: "Global mindset",
    description: "Our reach spans continents, but our focus remains on cultivating local community impact.",
    icon: Globe2,
  },
  {
    title: "Long-term partnerships",
    description: "We do more than fill roles—we build enduring relationships that accelerate growth.",
    icon: Target,
  },
];

const milestones = [
  {
    year: "2012",
    title: "Founded by veterinary specialists",
    description: "Born from a desire to connect practices with talent that understands the realities of clinical life.",
  },
  {
    year: "2016",
    title: "Global relocation desk launched",
    description: "Expanded support to include visa, licensing, and relocation pathways for candidates worldwide.",
  },
  {
    year: "2019",
    title: "Strategic employer programmes",
    description: "Introduced workforce planning partnerships for multi-site veterinary groups.",
  },
  {
    year: "2023",
    title: "AI-enabled talent intelligence",
    description: "Investment in technology to deliver predictive hiring, salary benchmarks, and faster placements.",
  },
];

const impactMetrics = [
  {
    stat: "650+",
    caption: "Veterinary careers transformed",
  },
  {
    stat: "40%",
    caption: "Year-on-year growth for partner clinics",
  },
  {
    stat: "18",
    caption: "Countries with active Synergy Vets talent",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-28 pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-b from-card via-background to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">Our story</Badge>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground">
                Veterinary Recruitment Specialist
              </h1>
              <p className="mt-4 text-muted-foreground text-lg">
                SynergyVets is a dedicated Veterinary Recruitment Agency, with almost 30 years' collective experience supporting the Veterinary profession with locum and permanent personnel. We have developed tried and trusted relationships with an extensive network of Veterinary Practices throughout the UK, which enables us to offer an up-to-date online lists of Permanent/Locum Vet and Nurse roles.
              </p>
              <p className="mt-4 text-muted-foreground text-lg">
                All our clients and candidates are treated with the respect they deserve. We are well-aware that our reputation depends entirely on providing the best possible service, whether we are searching out appropriate jobs, minimising admin through our payroll system or offering advice to practices that have recruitment needs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16" id="mission">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border/70 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Mission</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Champion veterinary professionals and organisations through thoughtful, people-first recruitment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  We support every stage of the employment journey—from strategic workforce planning through onboarding—so that practitioners can focus on delivering outstanding animal care.
                </CardContent>
              </Card>
              <Card className="border-border/70 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Vision</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    A world where veterinary teams are empowered, supported, and equipped for sustainable success.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  By nurturing long-term partnerships and outcomes-driven hiring, we help practices innovate, grow, and deliver the best possible outcomes for animals and their families.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-20 bg-card" id="values">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mb-10">
              <Badge variant="secondary" className="mb-4">Values</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">What guides our work</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                These principles inform how we partner with clinics, candidates, and communities.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="p-6 rounded-2xl border border-border/70 bg-background/70 backdrop-blur">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-20" id="milestones">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mb-10">
              <Badge variant="secondary" className="mb-4">Milestones</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Growing with our partners</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Each chapter reflects continuous collaboration with veterinary professionals and practices around the world.
              </p>
            </div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex lg:flex-col items-center gap-3 lg:w-32">
                      <span className="text-sm font-medium text-primary">{milestone.year}</span>
                      <Separator orientation={"vertical"} className={`hidden lg:block h-16 ${index === milestones.length - 1 ? "bg-transparent" : "bg-border"}`} />
                    </div>
                    <Card className="flex-1 border-border/60 bg-card/80 backdrop-blur">
                      <CardHeader>
                        <CardTitle className="text-xl text-foreground">{milestone.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {milestone.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" id="impact">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl text-center mx-auto">
              <Badge variant="secondary" className="mb-4">Impact</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Committed to sustainable veterinary growth</h2>
              <p className="mt-4 text-muted-foreground">
                We exist to empower teams, elevate patient outcomes, and deliver meaningful community impact.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {impactMetrics.map((metric) => (
                <Card key={metric.caption} className="border-border/60 bg-background/90 backdrop-blur text-center">
                  <CardHeader>
                    <Compass className="w-6 h-6 text-secondary mx-auto" />
                    <CardTitle className="text-4xl font-bold text-foreground mt-4">{metric.stat}</CardTitle>
                    <CardDescription className="text-muted-foreground text-base mt-2">
                      {metric.caption}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
