import { useEffect, useState } from "react";
import { clamp, span, smooth } from "./geometry";

type At = (fragment: string) => number;

function useReduced() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

function Plate({
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

const NODES = {
  A: { x: 200, y: 78, label: "North", lx: 200, ly: 40 },
  B: { x: 200, y: 322, label: "South", lx: 200, ly: 362 },
  C: { x: 200, y: 200, label: "Island", lx: 78, ly: 206 },
  D: { x: 470, y: 200, label: "East", lx: 548, ly: 206 },
} as const;

type NodeId = keyof typeof NODES;

const EDGES: { id: string; a: NodeId; b: NodeId; bend: number }[] = [
  { id: "ac1", a: "A", b: "C", bend: -36 },
  { id: "ac2", a: "A", b: "C", bend: 36 },
  { id: "bc1", a: "B", b: "C", bend: -36 },
  { id: "bc2", a: "B", b: "C", bend: 36 },
  { id: "ad", a: "A", b: "D", bend: -48 },
  { id: "bd", a: "B", b: "D", bend: 48 },
  { id: "cd", a: "C", b: "D", bend: 0 },
];

const WALK = ["ad", "bd", "bc1", "ac1", "ac2", "bc2"];

function curve(a: NodeId, b: NodeId, bend: number) {
  const p = NODES[a];
  const q = NODES[b];
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2;
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M ${p.x} ${p.y} Q ${cx} ${cy} ${q.x} ${q.y}`;
}

function degrees(skip: string | null) {
  const tally: Record<NodeId, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const edge of EDGES) {
    if (edge.id === skip) continue;
    tally[edge.a] += 1;
    tally[edge.b] += 1;
  }
  return tally;
}

export function City({ time, end }: { time: number; end: number }) {
  const title = time < 7.2 ? 1 : clamp(1 - (time - 7.2) / 1.2);
  return (
    <div className="absolute inset-0">
      <Plate src="/art/konigsberg.jpg" time={time} start={0} end={end} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/45" />
      <div className="absolute inset-x-0 top-[14%] px-6 text-center" style={{ opacity: title }}>
        <p className="text-xs font-medium tracking-widest text-gold uppercase">Episode two</p>
        <h1 className="mt-2 font-display text-4xl leading-none text-parchment sm:text-6xl">Seven Bridges</h1>
      </div>
    </div>
  );
}

export function Letter({ time, start, end }: { time: number; start: number; end: number }) {
  return (
    <div className="absolute inset-0">
      <Plate src="/art/euler.jpg" time={time} start={start} end={end} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/25" />
      <div className="absolute inset-x-0 top-[16%] px-6 text-center">
        <p className="text-xs font-medium tracking-widest text-gold uppercase">Basel · Saint Petersburg</p>
        <p className="mt-2 font-display text-4xl text-parchment italic sm:text-6xl">Leonhard Euler</p>
      </div>
    </div>
  );
}

export function GraphLesson({ time, at }: { time: number; at: At }) {
  const draw = smooth(span(time, at("Each shore"), at("Count the lines")));
  const showDegree = span(time, at("That number is its degree"), at("That number is its degree") + 0.6);
  const showRule = time >= at("A walk that uses");
  const dropped = time >= at("Take one bridge");
  const walkP = smooth(span(time, at("Now a walk exists"), at("Euler had drawn")));
  const skip = dropped ? "cd" : null;
  const tally = degrees(skip);
  const litCount = Math.ceil(walkP * WALK.length);
  const impossible = time >= at("Four odd points") && !dropped;
  const odds = (Object.values(tally) as number[]).filter((n) => n % 2 === 1).length;

  return (
    <div className="lesson-stage absolute inset-0 flex flex-col bg-ink px-3 pt-3 pb-3 sm:px-8">
      <div className="flex min-h-0 flex-1 flex-col rounded-2xl bg-ink-2">
        <svg viewBox="0 0 640 400" className="min-h-0 w-full flex-1" aria-hidden>
          <ellipse cx="200" cy="70" rx="150" ry="42" fill="var(--color-aegean)" fillOpacity="0.25" />
          <ellipse cx="200" cy="330" rx="150" ry="42" fill="var(--color-aegean)" fillOpacity="0.25" />
          <ellipse cx="200" cy="200" rx="54" ry="40" fill="var(--color-aegean)" fillOpacity="0.35" />
          <ellipse cx="480" cy="200" rx="70" ry="48" fill="var(--color-aegean)" fillOpacity="0.28" />
          {EDGES.map((edge, index) => {
            const shown = draw > index / EDGES.length;
            const gone = edge.id === "cd" && dropped;
            const step = WALK.indexOf(edge.id);
            const lit = step >= 0 && step < litCount;
            return (
              <path
                key={edge.id}
                d={curve(edge.a, edge.b, edge.bend)}
                fill="none"
                stroke={lit ? "var(--color-gold)" : "var(--color-parchment)"}
                strokeWidth={lit ? 7 : 4}
                strokeLinecap="round"
                opacity={gone ? 0.12 : shown ? 0.95 : 0.12}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={shown ? 0 : 1}
              />
            );
          })}
          {(Object.keys(NODES) as NodeId[]).map((id) => {
            const node = NODES[id];
            const odd = tally[id] % 2 === 1;
            const mark = showRule && odd;
            return (
              <g key={id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  fill={mark ? "var(--color-terra)" : "var(--color-parchment)"}
                />
                <text
                  x={node.lx}
                  y={node.ly}
                  textAnchor="middle"
                  fill="var(--color-parchment)"
                  fontFamily="Outfit, system-ui, sans-serif"
                  fontSize="16"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + 8}
                  textAnchor="middle"
                  fill={mark ? "var(--color-parchment)" : "var(--color-ink)"}
                  fontFamily="Fraunces, Georgia, serif"
                  fontSize="22"
                  opacity={showDegree}
                >
                  {tally[id]}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="px-4 pb-3 text-center font-display text-xl text-parchment sm:text-3xl">
          {!showRule && "Seven lines. Four points."}
          {showRule && !dropped && (impossible ? `${odds} odd points. Impossible.` : "A walk needs 0 or 2 odd points.")}
          {dropped && walkP < 0.08 && `${odds} odd points. A walk exists.`}
          {dropped && walkP >= 0.08 && "Start at one odd point. End at the other."}
        </p>
      </div>
    </div>
  );
}

export function Theory({ time, at }: { time: number; at: At }) {
  const named = span(time, at("He had founded graph theory"), at("He had founded graph theory") + 0.5);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="font-display text-2xl text-parchment-dim sm:text-4xl">Only what is connected.</p>
      <p className="mt-4 font-display text-4xl text-gold italic sm:text-6xl" style={{ opacity: named }}>
        Graph theory
      </p>
    </div>
  );
}

export function Routes({ time, at }: { time: number; at: At }) {
  const bits = [
    { t: at("routes a letter"), label: "A letter" },
    { t: at("a flight"), label: "A flight" },
    { t: at("a wire"), label: "A wire under the sea" },
  ];
  return (
    <div className="absolute inset-0 bg-ink">
      <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
        <path d="M40 80 L180 140 L300 60 L460 160 L600 90" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
        <path d="M80 260 L200 200 L340 280 L520 210 L600 250" fill="none" stroke="var(--color-aegean)" strokeWidth="2" />
        {[
          [180, 140],
          [300, 60],
          [460, 160],
          [200, 200],
          [340, 280],
          [520, 210],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="var(--color-parchment)" />
        ))}
      </svg>
      <div className="absolute inset-x-0 top-[18%] flex flex-col items-center gap-2 px-6 text-center">
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
  const line = span(time, at("Draw the points"), at("Draw the points") + 0.6);
  return (
    <div className="absolute inset-0">
      <Plate src="/art/euler-late.jpg" time={time} start={start} end={end} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
      <div className="absolute inset-x-0 top-[16%] px-6 text-center" style={{ opacity: line }}>
        <p className="font-display text-4xl text-gold sm:text-6xl">Count the odds</p>
        <p className="mt-3 text-sm tracking-widest text-parchment uppercase">The walk either exists, or it does not</p>
      </div>
    </div>
  );
}

const GRAPH = new Set(["draw", "degree", "impossible", "repair"]);

export function EulerStage({
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
  const key = GRAPH.has(sceneId) ? "graph" : sceneId;
  return (
    <div key={key} className="scene-in absolute inset-0">
      {sceneId === "city" && <City time={time} end={end} />}
      {sceneId === "letter" && <Letter time={time} start={start} end={end} />}
      {GRAPH.has(sceneId) && <GraphLesson time={time} at={at} />}
      {sceneId === "theory" && <Theory time={time} at={at} />}
      {sceneId === "routes" && <Routes time={time} at={at} />}
      {sceneId === "close" && <Close time={time} start={start} end={end} at={at} />}
    </div>
  );
}
