import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const spotlightContent = [
  {
    title: "Looking for a new adventure?",
    description:
      "Connecting you to roles across the globe with consultants who understand the realities of veterinary life.",
    secondaryText:
      "Our candidate experience combines one-to-one coaching with insight-led job matching so every move feels intentional.",
    primaryCta: { label: "Job Seekers", to: "/candidates" },
    secondaryCta: { label: "Upload CV", to: "/contact" },
  },
  {
    title: "Looking for the best veterinary talent?",
    description:
      "Tap into a curated network of clinicians, leaders, and locums ready to elevate patient care in your practice.",
    secondaryText:
      "From strategic workforce planning to onboarding, we stay close so your team can stay focused on animals and clients.",
    primaryCta: { label: "Employers", to: "/employers" },
    secondaryCta: { label: "Register a Vacancy", to: "/contact" },
  },
];

const imageSources = [
  "https://images.unsplash.com/photo-1628009368231-5b94cec3c8ef?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1620332378576-26f9244e5a16?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1525151498231-bc059cfafa1f?auto=format&fit=crop&w=700&q=80",
];

const TalentSpotlight = () => {
  const selectedImages = useMemo(() => {
    const shuffled = [...imageSources].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, spotlightContent.length);
  }, []);

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-background via-card to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:gap-16">
          {spotlightContent.map((item, index) => {
            const image = selectedImages[index % selectedImages.length];
            return (
              <div
                key={item.title}
                className="relative grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] items-center card-gradient rounded-3xl border border-border/60 px-6 py-8 lg:px-10 lg:py-12 shadow-[0_20px_80px_rgba(17,17,17,0.25)] overflow-hidden"
              >
                <div className="relative mx-auto lg:mx-0 w-56 h-56 sm:w-64 sm:h-64">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-80 blur-3xl" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background/70 shadow-[0_12px_40px_rgba(17,17,17,0.35)]">
                    <img
                      src={image}
                      alt="Veterinary professionals"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/10 via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-2 ring-inset ring-border/50" />
                  </div>
                </div>

                <div className="relative text-center lg:text-left">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground text-base lg:text-lg max-w-xl">
                    {item.description}
                  </p>
                  <p className="mt-3 text-sm lg:text-base text-muted-foreground/80 max-w-2xl">
                    {item.secondaryText}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
                    <Button variant="hero" size="lg" asChild>
                      <Link to={item.primaryCta.to}>{item.primaryCta.label}</Link>
                    </Button>
                    <Button variant="heroOutline" size="lg" asChild>
                      <Link to={item.secondaryCta.to}>{item.secondaryCta.label}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TalentSpotlight;
