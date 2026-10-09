import { smooth, span } from "./geometry";
import { Lesson, Opening, Still, WordCard, useReduced } from "./kit";
import { newtonAt } from "./series-cues";

type Props = {
  sceneId: string;
  time: number;
  start: number;
  end: number;
  at: (fragment: string) => number;
};

const S = 34;
const OX = 78;
const OY = 348;

function X(x: number) {
  return OX + x * S;
}
function Y(y: number) {
  return OY - y * S;
}

function SlopeLesson({ time, at }: { time: number; at: Props["at"] }) {
  const reduced = useReduced();
  const started = time >= at(newtonAt.slide);
  const kissing = time >= at(newtonAt.kiss);
  const names = time >= at(newtonAt.names);
  const still = time >= at(newtonAt.still);
  const xb = kissing || (reduced && started) ? 1 : 3 - 2 * smooth(span(time, at(newtonAt.slide), at(newtonAt.kiss)));
  const m = Math.abs(xb - 1) < 0.02 ? 2 : xb + 1;
  const yb = xb * xb;

  let d = "";
  for (let x = 0; x <= 3.15; x += 0.05) {
    d += `${x === 0 ? "M" : "L"}${X(x).toFixed(1)} ${Y(x * x).toFixed(1)}`;
  }

  const lo = Math.max(0.15, 1 - 1 / m);
  const hi = Math.min(3.1, 1 + 8.8 / m);
  const yOn = (x: number) => 1 + m * (x - 1);

  let footer = "Join two points. The slope is an average.";
  if (started && !kissing) footer = `Rise over run = ${m.toFixed(2)}`;
  if (kissing && !names) footer = "This instant. Slope 2.";
  if (names && !still) footer = "Newton called that rate a fluxion.";
  if (still) footer = "A speedometer is this slope.";

  return (
    <Lesson footer={footer}>
      <svg viewBox="0 0 640 360" className="min-h-0 w-full flex-1" aria-hidden>
        <line x1={OX} y1={16} x2={OX} y2={OY} stroke="var(--color-parchment)" strokeWidth="1.5" opacity="0.7" />
        <line x1={OX} y1={OY} x2={X(3.2)} y2={OY} stroke="var(--color-parchment)" strokeWidth="1.5" opacity="0.7" />
        <path d={d} fill="none" stroke="var(--color-aegean)" strokeWidth="4" />
        <line
          x1={X(lo)}
          y1={Y(yOn(lo))}
          x2={X(hi)}
          y2={Y(yOn(hi))}
          stroke={kissing ? "var(--color-gold)" : "var(--color-parchment)"}
          strokeWidth={kissing ? 4 : 2}
        />
        {!kissing && (
          <path
            d={`M${X(1)} ${Y(1)} L${X(xb)} ${Y(1)} L${X(xb)} ${Y(yb)}`}
            fill="none"
            stroke="var(--color-terra)"
            strokeWidth="2"
          />
        )}
        <circle cx={X(1)} cy={Y(1)} r="7" fill="var(--color-parchment)" />
        <circle cx={X(xb)} cy={Y(yb)} r="7" fill="var(--color-gold)" />
        <text x="400" y="120" fill="var(--color-parchment-dim)" fontFamily="Outfit, system-ui, sans-serif" fontSize="18">
          {kissing ? "this instant" : "average"}
        </text>
        <text x="400" y="180" fill="var(--color-gold)" fontFamily="Fraunces, Georgia, serif" fontSize="64">
          {kissing ? "2" : m.toFixed(2)}
        </text>
      </svg>
    </Lesson>
  );
}

const SLOPE = new Set(["draw", "slide", "kiss", "names", "still"]);

export function NewtonStage({ sceneId, time, start, end, at }: Props) {
  const key = SLOPE.has(sceneId) ? "slope" : sceneId;
  return (
    <div key={key} className="scene-in absolute inset-0">
      {sceneId === "city" && (
        <Opening
          src="/art/woolsthorpe.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Episode seven"
          title="The Instant"
          name="Newton"
        />
      )}
      {sceneId === "both" && (
        <WordCard
          eyebrow="Newton and Leibniz"
          line="Calculus"
          sub="One published first. The other had begun earlier. The idea belongs to both."
        />
      )}
      {SLOPE.has(sceneId) && <SlopeLesson time={time} at={at} />}
      {sceneId === "close" && (
        <Still
          src="/art/newton-late.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Bring the points together"
          line="Read the slope"
        />
      )}
    </div>
  );
}
