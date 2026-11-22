import About from "./components/About";
import Contact from "./components/Contact";
import Details from "./components/Details";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import KilkilaGulabJamun from "./components/KilkilaGulabJamun";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="micro sr-only z-[60] bg-crimson px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <KilkilaGulabJamun />
        <Projects />
        <Details />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
