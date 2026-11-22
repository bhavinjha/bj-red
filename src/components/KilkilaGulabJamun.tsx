import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Sparkles, Zap, Heart, ChefHat, Award, Flame, Timer, Scale, Droplet, Share2, MessageSquare } from "lucide-react";
import { Reveal } from "./Reveal";
import { InfiniteIconCSS } from "./InfiniteIcon";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// ===== PARTICLE BURST FOR FOOD PAGE =====
function FoodParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 12,
    color: Math.random() > 0.5 ? "#ff6b35" : "#ffd700",
    type: Math.random() > 0.6 ? "syrup" : "crumb",
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: 0.5,
            borderRadius: p.type === "syrup" ? "50% 20% 50% 20%" : "30% 70% 30% 70%",
            filter: `blur(${p.size * 0.3}px)`,
            animation: `food-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          } as CSSProperties}
        />
      ))}
      <style jsx>{`
        @keyframes food-float {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); opacity: 0.2; }
          20% { transform: translate3d(50px, -60px, 0) scale(1.3) rotate(45deg); opacity: 0.7; }
          40% { transform: translate3d(-30px, -80px, 0) scale(0.7) rotate(180deg); opacity: 0.4; }
          60% { transform: translate3d(60px, -20px, 0) scale(1.4) rotate(270deg); opacity: 0.6; }
          80% { transform: translate3d(-40px, -50px, 0) scale(1.2) rotate(360deg); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

// ===== SYRUP DRIP ANIMATION =====
function SyrupDrip({ delay: d = 0 }: { delay?: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1 h-24 -z-10" style={{ animationDelay: `${d}s` } as CSSProperties}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 rounded-full animate-drip" />
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full animate-drip-bounce" style={{ animationDelay: "0.3s" } as CSSProperties} />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-300 rounded-full animate-drip-bounce" style={{ animationDelay: "0.6s" } as CSSProperties} />
      <style jsx>{`
        @keyframes drip { 0% { transform: translateY(-20px) scaleY(0.5); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(120px) scaleY(1.5); opacity: 0; } }
        @keyframes drip-bounce { 0%, 100% { transform: translateX(-50%) translateY(0) scale(1); } 50% { transform: translateX(-50%) translateY(8px) scale(1.2); } }
        .animate-drip { animation: drip 2s ease-in-out infinite; }
        .animate-drip-bounce { animation: drip-bounce 0.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// ===== FLOATING INGREDIENTS =====
function FloatingIngredients() {
  const ingredients = [
    { emoji: "🥛", label: "Khoya", color: "#fff8e7" },
    { emoji: "🌰", label: "Cardamom", color: "#8b6914" },
    { emoji: "🍯", label: "Sugar Syrup", color: "#ffb700" },
    { emoji: "🥜", label: "Pistachios", color: "#93c572" },
    { emoji: "🌹", label: "Rose Water", color: "#f8bbd0" },
    { emoji: "🔥", label: "Ghee", color: "#ffd700" },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {ingredients.map((ing, i) => (
        <div
          key={ing.label}
          className="absolute flex flex-col items-center"
          style={{
            left: `${10 + (i % 3) * 30}%`,
            top: `${15 + Math.floor(i / 3) * 40}%`,
            animation: `ingredient-float ${6 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          } as CSSProperties}
        >
          <span className="text-4xl sm:text-5xl md:text-6xl filter drop-shadow-lg" style={{ animation: `bounce ${0.8 + i * 0.1}s ease-in-out infinite` } as CSSProperties}>{ing.emoji}</span>
          <span className="micro mt-1 text-center whitespace-nowrap text-white/80 bg-ink/60 px-2 py-1 rounded backdrop-blur" style={{ color: ing.color }}>{ing.label}</span>
        </div>
      ))}
      <style jsx>{`
        @keyframes ingredient-float { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-30px) rotate(2deg); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>
    </div>
  );
}

// ===== INTERACTIVE RECIPE STEP =====
interface RecipeStepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  temperature?: string;
  delay?: number;
}

function RecipeStep({ step, title, description, icon, duration, temperature, delay: d = 0 }: RecipeStepProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Reveal delay={d} variant="up">
      <div
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-red-900/30 p-6 sm:p-8 transition-all duration-500 hover:border-amber-400/50 hover:shadow-[0_20px_60px_-12px_rgba(255,107,53,0.3)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transform: isHovered ? "translateY(-8px) scale(1.01)" : "none" } as CSSProperties}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-red-500/10 opacity-0 transition-opacity duration-500" style={{ opacity: isHovered ? 1 : 0 }} />

        {/* Step number */}
        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4">
          <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-amber-400/20">{step.toString().padStart(2, "0")}</span>
        </div>

        <div className="relative flex items-start gap-4 sm:gap-6">
          {/* Icon */}
          <div className={`flex-shrink-0 grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            <span className="text-2xl sm:text-3xl">{icon}</span>
            <style jsx>{`@keyframes icon-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-wide text-white">{title}</h3>
              {temperature && (
                <span className="micro flex items-center gap-1 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300">
                  <Flame className="h-3 w-3" /> {temperature}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/70">{description}</p>
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <span className="micro flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/60 transition-colors group-hover:text-amber-300 group-hover:border-amber-400/50">
                <Timer className="h-3.5 w-3.5" /> {duration}
              </span>
              {isExpanded && (
                <span className="micro flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/60">
                  <Heart className="h-3.5 w-3.5 text-red-400" /> Made with Love
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Expandable tips */}
        <div className="mt-6 overflow-hidden transition-all duration-500" style={{ maxHeight: isExpanded ? "200px" : "0", opacity: isExpanded ? 1 : 0, marginTop: isExpanded ? "1.5rem" : 0 } as CSSProperties}>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="micro mb-3 text-amber-400">Pro Tips:</p>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-amber-400" /> Use fresh khoya for best texture</li>
              <li className="flex items-center gap-2"><Droplet className="h-4 w-4 text-blue-400" /> Syrup should be one-string consistency</li>
              <li className="flex items-center gap-2"><Flame className="h-4 w-4 text-orange-400" /> Fry on medium-low heat for even cooking</li>
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ===== KILKILA GULAB JAMUN MAIN PAGE =====
export default function KilkilaGulabJamun() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMove = (e: MouseEvent) => setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMove);
    return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("mousemove", handleMove); };
  }, []);

  const recipeSteps = [
    { step: 1, title: "Prepare Khoya Base", description: "Grate fresh khoya and knead with a pinch of baking soda and cardamom powder until smooth. The dough should be soft but not sticky.", icon: "🥛", duration: "15 min", temperature: "Room Temp" },
    { step: 2, title: "Shape Perfect Spheres", description: "Divide dough into equal portions and roll between palms into smooth, crack-free balls. Any cracks will expand during frying.", icon: "⚪", duration: "10 min" },
    { step: 3, title: "Heat Ghee to Precision", description: "Heat pure ghee in a heavy kadai to 160°C (320°F). Test with a tiny dough piece - it should rise slowly without browning immediately.", icon: "🔥", duration: "5 min", temperature: "160°C / 320°F" },
    { step: 4, title: "Gentle Fry to Golden", description: "Slide balls in batches, maintaining temperature. Rotate gently for even coloring. Fry 8-10 minutes until deep golden with reddish hue.", icon: "🍩", duration: "10 min", temperature: "150-160°C" },
    { step: 5, title: "Sugar Syrup Alchemy", description: "Simmer sugar, water, cardamom, rose water, and saffron to one-string consistency (105°C). Add lemon juice to prevent crystallization.", icon: "🍯", duration: "8 min", temperature: "105°C / 221°F" },
    { step: 6, title: "The Kilkila Magic", description: "Transfer hot gulab jamuns directly into warm syrup. Cover and rest 2 hours. They absorb syrup, expand, and develop signature melt-in-mouth texture.", icon: "✨", duration: "2+ hours" },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes float-gentle { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-15px) rotate(1deg); } 50% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(-8px) rotate(-0.5deg); } }
        @keyframes syrup-flow { 0% { transform: translateY(-100%) scaleY(0); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(200vh) scaleY(1.5); opacity: 0; } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(255,107,53,0.3), 0 0 40px rgba(255,215,0,0.2); } 50% { box-shadow: 0 0 40px rgba(255,107,53,0.6), 0 0 80px rgba(255,215,0,0.4); } }
        @keyframes title-shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes badge-pop { 0% { transform: scale(0) rotate(-180deg); opacity: 0; } 50% { transform: scale(1.2) rotate(0deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
      `}</style>

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 h-0.5 z-50 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" style={{ width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`, transformOrigin: "left center" }} />

      {/* Hero Section */}
      <section id="kilkila-hero" className="relative isolate overflow-hidden bg-ink min-h-screen">
        {/* Background atmosphere */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 60% 40% at ${mousePos.x}% ${mousePos.y}%, rgba(255, 107, 53, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(255, 215, 0, 0.1) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255, 69, 0, 0.08) 0%, transparent 70%)
            `,
            transition: "background 0.3s ease-out",
          } as CSSProperties} />
          <FoodParticles />
          <FloatingIngredients />
        </div>

        {/* Syrup drips */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <SyrupDrip delay={0} />
          <SyrupDrip delay={3} style={{ left: "20%" } as CSSProperties} />
          <SyrupDrip delay={6} style={{ left: "80%" } as CSSProperties} />
        </div>

        <div className="relative mx-auto flex max-w-[1600px] min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 lg:px-12">
          {/* Badge */}
          <Reveal delay={100} className="mb-8">
            <span className="inline-flex items-center gap-2 micro px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-full text-amber-300 animate-[badge-pop_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards]">
              <Award className="h-3.5 w-3.5" />
              Bhavin's Signature Recipe
            </span>
          </Reveal>

          {/* Main Title */}
          <Reveal delay={200} className="text-center mb-6">
            <h1 className="font-display text-[clamp(3.5rem,12vw,8rem)] uppercase leading-[0.95] tracking-[0.02em]">
              <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-[title-shimmer_4s_ease-in-out_infinite]" style={{ backgroundSize: "200% 100%" } as CSSProperties}>
                Kilkila
              </span>
              <span className="block bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent" style={{ animationDelay: "0.5s" } as CSSProperties}>
                Gulab Jamun
              </span>
            </h1>
            <p className="mt-4 micro text-amber-300 tracking-[0.3em] uppercase">खिलखिला गुलाब जामुन</p>
          </Reveal>

          {/* Hero Image with floating animation */}
          <Reveal delay={400} variant="scale" className="relative mb-10">
            <div className="relative float-gentle pulse-glow" style={{ borderRadius: "24px" } as CSSProperties}>
              <img
                src="/assets/khilkhila_gulab_jamun.png"
                alt="Kilkila Gulab Jamun - Golden fried dough balls dripping with cardamom-saffron syrup, garnished with pistachios and rose petals"
                width={800}
                height={600}
                className="rounded-2xl border border-amber-400/30 shadow-[0_0_60px_rgba(255,107,53,0.2),0_20px_40px_rgba(0,0,0,0.5)]"
                loading="eager"
                fetchPriority="high"
              />
              {/* Syrup drizzle overlay */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gradient-to-b from-transparent via-amber-300/30 to-transparent animate-[syrup-flow_4s_ease-in-out_infinite]" />
                <div className="absolute top-0 left-1/3 -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-transparent via-orange-300/20 to-transparent animate-[syrup-flow_4s_ease-in-out_infinite]" style={{ animationDelay: "1.5s" } as CSSProperties} />
                <div className="absolute top-0 right-1/3 -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-transparent via-amber-300/20 to-transparent animate-[syrup-flow_4s_ease-in-out_infinite]" style={{ animationDelay: "3s" } as CSSProperties} />
              </div>
            </div>
          </Reveal>

          {/* Tagline */}
          <Reveal delay={600} className="max-w-2xl text-center mb-12">
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/70">
              "Where every bite tells a story of tradition, precision, and the magical <span className="text-amber-300 font-medium">kilkila</span> — that delightful crackle when syrup meets crisp shell."
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={700} className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="text-center group">
              <div className="font-display text-4xl sm:text-5xl md:text-6xl text-amber-300 transition-transform duration-300 group-hover:scale-110">45+</div>
              <div className="micro text-white/60 mt-1">Years of Tradition</div>
            </div>
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-amber-400 to-transparent" />
            <div className="text-center group">
              <div className="font-display text-4xl sm:text-5xl md:text-6xl text-amber-300 transition-transform duration-300 group-hover:scale-110">3</div>
              <div className="micro text-white/60 mt-1">Generations</div>
            </div>
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-amber-400 to-transparent" />
            <div className="text-center group">
              <div className="font-display text-4xl sm:text-5xl md:text-6xl text-amber-300 transition-transform duration-300 group-hover:scale-110"><InfiniteIconCSS size="2.5rem" /></div>
              <div className="micro text-white/60 mt-1">Variations</div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={900} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="#recipe" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-ink font-bold rounded-full transition-all duration-300 hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_0_40px_rgba(255,173,0,0.5)] hover:scale-105">
              View Recipe
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-amber-400/50 text-amber-300 font-bold rounded-full transition-all duration-300 hover:border-amber-300 hover:bg-amber-500/10 hover:text-amber-200">
              <Share2 className="h-5 w-5" /> Share Recipe
            </button>
          </Reveal>
        </div>
      </section>

      {/* Recipe Section */}
      <section id="recipe" className="relative py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12 bg-gradient-to-b from-ink via-amber-900/10 to-ink">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="text-center mb-16">
            <span className="micro text-amber-400 tracking-[0.2em] uppercase">The Art</span>
            <h2 className="mt-3 font-display text-[clamp(3rem,8vw,5rem)] uppercase leading-[0.95] tracking-[0.02em] bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">Recipe</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/60">Six precise steps. Zero shortcuts. Pure magic.</p>
          </Reveal>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recipeSteps.map((step, i) => (
              <RecipeStep key={step.step} {...step} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section id="ingredients" className="relative py-20 sm:py-28 px-5 sm:px-8 lg:px-12 bg-ink">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="text-center mb-16">
            <span className="micro text-amber-400 tracking-[0.2em] uppercase">Ingredients</span>
            <h2 className="mt-3 font-display text-[clamp(3rem,8vw,5rem)] uppercase leading-[0.95] tracking-[0.02em] bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">Pure & Simple</h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🥛", label: "Fresh Khoya", amount: "500g", desc: "Full-fat, homemade preferred", color: "#fff8e7" },
              { icon: "🌰", label: "Cardamom Powder", amount: "1 tsp", desc: "Freshly ground green cardamom", color: "#8b6914" },
              { icon: "🥄", label: "Baking Soda", amount: "¼ tsp", desc: "For light, airy texture", color: "#fff" },
              { icon: "🍯", label: "Sugar", amount: "400g", desc: "White crystalline sugar", color: "#fff" },
              { icon: "💧", label: "Water", amount: "300ml", desc: "For sugar syrup", color: "#38bdf8" },
              { icon: "🌹", label: "Rose Water", amount: "1 tbsp", desc: "Edible grade, aromatic", color: "#f8bbd0" },
              { icon: "🧡", label: "Saffron Strands", amount: "15-20", desc: "Soaked in warm milk", color: "#f59e0b" },
              { icon: "🥜", label: "Pistachios", amount: "2 tbsp", desc: "Slivered for garnish", color: "#93c572" },
              { icon: "🔥", label: "Pure Ghee", amount: "For frying", desc: "A2 cow ghee preferred", color: "#ffd700" },
              { icon: "🍋", label: "Lemon Juice", amount: "½ tsp", desc: "Prevents crystallization", color: "#fde047" },
            ].map((ing, i) => (
              <Reveal key={ing.label} delay={i * 60} variant="scale">
                <div className="group relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent hover:border-amber-400/30 hover:shadow-[0_0_30px_rgba(255,173,0,0.15)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 transition-opacity duration-500" style={{ opacity: 1 }} />
                  <div className="relative flex flex-col items-center text-center">
                    <span className="text-5xl sm:text-6xl mb-4" style={{ filter: "drop-shadow(0 8px 24px rgba(255,173,0,0.3))" }}>{ing.icon}</span>
                    <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-white mb-1">{ing.label}</h3>
                    <div className="micro flex items-center justify-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 mb-3" style={{ color: ing.color }}>{ing.amount}</div>
                    <p className="text-sm text-white/50">{ing.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tips & Secrets Section */}
      <section id="secrets" className="relative py-20 sm:py-28 px-5 sm:px-8 lg:px-12 bg-gradient-to-b from-ink via-amber-900/10 to-ink">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="text-center mb-16">
            <span className="micro text-amber-400 tracking-[0.2em] uppercase">Secrets</span>
            <h2 className="mt-3 font-display text-[clamp(3rem,8vw,5rem)] uppercase leading-[0.95] tracking-[0.02em] bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">The Kilkila Secrets</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/60">Passed down through generations, never written — until now.</p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Sparkles, title: "Fresh Khoya Only", desc: "Store-bought khoya has additives that prevent proper binding. Make it fresh or source from a trusted halwai." },
              { icon: Droplet, title: "One-String Syrup", desc: "Drop syrup between thumb and forefinger — it should form a single unbroken thread. Too thin = soggy; too thick = hard." },
              { icon: Flame, title: "Temperature Discipline", desc: "Ghee too hot = burnt outside, raw inside. Too cold = oil absorption. 150-160°C is the sweet spot." },
              { icon: Timer, title: "Patience in Resting", desc: "The 2-hour soak is non-negotiable. Syrup penetrates slowly, creating that signature melt-in-mouth kilkila texture." },
              { icon: Scale, title: "Equal Sizing", desc: "Use a scale. Even 2g difference changes fry time. Consistency = perfect batch every time." },
              { icon: Heart, title: "Love & Intention", desc: "The secret ingredient. Cook with joy, serve with pride. Food carries the energy of its maker." },
            ].map((tip, i) => (
              <Reveal key={tip.title} delay={i * 100} variant="up">
                <div className="group relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-amber-900/20 via-red-900/10 to-ink hover:border-amber-400/30 hover:shadow-[0_0_40px_rgba(255,107,53,0.2)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-red-500/5" />
                  <div className="relative flex flex-col h-full">
                    <div className="mb-4 grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <tip.icon className="h-7 w-7 text-ink" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl uppercase tracking-wide text-white mb-3">{tip.title}</h3>
                    <p className="text-white/60 leading-relaxed flex-1">{tip.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Variations Section */}
      <section id="variations" className="relative py-20 sm:py-28 px-5 sm:px-8 lg:px-12 bg-ink">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="text-center mb-16">
            <span className="micro text-amber-400 tracking-[0.2em] uppercase">Variations</span>
            <h2 className="mt-3 font-display text-[clamp(3rem,8vw,5rem)] uppercase leading-[0.95] tracking-[0.02em] bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">Creative Twists</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/60">Innovation rooted in tradition.</p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Kesar Pista", icon: "🧡", desc: "Saffron-infused dough with generous pistachio stuffing. Royal treatment.", color: "from-amber-400 to-orange-500" },
              { name: "Chocolate Core", icon: "🍫", desc: "Dark chocolate ganache center. Molten surprise with every bite.", color: "from-amber-900 to-orange-800" },
              { name: "Rose & Cardamom", icon: "🌹", desc: "Rose water syrup with double cardamom. Floral elegance.", color: "from-pink-400 to-rose-500" },
              { name: "Dry Fruit Stuffed", icon: "🥜", desc: "Almonds, cashews, raisins, coconut. Texture festival.", color: "from-amber-600 to-amber-800" },
              { name: "Coconut Ladoo", icon: "🥥", desc: "Desiccated coconut in dough and syrup. Tropical twist.", color: "from-amber-200 to-yellow-300" },
              { name: "Mini Kilkila", icon: "🪄", desc: "Bite-sized for parties. Same magic, portable.", color: "from-orange-400 to-red-500" },
            ].map((varn, i) => (
              <Reveal key={varn.name} delay={i * 80} variant="scale">
                <div className="group relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-br bg-[var(--color)]/10 hover:border-[var(--color)]/50 hover:shadow-[0_0_40px_rgba(255,173,0,0.2)] transition-all duration-500" style={{ "--color": varn.color } as CSSProperties}>
                  <div className="absolute inset-0 bg-gradient-to-br bg-[var(--color)]/5" style={{ "--color": varn.color } as CSSProperties} />
                  <div className="relative flex flex-col h-full">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br bg-[var(--color)] transition-transform duration-500 group-hover:scale-110" style={{ "--color": varn.color } as CSSProperties}>
                        <span className="text-3xl">{varn.icon}</span>
                      </div>
                      <h3 className="font-display text-xl uppercase tracking-wide text-white">{varn.name}</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed flex-1">{varn.desc}</p>
                    <button className="mt-6 self-start micro inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white/70 rounded-full transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30">
                      Try This
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-12 bg-gradient-to-b from-ink via-amber-900/20 to-ink">
        <div className="mx-auto max-w-[1600px] text-center">
          <Reveal className="mb-8">
            <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] uppercase leading-[0.95] tracking-[0.02em] bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Ready to Create Magic?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-white/60">Gather your ingredients, heat your ghee, and let the kilkila begin.</p>
          </Reveal>
          <Reveal className="flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-ink font-bold rounded-full transition-all duration-300 hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_0_40px_rgba(255,173,0,0.5)] hover:scale-105">
              Share Your Kilkila
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-amber-400/50 text-amber-300 font-bold rounded-full transition-all duration-300 hover:border-amber-300 hover:bg-amber-500/10 hover:text-amber-200">
              <MessageSquare className="h-5 w-5" /> Ask Bhavin
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}