import type { ComponentType } from "react";
import { ArchimedesStage } from "./archimedes";
import { cues } from "./cues";
import { DescartesStage } from "./descartes";
import { eulerCues } from "./euler-cues";
import { EulerStage } from "./euler";
import { EuclidStage } from "./euclid";
import { KhwarizmiStage } from "./khwarizmi";
import { NewtonStage } from "./newton";
import { NoetherStage } from "./noether";
import {
  archimedesCues,
  descartesCues,
  euclidCues,
  khwarizmiCues,
  newtonCues,
  noetherCues,
  turingCues,
} from "./series-cues";
import { TuringStage } from "./turing";
import { Stage } from "./visuals";
import type { Cues } from "./cues";

export type StageProps = {
  sceneId: string;
  time: number;
  start: number;
  end: number;
  at: (fragment: string) => number;
};

export type Episode = {
  id: string;
  number: string;
  person: string;
  title: string;
  line: string;
  poster: string;
  audio: string;
  cues: Cues;
  Stage: ComponentType<StageProps>;
};

export const episodes: Episode[] = [
  {
    id: "pythagoras",
    number: "Episode 1",
    person: "Pythagoras",
    title: "All Is Number",
    line: "A right angle, and why the squares must agree.",
    poster: "/art/samos.jpg",
    audio: "/audio/narration.mp3",
    cues,
    Stage,
  },
  {
    id: "euler",
    number: "Episode 2",
    person: "Euler",
    title: "Seven Bridges",
    line: "A Sunday walk that founded graph theory.",
    poster: "/art/konigsberg.jpg",
    audio: "/audio/euler.mp3",
    cues: eulerCues,
    Stage: EulerStage,
  },
  {
    id: "euclid",
    number: "Episode 3",
    person: "Euclid",
    title: "No Last Prime",
    line: "A list of primes that cannot close.",
    poster: "/art/alexandria.jpg",
    audio: "/audio/euclid.mp3",
    cues: euclidCues,
    Stage: EuclidStage,
  },
  {
    id: "archimedes",
    number: "Episode 4",
    person: "Archimedes",
    title: "The Cage",
    line: "A circle, trapped until pi has to speak.",
    poster: "/art/syracuse.jpg",
    audio: "/audio/archimedes.mp3",
    cues: archimedesCues,
    Stage: ArchimedesStage,
  },
  {
    id: "khwarizmi",
    number: "Episode 5",
    person: "Al-Khwarizmi",
    title: "The Unknown",
    line: "Complete the square, and the unknown steps out.",
    poster: "/art/baghdad.jpg",
    audio: "/audio/khwarizmi.mp3",
    cues: khwarizmiCues,
    Stage: KhwarizmiStage,
  },
  {
    id: "descartes",
    number: "Episode 6",
    person: "Descartes",
    title: "The Plane",
    line: "A point is a pair of numbers.",
    poster: "/art/holland.jpg",
    audio: "/audio/descartes.mp3",
    cues: descartesCues,
    Stage: DescartesStage,
  },
  {
    id: "newton",
    number: "Episode 7",
    person: "Newton",
    title: "The Instant",
    line: "The slope at one moment. Newton and Leibniz.",
    poster: "/art/woolsthorpe.jpg",
    audio: "/audio/newton.mp3",
    cues: newtonCues,
    Stage: NewtonStage,
  },
  {
    id: "noether",
    number: "Episode 8",
    person: "Noether",
    title: "What Is Kept",
    line: "A change that leaves the law alone.",
    poster: "/art/gottingen.jpg",
    audio: "/audio/noether.mp3",
    cues: noetherCues,
    Stage: NoetherStage,
  },
  {
    id: "turing",
    number: "Episode 9",
    person: "Turing",
    title: "The Halt",
    line: "A question no machine can settle.",
    poster: "/art/cambridge.jpg",
    audio: "/audio/turing.mp3",
    cues: turingCues,
    Stage: TuringStage,
  },
];
