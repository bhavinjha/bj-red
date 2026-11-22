import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "../assets/bhavin-logo.webp";
import { navLinks } from "../data";
import { useActiveSection, useScrollProgress, useScrolled } from "../hooks";
import { cn } from "../utils/cn";
import { Star4 } from "./Icons";

const ids = navLinks.map((l) => l.id);

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);
  const progress = useScrollProgress();
  const active = useActiveSection(ids);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-white/10 bg-ink/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a
          href="#home"
          className="group flex items-center gap-3"
          aria-label="Bhavin Jha — back to top"
          onClick={() => setOpen(false)}
        >
          <span className="relative block h-9 w-9 overflow-hidden rounded-full ring-1 ring-crimson/70 transition duration-300 group-hover:scale-110 group-hover:ring-crimson-bright">
            <img src={logo} alt="" width={36} height={36} className="h-full w-full object-cover" />
          </span>
          <span className="micro leading-[1.45]">
            <span className="block text-white">Young Programmer</span>
            <span className="block text-mute">Robotics Enthusiast</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "micro relative px-3.5 py-2 transition-colors duration-200 hover:text-white",
                  isActive ? "text-white" : "text-white/55"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-crimson-bright transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <span className="micro hidden items-center gap-2 text-white/80 xl:flex">
            Available for collaborations
            <Star4 className="h-3 w-3 text-crimson-bright" />
          </span>
          <a
            href="#contact"
            className="micro group hidden items-center gap-1.5 border border-crimson px-4 py-2.5 text-white transition-colors duration-300 hover:bg-crimson lg:inline-flex"
          >
            Let’s talk
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-white/15 text-white transition-colors hover:border-crimson lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* scroll progress */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-gradient-to-r from-blood via-crimson to-crimson-bright"
        style={{ transform: `scaleX(${progress / 100})`, opacity: progress > 0.5 ? 1 : 0 }}
      />

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <nav
            aria-label="Mobile"
            className="flex max-h-[calc(100svh-4rem)] flex-col overflow-y-auto px-5 pb-8 pt-2 sm:px-8"
          >
            {navLinks.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-baseline justify-between border-b border-white/10 py-4 font-display text-4xl uppercase tracking-wide transition-colors",
                  active === link.id ? "text-crimson-bright" : "text-white hover:text-crimson-bright"
                )}
              >
                <span>{link.label}</span>
                <span className="micro font-sans text-mute">0{i + 1}</span>
              </a>
            ))}
            <p className="micro mt-6 flex items-center gap-2 text-white/70">
              <Star4 className="h-3 w-3 text-crimson-bright" />
              Available for collaborations
            </p>
          </nav>
        </div>
      </div>
    </header>
  );
}
