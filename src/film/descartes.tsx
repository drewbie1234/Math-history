import { Lesson, Opening, Still, WordCard } from "./kit";
import { descartesAt } from "./series-cues";

type Props = {
  sceneId: string;
  time: number;
  start: number;
  end: number;
  at: (fragment: string) => number;
};

const OX = 86;
const OY = 312;
const SX = 150;
const SY = 24;

function X(x: number) {
  return OX + x * SX;
}
function Y(y: number) {
  return OY - y * SY;
}

function Plane({ time, at }: { time: number; at: Props["at"] }) {
  const one = time >= at("Mark one step across");
  const two = time >= at("Then two across");
  const three = time >= at("Then three across");
  const curve = time >= at(descartesAt.curve);
  const equation = time >= at("The whole curve");
  const pts: [number, number][] = [];
  if (one) pts.push([1, 1]);
  if (two) pts.push([2, 4]);
  if (three) pts.push([3, 9]);

  let d = "";
  if (curve) {
    for (let x = 0; x <= 3.15; x += 0.06) {
      d += `${x === 0 ? "M" : "L"}${X(x).toFixed(1)} ${Y(x * x).toFixed(1)}`;
    }
  }

  let footer = "Two lines. They cross at zero.";
  if (one && !two) footer = "One across, one up.";
  if (two && !three) footer = "Two across, four up.";
  if (three && !curve) footer = "Three across, nine up.";
  if (curve && !equation) footer = "The height is the across-number, squared.";
  if (equation) footer = "Up = across²";

  return (
    <Lesson footer={footer}>
      <svg viewBox="0 0 640 360" className="min-h-0 w-full flex-1" aria-hidden>
        <line x1={OX} y1={24} x2={OX} y2={OY} stroke="var(--color-parchment)" strokeWidth="2" />
        <line x1={OX} y1={OY} x2={620} y2={OY} stroke="var(--color-parchment)" strokeWidth="2" />
        <text x={OX - 16} y={36} fill="var(--color-gold)" fontFamily="Outfit, system-ui, sans-serif" fontSize="16">
          up
        </text>
        <text x={588} y={OY + 22} fill="var(--color-gold)" fontFamily="Outfit, system-ui, sans-serif" fontSize="16">
          across
        </text>
        <text x={OX - 14} y={OY + 18} fill="var(--color-parchment-dim)" fontFamily="Fraunces, Georgia, serif" fontSize="16">
          0
        </text>
        {curve && <path d={d} fill="none" stroke="var(--color-gold)" strokeWidth="3" />}
        {pts.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={X(x)} cy={Y(y)} r="7" fill="var(--color-terra)" />
            <text x={X(x) + 14} y={Y(y) - 10} fill="var(--color-parchment)" fontFamily="Fraunces, Georgia, serif" fontSize="20">
              {`${x}, ${y}`}
            </text>
          </g>
        ))}
        {equation && (
          <text x="120" y="48" fill="var(--color-gold)" fontFamily="Fraunces, Georgia, serif" fontSize="32">
            up = across²
          </text>
        )}
      </svg>
    </Lesson>
  );
}

const PLANE = new Set(["axes", "marks", "curve"]);

export function DescartesStage({ sceneId, time, start, end, at }: Props) {
  const key = PLANE.has(sceneId) ? "plane" : sceneId;
  return (
    <div key={key} className="scene-in absolute inset-0">
      {sceneId === "city" && (
        <Opening
          src="/art/holland.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Episode six"
          title="The Plane"
          name="Descartes"
        />
      )}
      {sceneId === "point" && (
        <WordCard eyebrow="Sixteen thirty-seven" line="A pair of numbers." sub="How far across. How far up." />
      )}
      {PLANE.has(sceneId) && <Plane time={time} at={at} />}
      {sceneId === "join" && (
        <WordCard eyebrow="Pictures and sentences" line="One subject." />
      )}
      {sceneId === "close" && (
        <Still
          src="/art/descartes-desk.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Pick two numbers"
          line="Mark the point"
        />
      )}
    </div>
  );
}
