import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Job } from "@/lib/jobsData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface JobsMapProps {
  jobs: Job[];
  selectedJob: Job | null;
  onJobSelect: (job: Job) => void;
}

const JobsMap = ({ jobs, selectedJob, onJobSelect }: JobsMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [tokenInput, setTokenInput] = useState("");

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [0, 30],
        zoom: 1.5,
        pitch: 20,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        "top-right"
      );

      map.current.on("load", () => {
        setIsMapInitialized(true);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
      localStorage.setItem("mapbox_token", tokenInput.trim());
      initializeMap(tokenInput.trim());
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("mapbox_token");
    if (savedToken) {
      setMapboxToken(savedToken);
      setTokenInput(savedToken);
      initializeMap(savedToken);
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update markers when jobs change
  useEffect(() => {
    if (!map.current || !isMapInitialized) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    jobs.forEach((job) => {
      const el = document.createElement("div");
      el.className = "job-marker";
      el.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform border-2 ${
          selectedJob?.id === job.id ? "border-white scale-125" : "border-transparent"
        }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `;

      el.addEventListener("click", () => {
        onJobSelect(job);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat(job.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
            <div class="p-3 max-w-[250px]">
              <h4 class="font-bold text-sm text-gray-900 line-clamp-2">${job.title}</h4>
              <p class="text-xs text-gray-600 mt-1">${job.location}</p>
              <div class="flex gap-2 mt-2">
                <span class="text-xs px-2 py-0.5 rounded-full ${
                  job.type === "Permanent" ? "bg-teal-100 text-teal-700" : "bg-pink-100 text-pink-700"
                }">${job.type}</span>
                <span class="text-xs text-gray-500">${job.salary}</span>
              </div>
            </div>
          `)
        )
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [jobs, isMapInitialized, selectedJob, onJobSelect]);

  // Fly to selected job
  useEffect(() => {
    if (map.current && selectedJob && isMapInitialized) {
      map.current.flyTo({
        center: selectedJob.coordinates,
        zoom: 8,
        duration: 1500,
      });
    }
  }, [selectedJob, isMapInitialized]);

  if (!mapboxToken) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-card rounded-2xl border border-border">
        <Key className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Mapbox Token Required
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
          To view the map, enter your Mapbox public token. Get one free at{" "}
          <a
            href="https://mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="pk.ey..."
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            className="bg-background/50"
          />
          <Button onClick={handleTokenSubmit} variant="hero">
            Connect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full rounded-2xl overflow-hidden border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 to-transparent" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 card-gradient rounded-lg p-3 border border-border">
        <p className="text-xs text-muted-foreground mb-2">Click markers to view jobs</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-xs text-foreground">Permanent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-xs text-foreground">Locum</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsMap;
