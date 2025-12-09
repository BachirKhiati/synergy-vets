import { Users, Globe, Building2, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "15,000+",
    label: "Candidates Placed",
    description: "Trusted by veterinary professionals worldwide",
  },
  {
    icon: Globe,
    value: "45+",
    label: "Countries",
    description: "Global reach across all continents",
  },
  {
    icon: Building2,
    value: "2,500+",
    label: "Partner Practices",
    description: "From local clinics to hospital groups",
  },
  {
    icon: Award,
    value: "98%",
    label: "Satisfaction Rate",
    description: "Industry-leading candidate experience",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Trusted by <span className="gradient-text">the best</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Connecting veterinary talent with opportunity for over a decade
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl card-gradient border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_hsl(3,90%,68%,0.1)]"
            >
              <div className="mx-auto w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-foreground mb-2">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
