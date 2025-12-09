import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 lg:pt-32 lg:pb-28 bg-gradient-to-b from-card via-background to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center bg-card/80 backdrop-blur rounded-3xl border border-border px-6 py-12 lg:px-12 lg:py-16">
            <Badge variant="secondary" className="mb-4">Page not found</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
              We could not locate that page
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              The page {location.pathname} may have moved or no longer exists. Choose where you would like to go next.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/">
                  Return home
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/contact">
                  Contact support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
