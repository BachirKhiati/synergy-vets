import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type SpotlightCta = {
  label: string;
  to: string;
};

export type SpotlightItem = {
  title: string;
  description: string;
  secondaryText?: string;
  primaryCta?: SpotlightCta;
  secondaryCta?: SpotlightCta;
};

const defaultSpotlightContent: SpotlightItem[] = [
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
  // Dogs
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80",
  
  // Cats
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1573865526739-10c1dd7aa059?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=900&q=80",
  
  // Veterinary scenes
  "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1598875184988-5e67b1a8e4b8?auto=format&fit=crop&w=900&q=80",
];

const maskSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="none">
    <defs>
      <mask id="spotlight-mask" maskUnits="userSpaceOnUse">
        <rect width="400" height="400" fill="black" />
        <circle cx="200" cy="200" r="190" fill="white" />
        <path d="M400 60 L400 400 L250 400 Z" fill="black" />
      </mask>
    </defs>
    <rect width="400" height="400" fill="white" mask="url(#spotlight-mask)" />
  </svg>
`);

type TalentSpotlightProps = {
  items?: SpotlightItem[];
  imagePool?: string[];
  sectionClassName?: string;
};

const TalentSpotlight = ({
  items = defaultSpotlightContent,
  imagePool = imageSources,
  sectionClassName,
}: TalentSpotlightProps) => {
  const selectedImages = useMemo(() => {
    const available = imagePool.length > 0 ? imagePool : imageSources;
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    // Ensure we have enough unique images for each item
    const uniqueImages = Array.from(new Set(shuffled));
    const result = [];
    for (let i = 0; i < items.length; i++) {
      result.push(uniqueImages[i % uniqueImages.length]);
    }
    return result;
  }, [imagePool, items.length]);

  return (
    <section className={`py-12 lg:py-16 bg-gradient-to-b from-background via-card to-background ${sectionClassName ?? ""}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">
          {items.map((item, index) => {
            const image = selectedImages[index % selectedImages.length];
            return (
              <SpotlightCard
                key={item.title}
                item={item}
                index={index}
                initialImage={image}
                imageOptions={selectedImages}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

type SpotlightCardProps = {
  item: SpotlightItem;
  index: number;
  initialImage: string;
  imageOptions: string[];
};

const SpotlightCard = ({ item, index, initialImage, imageOptions }: SpotlightCardProps) => {
  const candidates = useMemo(() => {
    const unique = new Set<string>();
    unique.add(initialImage);
    imageOptions.forEach((img) => unique.add(img));
    imageSources.forEach((img) => unique.add(img));
    return Array.from(unique);
  }, [initialImage, imageOptions]);

  const [candidateIndex, setCandidateIndex] = useState(0);
  const currentSrc = candidates[candidateIndex];

  const handleImageError = () => {
    console.warn("TalentSpotlight image failed", {
      attemptedUrl: currentSrc,
      cardIndex: index,
      title: item.title,
    });
    setCandidateIndex((prev) => (prev + 1 < candidates.length ? prev + 1 : prev));
  };

  return (
    <div className="relative items-stretch rounded-[40px] border border-border/50 overflow-hidden shadow-[0_20px_80px_rgba(17,17,17,0.25)] bg-background/40 min-h-[480px] flex flex-col justify-end">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 blur-[140px]" />
        <img
          src={currentSrc}
          alt="Veterinary professionals"
          className="h-full w-full object-cover"
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />

      <div className="relative z-[1] px-6 py-10 sm:px-10 lg:px-14 text-left">
        <h3 className="text-2xl lg:text-3xl font-bold text-white">{item.title}</h3>
        <p className="mt-4 text-base lg:text-lg text-white/90 max-w-xl">{item.description}</p>
        {item.secondaryText ? (
          <p className="mt-4 text-sm lg:text-base text-white/80 max-w-2xl">{item.secondaryText}</p>
        ) : null}
        {(item.primaryCta || item.secondaryCta) && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
            {item.primaryCta ? (
              <Button variant="hero" size="lg" asChild>
                <Link to={item.primaryCta.to}>{item.primaryCta.label}</Link>
              </Button>
            ) : null}
            {item.secondaryCta ? (
              <Button variant="heroOutline" size="lg" asChild>
                <Link to={item.secondaryCta.to}>{item.secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentSpotlight;
