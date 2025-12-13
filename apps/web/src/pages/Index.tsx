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
    title: "Veterinary Recruitment Specialist",
    description:
      "SynergyVets is a dedicated Veterinary Recruitment Agency, with almost 30 years' collective experience supporting the Veterinary profession with locum and permanent personnel.",
    secondaryText:
      "We have developed tried and trusted relationships with an extensive network of Veterinary Practices throughout the UK, which enables us to offer an up-to-date online lists of Permanent/Locum Vet and Nurse roles.",
    primaryCta: { label: "Meet the team", to: "/about" },
    secondaryCta: { label: "Start your journey", to: "/contact" },
  },
  {
    title: "Client or Candidate",
    description:
      "All our clients and candidates are treated with the respect they deserve. We are well-aware that our reputation depends entirely on providing the best possible service.",
    secondaryText:
      "Whether we are searching out appropriate jobs, minimising admin through our payroll system or offering advice to practices that have recruitment needs, we offer services tailored specifically to your requirements.",
    primaryCta: { label: "Explore employer services", to: "/employers" },
    secondaryCta: { label: "Book a consultation", to: "/contact" },
  },
  {
    title: "A Transparent Service",
    description:
      "Part of our appeal lies in the fact that our Recruitment services are entirely transparent. With no hidden charges or unexpected surprises to worry about.",
    secondaryText:
      "We provide a seamless bridge between those offering work and those seeking it. Whether you require a Permanent or Locum position, we have a range of options designed to make employment as simple as possible.",
    primaryCta: { label: "Discover our impact", to: "/about#impact" },
  },
  {
    title: "Comprehensive career support",
    description:
      "Because we have forged strong links with practices across the UK, we are able to suggest Veterinary positions in all areas of the Country.",
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
