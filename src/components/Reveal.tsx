import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

/**
 * Once the visitor interacts with the page (scroll, key, touch…) we trust the
 * IntersectionObserver completely. Before that, a gentle fallback guarantees
 * that nothing stays hidden (e.g. when the page is printed or captured).
 */
let userInteracted = false;
if (typeof window !== "undefined") {
  const mark = () => {
    userInteracted = true;
  };
  ["scroll", "wheel", "touchstart", "keydown", "pointerdown"].forEach((evt) =>
    window.addEventListener(evt, mark, { passive: true, once: true })
  );
}

function useInViewOnce<T extends Element>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    const timer = window.setTimeout(() => {
      if (!userInteracted) setInView(true);
    }, 4500);
    const onPrint = () => setInView(true);
    window.addEventListener("beforeprint", onPrint);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("beforeprint", onPrint);
    };
  }, [threshold]);

  return { ref, inView };
}

type RevealProps = {
  as?: ElementType;
  delay?: number;
  variant?: "up" | "left" | "scale";
  className?: string;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
};

export function Reveal({
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const Component = Tag as ElementType;
  return (
    <Component
      ref={ref}
      {...rest}
      className={cn(
        "reveal",
        variant === "left" && "reveal-left",
        variant === "scale" && "reveal-scale",
        inView && "is-in",
        className
      )}
      style={{ ...style, "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}

/** Number that counts up the first time it scrolls into view. */
export function CountUp({
  to,
  suffix = "",
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setValue(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
