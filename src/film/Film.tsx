import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Episode } from "./catalog";
import type { Cues } from "./cues";

function fmt(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function captionAt(time: number, cues: Cues) {
  let text = "";
  for (const cue of cues.captions) {
    if (time >= cue.t - 0.04) text = cue.text;
  }
  return text;
}

export function Film({
  episode,
  onBack,
  onNext,
  nextLabel,
}: {
  episode: Episode;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
}) {
  const cues = episode.cues;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [record, setRecord] = useState(false);
  const [chapters, setChapters] = useState(false);
  const [hot, setHot] = useState(true);

  const at = useCallback((fragment: string) => {
    const hit = cues.captions.find((cue) => cue.text.includes(fragment));
    return hit?.t ?? 0;
  }, [cues]);

  const scene = useMemo(() => {
    let current = cues.scenes[0];
    for (const item of cues.scenes) {
      if (time >= item.t) current = item;
    }
    const index = cues.scenes.findIndex((item) => item.id === current.id);
    const end = cues.scenes[index + 1]?.t ?? cues.duration;
    return { ...current, end };
  }, [cues, time]);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) setTime(audio.currentTime);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!record || !playing) return;
    setHot(true);
    const id = window.setTimeout(() => setHot(false), 1600);
    return () => window.clearTimeout(id);
  }, [record, playing]);

  const seek = useCallback((next: number) => {
    const audio = audioRef.current;
    const t = Math.min(cues.duration, Math.max(0, next));
    if (audio) audio.currentTime = t;
    setTime(t);
    setEnded(false);
  }, [cues.duration]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (ended || audio.currentTime >= cues.duration - 0.05) {
      audio.currentTime = 0;
      setTime(0);
      setEnded(false);
      try {
        await audio.play();
      } catch {
        /* gesture already consumed; the button stays */
      }
      return;
    }
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        /* autoplay blocked before a gesture */
      }
    } else {
      audio.pause();
    }
  }, [ended]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input")) return;
      if (event.code === "Space") {
        if (target instanceof HTMLElement && target.closest("button")) return;
        event.preventDefault();
        void toggle();
      } else if (event.code === "ArrowRight") {
        seek((audioRef.current?.currentTime ?? time) + 5);
      } else if (event.code === "ArrowLeft") {
        seek((audioRef.current?.currentTime ?? time) - 5);
      } else if (event.key === "c" || event.key === "C") {
        setCaptionsOn((on) => !on);
      } else if (event.key === "Escape") {
        setRecord(false);
        setChapters(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [seek, time, toggle]);

  const caption = captionAt(time, cues);
  const showCaption = captionsOn && (playing || time > 0.25) && caption.length > 0;
  const pct = cues.duration > 0 ? (time / cues.duration) * 100 : 0;
  const poster = !playing && time < 0.2 && !ended;

  return (
    <div
      className="theater grid h-dvh grid-rows-[auto_minmax(0,1fr)_auto] bg-ink text-parchment"
      data-record={record ? "true" : "false"}
      onMouseMove={() => {
        if (record) setHot(true);
      }}
    >
      <audio
        ref={audioRef}
        src={episode.audio}
        playsInline
        preload="auto"
        onPlay={() => {
          setPlaying(true);
          setEnded(false);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setEnded(true);
          setTime(cues.duration);
        }}
      />

      {record ? (
        <div />
      ) : (
        <header className="flex h-12 items-center justify-between gap-3 px-4 sm:px-6">
          <button type="button" onClick={onBack} className="h-11 text-sm text-gold">
            Series
          </button>
          <p className="font-display text-lg text-parchment">All Is Number</p>
          <p className="text-sm text-parchment-dim">{episode.person}</p>
        </header>
      )}

      <div className={record ? "stage-slot" : "stage-slot p-2 sm:p-3"}>
        <div className="flex h-full w-full items-center justify-center">
          <div className="fit-16x9 film-frame relative bg-ink">
            <episode.Stage sceneId={scene.id} time={time} start={scene.t} end={scene.end} at={at} />

            {showCaption && record && (
              <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex justify-center">
                <p className="max-w-2xl rounded-md bg-ink/80 px-3 py-1.5 text-center text-xs leading-normal text-parchment sm:text-base">
                  {caption}
                </p>
              </div>
            )}

            {!playing && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-ink/30">
                <button
                  type="button"
                  onClick={() => void toggle()}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink"
                  aria-label={ended ? "Play again" : poster ? "Play the film" : "Play"}
                >
                  <Play aria-hidden className="ml-1 h-7 w-7" fill="currentColor" />
                </button>
                {poster && (
                  <p className="text-sm text-parchment">Play the film</p>
                )}
                {ended && <p className="text-sm text-parchment">Play again</p>}
                {ended && onNext && (
                  <button
                    type="button"
                    onClick={onNext}
                    className="h-11 rounded-full bg-parchment px-4 text-sm font-medium text-ink"
                  >
                    Next: {nextLabel}
                  </button>
                )}
              </div>
            )}

            {record && (hot || !playing) && (
              <button
                type="button"
                onClick={() => setRecord(false)}
                className="absolute top-3 right-3 z-30 h-11 rounded-full bg-ink/75 px-4 text-sm text-parchment"
              >
                Exit
              </button>
            )}
          </div>
        </div>
      </div>

      {record ? (
        <div />
      ) : (
        <footer className="px-3 pt-1 pb-3 sm:px-6">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-1">
            {showCaption && (
              <p className="min-h-6 text-center text-sm leading-normal text-parchment">{caption}</p>
            )}
            {!showCaption && <div className="min-h-6" />}
            <div className="flex items-center gap-3">
              <span className="w-10 text-xs text-parchment-dim tabular-nums">{fmt(time)}</span>
              <div className="relative flex h-11 flex-1 items-center">
                <div className="relative h-1.5 w-full rounded-full bg-ink-2">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
                <input
                  suppressHydrationWarning
                  className="scrub absolute inset-0 h-full w-full"
                  type="range"
                  min={0}
                  max={cues.duration}
                  step={0.05}
                  value={Math.min(time, cues.duration)}
                  aria-label="Seek"
                  onChange={(event) => seek(Number(event.target.value))}
                />
              </div>
              <span className="w-10 text-right text-xs text-parchment-dim tabular-nums">{fmt(cues.duration)}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void toggle()}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-4 text-sm font-medium text-ink"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="h-4 w-4" fill="currentColor" />}
                {playing ? "Pause" : ended ? "Replay" : "Play"}
              </button>
              <button
                type="button"
                onClick={() => setCaptionsOn((on) => !on)}
                className="inline-flex h-11 items-center rounded-full bg-ink-2 px-4 text-sm text-parchment"
                aria-pressed={captionsOn}
              >
                {captionsOn ? "Captions on" : "Captions off"}
              </button>
              <button
                type="button"
                onClick={() => setChapters((open) => !open)}
                className="inline-flex h-11 items-center rounded-full bg-ink-2 px-4 text-sm text-parchment"
                aria-expanded={chapters}
              >
                Scenes
              </button>
              <button
                type="button"
                onClick={() => {
                  setRecord(true);
                  setChapters(false);
                  setHot(true);
                }}
                className="inline-flex h-11 items-center rounded-full bg-ink-2 px-4 text-sm text-parchment"
              >
                Clean frame
              </button>
            </div>

            {chapters && (
              <div className="flex gap-2 overflow-x-auto py-1">
                {cues.scenes.map((item) => {
                  const on = item.id === scene.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        seek(item.t);
                        if (audioRef.current?.paused) void audioRef.current.play();
                      }}
                      className={
                        on
                          ? "h-10 shrink-0 rounded-full bg-gold px-3 text-sm text-ink"
                          : "h-10 shrink-0 rounded-full bg-ink-2 px-3 text-sm text-parchment"
                      }
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
