import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronUp, Heart, Sparkles, Zap, Code, Bot, Cpu, GitBranch, X, MessageSquare, Globe, ExternalLink } from "lucide-react";
import logo from "../assets/bhavin-logo.webp";
import { navLinks, profile } from "../data";
import { Star4 } from "./Icons";
import { InfiniteIconCSS } from "./InfiniteIcon";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// ===== SCROLL PROGRESS =====
function ScrollToTop() {
  const scroll = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button onClick={scroll} aria-label="Scroll to top" className="group relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-crimson to-crimson-bright text-ink transition-all duration-500 hover:from-crimson-bright hover:to-crimson hover:scale-110 hover:shadow-[0_0_40px_rgba(255,42,52,0.5)] hover:-translate-y-1">
      <ChevronUp className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1" />
      <span className="absolute inset-0 rounded-full border-2 border-crimson-bright/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-ping" />
    </button>
  );
}

// ===== SOCIAL LINK =====
interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
  index: number;
}

function SocialLink({ icon: Icon, href, label, color, index }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group relative grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
      style={{ "--c": color, animationDelay: `${index * 100}ms` } as CSSProperties}
    >
      <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
      <span className="absolute inset-0 rounded-full border-2 border-[var(--c)]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-ping" style={{ "--c": color } as CSSProperties} />
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 micro whitespace-nowrap bg-[var(--c)] text-ink px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ "--c": color } as CSSProperties}>
        {label}
      </span>
    </a>
  );
}

// ===== FOOTER STATS =====
function FooterStats() {
  const stats = [
    { value: 4, suffix: "+", label: "Robots" },
    { value: 2, suffix: "+", label: "Languages" },
    { value: 8, suffix: "+", label: "Projects" },
    { value: 100, suffix: "%", label: "Passion" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-8">
      {stats.map((s, i) => (
        <div key={s.label} className="text-center group" style={{ animationDelay: `${i * 150}ms` } as CSSProperties}>
          <div className="font-display text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">
            {s.value}{s.suffix}
          </div>
          <div className="micro text-white/50 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ===== FLOATING PARTICLES =====
function FooterParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 10,
    color: Math.random() > 0.5 ? "#ff2a34" : "#2ad9ff",
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            background: p.color, opacity: 0.25,
            filter: `blur(${p.size * 0.5}px)`,
            animation: `footer-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          } as CSSProperties}
        />
      ))}
      <style jsx>{`
        @keyframes footer-float { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.1; } 50% { transform: translate3d(30px, -40px, 0) scale(1.3); opacity: 0.4; } }
      `}</style>
    </div>
  );
}

// ===== MAIN FOOTER =====
export default function Footer() {
  const year = new Date().getFullYear();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const socials = [
    { icon: <Github className="h-5 w-5" />, href: profile.github, label: "GitHub", color: "#fff" },
    { icon: <X className="h-5 w-5" />, href: "https://twitter.com/bhavinjha", label: "Twitter/X", color: "#1da1f2" },
    { icon: <Discord className="h-5 w-5" />, href: "https://discord.com/users/bhavinjha", label: "Discord", color: "#5865f2" },
    { icon: <ExternalLink className="h-5 w-5" />, href: "https://linkedin.com/in/bhavinjha", label: "LinkedIn", color: "#0a66c2" },
    { icon: <Mail className="h-5 w-5" />, href: `mailto:${profile.email}`, label: "Email", color: "#ff2a34" },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes float-gentle { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-8px) rotate(0.5deg); } 50% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(-4px) rotate(-0.3deg); } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes wordmark-shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      `}</style>

      <FooterParticles />

      <footer id="footer" className="relative border-t border-white/10 bg-ink overflow-hidden" style={{
        background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, rgba(255, 42, 52, 0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(42, 217, 255, 0.05) 0%, transparent 60%)`,
        transition: "background 0.3s ease-out",
      } as CSSProperties}>

        {/* Interactive background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{
          background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, rgba(255, 42, 52, 0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(42, 217, 255, 0.04) 0%, transparent 60%)`,
          transition: "background 0.3s ease-out",
        } as CSSProperties} />

        <div className="relative mx-auto flex max-w-[1600px] flex-col gap-10 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-16">
          {/* Brand */}
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <a href="#home" className="group flex items-center gap-3" aria-label="Back to top">
              <span className="relative block h-12 w-12 overflow-hidden rounded-full ring-2 ring-crimson/70 transition-all duration-300 group-hover:scale-110 group-hover:ring-crimson-bright float-gentle">
                <img src={logo} alt="" width={48} height={48} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute inset-0 rounded-full border-2 border-crimson-bright/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-ping" />
              </span>
              <div className="text-left">
                <span className="font-display text-3xl uppercase leading-none tracking-wide bg-gradient-to-r from-white via-amber-300 to-orange-400 bg-clip-text text-transparent">
                  Bhavin <span className="text-crimson-bright">Jha</span>
                </span>
                <span className="block micro text-white/50 mt-1">Young Programmer & Robotics Enthusiast</span>
              </div>
            </a>

            {/* Tagline */}
            <div className="text-center lg:text-left">
              <p className="text-white/60 leading-relaxed max-w-xs">
                Building the future, one robot at a time.
                <br />
                <span className="text-crimson-bright font-medium">From Katihar, Bihar 🇮🇳</span>
              </p>
            </div>
          </div>

          {/* Stats */}
          <FooterStats />

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="micro relative px-3 py-2 text-white/55 transition-all duration-300 hover:text-crimson-bright hover:scale-105 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-crimson-bright after:transition-all after:duration-300 hover:after:w-full">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3">
            {[
              { icon: <GitBranch className="h-5 w-5" />, href: profile.github, label: "GitHub", color: "#fff" },
              { icon: <X className="h-5 w-5" />, href: "https://twitter.com/bhavinjha", label: "Twitter/X", color: "#1da1f2" },
              { icon: <MessageSquare className="h-5 w-5" />, href: "https://discord.com/users/bhavinjha", label: "Discord", color: "#5865f2" },
              { icon: <Globe className="h-5 w-5" />, href: "https://linkedin.com/in/bhavinjha", label: "LinkedIn", color: "#0a66c2" },
              { icon: <Mail className="h-5 w-5" />, href: `mailto:${profile.email}`, label: "Email", color: "#ff2a34" },
            ].map((s, i) => (
              <SocialLink key={s.label} icon={s.icon} href={s.href} label={s.label} color={s.color} index={i} />
            ))}
          </div>

          {/* Scroll to top */}
          <ScrollToTop />
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/10 mt-8">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
            <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between md:gap-6">
              <p className="micro text-white/40">© {new Date().getFullYear()} Bhavin Jha. All rights reserved.</p>
              <p className="micro text-white/40">Built with <Heart className="inline h-3 w-3 text-crimson-bright" /> in Katihar, Bihar, India</p>
              <p className="micro text-white/30">v1.0.0 · Made with React, TypeScript, Tailwind & lots of ☕</p>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { icon: Code, label: "React + TS" },
                { icon: Cpu, label: "C++" },
                { icon: Bot, label: "Robotics" },
                { icon: Zap, label: "Arduino" },
                { icon: Sparkles, label: "AI/ML" },
              ].map((t, i) => (
                <span key={t.label} className="micro flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 transition-all duration-300 hover:border-crimson-bright hover:text-crimson-bright hover:bg-crimson/10" style={{ animationDelay: `${i * 80}ms` } as CSSProperties}>
                  <t.icon className="h-3 w-3" />
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Infinite symbol footer */}
        <div className="text-center py-6">
          <InfiniteIconCSS size="2rem" />
          <p className="micro mt-2 text-white/50">Infinite ideas in progress</p>
        </div>
      </footer>
    </>
  );
}