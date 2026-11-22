import { useEffect, useRef, type CSSProperties, useState, useCallback } from "react";
import { ArrowRight, MapPin, Plus, Sparkles, Zap, Cpu, Bot, Code, Terminal, Github, Layers, Target, MousePointer } from "lucide-react";
import cutout from "../assets/bhavin-cutout.png";
import { stats } from "../data";
import { CountUp } from "./Reveal";
import { InfiniteIconCSS } from "./InfiniteIcon";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// ===== ENHANCED PARTICLE SYSTEM =====
function FloatingParticles() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 15,
    duration: 10 + Math.random() * 15,
    color: Math.random() > 0.6 ? "#ff2a34" : Math.random() > 0.3 ? "#2ad9ff" : "#b8ff2a",
    shape: Math.random() > 0.7 ? "square" : "circle",
    rotation: Math.random() * 360,
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: 0.35,
            borderRadius: p.shape === "square" ? "2px" : "50%",
            filter: `blur(${p.size * 0.4}px)`,
            transform: `rotate(${p.rotation}deg)`,
            animation: `float-particle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          } as CSSProperties}
        />
      ))}
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); opacity: 0.15; }
          15% { transform: translate3d(40px, -50px, 0) scale(1.4) rotate(90deg); opacity: 0.6; }
          30% { transform: translate3d(-30px, -70px, 0) scale(0.6) rotate(180deg); opacity: 0.25; }
          45% { transform: translate3d(50px, -20px, 0) scale(1.3) rotate(270deg); opacity: 0.5; }
          60% { transform: translate3d(-25px, -80px, 0) scale(0.8) rotate(360deg); opacity: 0.3; }
          75% { transform: translate3d(45px, -35px, 0) scale(1.5) rotate(450deg); opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}

// ===== INTERACTIVE MOUSE TRAIL =====
function MouseTrail() {
  const [trail, setTrail] = useState<Array<{x: number, y: number, id: number, life: number}>>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setTrail(prev => [
        { x: e.clientX, y: e.clientY, id: Date.now() + Math.random(), life: 1 },
        ...prev.slice(0, 12).map(t => ({ ...t, life: t.life - 0.08 }))
      ].filter(t => t.life > 0));
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20">
      {trail.map((t, i) => (
        <div
          key={t.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            width: `${8 - i * 0.4}px`,
            height: `${8 - i * 0.4}px`,
            transform: "translate(-50%, -50%)",
            background: i < 4 ? "#ff2a34" : i < 8 ? "#2ad9ff" : "#b8ff2a",
            opacity: t.life * (1 - i * 0.06),
            filter: "blur(2px)",
            pointerEvents: "none",
            transition: "all 0.05s ease-out",
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

// ===== MAGNETIC BUTTON COMPONENT =====
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

function MagneticButton({ children, className = "", onClick, href, strength = 30 }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * (strength / 100), y: y * (strength / 100) });
  }, [strength]);

  const Component = href ? "a" : "button";
  const props = href ? { href, onClick } : { onClick };

  return (
    <Component
      ref={ref}
      {...props}
      className={`relative overflow-hidden magnetic-btn ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={() => { setOffset({ x: 0, y: 0 }); setIsHovering(false); }}
      onMouseEnter={() => setIsHovering(true)}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovering ? "transform 0.15s cubic-bezier(0.2, 0.7, 0.2, 1)" : "transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1)",
      } as CSSProperties}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-crimson/20 via-transparent to-cyan/20 opacity-0 transition-opacity duration-300" style={{ opacity: isHovering ? 1 : 0 }} />
      <div className="relative z-10">{children}</div>
      <style jsx>{`
        .magnetic-btn { will-change: transform; }
      `}</style>
    </Component>
  );
}

// ===== TYPING ANIMATION =====
function TypingText({ texts, speed = 80, deleteSpeed = 40, pause = 2000 }: { texts: string[]; speed?: number; deleteSpeed?: number; pause?: number }) {
  const [text, setText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentText.substring(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, deleteSpeed);
    } else {
      timeout = setTimeout(() => {
        setText(currentText.substring(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, speed);
    }

    if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, textIndex, isDeleting, texts, speed, deleteSpeed, pause]);

  return <span className="typing-text">{text}</span>;
}

// ===== SCROLL PROGRESS INDICATOR =====
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollTop / docHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-0.5 z-50 bg-gradient-to-r from-crimson via-cyan to-lime"
      style={{ width: `${progress * 100}%`, transformOrigin: "left center" }}
    />
  );
}

// ===== INTERACTIVE BACKGROUND GRID =====
function InteractiveGrid() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{
      backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
      backgroundPosition: `${mousePos.x * 0.5}px ${mousePos.y * 0.5}px`,
      transition: "background-position 0.1s linear",
    } as CSSProperties}>
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse 80% 60% at ${mousePos.x}% ${mousePos.y}%, rgba(255, 42, 52, 0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(42, 217, 255, 0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 50% 50%, rgba(184, 255, 42, 0.04) 0%, transparent 70%)`,
        transition: "background 0.2s ease-out",
      } as CSSProperties} />
    </div>
  );
}

// ===== PARALLAX LAYERS =====
function ParallaxLayers() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const layers = [
    { speed: -0.08, color: "rgba(255, 42, 52, 0.03)", height: "120%", top: "-10%" },
    { speed: -0.12, color: "rgba(42, 217, 255, 0.025)", height: "110%", top: "-5%" },
    { speed: -0.18, color: "rgba(184, 255, 42, 0.02)", height: "100%", top: "0%" },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {layers.map((layer, i) => (
        <div key={i} className="absolute inset-x-0" style={{
          top: layer.top,
          height: layer.height,
          background: `linear-gradient(180deg, ${layer.color} 0%, transparent 100%)`,
          transform: `translate3d(0, ${scrollY * layer.speed}px, 0)`,
          willChange: "transform",
        } as CSSProperties} />
      ))}
    </div>
  );
}

// ===== FLOATING GEOMETRIC SHAPES =====
function FloatingShapes() {
  const shapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 40,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 20,
    rotation: Math.random() * 360,
    type: Math.random() > 0.6 ? "triangle" : Math.random() > 0.3 ? "square" : "circle",
    color: Math.random() > 0.6 ? "rgba(255, 42, 52, 0.06)" : Math.random() > 0.3 ? "rgba(42, 217, 255, 0.05)" : "rgba(184, 255, 42, 0.05)",
    borderColor: Math.random() > 0.6 ? "rgba(255, 42, 52, 0.12)" : Math.random() > 0.3 ? "rgba(42, 217, 255, 0.1)" : "rgba(184, 255, 42, 0.1)",
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {shapes.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            background: s.color, border: `1px solid ${s.borderColor}`,
            borderRadius: s.type === "circle" ? "50%" : s.type === "square" ? "8px" : "0",
            clipPath: s.type === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
            transform: `rotate(${s.rotation}deg)`,
            animation: `float-shape ${s.duration}s ease-in-out infinite, rotate-shape ${30 + s.id * 5}s linear infinite`,
            animationDelay: `${s.delay}s`,
            transformOrigin: "center",
          } as CSSProperties}
        />
      ))}
      <style jsx>{`
        @keyframes float-shape { 0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); opacity: 0.3; } 25% { transform: translate3d(60px, -80px, 0) scale(1.2) rotate(90deg); opacity: 0.6; } 50% { transform: translate3d(-40px, -100px, 0) scale(0.8) rotate(180deg); opacity: 0.4; } 75% { transform: translate3d(70px, -30px, 0) scale(1.3) rotate(270deg); opacity: 0.5; } }
        @keyframes rotate-shape { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ===== RIPPLE CLICK EFFECT HOOK =====
function useRipple() {
  const [ripples, setRipples] = useState<Array<{x: number, y: number, id: number}>>([]);
  const triggerRipple = useCallback((x: number, y: number) => {
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  }, []);
  return { ripples, triggerRipple };
}

// ===== ENHANCED TECH ORBIT =====
function TechOrbit() {
  const techIcons = [
    { icon: Cpu, color: "#ff2a34", label: "C++", gradient: "linear-gradient(135deg, #ff2a34, #ff6b2a)", desc: "Systems & Embedded" },
    { icon: Bot, color: "#2ad9ff", label: "Robotics", gradient: "linear-gradient(135deg, #2ad9ff, #2a6bff)", desc: "Autonomous Systems" },
    { icon: Zap, color: "#ffd72a", label: "Arduino", gradient: "linear-gradient(135deg, #ffd72a, #b8ff2a)", desc: "Microcontrollers" },
    { icon: Sparkles, color: "#2aff5e", label: "AI", gradient: "linear-gradient(135deg, #2aff5e, #2ad9ff)", desc: "ML & Automation" },
    { icon: Code, color: "#a82aff", label: "Python", gradient: "linear-gradient(135deg, #a82aff, #d82aff)", desc: "Scripting & AI" },
    { icon: Terminal, color: "#2affb8", label: "Linux", gradient: "linear-gradient(135deg, #2affb8, #2ad9ff)", desc: "CLI & Servers" },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-5">
      {techIcons.map(({ icon: Icon, color, label, gradient, desc }, i) => (
        <div key={label} className="absolute tech-orbit-item" style={{ animation: `orbit ${16 + i * 1.5}s linear infinite`, animationDelay: `${i * 2.5}s` } as CSSProperties}>
          <div className="tech-badge group" style={{ background: `rgba(6, 6, 6, 0.8)`, borderColor: `${color}60` } as CSSProperties}>
            <div className="icon-wrapper" style={{ background: gradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}><Icon className="h-5 w-5" /></div>
            <div className="badge-content"><span className="tech-label">{label}</span><span className="tech-desc">{desc}</span></div>
          </div>
          <div className="orbit-trail" style={{ borderColor: `${color}25` } as CSSProperties} />
          <div className="orbit-glow" style={{ background: `radial-gradient(circle, ${color}30, transparent 70%)` } as CSSProperties} />
          <style jsx>{`
            @keyframes orbit { 0% { transform: rotate(0deg) translateX(220px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(220px) rotate(-360deg); } }
            .tech-badge { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-radius: 999px; border: 1px solid; backdrop-filter: blur(16px); background: rgba(6, 6, 6, 0.85); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05) inset; transform: rotate(calc(var(--rotation, 0deg) * -1)); transition: all 0.4s cubic-bezier(0.2, 0.7, 0.2, 1); }
            .tech-badge:hover { transform: scale(1.15) rotate(calc(var(--rotation, 0deg) * -1)); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px currentColor, 0 0 0 1px rgba(255, 255, 255, 0.15) inset; }
            .icon-wrapper { font-weight: 700; } .badge-content { display: flex; flex-direction: column; }
            .tech-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }
            .tech-desc { font-size: 0.5rem; font-weight: 400; letter-spacing: 0.05em; text-transform: none; opacity: 0; transform: translateX(-100%); transition: all 0.3s ease; color: rgba(255, 255, 255, 0.6); white-space: nowrap; }
            .group:hover .tech-desc { opacity: 1; transform: translateX(0); }
            .orbit-trail { position: absolute; inset: -6px; border: 1px dashed; border-radius: 999px; opacity: 0; transition: opacity 0.3s ease; }
            .group:hover .orbit-trail { opacity: 1; }
            .orbit-glow { position: absolute; inset: -20px; border-radius: 999px; filter: blur(30px); opacity: 0; transition: opacity 0.4s ease; }
            .group:hover .orbit-glow { opacity: 0.5; }
          `}</style>
        </div>
      ))}
    </div>
  );
}

// ===== ENHANCED PORTRAIT GLOW =====
function PortraitGlow() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 }); };
    const handleLeave = () => setMousePos({ x: 50, y: 50 });
    const el = ref.current;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => { el.removeEventListener("mousemove", handleMove); el.removeEventListener("mouseleave", handleLeave); };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" style={{
      background: `radial-gradient(ellipse 80% 60% at ${mousePos.x}% ${mousePos.y}%, rgba(255, 42, 52, 0.22) 0%, transparent 45%), radial-gradient(ellipse 60% 40% at ${mousePos.x}% ${mousePos.y}%, rgba(42, 217, 255, 0.15) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at ${mousePos.x}% ${mousePos.y}%, rgba(184, 255, 42, 0.12) 0%, transparent 65%), radial-gradient(ellipse 100% 80% at 50% 50%, rgba(255, 42, 52, 0.04) 0%, transparent 70%)`,
      transition: "background 0.3s ease-out",
    } as CSSProperties} />
  );
}

// ===== MAIN HERO COMPONENT =====
export default function Hero() {
  const lettersRef = useRef<HTMLDivElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const { ripples, triggerRipple } = useRipple();

  // Scroll parallax
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => { raf = 0; const y = Math.min(window.scrollY, 1200); if (lettersRef.current) lettersRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`; if (personRef.current) personRef.current.style.transform = `translate3d(0, ${y * 0.05}px, 0)`; };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const typingTexts = [
    "Young Programmer & Robotics Enthusiast",
    "Building Autonomous Systems",
    "Exploring AI & Embedded Tech",
    "Creating the Future, One Bot at a Time",
  ];

  return (
    <>
      <ScrollProgress />
      <MouseTrail />
      <section id="home" className="relative isolate overflow-hidden bg-ink">
        {/* Deep background layers */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
          <ParallaxLayers />
          <InteractiveGrid />
          <FloatingShapes />
        </div>

        {/* Main ambient background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-lines absolute inset-0" />
          <div className="absolute left-[34%] top-[4%] h-[92%] w-[72%] bg-[radial-gradient(closest-side,rgba(224,19,28,0.34),rgba(120,9,16,0.12)_55%,transparent)]" />
          <div className="absolute -left-[10%] bottom-0 h-1/2 w-1/2 bg-[radial-gradient(closest-side,rgba(120,9,16,0.25),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        </div>

        {/* Dynamic particles */}
        <FloatingParticles />
        <TechOrbit />

        {/* Ripple effects */}
        <div className="pointer-events-none fixed inset-0 -z-20">
          {ripples.map(r => (
            <div key={r.id} className="absolute rounded-full bg-gradient-to-r from-crimson to-cyan opacity-60 animate-ripple" style={{ left: `${r.x}px`, top: `${r.y}px`, transform: "translate(-50%, -50%)", width: "0px", height: "0px" } as CSSProperties} />
          ))}
          <style jsx>{`@keyframes ripple { 0% { width: 0; height: 0; opacity: 0.5; } 100% { width: 400px; height: 400px; opacity: 0; } .animate-ripple { animation: ripple 0.6s ease-out forwards; }`}</style>
        </div>

        <div className="relative mx-auto flex max-w-[1600px] flex-col px-5 pb-10 pt-20 sm:px-8 md:grid md:grid-cols-2 lg:block lg:min-h-[max(820px,100svh)] lg:px-12 lg:pb-0 lg:pt-0">
          {/* 1 — wordmark with enhanced animations */}
          <div className="intro-wipe relative z-0 md:col-span-2 lg:absolute lg:inset-x-12 lg:top-[88px]" style={delay(100)}>
            <div ref={lettersRef} className="will-change-transform text-glow">
              <div className="relative [mask-image:linear-gradient(to_bottom,#000_50%,rgba(0,0,0,0.55)_78%,transparent_99%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_50%,rgba(0,0,0,0.55)_78%,transparent_99%)]">
                <Wordmark />
              </div>
            </div>
          </div>

          {/* 2 — portrait with interactive glow and orbiting tech badges */}
          <div className="intro-rise pointer-events-none relative z-10 mx-auto -mt-[7vw] w-[76%] max-w-[390px] md:col-start-2 md:row-start-2 md:mt-[-9vw] md:w-full md:max-w-[420px] hero-person lg:absolute lg:bottom-0 lg:left-[47%] lg:mx-0 lg:mt-0 lg:max-w-none float-card" style={delay(450)} onClick={(e) => triggerRipple(e.clientX, e.clientY)}>
            <div ref={personRef} className="relative will-change-transform">
              <div className="relative [mask-image:linear-gradient(to_bottom,#000_72%,transparent_100%)] lg:[mask-image:none]">
                <PortraitGlow />
                <img src={cutout} alt="Bhavin Jha sitting in a black jacket, white shirt and blue jeans" width={1197} height={1314} decoding="async" fetchPriority="high" className="block h-auto w-full select-none [filter:contrast(1.1)_saturate(0.82)_brightness(0.95)_drop-shadow(0_24px_40px_rgba(0,0,0,0.55))]" />
                <div aria-hidden="true" className="absolute inset-0 mix-blend-soft-light" style={{ WebkitMaskImage: `url(${cutout})`, maskImage: `url(${cutout})`, WebkitMaskSize: "100% 100%", maskSize: "100% 100%", background: "linear-gradient(155deg, rgba(255,48,58,0.85) 0%, rgba(150,10,20,0.6) 50%, rgba(20,0,2,0.35) 100%)" }} />
              </div>
            </div>
          </div>

          {/* 3 — intro copy with typing animation */}
          <div className="relative z-20 -mt-14 md:col-start-1 md:row-start-2 md:mt-0 md:self-end md:pb-6 lg:absolute lg:bottom-14 lg:left-12 lg:w-[42%] lg:pb-0">
            <h1 className="leading-none">
              <span className="line-mask"><span className="line-up font-script text-[2.9rem] leading-[1.1] text-white sm:text-6xl lg:text-[4.4rem]" style={delay(700)}><span className="inline-block -rotate-3 [text-shadow:0_2px_24px_rgba(0,0,0,0.8)]">Hello, I'm</span></span></span>
              <span className="line-mask -mt-1 lg:-mt-2"><span className="line-up font-display text-[clamp(4.5rem,21vw,8.5rem)] uppercase leading-[0.9] tracking-[0.005em] text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.65)] md:text-[clamp(4.25rem,10.4vw,7rem)] lg:text-[clamp(4.5rem,8.2vw,8.75rem)]" style={delay(780)}>Bhavin</span></span>
              <span className="line-mask"><span className="line-up font-display text-[clamp(4.5rem,21vw,8.5rem)] uppercase leading-[0.9] tracking-[0.005em] text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.65)] md:text-[clamp(4.25rem,10.4vw,7rem)] lg:text-[clamp(4.5rem,8.2vw,8.75rem)]" style={delay(900)}>Jha</span></span>
            </h1>

            <div className="intro-rise" style={delay(1050)}>
              <p className="mt-5 text-[0.78rem] font-bold uppercase leading-[1.55] tracking-[0.17em] text-crimson-bright"><TypingText texts={typingTexts} speed={60} deleteSpeed={30} pause={2500} /></p>
              <p className="mt-4 max-w-[34rem] text-[0.94rem] leading-7 text-white/60">A passionate Class 8th student from Bihar, India, exploring the exciting worlds of programming, robotics and technology. Building the future, one project at a time.</p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <MagneticButton href="#projects" className="micro group inline-flex items-center gap-2 bg-crimson px-5 py-3.5 text-white transition-all duration-300 hover:bg-crimson-bright hover:shadow-[0_10px_40px_-8px_rgba(255,42,52,0.7)]" strength={40}>View projects<ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" /></MagneticButton>
                <MagneticButton href="#contact" className="micro inline-flex items-center border border-white/25 px-5 py-3.5 text-white transition-colors duration-300 hover:border-crimson-bright hover:text-crimson-bright" strength={30}>Get in touch</MagneticButton>
              </div>

              <p className="micro mt-6 flex items-center gap-2.5 text-white/60"><span className="relative flex h-2 w-2"><span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-crimson-bright" /><span className="relative inline-flex h-2 w-2 rounded-full bg-crimson-bright" /></span><MapPin className="h-3 w-3 text-crimson-bright" />Based in Katihar, Bihar</p>
            </div>
          </div>

          {/* 4 — floating tagline */}
          <div className="intro-fade absolute right-12 top-[41%] z-20 hidden max-w-[15rem] items-center gap-3 xl:flex float-gentle" style={delay(1300)}>
            <span className="group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 bg-ink/40 backdrop-blur transition-colors hover:border-crimson-bright"><Plus className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" /></span>
            <p className="text-[0.74rem] leading-snug text-white/75">Turning curiosity into working robots & code.</p>
          </div>

          {/* 5 — stats with animated infinite */}
          <ul className="intro-rise relative z-20 mt-10 grid grid-cols-3 gap-3 md:col-span-2 lg:absolute lg:bottom-14 lg:right-12 lg:mt-0 lg:flex lg:w-[min(17%,17rem)] lg:min-w-[11.5rem] lg:flex-col lg:gap-0 stagger-in" style={delay(1200)} aria-label="Quick stats">
            {stats.map((s, i) => (
              <li key={s.label} className="border-l border-white/15 pl-4 lg:flex lg:items-center lg:gap-4 lg:border-b lg:border-l-0 lg:py-3.5 lg:pl-0 lg:first:border-t" style={{ animationDelay: `${i * 100}ms` } as CSSProperties}>
                <span className="block font-display text-[2.4rem] leading-none text-crimson-bright lg:min-w-[4.5rem] lg:text-[3.1rem]">{s.to === null ? <InfiniteIconCSS size="2.4rem" /> : <CountUp to={s.to} suffix={s.suffix} />}</span>
                <span className="micro mt-1.5 block max-w-[8rem] leading-[1.5] text-white/60 lg:mt-0">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

// ===== WORDMARK COMPONENT =====
function Wordmark() {
  return (
    <svg viewBox="0 0 1000 392" className="block h-auto w-full" aria-hidden="true" focusable="false" role="presentation">
      <defs>
        <linearGradient id="wordmark-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0.2" stopColor="#f5202a" /><stop offset="0.5" stopColor="#c6101a" /><stop offset="0.78" stopColor="#62070d" /><stop offset="0.92" stopColor="#350306" /></linearGradient>
        <linearGradient id="wordmark-shimmer" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(255,255,255,0)" /><stop offset="50%" stopColor="rgba(255,255,255,0.3)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" /></linearGradient>
      </defs>
      <text transform="translate(0 385) scale(1 1.7)" x="0" y="0" fontFamily="Anton, Impact, 'Arial Narrow', sans-serif" fontSize="261.4" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#wordmark-fill)" className="wordmark-text">PORTFOLIO</text>
      <text transform="translate(0 385) scale(1 1.7)" x="0" y="0" fontFamily="Anton, Impact, 'Arial Narrow', sans-serif" fontSize="261.4" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#wordmark-shimmer)" className="wordmark-shimmer-text" style={{ opacity: 0.3 }}>PORTFOLIO</text>
      <style jsx>{`.wordmark-text { filter: drop-shadow(0 4px 32px rgba(255, 42, 52, 0.5)) drop-shadow(0 8px 64px rgba(150, 10, 20, 0.3)); } .wordmark-shimmer-text { animation: wordmark-shimmer 4s ease-in-out infinite; } @keyframes wordmark-shimmer { 0%, 100% { transform: translateX(-100%); } 50% { transform: translateX(100%); } }`}</style>
    </svg>
  );
}