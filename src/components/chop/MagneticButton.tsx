import { useRef, useState, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "accent";
};

export function MagneticButton({ variant = "primary", className, children, ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <button
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setOffset({
          x: (e.clientX - (r.left + r.width / 2)) * 0.25,
          y: (e.clientY - (r.top + r.height / 2)) * 0.35,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-display text-lg tracking-wide uppercase transition-[background-color,color,box-shadow,transform] duration-200 active:scale-95 min-h-14",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-[0_0_40px_-8px_var(--primary)] hover:bg-accent hover:text-accent-foreground",
        variant === "accent" && "bg-accent text-accent-foreground hover:brightness-110",
        variant === "outline" &&
          "border-2 border-foreground/40 text-foreground hover:border-accent hover:text-accent",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
