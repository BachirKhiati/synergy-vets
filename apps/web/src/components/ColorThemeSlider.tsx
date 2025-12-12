import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

// Base hue values for brand colors
const BASE_HUES = {
  primary: 3,    // Coral
  accent: 320,   // Magenta
  secondary: 280, // Purple
  ring: 3,
  sidebarPrimary: 3,
  sidebarRing: 3,
};

// Saturation and lightness values (kept constant)
const COLOR_PROPS = {
  primary: { s: 90, l: 68 },
  accent: { s: 70, l: 60 },
  secondary: { s: 60, l: 55 },
};

const ColorThemeSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hueOffset, setHueOffset] = useState(() => {
    const saved = localStorage.getItem("theme-hue-offset");
    return saved ? parseInt(saved, 10) : 0;
  });

  const updateColors = (offset: number) => {
    const root = document.documentElement;

    // Update primary color
    const primaryHue = (BASE_HUES.primary + offset) % 360;
    root.style.setProperty("--primary", `${primaryHue} ${COLOR_PROPS.primary.s}% ${COLOR_PROPS.primary.l}%`);
    root.style.setProperty("--ring", `${primaryHue} ${COLOR_PROPS.primary.s}% ${COLOR_PROPS.primary.l}%`);
    root.style.setProperty("--sidebar-primary", `${primaryHue} ${COLOR_PROPS.primary.s}% ${COLOR_PROPS.primary.l}%`);
    root.style.setProperty("--sidebar-ring", `${primaryHue} ${COLOR_PROPS.primary.s}% ${COLOR_PROPS.primary.l}%`);

    // Update accent color
    const accentHue = (BASE_HUES.accent + offset) % 360;
    root.style.setProperty("--accent", `${accentHue} ${COLOR_PROPS.accent.s}% ${COLOR_PROPS.accent.l}%`);

    // Update secondary color
    const secondaryHue = (BASE_HUES.secondary + offset) % 360;
    root.style.setProperty("--secondary", `${secondaryHue} ${COLOR_PROPS.secondary.s}% ${COLOR_PROPS.secondary.l}%`);

    // Update gradient
    root.style.setProperty(
      "--gradient-primary",
      `linear-gradient(135deg, hsl(${primaryHue}, 90%, 68%) 0%, hsl(${accentHue}, 70%, 60%) 50%, hsl(${secondaryHue}, 60%, 55%) 100%)`
    );

    // Update glow gradient
    root.style.setProperty(
      "--gradient-glow",
      `radial-gradient(ellipse at center, hsl(${primaryHue}, 90%, 68%, 0.15) 0%, transparent 70%)`
    );

    // Update shadows
    root.style.setProperty("--shadow-glow", `0 0 60px hsl(${primaryHue}, 90%, 68%, 0.3)`);
    root.style.setProperty("--shadow-button", `0 4px 20px hsl(${primaryHue}, 90%, 68%, 0.4)`);
  };

  useEffect(() => {
    updateColors(hueOffset);
  }, [hueOffset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOffset = parseInt(e.target.value, 10);
    setHueOffset(newOffset);
    localStorage.setItem("theme-hue-offset", String(newOffset));
  };

  const handleReset = () => {
    setHueOffset(0);
    localStorage.setItem("theme-hue-offset", "0");
  };

  // Preview colors for the current offset
  const previewPrimary = `hsl(${(BASE_HUES.primary + hueOffset) % 360}, 90%, 68%)`;
  const previewAccent = `hsl(${(BASE_HUES.accent + hueOffset) % 360}, 70%, 60%)`;
  const previewSecondary = `hsl(${(BASE_HUES.secondary + hueOffset) % 360}, 60%, 55%)`;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-muted transition-colors"
        title="Theme Colors"
      >
        <Palette className="w-5 h-5 text-muted-foreground hover:text-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 p-4 bg-card border border-border rounded-xl shadow-lg min-w-[280px] z-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Theme Colors</span>
            <button
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Color preview */}
          <div className="flex gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: previewPrimary }}
              title="Primary"
            />
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: previewAccent }}
              title="Accent"
            />
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: previewSecondary }}
              title="Secondary"
            />
            <div
              className="flex-1 h-8 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${previewPrimary}, ${previewAccent}, ${previewSecondary})`,
              }}
              title="Gradient"
            />
          </div>

          {/* Hue slider */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Hue Shift: {hueOffset}°</label>
            <input
              type="range"
              min="0"
              max="359"
              value={hueOffset}
              onChange={handleChange}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right,
                  hsl(0, 80%, 60%),
                  hsl(60, 80%, 60%),
                  hsl(120, 80%, 60%),
                  hsl(180, 80%, 60%),
                  hsl(240, 80%, 60%),
                  hsl(300, 80%, 60%),
                  hsl(360, 80%, 60%)
                )`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorThemeSlider;
