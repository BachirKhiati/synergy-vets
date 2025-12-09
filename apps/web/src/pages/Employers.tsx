import { Link } from "react-router-dom";
import { Building2, Handshake, ShieldCheck, Target, Users, BarChart3, Sparkles, Rocket, ClipboardCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const employerBenefits = [
  {
    title: "Specialist vet talent",
    description: "Access emergency, exotic, equine, and leadership talent vetted by practising clinicians.",
    icon: Target,
    metrics: ["95% shortlist acceptance", "Role brief within 48 hours"],
  },
  {
    title: "End-to-end hiring",
    description: "From employer branding to contract signing, we orchestrate every touchpoint with candidates.",
    icon: Handshake,
    metrics: ["Interview scheduling support", "Offer negotiation guidance"],
  },
  {
    title: "Quality and compliance",
    description: "Each candidate is screened for credentials, cultural fit, and regulatory compliance across regions.",
    icon: ShieldCheck,
    metrics: ["RCVS and AVMA verification", "Relocation ready candidates"],
  },
];

const partnershipPillars = [
  {
    title: "Strategic briefing",
    description: "We align on growth plans, clinical culture, and the skills required to elevate your team.",
    icon: ClipboardCheck,
  },
  {
    title: "Global sourcing",
    description: "Benefit from our international network of veterinarians, nurses, and practice leaders.",
    icon: Users,
  },
  {
    title: "Insight-led decisions",
    description: "Real-time market data informs salary benchmarks and ensures competitive offers.",
    icon: BarChart3,
  },
  {
    title: "Accelerated onboarding",
    description: "Post-placement support covers relocation, licensing, and onboarding check-ins.",
    icon: Rocket,
  },
];

const partnershipStats = [
  {
    stat: "87%",
    label: "Roles filled within 6 weeks",
  },
  {
    stat: "120+",
    label: "Veterinary partners globally",
  },
  {
    stat: "4.9/5",
    label: "Average partner satisfaction",
  },
];

const Employers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-28 pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-b from-card via-background to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-4">For hiring teams</Badge>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground">
                Build a veterinary team that delivers <span className="gradient-text">exceptional care</span>
              </h1>
              <p className="mt-4 text-muted-foreground text-lg max-w-3xl">
                Synergy Vets partners with clinics, hospitals, and corporate groups to source permanent and locum professionals who match your culture and growth ambitions.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">Book a discovery call</Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/candidates">Explore candidate experience</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16" id="employer-benefits">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {employerBenefits.map((benefit) => (
                <Card key={benefit.title} className="h-full border-border/60 bg-card/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">{benefit.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {benefit.metrics.map((metric) => (
                      <div key={metric} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Sparkles className="w-4 h-4 text-secondary" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-20 bg-card" id="model">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mb-10">
              <Badge variant="secondary" className="mb-4">Partnership model</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                A recruitment engine optimised for veterinary excellence
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Our consultants operate as an extension of your team, combining human expertise with technology to deliver predictable hiring outcomes.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {partnershipPillars.map((pillar) => (
                <div key={pillar.title} className="p-6 rounded-2xl border border-border/70 bg-background/70 backdrop-blur">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <pillar.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16" id="metrics">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {partnershipStats.map((item) => (
                <Card key={item.label} className="border-border/60 bg-gradient-to-br from-background via-card to-background text-center">
                  <CardHeader>
                    <Building2 className="w-6 h-6 text-primary mx-auto" />
                    <CardTitle className="text-4xl font-bold text-foreground mt-4">{item.stat}</CardTitle>
                    <CardDescription className="text-muted-foreground text-base mt-2">
                      {item.label}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" id="cta">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl text-center mx-auto">
              <Badge variant="secondary" className="mb-4">Why Synergy Vets</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                A partner who understands clinical priorities and business goals
              </h2>
              <p className="mt-4 text-muted-foreground">
                We combine decades of industry experience with a curated global network, ensuring every hire elevates patient care and team culture.
              </p>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Connect with us</Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/jobs">View featured roles</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Employers;
