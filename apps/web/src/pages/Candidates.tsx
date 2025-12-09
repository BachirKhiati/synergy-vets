import { Link } from "react-router-dom";
import { Upload, Target, Compass, Award, Smile, HeartPulse, GraduationCap, Globe, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const benefits = [
  {
    title: "Personalised matches",
    description: "We pair you with clinics that align with your expertise, ambitions, and lifestyle goals.",
    icon: Target,
    highlights: ["Dedicated talent partner", "Opportunities across 20+ regions", "Data-led role matching"],
  },
  {
    title: "Career acceleration",
    description: "Access mentorship, interview coaching, and contract support tailored for veterinary professionals.",
    icon: GraduationCap,
    highlights: ["Interview preparation toolkit", "Visa and relocation guidance", "Market benchmark insights"],
  },
  {
    title: "Holistic wellbeing",
    description: "We champion roles that prioritise culture, growth, and long-term happiness in practice.",
    icon: HeartPulse,
    highlights: ["Flexible work options", "Wellness-first employers", "Transparent compensation"],
  },
];

const journeySteps = [
  {
    title: "Share your story",
    description: "Upload your CV or speak with our consultants so we can understand what success looks like for you.",
    icon: Upload,
  },
  {
    title: "Curated role shortlist",
    description: "Receive a focused list of practices and organisations that match your skills, aspirations, and values.",
    icon: Compass,
  },
  {
    title: "Guided interview process",
    description: "We coordinate interviews, coach you ahead of each stage, and make sure you feel supported throughout.",
    icon: MessageSquare,
  },
  {
    title: "Celebrate the offer",
    description: "From negotiation through onboarding, we ensure you secure an offer that rewards your expertise.",
    icon: Award,
  },
];

const globalReach = [
  {
    title: "20+ countries",
    description: "International placements with relocation specialists on hand.",
  },
  {
    title: "130+ partner clinics",
    description: "Trusted relationships with independent practices and hospital groups.",
  },
  {
    title: "4-week average placement",
    description: "Fast-moving processes without compromising fit or quality.",
  },
];

const testimonials = [
  {
    quote: "They understood the culture I needed and introduced me to a clinic that champions work-life balance.",
    name: "Dr. Amelia West",
    role: "Small Animal Veterinarian, UK",
  },
  {
    quote: "The relocation support was invaluable. I felt guided from visa paperwork to my first day on-site.",
    name: "Dr. Lucas Meyer",
    role: "Equine Specialist, UAE",
  },
  {
    quote: "Interview prep sessions gave me clarity and confidence. I secured my dream emergency medicine role.",
    name: "Dr. Priya Patel",
    role: "Emergency Vet, Australia",
  },
];

const Candidates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-28 pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-b from-card via-background to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">For veterinary professionals</Badge>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground">
                Unlock the next chapter of your <span className="gradient-text">veterinary career</span>
              </h1>
              <p className="mt-4 text-muted-foreground text-lg">
                We champion candidates across clinical and leadership roles worldwide. From first conversation to first day on the job, our team stays by your side.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">Speak with a consultant</Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/jobs">Browse live roles</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16" id="benefits">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="h-full border-border/60 bg-card/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">{benefit.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {benefit.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Smile className="w-4 h-4 text-primary mt-1" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-20 bg-card" id="journey">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4">Candidate journey</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                A guided process designed around you
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Every placement is personalised, transparent, and supported by experts who live and breathe veterinary recruitment.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {journeySteps.map((step, index) => (
                <div key={step.title} className="relative p-6 rounded-2xl border border-border/70 bg-background/70 backdrop-blur">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Step {index + 1}</p>
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16" id="global-presence">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {globalReach.map((item) => (
                <Card key={item.title} className="border-border/60 bg-gradient-to-br from-background via-card to-background">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-secondary" />
                      <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" id="stories">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">Success stories</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">What candidates say about us</h2>
              <p className="mt-4 text-muted-foreground">
                We are proud partners in hundreds of career journeys each year.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="border-border/60 bg-background/90 backdrop-blur">
                  <CardContent className="pt-8">
                    <p className="text-muted-foreground italic">“{testimonial.quote}”</p>
                    <div className="mt-6">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16" id="get-started">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/90 backdrop-blur px-6 py-10 lg:px-16 lg:py-16">
              <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/30 blur-3xl" />
              <div className="relative max-w-2xl">
                <Badge variant="secondary" className="mb-4">Let’s talk</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Ready to explore your next opportunity?
                </h2>
                <p className="mt-4 text-muted-foreground text-lg">
                  Share your ambitions and we will build a plan that matches your skills, lifestyle, and long-term goals.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">Start the conversation</Link>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <Link to="/jobs">View current openings</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Candidates;
