import type { ReactNode } from "react";
import { Star4 } from "./Icons";

/** Small caps section bar: title on the left, optional action on the right. */
export default function SectionHeading({
  title,
  aside,
  index,
}: {
  title: string;
  aside?: ReactNode;
  index?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5">
      <h2 className="eyebrow flex items-center gap-3 text-white">
        {index && <span className="text-crimson-bright">{index}</span>}
        <Star4 className="h-2.5 w-2.5 text-crimson-bright" />
        {title}
      </h2>
      {aside && <div className="micro text-white/70">{aside}</div>}
    </div>
  );
}
