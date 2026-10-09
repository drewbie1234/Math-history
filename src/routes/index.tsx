import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { episodes } from "@/film/catalog";
import { Film } from "@/film/Film";
import { Library } from "@/film/Library";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [id, setId] = useState<string | null>(null);
  const episode = episodes.find((item) => item.id === id);
  if (episode) {
    const next = episodes[episodes.findIndex((item) => item.id === episode.id) + 1];
    return (
      <Film
        key={episode.id}
        episode={episode}
        onBack={() => setId(null)}
        onNext={next ? () => setId(next.id) : undefined}
        nextLabel={next?.person}
      />
    );
  }
  return <Library onOpen={setId} />;
}
