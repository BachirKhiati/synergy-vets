import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border" id="about">
      {/* CTA Section */}
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to take the next step in your <span className="gradient-text">veterinary career</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of veterinary professionals who've found their perfect role through Synergy Vets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Stay in the loop</h3>
            <p className="text-muted-foreground mb-6">Get the latest jobs and career insights delivered to your inbox</p>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-muted border-border"
              />
              <Button variant="hero" className="h-12 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">SV</span>
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">Synergy</span>
                <span className="text-xl font-bold gradient-text">Vets</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Connecting veterinary teams with the best talent worldwide. Your next opportunity awaits.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Candidates</h4>
            <ul className="space-y-3">
              <li><Link to="/jobs" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Search Jobs</Link></li>
              <li><Link to="/candidates#journey" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Upload CV</Link></li>
              <li><Link to="/candidates#benefits" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Career Resources</Link></li>
              <li><Link to="/jobs" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Salary Guide</Link></li>
              <li><Link to="/candidates#stories" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Interview Tips</Link></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Employers</h4>
            <ul className="space-y-3">
              <li><Link to="/employers#cta" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Post a Vacancy</Link></li>
              <li><Link to="/employers#employer-benefits" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Talent Search</Link></li>
              <li><Link to="/employers#model" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Recruitment Solutions</Link></li>
              <li><Link to="/employers#metrics" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Employer Resources</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Partner With Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">01395 200 189</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">info@synergyvets.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">21A Rolle Street, Exmouth, Devon, EX8 1HA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Synergy Vets. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
