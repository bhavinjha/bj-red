import { GraduationCap, MapPin, Target } from "lucide-react";
import photo from "../assets/bhavin-photo.webp";
import { quickFacts } from "../data";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";
import SectionHeading from "./SectionHeading";
import { PhotoGallery } from "./PhotoGallery";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    text: "Class 8th Student at Scottish Public School",
  },
  {
    icon: MapPin,
    title: "Location",
    text: "Binodpur, Katihar, Bihar, India",
  },
  {
    icon: Target,
    title: "Future goals",
    text: "Mastering AI automation, advanced robotics and production-ready websites",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">
        <Reveal>
          <SectionHeading
            title="About me"
            index="01"
            aside={<span className="hidden sm:inline">A young learner passionate about technology</span>}
          />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          {/* portrait */}
          <Reveal variant="left" className="lg:col-span-4">
            <figure className="group relative mx-auto max-w-md lg:h-full lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden bg-smoke lg:aspect-auto lg:h-full lg:min-h-[32rem]">
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
                {/* corner marks */}
                {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
                  (c) => (
                    <span key={c} className={cn("absolute h-4 w-4 border-white/70", c)} />
                  )
                )}
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <span className="font-display text-3xl uppercase leading-none">
                  Bhavin
                  <br />
                  Jha
                </span>
                <span className="micro text-right text-crimson-bright">
                  Katihar
                  <br />
                  Bihar · IN
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* copy */}
          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <p className="font-display text-[clamp(2.1rem,4.6vw,4.1rem)] uppercase leading-[0.98] tracking-[0.005em]">
                A young learner,
                <br />
                <span className="text-crimson-bright">passionate</span> about
                <br />
                technology &amp; innovation.
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
                  learning opportunities, and I’m excited to continue growing my skills.
                </p>
              </Reveal>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 xl:grid-cols-[1.15fr_1fr]">
              {/* highlights */}
              <ul className="bg-ink">
                {highlights.map(({ icon: Icon, title, text }, i) => (
                  <Reveal
                    as="li"
                    key={title}
                    delay={i * 90}
                    className="group flex items-start gap-4 border-b border-white/10 p-5 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.03]"
                  >
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

              {/* quick facts */}
              <Reveal delay={120} className="bg-coal p-5 sm:p-6">
                <h3 className="micro text-white">Quick facts</h3>
                <p className="mt-1 text-xs text-mute">A snapshot of who I am</p>
                <dl className="mt-4">
                  {quickFacts.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-baseline justify-between gap-4 border-t border-white/10 py-3"
                    >
                      <dt className="text-xs text-mute">{f.label}</dt>
                      <dd
                        className={cn(
                          "text-right text-[0.82rem] font-semibold",
                          f.highlight ? "text-crimson-bright" : "text-white"
                        )}
                      >
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
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
  );
}
