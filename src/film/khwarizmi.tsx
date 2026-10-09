import { Lesson, Opening, Still, WordCard } from "./kit";
import { khwarizmiAt } from "./series-cues";

type Props = {
  sceneId: string;
  time: number;
  start: number;
  end: number;
  at: (fragment: string) => number;
};

function SquareLesson({ time, at }: { time: number; at: Props["at"] }) {
  const drawn = time >= at("Draw the square");
  const rects = time >= at("Lay a rectangle");
  const missing = time >= at(khwarizmiAt.corner);
  const corner = time >= at("That corner is five");
  const added = time >= at("Thirty-nine plus");
  const eight = time >= at("Sixty-four is eight");
  const three = time >= at("The unknown side is three");
  const check = time >= at("Three squared is nine");

  let footer = "A square, plus ten times its side, equals 39.";
  if (drawn && !rects) footer = "The side is the unknown.";
  if (rects && !missing) footer = "Five along each of two sides.";
  if (missing && !corner) footer = "The corner is still missing.";
  if (corner && !added) footer = "Five by five is 25.";
  if (added && !eight) footer = "39 + 25 = 64.";
  if (eight && !three) footer = "The big side is 8.";
  if (three && !check) footer = "The unknown is 3.";
  if (check) footer = "9 + 30 = 39.";

  const u = 28;
  const side = 3 * u;
  const five = 5 * u;
  const x0 = (640 - side - five) / 2;
  const y0 = (360 - side - five) / 2;

  return (
    <Lesson footer={footer}>
      <svg viewBox="0 0 640 360" className="min-h-0 w-full flex-1" aria-hidden>
        {!drawn && (
          <text
            x="320"
            y="190"
            textAnchor="middle"
            fill="var(--color-parchment)"
            fontFamily="Fraunces, Georgia, serif"
            fontSize="36"
          >
            square + 10 × side = 39
          </text>
        )}
        {drawn && (
          <g>
            <rect x={x0} y={y0} width={side} height={side} fill="var(--color-aegean)" fillOpacity="0.55" stroke="var(--color-parchment)" strokeWidth="2" />
            <text x={x0 + side / 2} y={y0 + side / 2 + 8} textAnchor="middle" fill="var(--color-parchment)" fontFamily="Fraunces, Georgia, serif" fontSize="28">
              {three ? "3" : "side"}
            </text>
            <rect
              x={x0 + side}
              y={y0}
              width={five}
              height={side}
              fill="var(--color-parchment)"
              fillOpacity={rects ? 0.18 : 0}
              stroke="var(--color-parchment)"
              strokeWidth="2"
              opacity={rects ? 1 : 0}
            />
            {rects && (
              <text x={x0 + side + five / 2} y={y0 + side / 2 + 6} textAnchor="middle" fill="var(--color-parchment)" fontFamily="Outfit, system-ui, sans-serif" fontSize="18">
                5 × side
              </text>
            )}
            <rect
              x={x0}
              y={y0 + side}
              width={side}
              height={five}
              fill="var(--color-parchment)"
              fillOpacity={rects ? 0.18 : 0}
              stroke="var(--color-parchment)"
              strokeWidth="2"
              opacity={rects ? 1 : 0}
            />
            {rects && (
              <text
                x={x0 + side / 2}
                y={y0 + side + five / 2}
                textAnchor="middle"
                fill="var(--color-parchment)"
                fontFamily="Outfit, system-ui, sans-serif"
                fontSize="18"
                transform={`rotate(-90 ${x0 + side / 2} ${y0 + side + five / 2})`}
              >
                5 × side
              </text>
            )}
            <rect
              x={x0 + side}
              y={y0 + side}
              width={five}
              height={five}
              fill={corner ? "var(--color-gold)" : "var(--color-terra)"}
              fillOpacity={corner ? 0.85 : missing ? 0.08 : 0}
              stroke={corner ? "var(--color-gold)" : "var(--color-parchment)"}
              strokeWidth="2"
              strokeDasharray={corner ? undefined : "6 6"}
              opacity={missing || corner ? 1 : 0}
            />
            {corner && (
              <text x={x0 + side + five / 2} y={y0 + side + five / 2 + 10} textAnchor="middle" fill="var(--color-ink)" fontFamily="Fraunces, Georgia, serif" fontSize="40">
                25
              </text>
            )}
            {eight && (
              <text x={x0 + (side + five) / 2} y={y0 - 12} textAnchor="middle" fill="var(--color-gold)" fontFamily="Fraunces, Georgia, serif" fontSize="24">
                8
              </text>
            )}
          </g>
        )}
      </svg>
    </Lesson>
  );
}

const LESSON = new Set(["puzzle", "draw", "corner", "complete", "check"]);

export function KhwarizmiStage({ sceneId, time, start, end, at }: Props) {
  const key = LESSON.has(sceneId) ? "square" : sceneId;
  return (
    <div key={key} className="scene-in absolute inset-0">
      {sceneId === "city" && (
        <Opening
          src="/art/baghdad.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Episode five"
          title="The Unknown"
          name="Al-Khwarizmi"
        />
      )}
      {sceneId === "book" && (
        <WordCard
          eyebrow="Al-jabr"
          line="Algebra"
          sub="Restore the equation. Then keep both sides equal."
        />
      )}
      {LESSON.has(sceneId) && <SquareLesson time={time} at={at} />}
      {sceneId === "word" && (
        <WordCard eyebrow="His name, carried into Latin" line="Algorithm" sub="A list of steps that cannot wander." />
      )}
      {sceneId === "close" && (
        <Still
          src="/art/khwarizmi-desk.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Name the unknown"
          line="Complete the square"
        />
      )}
    </div>
  );
}
