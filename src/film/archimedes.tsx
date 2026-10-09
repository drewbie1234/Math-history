import { Lesson, Opening, Still, WordCard } from "./kit";
import { archimedesAt } from "./series-cues";

type Props = {
  sceneId: string;
  time: number;
  start: number;
  end: number;
  at: (fragment: string) => number;
};

function poly(n: number, radius: number, cx: number, cy: number, outer: boolean) {
  const rad = outer ? radius / Math.cos(Math.PI / n) : radius;
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const x = cx + rad * Math.cos(a);
    const y = cy + rad * Math.sin(a);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d}Z`;
}

function sides(time: number, at: Props["at"]) {
  if (time >= at("Then ninety-six")) return 96;
  if (time >= at("Then forty-eight")) return 48;
  if (time >= at("Twelve became twenty-four")) return 24;
  if (time >= at("Six became twelve")) return 12;
  return 6;
}

function Cage({ time, at }: { time: number; at: Props["at"] }) {
  const n = sides(time, at);
  const showBound = time >= at("Pi is larger");
  const cx = 210;
  const cy = 168;
  const r = 112;
  const footer = showBound ? "3 + 10/71  <  π  <  3 + 1/7" : `${n} sides`;
  return (
    <Lesson footer={footer}>
      <svg viewBox="0 0 640 360" className="min-h-0 w-full flex-1" aria-hidden>
        {n > 6 && (
          <path d={poly(6, r, cx, cy, true)} fill="none" stroke="var(--color-terra)" strokeWidth="2" opacity="0.35" />
        )}
        <path d={poly(n, r, cx, cy, true)} fill="none" stroke="var(--color-gold)" strokeWidth="3" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-aegean)" strokeWidth="4" />
        <path d={poly(n, r, cx, cy, false)} fill="none" stroke="var(--color-parchment)" strokeWidth="3" />
        <text x="470" y="150" textAnchor="middle" fill="var(--color-gold)" fontFamily="Fraunces, Georgia, serif" fontSize="72">
          {n}
        </text>
        <text x="470" y="186" textAnchor="middle" fill="var(--color-parchment-dim)" fontFamily="Outfit, system-ui, sans-serif" fontSize="18">
          sides
        </text>
        {showBound && (
          <text x="470" y="250" textAnchor="middle" fill="var(--color-parchment)" fontFamily="Fraunces, Georgia, serif" fontSize="28">
            {"3 + 10/71 < π"}
          </text>
        )}
        {showBound && (
          <text x="470" y="286" textAnchor="middle" fill="var(--color-parchment)" fontFamily="Fraunces, Georgia, serif" fontSize="28">
            {"π < 3 + 1/7"}
          </text>
        )}
      </svg>
    </Lesson>
  );
}

const CAGE = new Set(["trap", "double", "bound"]);

export function ArchimedesStage({ sceneId, time, start, end, at }: Props) {
  const key = CAGE.has(sceneId) ? "cage" : sceneId === "name" || sceneId === "still" ? "word" : sceneId;
  return (
    <div key={key} className="scene-in absolute inset-0">
      {sceneId === "city" && (
        <Opening
          src="/art/syracuse.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Episode four"
          title="The Cage"
          name="Archimedes"
        />
      )}
      {CAGE.has(sceneId) && <Cage time={time} at={at} />}
      {(sceneId === "name" || sceneId === "still") && (
        <WordCard
          eyebrow="The method"
          line="Exhaustion"
          sub={
            sceneId === "still"
              ? "Every wheel and every orbit still lives in that squeeze."
              : "The circle runs out of places to hide."
          }
        />
      )}
      {sceneId === "close" && (
        <Still
          src="/art/archimedes-sand.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Draw a circle"
          line="Double the sides"
        />
      )}
    </div>
  );
}
