import { useMemo } from "react";

const GlobalReach = () => {
  return (
    <section className="relative bg-gradient-to-b from-card via-background to-card overflow-hidden">
      {/* Background Image - Dog */}
      <div 
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80")',
          backgroundPosition: 'right center',
          backgroundSize: '40%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">Our reach locally</h2>
              <p className="text-lg font-bold tracking-wide uppercase text-foreground/90 mb-6">
                WHETHER YOU'RE STAYING CLOSE TO HOME OR LOOKING FURTHER AFIELD.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team of global veterinary recruiters are all experts with deep networks in their local markets. Whether you’re exploring opportunities right on your doorstep or considering an international move, we ensure you receive the same trusted service — grounded in local knowledge and backed by global reach.
              </p>
            </div>

            {/* Inner Row - Stats & Map */}
            <div className="grid sm:grid-cols-2 gap-8 items-end pt-8 border-t border-border">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-foreground/90">Successful appointments</h4>
                <div className="flex flex-col">
                  <span className="text-6xl font-bold gradient-text leading-none">2,500</span>
                  <span className="text-lg text-muted-foreground mt-2">in the United Kingdom</span>
                </div>
              </div>
              
              <div className="relative h-40 w-full max-w-[200px]">
                 <svg viewBox="0 0 300 500" className="w-full h-full opacity-60 text-foreground" fill="currentColor">
                   {/* Main Great Britain island */}
                   <path d="M150 50 L170 55 L185 65 L195 80 L200 100 L205 120 L210 145 L215 170 L220 195 L222 220 L220 245 L215 270 L210 295 L205 320 L200 340 L190 360 L180 375 L170 385 L160 392 L150 395 L140 397 L130 398 L120 397 L110 395 L100 390 L90 383 L82 375 L75 365 L68 350 L62 335 L58 320 L55 305 L52 290 L50 275 L48 260 L46 245 L45 230 L44 215 L43 200 L42 185 L42 170 L43 155 L45 140 L48 125 L52 110 L58 95 L65 82 L75 70 L85 62 L95 56 L105 52 L115 50 L125 49 L135 49 Z"/>
                   {/* Northern Ireland */}
                   <ellipse cx="50" cy="140" rx="18" ry="25"/>
                   {/* Scottish islands */}
                   <ellipse cx="120" cy="35" rx="10" ry="8"/>
                   <ellipse cx="140" cy="28" rx="8" ry="6"/>
                   <circle cx="165" cy="40" r="5"/>
                 </svg>
              </div>
            </div>
          </div>

          {/* Right Column - Empty to show background image */}
          <div className="hidden lg:block h-full min-h-[400px]">
            {/* The background image covers this area */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
