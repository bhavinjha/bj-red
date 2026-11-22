import { useEffect, useRef, useState, type CSSProperties } from "react";
import { GraduationCap, MapPin, Target, Code, Cpu, Zap, Bot, Sparkles, Heart, Star, Award, BookOpen, Globe, Layers, MousePointer, Brain, Zap as ZapIcon } from "lucide-react";
import photo from "../assets/bhavin-photo.webp";
import { quickFacts } from "../data";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";
import SectionHeading from "./SectionHeading";
import { PhotoGallery } from "./PhotoGallery";
import { InfiniteIconCSS } from "./InfiniteIcon";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// ===== MOUSE-TRACKING GLOW FOR PORTRAIT =====
function PortraitGlow() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
    };
    const handleLeave = () => setMousePos({ x: 50, y: 50 });
    const el = ref.current;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => { el.removeEventListener("mousemove", handleMove); el.removeEventListener("mouseleave", handleLeave); };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" style={{
      background: `radial-gradient(ellipse 70% 50% at ${mousePos.x}% ${mousePos.y}%, rgba(255, 42, 52, 0.15) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at ${mousePos.x}% ${mousePos.y}%, rgba(42, 217, 255, 0.1) 0%, transparent 60%)`,
      transition: "background 0.3s ease-out",
    } as CSSProperties} />
  );
}

// ===== FLOATING TECH ICONS =====
function FloatingTechIcons() {
  const icons = [
    { icon: Code, color: "#38bdf8", label: "Python" },
    { icon: Cpu, color: "#ff2a34", label: "C++" },
    { icon: Zap, color: "#ffd700", label: "Arduino" },
    { icon: Bot, color: "#22d3ee", label: "Robotics" },
    { icon: Sparkles, color: "#a855f7", label: "AI" },
    { icon: Brain, color: "#f472b6", label: "ML" },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {icons.map(({ icon: Icon, color, label }, i) => (
        <div key={label} className="absolute" style={{
          left: `${10 + (i % 3) * 35}%`,
          top: `${15 + Math.floor(i / 3) * 45}%`,
          animation: `icon-float ${8 + i * 2}s ease-in-out infinite`,
          animationDelay: `${i * 1.2}s`,
        } as CSSProperties}>
          <div className="group flex flex-col items-center">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br bg-[var(--c)]/20 border border-[var(--c)]/30 transition-all duration-500 group-hover:scale-125 group-hover:bg-[var(--c)]/40" style={{ "--c": color } as CSSProperties}>
              <Icon className="h-5 w-5" style={{ color }} />
            </div>
            <span className="micro mt-1 text-center whitespace-nowrap text-[var(--c)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">{label}</span>
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes icon-float { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-25px) rotate(1deg); } }
      `}</style>
    </div>
  );
}

// ===== SKILL ORBIT =====
function SkillOrbit() {
  const skills = [
    { icon: Code, label: "Python", color: "#38bdf8", desc: "Scripting & AI" },
    { icon: Cpu, label: "C++", color: "#ff2a34", desc: "Systems & Embedded" },
    { icon: Zap, label: "Arduino", color: "#ffd700", desc: "Microcontrollers" },
    { icon: Bot, label: "Robotics", color: "#22d3ee", desc: "Autonomous Systems" },
    { icon: Sparkles, label: "AI/ML", color: "#a855f7", desc: "Automation & Vision" },
    { icon: Globe, label: "Web Dev", color: "#22c55e", desc: "Modern Frontend" },
    { icon: Heart, label: "Passion", color: "#f43f5e", desc: "Driving Force" },
    { icon: Star, label: "Curiosity", color: "#fbbf24", desc: "Never Stops" },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-5">
      {skills.map(({ icon: Icon, label, color, desc }, i) => (
        <div key={label} className="absolute skill-orbit-item" style={{ animation: `skill-orbit ${14 + i * 1.2}s linear infinite`, animationDelay: `${i * 2}s` } as CSSProperties}>
          <div className="skill-badge group" style={{ background: `rgba(6, 6, 6, 0.8)`, borderColor: `${color}60` } as CSSProperties}>
            <div className="icon-wrapper" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}><Icon className="h-5 w-5" /></div>
            <div className="badge-content"><span className="skill-label">{label}</span><span className="skill-desc">{desc}</span></div>
          </div>
          <div className="orbit-trail" style={{ borderColor: `${color}25` } as CSSProperties} />
          <div className="orbit-glow" style={{ background: `radial-gradient(circle, ${color}30, transparent 70%)` } as CSSProperties} />
          <style jsx>{`
            @keyframes skill-orbit { 0% { transform: rotate(0deg) translateX(200px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); } }
            .skill-badge { display: flex; align-items: center; gap: 10px; padding: 8px 14px; border-radius: 999px; border: 1px solid; backdrop-filter: blur(16px); background: rgba(6, 6, 6, 0.85); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05) inset; transform: rotate(calc(var(--rotation, 0deg) * -1)); transition: all 0.4s cubic-bezier(0.2, 0.7, 0.2, 1); }
            .skill-badge:hover { transform: scale(1.12) rotate(calc(var(--rotation, 0deg) * -1)); box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7), 0 0 32px currentColor, 0 0 0 1px rgba(255, 255, 255, 0.1) inset; }
            .icon-wrapper { font-weight: 700; }
            .badge-content { display: flex; flex-direction: column; }
            .skill-label { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }
            .skill-desc { font-size: 0.5rem; font-weight: 400; letter-spacing: 0.05em; text-transform: none; opacity: 0; transform: translateX(-100%); transition: all 0.3s ease; color: rgba(255, 255, 255, 0.6); white-space: nowrap; }
            .group:hover .skill-desc { opacity: 1; transform: translateX(0); }
            .orbit-trail { position: absolute; inset: -5px; border: 1px dashed; border-radius: 999px; opacity: 0; transition: opacity 0.3s ease; }
            .group:hover .orbit-trail { opacity: 1; }
            .orbit-glow { position: absolute; inset: -18px; border-radius: 999px; filter: blur(25px); opacity: 0; transition: opacity 0.4s ease; }
            .group:hover .orbit-glow { opacity: 0.5; }
          `}</style>
        </div>
      ))}
    </div>
  );
}

// ===== TIMELINE ENTRY =====
interface TimelineEntryProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

function TimelineEntry({ year, title, description, icon, color, delay: d = 0 }: TimelineEntryProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal delay={d} variant="left">
      <div
        className="group relative flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 via-transparent to-transparent hover:border-[var(--c)]/30 hover:shadow-[0_0_30px_rgba(var(--c-rgb),0.2)] transition-all duration-500"
        style={{ "--c": color, "--c-rgb": color.replace("#", "").match(/.{2}/g)?.map(h => parseInt(h, 16)).join(",") } as CSSProperties}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--c)]/5 via-transparent to-transparent" style={{ "--c": color } as CSSProperties} />
        <div className="relative flex items-start gap-4">
          <div className="relative flex-shrink-0 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--c)] to-[var(--c)]dd transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ "--c": color } as CSSProperties}>
            <span className="text-xl">{icon}</span>
            <span className="absolute inset-0 rounded-xl border-2 border-[var(--c)]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-ping" style={{ "--c": color } as CSSProperties} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3">
              <span className="micro font-display text-[var(--c)] uppercase tracking-widest">{year}</span>
              <h3 className="font-display text-lg sm:text-xl uppercase tracking-wide text-white">{title}</h3>
            </div>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/70">{description}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="micro px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 transition-colors group-hover:text-[var(--c)] group-hover:border-[var(--c)]/50" style={{ "--c": color } as CSSProperties}>Explore</span>
              <span className="absolute right-5 top-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2" style={{ color }}>
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ===== STAT COUNTER WITH ANIMATION =====
function AnimatedStat({ value, suffix, label, icon, color, delay: d = 0 }: { value: number; suffix?: string; label: string; icon: React.ReactNode; color: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <Reveal delay={d} variant="scale" ref={ref}>
      <div className="group relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent hover:border-[var(--c)]/30 hover:shadow-[0_0_30px_rgba(var(--c-rgb),0.2)] transition-all duration-500 text-center" style={{ "--c": color, "--c-rgb": color.replace("#", "").match(/.{2}/g)?.map(h => parseInt(h, 16)).join(",") } as CSSProperties}>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--c)]/5 via-transparent to-transparent" style={{ "--c": color } as CSSProperties} />
        <div className="relative mb-4 grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-[var(--c)] to-[var(--c)]dd transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ "--c": color } as CSSProperties}>
          {icon}
        </div>
        <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          {count}{suffix}
        </div>
        <div className="mt-2 micro text-white/60 uppercase tracking-wider">{label}</div>
      </div>
    </Reveal>
  );
}

// ===== MAIN ABOUT COMPONENT =====
export default function About() {
  const timeline = [
    { year: "2020", title: "First Line of Code", description: "Wrote my first Python script — a simple calculator. The spark that started everything.", icon: "🐍", color: "#38bdf8" },
    { year: "2021", title: "Discovered Robotics", description: "Built my first line-following robot with Arduino. The magic of code meeting hardware.", icon: "🤖", color: "#22d3ee" },
    { year: "2022", title: "C++ & Systems", description: "Dived into C++ for embedded systems. Memory management, pointers, and performance optimization.", icon: "⚙️", color: "#ff2a34" },
    { year: "2023", title: "AI & Automation", description: "Started exploring ML, computer vision, and AI automation. Building smart workflows.", icon: "🧠", color: "#a855f7" },
    { year: "2024", title: "Web Development", description: "Modern frontend with React, TypeScript, Tailwind. Building beautiful, performant experiences.", icon: "🌐", color: "#22c55e" },
    { year: "2025", title: "Advanced Robotics", description: "Autonomous navigation, sensor fusion, ROS. Pushing boundaries of what's possible.", icon: "🚀", color: "#f43f5e" },
  ];

  const stats = [
    { value: 4, suffix: "+", label: "Robots Built", icon: "🤖", color: "#ff2a34" },
    { value: 2, suffix: "+", label: "Languages", icon: "💻", color: "#38bdf8" },
    { value: 8, suffix: "+", label: "Projects", icon: "📁", color: "#22c55e" },
    { value: 3, suffix: "", label: "Generations", icon: "👨‍👩‍👦", color: "#fbbf24" },
    { value: 100, suffix: "%", label: "Passion", icon: "❤️", color: "#f43f5e" },
    { value: 0, suffix: "∞", label: "Ideas", icon: "∞", color: "#a855f7" },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes float-gentle { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-12px) rotate(0.5deg); } 50% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(-6px) rotate(-0.3deg); } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes icon-float { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-25px) rotate(1deg); } }
      `}</style>

      <section id="about" className="relative bg-ink overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">
          <Reveal>
            <SectionHeading title="About me" index="01" aside={<span className="hidden sm:inline">A young learner passionate about technology & innovation</span>} />
          </Reveal>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
            {/* Portrait with enhanced effects */}
            <Reveal variant="left" className="lg:col-span-4">
              <figure className="group relative mx-auto max-w-md lg:h-full lg:max-w-none float-gentle">
                <div className="relative aspect-[4/5] overflow-hidden bg-smoke lg:aspect-auto lg:h-full lg:min-h-[32rem]">
                  <div ref={ref} className="absolute inset-0 pointer-events-none">
                    <PortraitGlow />
                  </div>
                  <img
                    src={photo}
                    alt="Bhavin Jha sitting on stone steps in front of a white stupa wall"
                    width={960}
                    height={1280}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full origin-[50%_60%] scale-[1.55] object-cover object-[50%_60%] grayscale-[0.35] contrast-105 transition duration-700 ease-out group-hover:scale-[1.62] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                  <div className="absolute inset-0 bg-crimson/20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
                  <FloatingTechIcons />
                  <SkillOrbit />
                  {/* corner marks */}
                  {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
                    (c) => <span key={c} className={cn("absolute h-4 w-4 border-white/70", c)} />
                  )}
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <span className="font-display text-3xl uppercase leading-none">Bhavin<br />Jha</span>
                  <span className="micro text-right text-crimson-bright">Katihar<br />Bihar · IN</span>
                </figcaption>
              </figure>
            </Reveal>

            {/* Copy & timeline */}
            <div className="lg:col-span-8">
              <Reveal delay={80}>
                <p className="font-display text-[clamp(2.1rem,4.6vw,4.1rem)] uppercase leading-[0.98] tracking-[0.005em]">
                  A young learner,<br />
                  <span className="text-crimson-bright">passionate</span> about<br />
                  technology & innovation.
                </p>
              </Reveal>

              <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
                <Reveal delay={140}>
                  <p className="text-[0.95rem] leading-7 text-white/65">
                    I am a student from Bihar who has started learning programming in Python and C++. I
                    also have experience in making detailed PowerPoint presentations and have created
                    several interesting projects in robotics. I have advanced to AI automation and website
                    construction, building smart workflows and modern web experiences.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <p className="text-[0.95rem] leading-7 text-white/65">
                    My journey in technology began with curiosity about how things work, which led me to
                    explore the fascinating world of robotics and programming. Every day brings new
                    learning opportunities, and I'm excited to continue growing my skills.
                  </p>
                </Reveal>
              </div>

              {/* Timeline */}
              <Reveal delay={280} className="mt-12">
                <h3 className="micro text-crimson-bright mb-6">Journey Timeline</h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-crimson-bright/30 to-transparent" />
                  <div className="space-y-6 ml-14">
                    {timeline.map((entry, i) => (
                      <TimelineEntry key={entry.year} {...entry} delay={i * 80} />
                    ))}
                  </div>
                </div>
              </Reveal>

              <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 xl:grid-cols-[1.15fr_1fr]">
                {/* highlights */}
                <ul className="bg-ink">
                  {highlights.map(({ icon: Icon, title, text }, i) => (
                    <Reveal as="li" key={title} delay={i * 90} className="group flex items-start gap-4 border-b border-white/10 p-5 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.03]">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-crimson-bright group-hover:bg-crimson group-hover:text-white">
                        <Icon className="h-[1.1rem] w-[1.1rem]" />
                      </span>
                      <span>
                        <span className="micro block text-crimson-bright">{title}</span>
                        <span className="mt-1.5 block text-sm leading-6 text-white/75">{text}</span>
                      </span>
                    </Reveal>
                  ))}
                </ul>

                {/* quick facts + stats */}
                <Reveal delay={120} className="bg-coal p-5 sm:p-6">
                  <h3 className="micro text-white">Quick facts</h3>
                  <p className="mt-1 text-xs text-mute">A snapshot of who I am</p>
                  <dl className="mt-4">
                    {quickFacts.map((f) => (
                      <div key={f.label} className="flex items-baseline justify-between gap-4 border-t border-white/10 py-3">
                        <dt className="text-xs text-mute">{f.label}</dt>
                        <dd className={cn("text-right text-[0.82rem] font-semibold", f.highlight ? "text-crimson-bright" : "text-white")}>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                {/* Animated Stats */}
                <Reveal delay={200} variant="up" className="bg-coal p-5 sm:p-6">
                  <h3 className="micro text-white mb-4">By the Numbers</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((s, i) => (
                      <AnimatedStat key={s.label} {...s} delay={i * 60} />
                    ))}
                  </div>
                </Reveal>

                {/* Photo gallery */}
                <Reveal delay={200} variant="up">
                  <h3 className="micro text-white mb-4">Project snapshots</h3>
                  <PhotoGallery />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}