import { type CSSProperties, useRef, useEffect, useState } from "react";
import { cn } from "../utils/cn";

interface PhotoGalleryProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * Interactive photo gallery with hover effects and smooth transitions.
 * Features mouse-tracking perspective tilt and subtle animations.
 */
export function PhotoGallery({ className = "", style }: PhotoGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    const handleLeave = () => {
      setMousePos({ x: 50, y: 50 });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const photos = [
    { src: "/src/assets/bhavin-photo.webp", alt: "Bhavin at work", caption: "Building robots & code" },
    { src: "/src/assets/robot-line.webp", alt: "Line-following robot", caption: "Autonomous navigation" },
    { src: "/src/assets/robot-obstacle.webp", alt: "Obstacle-avoiding robot", caption: "Smart sensor fusion" },
    { src: "/src/assets/robot-light.webp", alt: "Light-tracking robot", caption: "Phototropic behavior" },
    { src: "/src/assets/robot-spy.webp", alt: "Remote surveillance robot", caption: "Teleoperated exploration" },
  ];

  return (
    <div
      ref={galleryRef}
      className={cn("relative", className)}
      style={style}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-crimson/10 via-transparent to-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {photos.map((photo, i) => (
          <figure
            key={photo.alt}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-smoke transition-all duration-500 hover:border-crimson-bright/50 hover:shadow-[0_20px_60px_-12px_rgba(255,42,52,0.25)]"
            style={{
              transform: `perspective(1000px) rotateX(${(mousePos.y - 50) * 0.08}deg) rotateY(${(50 - mousePos.x) * 0.08}deg)`,
              transition: "transform 0.1s linear",
            } as CSSProperties}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
            />

            <figcaption className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="micro text-white uppercase tracking-[0.15em]">{photo.caption}</p>
            </figcaption>

            {/* Corner accents */}
            <div className="absolute inset-0 pointer-events-none">
              {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((c, ci) => (
                <span
                  key={`${i}-${ci}`}
                  className={cn("absolute h-6 w-6 border-white/30 transition-all duration-300 group-hover:border-crimson-bright group-hover:scale-150", c)}
                />
              ))}
            </div>
          </figure>
        ))}
      </div>

      <style jsx>{`
        @keyframes gallery-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(0.5deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-4px) rotate(-0.3deg); }
        }
      `}</style>
    </div>
  );
}

/**
 * Full-width hero image with parallax and subtle interactions
 */
export function HeroImage({
  src,
  alt,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    const handleLeave = () => {
      setMousePos({ x: 50, y: 50 });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={style}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-all duration-1000 ease-out"
        style={{
          transform: `scale(1.05) translate(${(mousePos.x - 50) * 0.3}px, ${(mousePos.y - 50) * 0.3}px)`,
        } as CSSProperties}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,6,6,0.4)_100%)]"
        style={{
          opacity: 0.5 + (mousePos.y - 50) * 0.002,
        } as CSSProperties}
      />
    </div>
  );
}

/**
 * Floating photo card - for adding extra visual interest
 */
export function FloatingPhotoCard({
  src,
  alt,
  caption,
  delay = 0,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  caption: string;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <figure
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-smoke float-gentle",
        className
      )}
      style={{
        ...style,
        animationDelay: `${delay}s`,
      } as CSSProperties}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      <figcaption className="absolute bottom-0 left-0 right-0 p-4">
        <p className="micro text-white/90 uppercase tracking-[0.1em]">{caption}</p>
      </figcaption>
    </figure>
  );
}