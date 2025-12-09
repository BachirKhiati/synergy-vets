import { Search, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroDog from "@/assets/hero-dog.jpg";

const regions = [
  "UK",
  "AUSTRALIA",
  "USA",
  "CANADA",
  "NEW ZEALAND",
  "EUROPE",
  "ASIA",
  "UAE",
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-secondary/15 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: "2s" }} />

      {/* Hero Image */}
      <div className="absolute right-0 top-20 w-1/2 h-full hidden lg:block">
        <img
          src={heroDog}
          alt="Professional veterinary care"
          className="w-full h-full object-cover object-left opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8 pt-20 lg:pt-32">
        <div className="max-w-3xl">
          <div className="relative lg:hidden mb-12 rounded-3xl overflow-hidden border border-border/60 shadow-2xl">
            <img
              src={heroDog}
              alt="Professional veterinary care"
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight animate-fade-up">
            <span className="text-foreground">We connect</span>
            <br />
            <span className="text-foreground">veterinary teams</span>
            <br />
            <span className="text-foreground">with the best talent,</span>
            <br />
            <span className="gradient-text italic">worldwide</span>
            <span className="text-foreground">.</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl animate-fade-up-delay-1">
            Your next opportunity, guided by local insight and global expertise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-up-delay-2">
            <Button variant="hero" size="lg" asChild>
              <Link to="/candidates">JOB SEEKERS</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/employers">EMPLOYERS</Link>
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <div className="mt-20 lg:mt-32 max-w-5xl animate-fade-up-delay-3">
          <div className="card-gradient rounded-2xl p-6 lg:p-8 border border-border shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Job Title Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="JOB TITLE / KEYWORDS"
                  className="pl-12 h-14 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground rounded-xl text-sm uppercase tracking-wide"
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="LOCATION"
                  className="pl-12 h-14 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground rounded-xl text-sm uppercase tracking-wide"
                />
              </div>

              {/* Search Button */}
              <Button variant="hero" size="lg" className="h-14 px-8 lg:px-12">
                <Globe className="w-5 h-5" />
                GLOBAL SEARCH
              </Button>
            </div>

            {/* Quick Search Tags */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Quick Search
              </span>
              {regions.map((region) => (
                <Button
                  key={region}
                  variant="pill"
                  size="sm"
                  className="rounded-full"
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />
    </section>
  );
};

export default HeroSection;
