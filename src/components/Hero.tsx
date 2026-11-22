import { useEffect, useRef, type CSSProperties, useState } from "react";
import { ArrowRight, MapPin, Plus, Sparkles, Zap, Cpu, Bot } from "lucide-react";
import cutout from "../assets/bhavin-cutout.png";
import { stats } from "../data";
import { CountUp } from "./Reveal";
import { InfiniteIconCSS } from "./InfiniteIcon";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Floating ambient particles
function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 4,
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-crimson-bright/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float-particle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          } as CSSProperties}
        />
      ))}
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.15; }
          25% { transform: translate3d(20px, -30px, 0) scale(1.2); opacity: 0.3; }
          50% { transform: translate3d(-15px, -50px, 0) scale(0.8); opacity: 0.2; }
          75% { transform: translate3d(25px, -20px, 0) scale(1.1); opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}

// Interactive tech icons that float around the portrait
function TechOrbit() {
  const techIcons = [
    { icon: Cpu, color: "#ff2a34", label: "C++" },
    { icon: Bot, color: "#2ad9ff", label: "Robotics" },
    { icon: Zap, color: "#ffd72a", label: "Arduino" },
    { icon: Sparkles, color: "#2aff5e", label: "AI" },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-5">
      {techIcons.map(({ icon: Icon, color, label }, i) => (
        <div
          key={label}
          className="absolute tech-orbit-item"
          style={{
            animation: `orbit ${12 + i * 2}s linear infinite`,
            animationDelay: `${i * 3}s`,
          } as CSSProperties}
        >
          <div
            className="tech-badge group"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}10)`,
              borderColor: `${color}60`,
            } as CSSProperties}
          >
            <Icon className="h-4 w-4" style={{ color }} />
            <span className="tech-label">{label}</span>
          </div>
          <style jsx>{`
            @keyframes orbit {
              0% { transform: rotate(0deg) translateX(180px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
            }
            .tech-badge {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 6px 10px;
              border-radius: 999px;
              border: 1px solid;
              backdrop-filter: blur(8px);
              background: rgba(6, 6, 6, 0.6);
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
              transform: rotate(calc(var(--rotation, 0deg) * -1));
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .tech-badge:hover {
              transform: scale(1.15) rotate(calc(var(--rotation, 0deg) * -1));
              box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 24px currentColor;
            }
            .tech-label {
              font-size: 0.55rem;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              white-space: nowrap;
              opacity: 0;
              transform: translateX(-100%);
              transition: opacity 0.2s ease, transform 0.2s ease;
            }
            .tech-badge:hover .tech-label {
              opacity: 1;
              transform: translateX(0);
            }
            .group:hover .tech-label {
              opacity: 1;
              transform: translateX(0);
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}

// Mouse-following glow effect on portrait
function PortraitGlow() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };
    const handleLeave = () => {
      setMousePos({ x: 50, y: 50 });
    };

    const el = ref.current;
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
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, rgba(255, 42, 52, 0.15) 0%, transparent 60%)`,
        transition: "background 0.3s ease-out",
      } as CSSProperties}
    />
  );
}

/**
 * Giant condensed “PORTFOLIO” wordmark. Rendered as SVG so it always spans the
 * full container width, whatever the screen size, with a crimson → ember fade.
 * Anton’s natural width is 3.826em → font-size 261.4 fills a 1000-unit box.
 */
function Wordmark() {
  return (
    <svg
      viewBox="0 0 1000 392"
      className="block h-auto w-full"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <defs>
        <linearGradient id="wordmark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.2" stopColor="#f5202a" />
          <stop offset="0.5" stopColor="#c6101a" />
          <stop offset="0.78" stopColor="#62070d" />
          <stop offset="0.92" stopColor="#350306" />
        </linearGradient>
      </defs>
      <text
        transform="translate(0 385) scale(1 1.7)"
        x="0"
        y="0"
        fontFamily="Anton, Impact, 'Arial Narrow', sans-serif"
        fontSize="261.4"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        fill="url(#wordmark-fill)"
      >
        PORTFOLIO
      </text>
    </svg>
  );
}

export default function Hero() {
  const lettersRef = useRef<HTMLDivElement>(null);
  const personRef = useRef<HTMLDivElement>(null);

  // subtle scroll parallax: the wordmark drifts slower than the portrait
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 1200);
      if (lettersRef.current) lettersRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
      if (personRef.current) personRef.current.style.transform = `translate3d(0, ${y * 0.05}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" className="relative isolate overflow-hidden bg-ink">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div className="absolute left-[34%] top-[4%] h-[92%] w-[72%] bg-[radial-gradient(closest-side,rgba(224,19,28,0.34),rgba(120,9,16,0.12)_55%,transparent)]" />
        <div className="absolute -left-[10%] bottom-0 h-1/2 w-1/2 bg-[radial-gradient(closest-side,rgba(120,9,16,0.25),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* Floating ambient particles */}
      <FloatingParticles />

      {/* Tech orbit around portrait */}
      <TechOrbit />

      <div className="relative mx-auto flex max-w-[1600px] flex-col px-5 pb-10 pt-20 sm:px-8 md:grid md:grid-cols-2 lg:block lg:min-h-[max(820px,100svh)] lg:px-12 lg:pb-0 lg:pt-0">
        {/* 1 — wordmark */}
        <div className="intro-wipe relative z-0 md:col-span-2 lg:absolute lg:inset-x-12 lg:top-[88px]" style={delay(100)}>
          <div ref={lettersRef} className="will-change-transform">
            <div className="relative [mask-image:linear-gradient(to_bottom,#000_50%,rgba(0,0,0,0.55)_78%,transparent_99%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_50%,rgba(0,0,0,0.55)_78%,transparent_99%)]">
              <Wordmark />
            </div>
          </div>
        </div>

        {/* 2 — portrait with interactive glow and orbiting tech badges */}
        <div
          className="intro-rise pointer-events-none relative z-10 mx-auto -mt-[7vw] w-[76%] max-w-[390px] md:col-start-2 md:row-start-2 md:mt-[-9vw] md:w-full md:max-w-[420px] hero-person lg:absolute lg:bottom-0 lg:left-[47%] lg:mx-0 lg:mt-0 lg:max-w-none"
          style={delay(450)}
        >
          <div ref={personRef} className="relative will-change-transform">
            <div
              className="relative [mask-image:linear-gradient(to_bottom,#000_72%,transparent_100%)] lg:[mask-image:none]"
            >
              {/* Mouse-following glow */}
              <PortraitGlow />
              <img
                src={cutout}
                alt="Bhavin Jha sitting in a black jacket, white shirt and blue jeans"
                width={1197}
                height={1314}
                decoding="async"
                fetchPriority="high"
                className="block h-auto w-full select-none [filter:contrast(1.1)_saturate(0.82)_brightness(0.95)_drop-shadow(0_24px_40px_rgba(0,0,0,0.55))]"
              />
              {/* crimson grade, masked to the silhouette so the blue jacket sits in the palette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 mix-blend-soft-light"
                style={{
                  WebkitMaskImage: `url(${cutout})`,
                  maskImage: `url(${cutout})`,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  background:
                    "linear-gradient(155deg, rgba(255,48,58,0.85) 0%, rgba(150,10,20,0.6) 50%, rgba(20,0,2,0.35) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* 3 — intro copy */}
        <div className="relative z-20 -mt-14 md:col-start-1 md:row-start-2 md:mt-0 md:self-end md:pb-6 lg:absolute lg:bottom-14 lg:left-12 lg:w-[42%] lg:pb-0">
          <h1 className="leading-none">
            <span className="line-mask">
              <span
                className="line-up font-script text-[2.9rem] leading-[1.1] text-white sm:text-6xl lg:text-[4.4rem]"
                style={delay(700)}
              >
                <span className="inline-block -rotate-3 [text-shadow:0_2px_24px_rgba(0,0,0,0.8)]">Hello, I’m</span>
              </span>
            </span>
            <span className="line-mask -mt-1 lg:-mt-2">
              <span
                className="line-up font-display text-[clamp(4.5rem,21vw,8.5rem)] uppercase leading-[0.9] tracking-[0.005em] text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.65)] md:text-[clamp(4.25rem,10.4vw,7rem)] lg:text-[clamp(4.5rem,8.2vw,8.75rem)]"
                style={delay(780)}
              >
                Bhavin
              </span>
            </span>
            <span className="line-mask">
              <span
                className="line-up font-display text-[clamp(4.5rem,21vw,8.5rem)] uppercase leading-[0.9] tracking-[0.005em] text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.65)] md:text-[clamp(4.25rem,10.4vw,7rem)] lg:text-[clamp(4.5rem,8.2vw,8.75rem)]"
                style={delay(900)}
              >
                Jha
              </span>
            </span>
          </h1>

          <div className="intro-rise" style={delay(1050)}>
            <p className="mt-5 text-[0.78rem] font-bold uppercase leading-[1.55] tracking-[0.17em] text-crimson-bright">
              Young Programmer &amp;
              <br />
              Robotics Enthusiast
            </p>
            <p className="mt-4 max-w-[34rem] text-[0.94rem] leading-7 text-white/60">
              A passionate Class 8th student from Bihar, India, exploring the exciting worlds of
              programming, robotics and technology. Building the future, one project at a time.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="micro group inline-flex items-center gap-2 bg-crimson px-5 py-3.5 text-white transition-all duration-300 hover:bg-crimson-bright hover:shadow-[0_10px_40px_-8px_rgba(255,42,52,0.7)]"
              >
                View projects
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="micro inline-flex items-center border border-white/25 px-5 py-3.5 text-white transition-colors duration-300 hover:border-crimson-bright hover:text-crimson-bright"
              >
                Get in touch
              </a>
            </div>

            <p className="micro mt-6 flex items-center gap-2.5 text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-crimson-bright" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson-bright" />
              </span>
              <MapPin className="h-3 w-3 text-crimson-bright" />
              Based in Katihar, Bihar
            </p>
          </div>
        </div>

        {/* 4 — floating tagline */}
        <div
          className="intro-fade absolute right-12 top-[41%] z-20 hidden max-w-[15rem] items-center gap-3 xl:flex"
          style={delay(1300)}
        >
          <span className="group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 bg-ink/40 backdrop-blur transition-colors hover:border-crimson-bright">
            <Plus className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
          </span>
          <p className="text-[0.74rem] leading-snug text-white/75">
            Turning curiosity into working robots &amp; code.
          </p>
        </div>

        {/* 5 — stats */}
        <ul
          className="intro-rise relative z-20 mt-10 grid grid-cols-3 gap-3 md:col-span-2 lg:absolute lg:bottom-14 lg:right-12 lg:mt-0 lg:flex lg:w-[min(17%,17rem)] lg:min-w-[11.5rem] lg:flex-col lg:gap-0"
          style={delay(1200)}
          aria-label="Quick stats"
        >
          {stats.map((s) => (
            <li
              key={s.label}
              className="border-l border-white/15 pl-4 lg:flex lg:items-center lg:gap-4 lg:border-b lg:border-l-0 lg:py-3.5 lg:pl-0 lg:first:border-t"
            >
              <span className="block font-display text-[2.4rem] leading-none text-crimson-bright lg:min-w-[4.5rem] lg:text-[3.1rem]">
                {s.to === null ? (
                  <>
                    <InfiniteIconCSS size="2.4rem" />
                    <span className="ml-1">∞</span>
                  </>
                ) : (
                  <CountUp to={s.to} suffix={s.suffix} />
                )}
              </span>
              <span className="micro mt-1.5 block max-w-[8rem] leading-[1.5] text-white/60 lg:mt-0">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
