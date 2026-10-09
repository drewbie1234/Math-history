import { Lesson, Opening, Still, useReduced } from "./kit";
import { turingAt } from "./series-cues";

type Props = {
  sceneId: string;
  time: number;
  start: number;
  end: number;
  at: (fragment: string) => number;
};

const CELLS = ["·", "1", "0", "1", "1", "0", "1", "·"];

function Machine({ time, at }: { time: number; at: Props["at"] }) {
  const reduced = useReduced();
  const head = reduced ? 3 : Math.floor(time / 0.7) % CELLS.length;
  const checker = time >= at(turingAt.checker);
  const twist = time >= at(turingAt.twist);
  const saysHalt = time >= at("If the checker says halt");
  const saysLoop = time >= at("If the checker says loop");
  const wrong = time >= at(turingAt.wrong);

  let footer = "A tape. A head. One square at a time.";
  if (time >= at("will it halt")) footer = "Will it halt, or run forever?";
  if (checker && !twist) footer = "Suppose a checker always answers.";
  if (twist && !wrong) footer = "It asks about itself, then disobeys.";
  if (wrong) footer = "Either answer is wrong.";

  return (
    <Lesson footer={footer}>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 px-3 py-3 sm:px-6">
        <div className="flex items-end justify-center gap-1">
          {CELLS.map((cell, i) => (
            <div key={`${cell}-${i}`} className="flex w-8 flex-col items-center sm:w-10">
              <div className="h-4 text-center text-gold">{i === head ? "▼" : ""}</div>
              <div
                className="flex h-12 w-full items-center justify-center border text-lg text-parchment"
                style={{
                  borderColor: i === head ? "var(--color-gold)" : "color-mix(in srgb, var(--color-parchment) 35%, transparent)",
                  background: i === head ? "color-mix(in srgb, var(--color-gold) 18%, transparent)" : "transparent",
                }}
              >
                {cell}
              </div>
            </div>
          ))}
        </div>
        {checker && (
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl bg-ink px-4 py-3">
              <p className="text-xs tracking-widest text-gold uppercase">Checker</p>
              <p className="mt-1 font-display text-2xl text-parchment">Halt, or loop.</p>
            </div>
            <div className="rounded-xl bg-ink px-4 py-3" style={{ opacity: twist ? 1 : 0.35 }}>
              <p className="text-xs tracking-widest text-gold uppercase">Then it disobeys</p>
              <p className="mt-1 font-display text-xl text-parchment" style={{ opacity: saysHalt ? 1 : 0.35 }}>
                Says halt → it loops
              </p>
              <p className="font-display text-xl" style={{ color: saysLoop || wrong ? "var(--color-terra)" : "var(--color-parchment)", opacity: saysLoop ? 1 : 0.35 }}>
                Says loop → it halts
              </p>
            </div>
          </div>
        )}
      </div>
    </Lesson>
  );
}

const MACHINE = new Set(["question", "checker", "twist", "wrong"]);

export function TuringStage({ sceneId, time, start, end, at }: Props) {
  const onTape = time >= at("He pictured a long tape");
  const diagram = MACHINE.has(sceneId) || (sceneId === "city" && onTape);
  const key = diagram ? "machine" : sceneId;
  return (
    <div key={key} className="scene-in absolute inset-0">
      {sceneId === "city" && !onTape && (
        <Opening
          src="/art/cambridge.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Episode nine"
          title="The Halt"
          name="Turing"
        />
      )}
      {diagram && <Machine time={time} at={at} />}
      {sceneId === "later" && (
        <Still
          src="/art/turing-tape.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Nineteen fifty-four"
          line="The question remained"
        />
      )}
      {sceneId === "close" && (
        <Still
          src="/art/turing-tape.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Write the rules"
          line="Ask whether they end"
        />
      )}
    </div>
  );
}
