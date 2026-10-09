import { useEffect, useState, type ReactNode } from "react";
import { clamp, span } from "./geometry";

export function useReduced() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

export function Plate({
  src,
  time,
  start,
  end,
}: {
  src: string;
  time: number;
  start: number;
  end: number;
}) {
  const reduced = useReduced();
  const p = span(time, start, end);
  const scale = reduced ? 1.04 : 1.06 + 0.08 * p;
  return (
    <img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      style={{ transform: `scale(${scale})`, transformOrigin: "50% 45%" }}
    />
  );
}

export function Opening({
  src,
  time,
  start,
  end,
  kicker,
  title,
  name,
}: {
  src: string;
  time: number;
  start: number;
  end: number;
  kicker: string;
  title: string;
  name: string;
}) {
  const fade = time < start + 6.4 ? 1 : clamp(1 - (time - start - 6.4) / 1.1);
  return (
    <div className="absolute inset-0">
      <Plate src={src} time={time} start={start} end={end} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
      <div className="absolute inset-x-0 top-[14%] px-6 text-center" style={{ opacity: fade }}>
        <p className="text-xs font-medium tracking-widest text-gold uppercase">{kicker}</p>
        <h1 className="mt-2 font-display text-4xl leading-none text-parchment sm:text-6xl">{title}</h1>
        <p className="mt-3 font-display text-2xl text-gold italic sm:text-3xl">{name}</p>
      </div>
    </div>
  );
}

export function Still({
  src,
  time,
  start,
  end,
  kicker,
  line,
}: {
  src: string;
  time: number;
  start: number;
  end: number;
  kicker: string;
  line: string;
}) {
  return (
    <div className="absolute inset-0">
      <Plate src={src} time={time} start={start} end={end} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/25" />
      <div className="absolute inset-x-0 top-[16%] px-6 text-center">
        <p className="text-xs font-medium tracking-widest text-gold uppercase">{kicker}</p>
        <p className="mt-3 font-display text-4xl text-parchment italic sm:text-6xl">{line}</p>
      </div>
    </div>
  );
}

export function WordCard({ eyebrow, line, sub }: { eyebrow: string; line: string; sub?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="text-xs font-medium tracking-widest text-gold uppercase">{eyebrow}</p>
      <p className="mt-3 font-display text-4xl text-parchment italic sm:text-6xl">{line}</p>
      {sub && <p className="mt-4 max-w-lg text-sm leading-normal text-parchment-dim sm:text-lg">{sub}</p>}
    </div>
  );
}

export function Lesson({ footer, children }: { footer: string; children: ReactNode }) {
  return (
    <div className="lesson-stage absolute inset-0 flex flex-col bg-ink px-3 pt-3 pb-3 sm:px-8">
      <div className="flex min-h-0 flex-1 flex-col rounded-2xl bg-ink-2">
        {children}
        <p className="px-4 pb-3 text-center font-display text-xl leading-tight text-parchment sm:text-3xl">{footer}</p>
      </div>
    </div>
  );
}
