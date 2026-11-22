import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Rocket, Sparkles, Zap, Cpu, Bot, Code, Terminal, GitBranch, Eye, MessageSquare, Star, Award, Heart, Layers } from "lucide-react";
import { profile, projects } from "../data";
import { Reveal } from "./Reveal";
import SectionHeading from "./SectionHeading";
import { InfiniteIconCSS } from "./InfiniteIcon";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// ===== MAGNETIC BUTTON =====
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
      <style jsx>{` .magnetic-btn { will-change: transform; } `}</style>
    </Component>
  );
}

// ===== PROJECT CARD WITH 3D TILT =====
interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleLeave = () => {
    setMousePos({ x: 50, y: 50 });
  };

  const tags = project.tags.slice(0, 4);
  const primaryTag = project.kind.split(" · ")[0];

  return (
    <Reveal as="li" key={project.no} delay={(index % 4) * 100} className="group">
      <article
        ref={cardRef}
        className="relative flex h-full flex-col"
        onMouseMove={handleMove}
        onMouseLeave={() => { handleLeave(); setIsHovered(false); }}
        onMouseEnter={() => setIsHovered(true)}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${((mousePos.y - 50) * 0.12)}deg) rotateY(${(50 - mousePos.x) * 0.12}deg) translateY(-12px) scale(1.02)`
            : "none",
          transformStyle: "preserve-3d",
          transition: "transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1)",
        } as CSSProperties}
      >
        {/* 3D background glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, rgba(255, 42, 52, 0.15) 0%, transparent 50%), radial-gradient(ellipse 40% 40% at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(42, 217, 255, 0.1) 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        } as CSSProperties} />

        <div className="sheen relative aspect-[4/3] overflow-hidden border border-white/10 bg-smoke transition-all duration-500 group-hover:border-crimson">
          <img
            src={project.image}
            alt={project.alt}
            width={1000}
            height={750}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:brightness-110"
            style={{ transformStyle: "preserve-3d", transform: isHovered ? "translateZ(20px) scale(1.02)" : "translateZ(0)" } as CSSProperties}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" style={{ transform: "translateZ(10px)" } as CSSProperties} />

          {/* Top tag */}
          <span className="micro absolute left-3 top-3 bg-ink/70 px-2 py-1 text-white/80 backdrop-blur z-10" style={{ transform: "translateZ(30px)" } as CSSProperties}>
            {primaryTag}
          </span>

          {/* Bottom tags - 3D effect */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-3 flex-wrap gap-1.5 p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-10 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100" style={{ transform: "translateZ(30px)" } as CSSProperties}>
            {tags.map((t) => (
              <span key={t} className="micro border border-white/25 bg-ink/60 px-2 py-1 text-white backdrop-blur transition-all duration-300 hover:border-crimson-bright hover:text-crimson-bright hover:scale-105" style={{ transform: "translateZ(10px)" } as CSSProperties}>
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons overlay */}
          <div className="absolute inset-x-0 top-3 right-3 flex justify-end gap-2 p-3 opacity-0 transition-all duration-300 group-hover:opacity-100 z-10" style={{ transform: "translateZ(30px)" } as CSSProperties}>
            <button className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white bg-ink/50 backdrop-blur transition-all duration-300 hover:border-crimson-bright hover:bg-crimson hover:text-white hover:scale-110" style={{ transform: "translateZ(30px)" } as CSSProperties}>
              <Eye className="h-4 w-4" />
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white bg-ink/50 backdrop-blur transition-all duration-300 hover:border-crimson-bright hover:bg-crimson hover:text-white hover:scale-110" style={{ transform: "translateZ(30px)" } as CSSProperties}>
              <MessageSquare className="h-4 w-4" />
            </button>
            <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`About your ${project.title}`)}`} className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white bg-ink/50 backdrop-blur transition-all duration-300 hover:border-crimson-bright hover:bg-crimson hover:text-white hover:scale-110" style={{ transform: "translateZ(30px)" } as CSSProperties}>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-4" style={{ transform: "translateZ(40px)" } as CSSProperties}>
          <span className="font-display text-[2rem] leading-none text-crimson-bright transition-transform duration-300 group-hover:scale-110">{project.no}</span>
          <div className="min-w-0 flex-1">
            <h3 className="text-[0.82rem] font-bold uppercase leading-snug tracking-[0.1em] text-white group-hover:text-crimson-bright transition-colors duration-300">{project.title}</h3>
            <p className="micro mt-1 text-mute">{project.kind}</p>
          </div>
          <MagneticButton
            href={`mailto:${profile.email}?subject=${encodeURIComponent(`About your ${project.title}`)}`}
            aria-label={`Ask Bhavin about the ${project.title}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-crimson-bright group-hover:bg-crimson"
            strength={25}
          >
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </div>
        <p className="mt-3 border-t border-white/10 pt-3 text-[0.85rem] leading-6 text-white/55 transition-colors duration-300 group-hover:text-white/70">{project.description}</p>
      </article>
    </Reveal>
  );
}

// ===== FLOATING TECH PARTICLES =====
function ProjectParticles() {
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
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: 0.3,
            filter: `blur(${p.size * 0.5}px)`,
            animation: `proj-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          } as CSSProperties}
        />
      ))}
      <style jsx>{`
        @keyframes proj-float { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.15; } 25% { transform: translate3d(30px, -40px, 0) scale(1.3); opacity: 0.4; } 50% { transform: translate3d(-20px, -60px, 0) scale(0.7); opacity: 0.2; } 75% { transform: translate3d(35px, -25px, 0) scale(1.2); opacity: 0.35; } }
      `}</style>
    </div>
  );
}

// ===== FUTURE PROJECTS CARD =====
function FutureProjectsCard() {
  const [isHovered, setIsHovered] = useState(false);

  const futureIdeas = [
    { icon: Bot, label: "Swarm Robotics", desc: "Multi-agent coordination" },
    { icon: Sparkles, label: "Edge AI", desc: "On-device inference" },
    { icon: Cpu, label: "RTOS Kernel", desc: "Custom real-time OS" },
    { icon: Terminal, label: "CLI Framework", desc: "Developer productivity" },
    { icon: Code, label: "Python Libs", desc: "Robotics utilities" },
    { icon: Github, label: "Open Source", desc: "Community tools" },
  ];

  return (
    <Reveal variant="scale" className="noise relative group overflow-hidden bg-gradient-to-br from-blood via-[#9c0c14] to-crimson p-8 sm:p-10">
      <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/40 bg-black/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-3xl uppercase leading-none sm:text-4xl">Future projects</h3>
            <p className="mt-3 max-w-2xl text-[0.92rem] leading-7 text-white/85">
              Currently exploring more advanced robotics concepts and planning to build AI-powered
              systems. Stay tuned for Python and C++ based applications that push the boundaries of
              what's possible!
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="micro flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 text-white/90">
            <span className="flex items-center gap-2">
              <span className="font-display text-3xl leading-none tracking-normal">4+</span>
              projects completed
            </span>
            <span className="hidden text-white/40 sm:inline">|</span>
            <span className="flex items-center gap-2">
              <InfiniteIconCSS size="2rem" className="mr-1" />
              ideas in progress
            </span>
          </p>
          <div className="flex flex-wrap gap-2 ml-auto">
            {futureIdeas.map((idea, i) => (
              <span key={idea.label} className="micro flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 transition-all duration-300 hover:border-crimson-bright hover:text-crimson-bright hover:bg-crimson/10" style={{ animationDelay: `${i * 100}ms` } as CSSProperties}>
                <idea.icon className="h-3.5 w-3.5" />
                {idea.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ===== MAIN PROJECTS COMPONENT =====
export default function Projects() {
  return (
    <>
      <style jsx global>{`
        @keyframes float-gentle { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-8px) rotate(0.5deg); } 50% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(-4px) rotate(-0.3deg); } }
      `}</style>

      <section id="projects" className="relative border-t border-white/10 bg-coal overflow-hidden">
        <ProjectParticles />

        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">
          <Reveal>
            <SectionHeading
              title="Selected projects"
              index="02"
              aside={
                <a href={profile.github} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 transition-colors hover:text-crimson-bright">
                  <span className="hidden sm:inline">View all projects</span>
                  <span className="sm:hidden">All</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              }
            />
          </Reveal>

          <Reveal delay={100} variant="up">
            <p className="mt-6 max-w-xl text-[0.95rem] leading-7 text-white/60">
              Robotics projects that showcase innovation and problem-solving — each one built, wired and
              programmed from scratch.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
            {projects.map((p, i) => (
              <ProjectCard key={p.no} project={p} index={i} />
            ))}
          </ul>

          <FutureProjectsCard />
        </div>
      </section>
    </>
  );
}