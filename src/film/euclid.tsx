import { smooth, span } from "./geometry";
import { Lesson, Opening, Still, WordCard } from "./kit";
import { euclidAt } from "./series-cues";

type Props = {
  sceneId: string;
  time: number;
  start: number;
  end: number;
  at: (fragment: string) => number;
};

const PRIMES = [2, 3, 5, 7];

function EuclidLesson({ time, at }: { time: number; at: Props["at"] }) {
  const showProd = time >= at(euclidAt.product);
  const six = time >= at("Two times three");
  const thirty = time >= at("Six times five");
  const twoTen = time >= at("Thirty times seven");
  const plus = time >= at(euclidAt.plus);
  const check = time >= at(euclidAt.check);
  const prime = time >= at("Two hundred eleven is itself");
  const forever = time >= at(euclidAt.forever);
  const rows = Math.ceil(smooth(span(time, at(euclidAt.check), at("None of those"))) * 4);

  let line = "2 × 3 × 5 × 7";
  if (six && !thirty) line = "2 × 3 = 6";
  if (thirty && !twoTen) line = "6 × 5 = 30";
  if (twoTen) line = "30 × 7 = 210";

  let footer = "Every prime on the list.";
  if (showProd && !plus) footer = line;
  if (plus && !check) footer = "210 + 1 = 211";
  if (check && !prime) footer = "Remainder 1, every time.";
  if (prime && !forever) footer = "211 is prime.";
  if (forever) footer = "There is no last prime.";

  return (
    <Lesson footer={footer}>
      <svg viewBox="0 0 640 360" className="min-h-0 w-full flex-1" aria-hidden>
        {PRIMES.map((n, i) => (
          <g key={n}>
            <circle
              cx={145 + i * 116}
              cy={70}
              r={34}
              fill={forever ? "var(--color-ink)" : "var(--color-parchment)"}
              stroke="var(--color-gold)"
              strokeWidth={forever ? 3 : 0}
            />
            <text
              x={145 + i * 116}
              y={82}
              textAnchor="middle"
              fontFamily="Fraunces, Georgia, serif"
              fontSize="32"
              fill={forever ? "var(--color-parchment)" : "var(--color-ink)"}
            >
              {n}
            </text>
          </g>
        ))}
        {showProd && (
          <text
            x="320"
            y="175"
            textAnchor="middle"
            fill="var(--color-parchment)"
            fontFamily="Fraunces, Georgia, serif"
            fontSize="40"
          >
            {line}
          </text>
        )}
        {plus && (
          <text
            x="320"
            y="230"
            textAnchor="middle"
            fill="var(--color-gold)"
            fontFamily="Fraunces, Georgia, serif"
            fontSize="42"
          >
            210 + 1 = 211
          </text>
        )}
        {check &&
          PRIMES.map((n, i) => (
            <g key={`r${n}`} opacity={i < rows ? 1 : 0.12}>
              <text
                x={110 + i * 140}
                y={292}
                textAnchor="middle"
                fill="var(--color-parchment-dim)"
                fontFamily="Outfit, system-ui, sans-serif"
                fontSize="18"
              >
                {`211 ÷ ${n}`}
              </text>
              <text
                x={110 + i * 140}
                y={324}
                textAnchor="middle"
                fill="var(--color-gold)"
                fontFamily="Fraunces, Georgia, serif"
                fontSize="26"
              >
                rem 1
              </text>
            </g>
          ))}
      </svg>
    </Lesson>
  );
}

const LESSON = new Set(["list", "product", "plus", "check", "forever"]);

export function EuclidStage({ sceneId, time, start, end, at }: Props) {
  const key = LESSON.has(sceneId) ? "primes" : sceneId;
  return (
    <div key={key} className="scene-in absolute inset-0">
      {sceneId === "city" && (
        <Opening
          src="/art/alexandria.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Episode three"
          title="No Last Prime"
          name="Euclid"
        />
      )}
      {sceneId === "book" && (
        <WordCard eyebrow="The Elements" line="Each truth rests on the one before." />
      )}
      {LESSON.has(sceneId) && <EuclidLesson time={time} at={at} />}
      {sceneId === "method" && (
        <WordCard eyebrow="Not a bigger number" line="A proof." sub="The list can never close." />
      )}
      {sceneId === "close" && (
        <Still
          src="/art/euclid-late.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Start with the primes you know"
          line="Add one"
        />
      )}
    </div>
  );
}
