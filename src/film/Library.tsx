import { episodes } from "./catalog";

export function Library({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <main className="h-dvh overflow-y-auto bg-ink text-parchment">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
        <header className="max-w-xl">
          <p className="text-xs font-medium tracking-widest text-gold uppercase">A series</p>
          <h1 className="mt-2 font-display text-5xl leading-none text-parchment sm:text-6xl">All Is Number</h1>
          <p className="mt-4 max-w-xl text-base leading-normal text-parchment-dim">
            Nine short films. A new voice each time. Each one turns a puzzle into a theory.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <button
              key={episode.id}
              type="button"
              onClick={() => onOpen(episode.id)}
              className="overflow-hidden rounded-2xl bg-ink-2 text-left text-parchment"
            >
              <img src={episode.poster} alt="" className="aspect-video w-full object-cover" />
              <span className="flex flex-col gap-1 px-4 py-4">
                <span className="text-xs font-medium tracking-widest text-gold uppercase">{episode.number}</span>
                <span className="font-display text-3xl">{episode.person}</span>
                <span className="text-sm leading-normal text-parchment-dim">{episode.line}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
