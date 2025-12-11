import { Search, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroDog from "@/assets/hero-dog.png";
import { useState } from "react";

const regions = [
  "London",
  "North West",
  "South East",
  "West Midlands",
  "South West",
  "Wales",
  "Scotland",
  "Yorks And The Humber",
  "Eastern",
  "East Midlands",
  "North East",
  "Northern Ireland",
];

const HeroSection = () => {
  const [location, setLocation] = useState("");

  const handleRegionClick = (region: string) => {
    setLocation(region);
  };

  return (
    <section className="relative min-h-[70vh] pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <img
            src={heroDog}
            alt="Professional veterinary care"
            className="w-full h-full object-cover opacity-60"
            style={{ objectPosition: 'center center' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      </div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-slow -z-10" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-secondary/15 rounded-full blur-[80px] animate-pulse-slow -z-10" style={{ animationDelay: "2s" }} />

      <div className="container relative mx-auto px-4 lg:px-8 pt-20 lg:pt-32">
        <div className="max-w-3xl relative">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight animate-fade-up relative z-10">
            <span className="text-foreground">We connect</span>
            <br />
            <span className="text-foreground">veterinary teams</span>
            <br />
            <span className="text-foreground">with the best talent,</span>
            <br />
            <span className="gradient-text italic">Nationwide</span>
            <span className="text-foreground">.</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl animate-fade-up-delay-1 relative z-10">
            Your next opportunity, guided by local insight and global expertise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-up-delay-2 relative z-10">
            <Button variant="hero" size="lg" asChild>
              <Link to="/candidates">JOB SEEKERS</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/employers">EMPLOYERS</Link>
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <div className="mt-20 lg:mt-32 w-full max-w-[1400px] mx-auto animate-fade-up-delay-3 relative z-10">
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                  onClick={() => handleRegionClick(region)}
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
