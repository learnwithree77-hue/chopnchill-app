import { marqueeWords } from "@/data/restaurantData";

export function Marquee() {
  const strip = [...marqueeWords, ...marqueeWords];
  return (
    <div className="border-y-4 border-foreground bg-primary py-3 overflow-hidden">
      <div className="flex w-max animate-chop-marquee gap-8 whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-8">
            {strip.map((w, i) => (
              <span
                key={`${k}-${i}`}
                className="font-display text-2xl md:text-4xl tracking-wide text-primary-foreground"
              >
                {w} <span className="text-accent">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
