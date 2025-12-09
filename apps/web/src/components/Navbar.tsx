import { Menu, X, Upload, Building } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-lg group-hover:shadow-[0_0_30px_hsl(3,90%,68%,0.4)] transition-shadow duration-300">
              <span className="text-primary-foreground font-bold text-lg">SV</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-foreground">Synergy</span>
              <span className="text-xl font-bold gradient-text">Vets</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink
              to="/jobs"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              activeClassName="text-foreground"
            >
              Find Jobs
            </NavLink>
            <NavLink
              to="/candidates"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              activeClassName="text-foreground"
            >
              For Candidates
            </NavLink>
            <NavLink
              to="/employers"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              activeClassName="text-foreground"
            >
              For Employers
            </NavLink>
            <NavLink
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              activeClassName="text-foreground"
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              activeClassName="text-foreground"
            >
              Contact
            </NavLink>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="hero" size="default" asChild>
              <Link to="/candidates">
                <Upload className="w-4 h-4" />
                Upload CV
              </Link>
            </Button>
            <Button variant="heroOutline" size="default" asChild>
              <Link to="/employers">
                <Building className="w-4 h-4" />
                Register Vacancy
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-up">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/jobs"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                activeClassName="text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Jobs
              </NavLink>
              <NavLink
                to="/candidates"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                activeClassName="text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                For Candidates
              </NavLink>
              <NavLink
                to="/employers"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                activeClassName="text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                For Employers
              </NavLink>
              <NavLink
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                activeClassName="text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                activeClassName="text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
              <div className="flex flex-col gap-3 pt-4">
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/candidates" onClick={() => setIsMenuOpen(false)}>
                    <Upload className="w-4 h-4" />
                    Upload CV
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" className="w-full" asChild>
                  <Link to="/employers" onClick={() => setIsMenuOpen(false)}>
                    <Building className="w-4 h-4" />
                    Register Vacancy
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
