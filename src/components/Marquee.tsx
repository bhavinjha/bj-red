import { tickerItems } from "../data";
import { Star4 } from "./Icons";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {tickerItems.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-xl uppercase tracking-[0.06em] text-ink sm:text-2xl">
            {item}
          </span>
          <Star4 className="h-3.5 w-3.5 text-ink/80" />
        </li>
      ))}
    </ul>
  );
}

/** Crimson ticker band that bridges the hero and the content. */
export default function Marquee() {
  return (
    <div
      className="marquee relative overflow-hidden border-y border-black/40 bg-crimson py-3"
      role="region"
      aria-label="Skills and interests"
    >
      <div className="marquee-track">
        <Row />
        <Row hidden />
        <Row hidden />
        <Row hidden />
      </div>
    </div>
  );
}
