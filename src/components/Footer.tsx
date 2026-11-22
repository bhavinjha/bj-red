import { ChevronUp, Mail } from "lucide-react";
import logo from "../assets/bhavin-logo.webp";
import { navLinks, profile } from "../data";
import { GithubIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <a href="#home" className="group flex items-center gap-3" aria-label="Back to top">
          <span className="block h-10 w-10 overflow-hidden rounded-full ring-1 ring-crimson/70 transition duration-300 group-hover:scale-110 group-hover:ring-crimson-bright">
            <img src={logo} alt="" width={40} height={40} loading="lazy" className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-2xl uppercase leading-none tracking-wide">
            Bhavin <span className="text-crimson-bright">Jha</span>
          </span>
        </a>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="micro text-white/55 transition-colors hover:text-crimson-bright"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Bhavin on GitHub"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson-bright hover:bg-crimson"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email Bhavin"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson-bright hover:bg-crimson"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="#home"
            aria-label="Scroll to top"
            className="grid h-10 w-10 place-items-center rounded-full bg-crimson transition-all duration-300 hover:-translate-y-1 hover:bg-crimson-bright"
          >
            <ChevronUp className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-5 py-5 sm:px-8 md:flex-row md:justify-between lg:px-12">
          <p className="micro text-white/45">© {year} Bhavin Jha. All rights reserved.</p>
          <p className="micro text-white/45">Built with curiosity in Katihar, Bihar, India</p>
        </div>
      </div>
    </footer>
  );
}
