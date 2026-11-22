import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Check, Copy, Globe, Mail, MapPin, Sparkles, Zap, Loader2 } from "lucide-react";
import desk from "../assets/contact-desk.webp";
import { profile } from "../data";
import { GithubIcon, Star4 } from "./Icons";
import { Reveal } from "./Reveal";
import { InfiniteIconCSS } from "./InfiniteIcon";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// ===== MOUSE TRAIL =====
function ContactMouseTrail() {
  const [trail, setTrail] = useState<Array<{x: number, y: number, id: number, life: number}>>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setTrail(prev => [
        { x: e.clientX, y: e.clientY, id: Date.now() + Math.random(), life: 1 },
        ...prev.slice(0, 8).map(t => ({ ...t, life: t.life - 0.1 }))
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
            left: `${t.x}px`, top: `${t.y}px`,
            width: `${10 - i * 0.8}px`, height: `${10 - i * 0.8}px`,
            transform: "translate(-50%, -50%)",
            background: i < 3 ? "#ff2a34" : i < 6 ? "#2ad9ff" : "#b8ff2a",
            opacity: t.life * (1 - i * 0.1),
            filter: "blur(2px)",
            transition: "all 0.05s ease-out",
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

// ===== FLOATING PARTICLES =====
function ContactParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 12,
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
            background: p.color, opacity: 0.3,
            filter: `blur(${p.size * 0.5}px)`,
            animation: `contact-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          } as CSSProperties}
        />
      ))}
      <style jsx>{`
        @keyframes contact-float { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.15; } 25% { transform: translate3d(40px, -50px, 0) scale(1.4); opacity: 0.5; } 50% { transform: translate3d(-30px, -70px, 0) scale(0.7); opacity: 0.2; } 75% { transform: translate3d(45px, -25px, 0) scale(1.3); opacity: 0.4; } }
      `}</style>
    </div>
  );
}

// ===== INTERACTIVE BACKGROUND =====
function InteractiveContactBg() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{
      background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, rgba(255, 42, 52, 0.12) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(42, 217, 255, 0.08) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(184, 255, 42, 0.05) 0%, transparent 70%)`,
      transition: "background 0.2s ease-out",
    } as CSSProperties} />
  );
}

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

// ===== CONTACT FORM =====
function ContactForm() {
  const [formState, setFormState] = useState<{ name: string; email: string; subject: string; message: string }>({
    name: "", email: "", subject: "", message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = "Invalid email";
    if (!formState.subject.trim()) newErrors.subject = "Subject is required";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
    setFormState({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" style={{ transform: "translateZ(20px)" } as CSSProperties}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder=" "
            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-crimson-bright focus:outline-none focus:ring-2 focus:ring-crimson-bright/20 transition-all duration-300"
          />
          <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-crimson-bright peer-focus:text-xs peer-focus:-top-1">
            Your Name
          </label>
          {errors.name && <span className="absolute -bottom-5 left-0 text-xs text-red-400">{errors.name}</span>}
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder=" "
            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-crimson-bright focus:outline-none focus:ring-2 focus:ring-crimson-bright/20 transition-all duration-300"
          />
          <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-crimson-bright peer-focus:text-xs peer-focus:-top-1">
            Email Address
          </label>
          {errors.email && <span className="absolute -bottom-5 left-0 text-xs text-red-400">{errors.email}</span>}
        </div>
      </div>
      <div className="relative">
        <select
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-crimson-bright focus:outline-none focus:ring-2 focus:ring-crimson-bright/20 transition-all duration-300 appearance-none"
        >
          <option value="" disabled>Select a topic</option>
          <option value="collaboration">Collaboration Opportunity</option>
          <option value="project">Project Inquiry</option>
          <option value="robotics">Robotics Discussion</option>
          <option value="ai">AI & Automation</option>
          <option value="general">General Question</option>
          <option value="other">Something Else</option>
        </select>
        <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">Subject</label>
        {errors.subject && <span className="absolute -bottom-5 left-0 text-xs text-red-400">{errors.subject}</span>}
      </div>
      <div className="relative">
        <textarea
          name="message"
          value={formState.message}
          onChange={handleChange}
          rows={5}
          placeholder=" "
          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-crimson-bright focus:outline-none focus:ring-2 focus:ring-crimson-bright/20 transition-all duration-300 resize-none"
        />
        <label className="absolute left-4 top-4 text-white/50 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-crimson-bright peer-focus:text-xs peer-focus:-top-1">
          Your Message
        </label>
        {errors.message && <span className="absolute -bottom-5 left-0 text-xs text-red-400">{errors.message}</span>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-crimson to-crimson-bright text-ink font-bold rounded-full transition-all duration-300 hover:from-crimson-bright hover:to-crimson hover:shadow-[0_0_40px_rgba(255,42,52,0.5)] hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : status === "success" ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            Sent Successfully!
          </>
        ) : (
          <>
            Send Message
            <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-center text-red-400 text-sm">Failed to send. Please try again or email directly.</p>
      )}
    </form>
  );
}

// ===== CONTACT ITEM =====
interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  color: string;
  index: number;
}

function ContactItem({ icon: Icon, label, value, href, color, index }: ContactItemProps) {
  return (
    <Reveal key={label} delay={index * 60} variant="left" className="group">
      <li className="relative overflow-hidden">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="group relative flex items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-white/[0.04]">
            <div className="relative flex items-center gap-4">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-[var(--c)] group-hover:bg-[var(--c)] group-hover:text-ink" style={{ "--c": color } as CSSProperties}>
                <Icon className="h-[1.05rem] w-[1.05rem]" />
                <span className="absolute inset-0 rounded-full border-2 border-[var(--c)]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-ping" style={{ "--c": color } as CSSProperties} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="micro block text-[var(--c)]" style={{ "--c": color } as CSSProperties}>{label}</span>
                <span className="mt-1 block truncate text-[0.9rem] text-white">{value}</span>
              </span>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--c)]" style={{ "--c": color } as CSSProperties} />
          </a>
        ) : (
          <div className="group relative flex items-center gap-4 px-5 py-4">
            <div className="relative flex items-center gap-4">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-[var(--c)] group-hover:bg-[var(--c)] group-hover:text-ink" style={{ "--c": color } as CSSProperties}>
                <Icon className="h-[1.05rem] w-[1.05rem]" />
                <span className="absolute inset-0 rounded-full border-2 border-[var(--c)]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-ping" style={{ "--c": color } as CSSProperties} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="micro block text-[var(--c)]" style={{ "--c": color } as CSSProperties}>{label}</span>
                <span className="mt-1 block truncate text-[0.9rem] text-white">{value}</span>
              </span>
            </div>
          </div>
        )}
      </li>
    </Reveal>
  );
}

// ===== MAIN CONTACT COMPONENT =====
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setToastShow(true);
    window.setTimeout(() => { setCopied(false); setToastShow(false); }, 2200);
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, color: "#ff2a34" },
    { icon: Globe, label: "Website", value: profile.site, href: profile.siteUrl, color: "#2ad9ff" },
    { icon: GithubIcon, label: "GitHub", value: profile.githubLabel, href: profile.github, color: "#b8ff2a" },
    { icon: MapPin, label: "Location", value: profile.location, color: "#fbbf24" },
    { icon: Sparkles, label: "Discord", value: "bhavinjha", href: "https://discord.com/users/bhavinjha", color: "#5865f2" },
    { icon: Zap, label: "Twitter/X", value: "@bhavinjha", href: "https://twitter.com/bhavinjha", color: "#1da1f2" },
  ];

  return (
    <div>
      <style jsx global>{`
        @keyframes float-gentle { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-10px) rotate(0.5deg); } 50% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(-5px) rotate(-0.3deg); } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(2.5); opacity: 0; } }
      `}</style>

      <ContactMouseTrail />
      <ContactParticles />

      <section id="contact" className="relative isolate overflow-hidden border-t border-white/10 bg-coal">
        {/* Background layers */}
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <InteractiveContactBg />
        </div>

        {/* Background photo */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <img src={desk} alt="" loading="lazy" decoding="async" className="absolute inset-y-0 right-0 h-full w-full object-cover object-[70%_50%] opacity-50 lg:w-[68%] lg:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/85 to-coal/30 lg:via-coal/70 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/60" />
        </div>

        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 sm:px-8 md:py-20 lg:min-h-[34rem] lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12 lg:py-24">
          {/* Left side - pitch + form */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[clamp(2.8rem,6vw,5.4rem)] uppercase leading-[0.95] text-glow">
                Let's work
                <Star4 className="ml-[0.18em] inline-block h-[0.26em] w-[0.26em] -translate-y-[0.22em] text-crimson-bright" />
                <br />
                together
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-6 max-w-md text-[0.95rem] leading-7 text-white/65">
                Have a question or want to collaborate? Whether you have a project idea, a question, or
                just want to say hello — my inbox is always open. I'll try to respond as soon as
                possible.
              </p>
            </Reveal>

            {/* Contact Form */}
            <Reveal delay={170} variant="up" className="mt-10">
              <div className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-crimson/5 via-transparent to-cyan/5" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,42,52,0.03),transparent_70%)]" />
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={230} className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton
                href={`mailto:${profile.email}`}
                className="micro group inline-flex items-center gap-2 bg-crimson px-6 py-4 text-white transition-all duration-300 hover:bg-crimson-bright hover:shadow-[0_12px_44px_-10px_rgba(255,42,52,0.75)]"
                strength={40}
              >
                Send email
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <button
                type="button"
                onClick={copyEmail}
                className="micro inline-flex items-center gap-2 border border-white/25 px-5 py-4 text-white transition-colors duration-300 hover:border-crimson-bright hover:text-crimson-bright"
                aria-live="polite"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Email copied!" : "Copy email"}
              </button>
            </Reveal>
            <Reveal delay={300} className="mt-8 flex items-center gap-2.5 text-white/70">
              <span className="relative flex h-2 w-2"><span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-crimson-bright" /><span className="relative inline-flex h-2 w-2 rounded-full bg-crimson-bright" /></span>
              <InfiniteIconCSS size="0.9rem" className="mr-1" />
              Available for collaborations
            </Reveal>
          </div>

          {/* Right side - contact list */}
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-7 xl:col-span-4 xl:col-start-7">
            <div className="relative float-gentle">
              <div className="relative p-6 rounded-2xl border border-white/10 bg-ink/60 backdrop-blur-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-crimson/5 via-transparent to-cyan/5" />
                <ul className="relative space-y-1">
                  {contactItems.map(({ icon: Icon, label, value, href, color }, i) => (
                    <ContactItem key={label} icon={Icon} label={label} value={value} href={href} color={color} index={i} />
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
      </div>
    </section>
  </div>
  );
}