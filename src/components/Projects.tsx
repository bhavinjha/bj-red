import { ArrowRight, ArrowUpRight, Rocket } from "lucide-react";
import { profile, projects } from "../data";
import { Reveal } from "./Reveal";
import SectionHeading from "./SectionHeading";
import { InfiniteIconCSS } from "./InfiniteIcon";

export default function Projects() {
  return (
    <section id="projects" className="relative border-t border-white/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">
        <Reveal>
          <SectionHeading
            title="Selected projects"
            index="02"
            aside={
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 transition-colors hover:text-crimson-bright"
              >
                <span className="hidden sm:inline">View all projects</span>
                <span className="sm:hidden">All</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            }
          />
        </Reveal>

        <p className="mt-6 max-w-xl text-[0.95rem] leading-7 text-white/60">
          Robotics projects that showcase innovation and problem-solving — each one built, wired and
          programmed from scratch.
        </p>

        <ul className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.no} delay={(i % 4) * 100} className="group">
              <article className="flex h-full flex-col">
                <div className="sheen relative aspect-[4/3] overflow-hidden border border-white/10 bg-smoke transition-colors duration-500 group-hover:border-crimson">
                  <img
                    src={p.image}
                    alt={p.alt}
                    width={1000}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                  <span className="micro absolute left-3 top-3 bg-ink/70 px-2 py-1 text-white/80 backdrop-blur">
                    {p.kind.split(" · ")[0]}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 flex-wrap gap-1.5 p-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="micro border border-white/25 bg-ink/60 px-2 py-1 text-white backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-4">
                  <span className="font-display text-[2rem] leading-none text-crimson-bright">
                    {p.no}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[0.82rem] font-bold uppercase leading-snug tracking-[0.1em] text-white">
                      {p.title}
                    </h3>
                    <p className="micro mt-1 text-mute">{p.kind}</p>
                  </div>
                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(`About your ${p.title}`)}`}
                    aria-label={`Ask Bhavin about the ${p.title}`}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-crimson-bright group-hover:bg-crimson hover:scale-110"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-3 border-t border-white/10 pt-3 text-[0.85rem] leading-6 text-white/55">
                  {p.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal
          variant="scale"
          className="noise relative mt-16 overflow-hidden bg-gradient-to-br from-blood via-[#9c0c14] to-crimson p-8 sm:p-10"
        >
          <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/40 bg-black/20">
                <Rocket className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-3xl uppercase leading-none sm:text-4xl">
                  Future projects
                </h3>
                <p className="mt-3 max-w-2xl text-[0.92rem] leading-7 text-white/85">
                  Currently exploring more advanced robotics concepts and planning to build AI-powered
                  systems. Stay tuned for Python and C++ based applications that push the boundaries of
                  what’s possible!
                </p>
              </div>
            </div>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
