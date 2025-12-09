import { Upload, FileSearch, MessageCircle, CheckCircle, Building, Users, Search, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const candidateSteps = [
  {
    icon: Upload,
    title: "Upload Your CV",
    description: "Share your experience and qualifications with our expert recruiters",
  },
  {
    icon: FileSearch,
    title: "Get Matched",
    description: "Our AI-powered system finds roles perfectly suited to your skills",
  },
  {
    icon: MessageCircle,
    title: "Expert Guidance",
    description: "Dedicated consultants support you through every step",
  },
  {
    icon: CheckCircle,
    title: "Land Your Role",
    description: "Start your dream position with confidence",
  },
];

const employerSteps = [
  {
    icon: Building,
    title: "Register Your Practice",
    description: "Tell us about your clinic and team requirements",
  },
  {
    icon: Search,
    title: "We Source Talent",
    description: "Access our global network of qualified veterinary professionals",
  },
  {
    icon: Users,
    title: "Review Candidates",
    description: "Receive pre-screened candidates that match your needs",
  },
  {
    icon: Handshake,
    title: "Hire With Confidence",
    description: "Build your team with our placement guarantee",
  },
];

const DualPathway = () => {
  return (
    <section className="py-20 lg:py-32 bg-card" id="candidates">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're seeking your next career move or building your dream team
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Candidates Pathway */}
          <div className="relative flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">For Candidates</h3>
              </div>

              <div className="space-y-6">
                {candidateSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <step.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      {index < candidateSteps.length - 1 && (
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-px h-8 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="hero" size="lg" className="mt-8" asChild>
                  <Link to="/candidates">
                    <Upload className="w-4 h-4" />
                    Upload Your CV
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Employers Pathway */}
          <div className="relative flex flex-col items-center" id="employers">
            <div className="w-full max-w-md">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Building className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">For Employers</h3>
              </div>

              <div className="space-y-6">
                {employerSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <step.icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                      </div>
                      {index < employerSteps.length - 1 && (
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-px h-8 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="heroOutline" size="lg" className="mt-8" asChild>
                  <Link to="/employers">
                    <Building className="w-4 h-4" />
                    Register a Vacancy
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualPathway;
