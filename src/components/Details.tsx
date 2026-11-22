import { CodeXml, FlaskConical, Lightbulb, PenTool, Quote, Wrench } from "lucide-react";
import { education, process as steps, skills } from "../data";
import { Reveal } from "./Reveal";
import { Star4 } from "./Icons";

const stepIcons = [Lightbulb, PenTool, Wrench, CodeXml, FlaskConical];

/** Education & skills · Work process · Crimson quote panel — the 3-up band. */
export default function Details() {
  return (
    <section id="skills" className="relative border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[1.05fr_1.2fr_0.85fr]">
        {/* ───────── Education & skills ───────── */}
        <div className="border-b border-white/10 px-5 py-14 sm:px-8 lg:border-b-0 lg:border-r lg:py-20 lg:pl-12 lg:pr-10">
          <Reveal>
            <h2 className="eyebrow flex items-center gap-3">
              <Star4 className="h-2.5 w-2.5 text-crimson-bright" />
              Education &amp; skills
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-8">
            <h3 className="micro text-crimson-bright">Education</h3>
            <ul className="mt-3">
              {education.map((e) => (
                <li
                  key={e.title}
                  className="group flex items-start justify-between gap-4 border-t border-white/10 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <div>
                    <p className="text-[0.85rem] font-semibold leading-snug text-white transition-colors group-hover:text-crimson-bright">
                      {e.title}
                    </p>
                    <p className="mt-1 text-xs text-mute">{e.place}</p>
                  </div>
                  <span className="micro mt-0.5 shrink-0 text-mute">{e.tag}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160} className="mt-8">
            <h3 className="micro text-crimson-bright">Skills</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {skills.map((s) => (
                <li
                  key={s}
                  className="micro cursor-default border border-white/15 px-2 py-2.5 text-center text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson hover:bg-crimson hover:text-white"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ───────── Work process ───────── */}
        <div
          id="process"
          className="flex flex-col border-b border-white/10 px-5 py-14 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-20"
        >
          <Reveal>
            <h2 className="eyebrow flex items-center gap-3">
              <Star4 className="h-2.5 w-2.5 text-crimson-bright" />
              Work process
            </h2>
          </Reveal>

          <ol className="relative mt-8 flex flex-1 flex-col lg:justify-between">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[3.45rem] top-6 hidden w-px bg-gradient-to-b from-crimson/60 via-white/10 to-transparent sm:block"
            />
            {steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <Reveal
                  as="li"
                  key={s.no}
                  delay={i * 90}
                  className="group relative flex items-start gap-4 py-4 sm:gap-5"
                >
                  <span className="micro w-5 pt-3.5 text-crimson-bright">{s.no}</span>
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-ink text-white transition-all duration-300 group-hover:scale-110 group-hover:border-crimson-bright group-hover:bg-crimson">
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
                  </span>
                  <div className="pt-0.5">
                    <h3 className="micro text-crimson-bright">{s.title}</h3>
                    <p className="mt-1.5 max-w-[26rem] text-[0.82rem] leading-6 text-white/60">
                      {s.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>

        {/* ───────── Quote panel ───────── */}
        <Reveal
          variant="scale"
          className="noise relative isolate flex min-h-[30rem] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#5e070c] via-[#8e0b13] to-[#c4101a] px-6 py-14 sm:px-10 lg:min-h-0 lg:px-9 lg:py-20"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -right-4 -z-10 select-none font-display text-[14rem] leading-none text-black/15"
          >
            BJ
          </span>

          <div>
            <Quote className="h-9 w-9 fill-white/90 text-white/90" />
            <blockquote className="mt-6 max-w-[16rem] text-[1.6rem] font-medium leading-[1.2] tracking-tight text-white sm:max-w-sm lg:max-w-[15rem]">
              Every expert was once a beginner.
            </blockquote>
            <p className="font-script mt-10 -rotate-3 text-[4.5rem] leading-none text-white">Bhavin</p>
          </div>

          <p className="micro mt-14 flex items-start gap-2 leading-[1.7] text-white/90">
            <span>
              Let’s build
              <br />
              something great
              <br />
              together.
            </span>
            <Star4 className="mt-1 h-2.5 w-2.5 text-white" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
