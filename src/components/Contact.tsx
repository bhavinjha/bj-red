import { useState } from "react";
import { ArrowUpRight, Check, Copy, Globe, Mail, MapPin } from "lucide-react";
import desk from "../assets/contact-desk.webp";
import { profile } from "../data";
import { GithubIcon, Star4 } from "./Icons";
import { Reveal } from "./Reveal";
import { InfiniteIconCSS } from "./InfiniteIcon";

const rows = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Globe, label: "Website", value: profile.site, href: profile.siteUrl },
  { icon: GithubIcon, label: "GitHub", value: profile.githubLabel, href: profile.github },
  { icon: MapPin, label: "Location", value: profile.location },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

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
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-white/10 bg-coal">
      {/* background photo */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src={desk}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-[70%_50%] opacity-50 lg:w-[68%] lg:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/85 to-coal/30 lg:via-coal/70 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/60" />
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 sm:px-8 md:py-20 lg:min-h-[34rem] lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12 lg:py-24">
        {/* pitch */}
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-display text-[clamp(2.8rem,6vw,5.4rem)] uppercase leading-[0.95]">
              Let’s work
              <Star4 className="ml-[0.18em] inline-block h-[0.26em] w-[0.26em] -translate-y-[0.22em] text-crimson-bright" />
              <br />
              together
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-6 max-w-md text-[0.95rem] leading-7 text-white/65">
              Have a question or want to collaborate? Whether you have a project idea, a question, or
              just want to say hello — my inbox is always open. I’ll try to respond as soon as
              possible.
            </p>
          </Reveal>
          <Reveal delay={170} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="micro group inline-flex items-center gap-2 bg-crimson px-6 py-4 text-white transition-all duration-300 hover:bg-crimson-bright hover:shadow-[0_12px_44px_-10px_rgba(255,42,52,0.75)]"
            >
              Send email
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
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
          <Reveal delay={230}>
            <p className="micro mt-8 flex items-center gap-2.5 text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-crimson-bright" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson-bright" />
              </span>
              <InfiniteIconCSS size="0.9rem" className="mr-1" />
              Available for collaborations
            </p>
          </Reveal>
        </div>

        {/* contact list */}
        <Reveal delay={120} className="lg:col-span-5 lg:col-start-7 xl:col-span-4 xl:col-start-7">
          <ul className="border border-white/10 bg-ink/60 backdrop-blur-md">
            {rows.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-crimson-bright group-hover:bg-crimson">
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="micro block text-crimson-bright">{label}</span>
                    <span className="mt-1 block truncate text-[0.9rem] text-white">{value}</span>
                  </span>
                  {href && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-crimson-bright" />
                  )}
                </>
              );
              return (
                <li key={label} className="border-b border-white/10 last:border-b-0">
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-white/[0.04]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 px-5 py-4">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
