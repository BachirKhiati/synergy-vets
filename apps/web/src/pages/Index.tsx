import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LatestRoles from "@/components/LatestRoles";
import StatsSection from "@/components/StatsSection";
import GlobalReach from "@/components/GlobalReach";
import DualPathway from "@/components/DualPathway";
import Footer from "@/components/Footer";
import TalentSpotlight, { SpotlightItem } from "@/components/jobs/TalentSpotlight";

const homeSpotlightItems: SpotlightItem[] = [
  {
    title: "Dedicated consultants by your side",
    description:
      "From day-one mentoring to offer negotiations, our specialists guide candidates through every decision with clarity and care.",
    secondaryText:
      "We blend data-driven insights with real clinical experience so you feel confident about every career step.",
    primaryCta: { label: "Meet the team", to: "/about" },
    secondaryCta: { label: "Start your journey", to: "/contact" },
  },
  {
    title: "Hiring programmes tailored to your practice",
    description:
      "We partner with hospitals and clinics to design sustainable workforce plans that prioritise patient outcomes.",
    secondaryText:
      "Whether you need local locums or global relocations, our recruiters activate talent pipelines that fit your culture.",
    primaryCta: { label: "Explore employer services", to: "/employers" },
    secondaryCta: { label: "Book a consultation", to: "/contact" },
  },
  {
    title: "Global reach, community focus",
    description:
      "We place veterinary professionals in 20+ countries while nurturing long-term relationships with local teams.",
    secondaryText:
      "Our mission is to elevate animal care through purposeful connections between people, clinics, and communities.",
    primaryCta: { label: "Discover our impact", to: "/about#impact" },
  },
  {
    title: "Comprehensive career support",
    description:
      "We provide ongoing guidance throughout your veterinary career journey, from initial placement to long-term development.",
    secondaryText:
      "Access exclusive resources, professional development opportunities, and a network of veterinary professionals worldwide.",
    primaryCta: { label: "Explore resources", to: "/candidates" },
    secondaryCta: { label: "Get in touch", to: "/contact" },
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <LatestRoles />
        <StatsSection />
        <GlobalReach />
        <DualPathway />
        <TalentSpotlight items={homeSpotlightItems} sectionClassName="bg-card" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
