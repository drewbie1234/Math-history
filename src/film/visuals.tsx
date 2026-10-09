import { useEffect, useState } from "react";
import {
  clamp,
  lerp,
  mixPts,
  pathOf,
  proofFrames,
  ropeKnots,
  smooth,
  span,
  type Pt,
} from "./geometry";

type At = (fragment: string) => number;

function useReduced() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

function Scrim({ strong = false }: { strong?: boolean }) {
  return (
    <div
      className={
        strong
          ? "absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35"
          : "absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40"
      }
    />
  );
}

function Still({
  src,
  time,
  start,
  end,
  focus = "50% 42%",
  zoom = 0.1,
}: {
  src: string;
  time: number;
  start: number;
  end: number;
  focus?: string;
  zoom?: number;
}) {
  const reduced = useReduced();
  const p = span(time, start, end);
  const scale = reduced ? 1.04 : 1.06 + zoom * p;
  return (
    <img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      style={{ transform: `scale(${scale})`, transformOrigin: focus }}
    />
  );
}

export function Samos({ time, end }: { time: number; end: number }) {
  const title = time < 6.2 ? 1 : clamp(1 - (time - 6.2) / 1.1);
  return (
    <div className="absolute inset-0">
      <Still src="/art/samos.jpg" time={time} start={0} end={end} focus="62% 40%" />
      <Scrim />
      <div
        className="absolute inset-x-0 top-[12%] px-6 text-center"
        style={{ opacity: title }}
      >
        <p className="text-xs font-medium tracking-widest text-gold uppercase">A short film</p>
        <h1 className="mt-2 font-display text-4xl leading-none text-parchment sm:text-6xl">
          All Is Number
        </h1>
      </div>
    </div>
  );
}

export function Travel({ time, start, end, at }: { time: number; start: number; end: number; at: At }) {
  const babylon = at("In Babylon");
  const fade = span(time, babylon, babylon + 0.9);
  return (
    <div className="absolute inset-0">
      <Still src="/art/egypt.jpg" time={time} start={start} end={end} focus="50% 55%" zoom={0.08} />
      <img
        src="/art/babylon.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: fade }}
      />
      <Scrim />
    </div>
  );
}

export function School({ time, start, end, at }: { time: number; start: number; end: number; at: At }) {
  const quoteAt = at("all is number");
  const op = span(time, quoteAt, quoteAt + 0.7);
  return (
    <div className="absolute inset-0">
      <Still src="/art/croton.jpg" time={time} start={start} end={end} focus="50% 60%" zoom={0.07} />
      <Scrim strong />
      <div
        className="absolute inset-x-0 top-[18%] px-6 text-center"
        style={{ opacity: op }}
      >
        <p className="text-xs font-medium tracking-widest text-gold uppercase">The creed</p>
        <p className="mt-2 font-display text-4xl text-parchment italic sm:text-6xl">all is number</p>
      </div>
    </div>
  );
}

export function Older({ time, at }: { time: number; at: At }) {
  const lines = [
    at("The rule we name"),
    at("What his circle"),
    at("A reason that rule"),
  ];
  const draw = smooth(span(time, lines[0], lines[2] + 1.4));
  const copy = [
    "Older than Pythagoras.",
    "His circle gave the world a proof.",
    "A reason the rule can never fail.",
  ];
  return (
    <div className="absolute inset-0 bg-ink">
      <svg viewBox="0 0 100 88" className="absolute inset-0 m-auto h-[78%] w-auto opacity-50" aria-hidden>
        <path
          d="M50 6 L94 82 L6 82 Z"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="0.7"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
      </svg>
      <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        {copy.map((line, i) => {
          const on = time >= lines[i];
          const hot = on && (i === copy.length - 1 || time < lines[i + 1]);
          return (
            <p
              key={line}
              className={
                hot
                  ? "font-display text-2xl text-parchment sm:text-4xl"
                  : on
                    ? "font-display text-lg text-parchment-dim sm:text-2xl"
                    : "font-display text-lg text-transparent sm:text-2xl"
              }
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
}

const AX = 250;
const AY = 400;
const LEG_A = 150;
const LEG_B = 200;
const A: Pt = { x: AX, y: AY };
const C: Pt = { x: AX, y: AY - LEG_A };
const B: Pt = { x: AX + LEG_B, y: AY };
const HYP_OUT: Pt = { x: 150, y: -200 };

function growSquare(p1: Pt, p2: Pt, outward: Pt, p: number): Pt[] {
  return [
    p1,
    p2,
    { x: p2.x + outward.x * p, y: p2.y + outward.y * p },
    { x: p1.x + outward.x * p, y: p1.y + outward.y * p },
  ];
}

function center(pts: Pt[]): Pt {
  return {
    x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
    y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
  };
}

export function Theorem({ time, at }: { time: number; at: At }) {
  const t0 = at("Draw a right triangle");
  const tLegs = t0 + 2.4;
  const tHyp = at("Call them a and b");
  const tC = at("Call it c");
  const tSq = at("The theorem says");
  const tEq = at("a squared plus b squared");
  const legP = smooth(span(time, t0, tLegs));
  const hypP = smooth(span(time, tLegs, tHyp));
  const abP = span(time, tHyp, tHyp + 1.1);
  const cP = span(time, tC, tC + 0.7);
  const sqP = smooth(span(time, tSq, tEq));
  const eqP = span(time, tEq, tEq + 1.2);
  const zoom = smooth(span(time, tSq, tSq + 3.2));
  const focus = { x: 200, y: 200, w: 300, h: 250 };
  const full = { x: 70, y: 20, w: 560, h: 610 };
  const box = {
    x: lerp(focus.x, full.x, zoom),
    y: lerp(focus.y, full.y, zoom),
    w: lerp(focus.w, full.w, zoom),
    h: lerp(focus.h, full.h, zoom),
  };
  const sqA = growSquare(A, C, { x: -LEG_A, y: 0 }, sqP);
  const sqB = growSquare(A, B, { x: 0, y: LEG_B }, sqP);
  const sqC = growSquare(C, B, HYP_OUT, sqP);
  const midC = center(sqC);
  const legs = pathOf([C, A, B], false);
  const hyp = pathOf([C, B], false);

  return (
    <div className="lesson-stage absolute inset-0 flex flex-col bg-ink px-3 pt-3 pb-3 sm:px-8 sm:pt-5">
      <div className="flex min-h-0 flex-1 flex-col rounded-2xl bg-parchment text-ink">
        <svg viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`} className="min-h-0 w-full flex-1" aria-hidden>
          <path d={pathOf(sqA)} fill="var(--color-terra)" fillOpacity={0.28 * sqP} stroke="var(--color-ink)" strokeWidth={3} />
          <path d={pathOf(sqB)} fill="var(--color-aegean)" fillOpacity={0.28 * sqP} stroke="var(--color-ink)" strokeWidth={3} />
          <path d={pathOf(sqC)} fill="var(--color-gold)" fillOpacity={0.38 * sqP} stroke="var(--color-ink)" strokeWidth={3} />
          <path
            d={legs}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth={4}
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - legP}
          />
          <path
            d={hyp}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth={4}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - hypP}
          />
          <path
            d={`M ${A.x} ${A.y - 26} L ${A.x + 26} ${A.y - 26} L ${A.x + 26} ${A.y}`}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth={3}
            opacity={legP}
          />
          <text x={A.x + 16} y={(A.y + C.y) / 2 + 8} fill="var(--color-ink)" fontFamily="Fraunces, Georgia, serif" fontSize={34} opacity={abP}>
            a
          </text>
          <text x={(A.x + B.x) / 2 - 8} y={A.y - 14} fill="var(--color-ink)" fontFamily="Fraunces, Georgia, serif" fontSize={34} opacity={abP}>
            b
          </text>
          <text x={308} y={352} fill="var(--color-ink)" fontFamily="Fraunces, Georgia, serif" fontSize={34} opacity={cP}>
            c
          </text>
          <text x={center(sqA).x - 22} y={center(sqA).y + 10} fill="var(--color-ink)" fontFamily="Fraunces, Georgia, serif" fontSize={32} opacity={sqP}>
            a²
          </text>
          <text x={center(sqB).x - 18} y={center(sqB).y + 8} fill="var(--color-ink)" fontFamily="Fraunces, Georgia, serif" fontSize={32} opacity={sqP}>
            b²
          </text>
          <text x={midC.x - 18} y={midC.y + 8} fill="var(--color-ink)" fontFamily="Fraunces, Georgia, serif" fontSize={32} opacity={sqP}>
            c²
          </text>
        </svg>
        <p
          className="pb-3 text-center font-display text-2xl text-ink sm:pb-4 sm:text-4xl"
          style={{ opacity: eqP }}
        >
          a² + b² = c²
        </p>
      </div>
    </div>
  );
}

export function Proof({ time, at }: { time: number; at: At }) {
  const tSet = at("Set four copies");
  const tSlide = at("Now slide");
  const tSame = at("Same triangles");
  const tAlways = at("Always.");
  const appear = smooth(span(time, tSet, tSet + 2.2));
  const k = smooth(span(time, tSlide, tSame));
  const frame = proofFrames();
  const { S, from, to, inner, a, b } = frame;
  const innerOp = (1 - smooth(span(k, 0.05, 0.4))) * appear;
  const restOp = smooth(span(k, 0.62, 0.92));
  const pulse = time >= tAlways ? 1 : 0.72;
  const pad = 36;

  return (
    <div className="lesson-stage absolute inset-0 flex flex-col bg-ink px-3 pt-3 pb-3 sm:px-10 sm:pt-4">
      <div className="flex min-h-0 flex-1 flex-col items-center rounded-2xl bg-parchment text-ink">
        <svg
          viewBox={`${-pad} ${-pad} ${S + pad * 2} ${S + pad * 2}`}
          className="min-h-0 w-full flex-1"
          aria-hidden
        >
          <rect x={0} y={0} width={S} height={S} fill="none" stroke="var(--color-ink)" strokeWidth={3} />
          <path d={pathOf(inner)} fill="var(--color-gold)" fillOpacity={0.85 * innerOp} />
          <rect x={0} y={a} width={b} height={b} fill="var(--color-aegean)" fillOpacity={0.35 * restOp} />
          <rect x={b} y={b} width={a} height={a} fill="var(--color-terra)" fillOpacity={0.4 * restOp} />
          {from.map((tri, i) => (
            <path
              key={i}
              d={pathOf(mixPts(tri, to[i], k))}
              fill="var(--color-terra)"
              fillOpacity={0.9 * appear}
              stroke="var(--color-ink)"
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
          ))}
          <text
            x={S / 2}
            y={S / 2 + 8}
            textAnchor="middle"
            fill="var(--color-ink)"
            fontFamily="Fraunces, Georgia, serif"
            fontSize={28}
            opacity={innerOp}
          >
            c²
          </text>
          <text
            x={b / 2}
            y={a + b / 2 + 8}
            textAnchor="middle"
            fill="var(--color-ink)"
            fontFamily="Fraunces, Georgia, serif"
            fontSize={26}
            opacity={restOp}
          >
            b²
          </text>
          <text
            x={b + a / 2}
            y={b + a / 2 + 8}
            textAnchor="middle"
            fill="var(--color-ink)"
            fontFamily="Fraunces, Georgia, serif"
            fontSize={26}
            opacity={restOp}
          >
            a²
          </text>
        </svg>
        <p
          className="pb-3 text-center font-display text-2xl sm:pb-4 sm:text-4xl"
          style={{ opacity: Math.max(appear, pulse) }}
        >
          a² + b² = c²
        </p>
      </div>
    </div>
  );
}

function Row({ show, label, hot = false }: { show: boolean; label: string; hot?: boolean }) {
  return (
    <p
      className={
        hot
          ? "font-display text-xl text-gold sm:text-3xl"
          : "font-display text-xl text-parchment sm:text-3xl"
      }
      style={{ opacity: show ? 1 : 0.18 }}
    >
      {label}
    </p>
  );
}

export function Rope({ time, at }: { time: number; at: At }) {
  const t0 = at("Try the oldest");
  const nineAt = at("Three squared is nine");
  const k = smooth(span(time, t0, nineAt));
  const knots = ropeKnots(k);
  const d = pathOf(knots, false);
  const nine = time >= nineAt;
  const sixteen = time >= at("Four squared is sixteen");
  const sum = time >= at("Nine plus sixteen");
  const match = time >= at("five squared is twenty five");
  const exact = time >= at("The corner is exact");
  const corner = knots[3];
  const back = knots[2];
  const fwd = knots[4];
  const mark = 0.42;
  const pBack = {
    x: corner.x + (back.x - corner.x) * mark,
    y: corner.y + (back.y - corner.y) * mark,
  };
  const pFwd = {
    x: corner.x + (fwd.x - corner.x) * mark,
    y: corner.y + (fwd.y - corner.y) * mark,
  };
  const pIn = { x: pBack.x + pFwd.x - corner.x, y: pBack.y + pFwd.y - corner.y };

  return (
    <div className="lesson-stage absolute inset-0 flex flex-col bg-ink px-4 pt-2 pb-3">
      <svg viewBox="-1.2 -7.9 14 8.6" className="min-h-0 w-full flex-1" aria-hidden>
        <path
          d={d}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth={0.18}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {knots.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={0.12} fill="var(--color-parchment)" />
        ))}
        {k > 0.86 && (
          <path
            d={`M ${pBack.x} ${pBack.y} L ${pIn.x} ${pIn.y} L ${pFwd.x} ${pFwd.y}`}
            fill="none"
            stroke="var(--color-parchment)"
            strokeWidth={0.07}
          />
        )}
      </svg>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-2">
        <Row show={nine} label="3² = 9" />
        <Row show={sixteen} label="4² = 16" />
        <Row show={sum} label="9 + 16 = 25" hot={exact} />
        <Row show={match} label="5² = 25" hot={exact} />
      </div>
    </div>
  );
}

export function Today({ time, start, end, at }: { time: number; start: number; end: number; at: At }) {
  const bits = [
    { t: at("It sizes a roof"), label: "A roof" },
    { t: at("It sizes a screen"), label: "A screen" },
    { t: at("short path"), label: "A path across a map" },
  ];
  return (
    <div className="absolute inset-0">
      <Still src="/art/roof.jpg" time={time} start={start} end={end} focus="50% 45%" zoom={0.08} />
      <Scrim strong />
      <div className="absolute inset-x-0 top-[16%] flex flex-col items-center gap-2 px-6 text-center sm:gap-3">
        {bits.map((bit, i) => {
          const on = time >= bit.t;
          const hot = on && (i === bits.length - 1 || time < bits[i + 1].t);
          return (
            <p
              key={bit.label}
              className={
                hot
                  ? "font-display text-3xl text-parchment sm:text-5xl"
                  : on
                    ? "font-display text-xl text-parchment-dim sm:text-3xl"
                    : "font-display text-xl text-transparent sm:text-3xl"
              }
            >
              {bit.label}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export function Close({ time, start, end, at }: { time: number; start: number; end: number; at: At }) {
  const eq = span(time, at("Look for the right angle"), at("Look for the right angle") + 0.8);
  return (
    <div className="absolute inset-0">
      <Still src="/art/stars.jpg" time={time} start={start} end={end} focus="50% 30%" zoom={0.06} />
      <Scrim strong />
      <div className="absolute inset-x-0 top-[16%] px-6 text-center" style={{ opacity: eq }}>
        <p className="font-display text-4xl text-gold sm:text-6xl">a² + b² = c²</p>
        <p className="mt-3 text-sm tracking-widest text-parchment uppercase sm:text-base">Look for the right angle</p>
      </div>
    </div>
  );
}

export function Stage({
  sceneId,
  time,
  start,
  end,
  at,
}: {
  sceneId: string;
  time: number;
  start: number;
  end: number;
  at: At;
}) {
  return (
    <div key={sceneId} className="scene-in absolute inset-0">
      {sceneId === "samos" && <Samos time={time} end={end} />}
      {sceneId === "travel" && <Travel time={time} start={start} end={end} at={at} />}
      {sceneId === "school" && <School time={time} start={start} end={end} at={at} />}
      {sceneId === "older" && <Older time={time} at={at} />}
      {sceneId === "theorem" && <Theorem time={time} at={at} />}
      {sceneId === "proof" && <Proof time={time} at={at} />}
      {sceneId === "rope" && <Rope time={time} at={at} />}
      {sceneId === "today" && <Today time={time} start={start} end={end} at={at} />}
      {sceneId === "close" && <Close time={time} start={start} end={end} at={at} />}
    </div>
  );
}
