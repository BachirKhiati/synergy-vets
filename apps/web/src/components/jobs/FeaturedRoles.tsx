import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const featuredRoles = [
  "Veterinary Surgeon job – Berkshire (Multi-Site Role)",
  "Independent practice in Hampshire has Locum RVN job",
  "PDSA Locum Vet work in Hampshire",
  "Head Nurse Vacancy – Southampton",
  "Ongoing Locum Vet vacancy in West London from 22nd Dec",
  "Locum Veterinary Surgeon job – SW London – Start ASAP",
  "Practice in Cheshire has a Vet Surgeon Vacancy for an Advanced Practitioner in Dermatology",
  "PDSA in South East London has ongoing Locum Vet job starting ASAP",
  "Permanent RVN vacancy in Hampshire",
  "Ongoing locum Vet job in South London",
];

const FeaturedRoles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.ceil(featuredRoles.length / itemsPerPage) - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleRoles = featuredRoles.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="py-12 lg:py-16 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Featured <span className="gradient-text">Roles</span>
          </h2>
          <div className="flex gap-2">
            <Button
              variant="heroOutline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="heroOutline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {visibleRoles.map((role, index) => (
            <div
              key={index}
              className="card-gradient p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_hsl(3,90%,68%,0.1)] cursor-pointer group"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {role}
              </h3>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoles;
