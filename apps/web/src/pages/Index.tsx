import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LatestRoles from "@/components/LatestRoles";
import StatsSection from "@/components/StatsSection";
import DualPathway from "@/components/DualPathway";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <LatestRoles />
        <StatsSection />
        <DualPathway />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
