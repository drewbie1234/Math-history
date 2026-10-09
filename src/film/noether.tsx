import { Lesson, Opening, Still, WordCard, useReduced } from "./kit";
import { noetherAt } from "./series-cues";

type Props = {
  sceneId: string;
  time: number;
  start: number;
  end: number;
  at: (fragment: string) => number;
};

function Laws({ time, at }: { time: number; at: Props["at"] }) {
  const reduced = useReduced();
  const turn = time >= at(noetherAt.turn);
  const wait = time >= at(noetherAt.wait);
  const mode = wait ? "wait" : turn ? "turn" : "slide";
  const shift = reduced ? 0 : (time * 28) % 56;
  const angle = reduced ? 20 : (time * 48) % 360;

  const rows = [
    { id: "slide", title: "Slide the world", kept: "Momentum stays" },
    { id: "turn", title: "Turn the world", kept: "Spin stays" },
    { id: "wait", title: "Let time pass", kept: "Energy stays" },
  ];

  const footer =
    mode === "wait" ? "Energy is conserved." : mode === "turn" ? "Angular momentum is conserved." : "Momentum is conserved.";

  return (
    <Lesson footer={footer}>
      <div className="grid min-h-0 flex-1 grid-rows-3 gap-2 p-3 sm:p-4">
        {rows.map((row) => {
          const on = row.id === mode;
          return (
            <div
              key={row.id}
              className="flex items-center justify-between gap-3 rounded-xl px-3"
              style={{
                background: on ? "color-mix(in srgb, var(--color-gold) 16%, transparent)" : "transparent",
                opacity: on ? 1 : 0.4,
              }}
            >
              <div className="min-w-0">
                <p className="text-xs tracking-widest text-gold uppercase">{row.title}</p>
                <p className="font-display text-2xl text-parchment sm:text-4xl">{row.kept}</p>
              </div>
              {row.id === "slide" && (
                <svg viewBox="0 0 160 36" className="h-9 w-28 shrink-0" aria-hidden>
                  {Array.from({ length: 8 }, (_, i) => (
                    <circle key={i} cx={((i * 28 + shift) % 168) - 8} cy="18" r="5" fill="var(--color-parchment)" />
                  ))}
                </svg>
              )}
              {row.id === "turn" && (
                <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden>
                  <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "18px 18px" }}>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="var(--color-parchment)" strokeWidth="2" />
                    <line x1="18" y1="18" x2="18" y2="6" stroke="var(--color-gold)" strokeWidth="2" />
                  </g>
                </svg>
              )}
              {row.id === "wait" && (
                <svg viewBox="0 0 120 36" className="h-9 w-24 shrink-0" aria-hidden>
                  <line x1="4" y1="18" x2="116" y2="18" stroke="var(--color-gold)" strokeWidth="3" />
                  <circle cx={reduced ? 40 : 20 + ((time * 16) % 80)} cy="18" r="4" fill="var(--color-parchment)" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </Lesson>
  );
}

const LAWS = new Set(["slide", "turn", "wait"]);

export function NoetherStage({ sceneId, time, start, end, at }: Props) {
  const key = LAWS.has(sceneId) ? "laws" : sceneId;
  return (
    <div key={key} className="scene-in absolute inset-0">
      {sceneId === "city" && (
        <Opening
          src="/art/gottingen.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Episode eight"
          title="What Is Kept"
          name="Noether"
        />
      )}
      {sceneId === "idea" && (
        <WordCard eyebrow="Emmy Noether, 1918" line="A change, a constancy." sub="If the law does not notice the change, something cannot be lost." />
      )}
      {LAWS.has(sceneId) && <Laws time={time} at={at} />}
      {sceneId === "later" && (
        <Still
          src="/art/noether-board.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Nineteen thirty-three"
          line="She taught on"
        />
      )}
      {sceneId === "close" && (
        <Still
          src="/art/noether-board.jpg"
          time={time}
          start={start}
          end={end}
          kicker="Find the change that leaves the law alone"
          line="What cannot be lost"
        />
      )}
    </div>
  );
}
