export type Pt = { x: number; y: number };

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function smooth(t: number) {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
}

export function span(time: number, start: number, end: number) {
  return clamp((time - start) / Math.max(0.001, end - start));
}

export function mixPts(from: Pt[], to: Pt[], k: number): Pt[] {
  return from.map((p, i) => ({
    x: lerp(p.x, to[i].x, k),
    y: lerp(p.y, to[i].y, k),
  }));
}

export function pathOf(pts: Pt[], close = true) {
  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  return close ? `${d} Z` : d;
}

export const PROOF_A = 96;
export const PROOF_B = 128;

export function proofFrames(a = PROOF_A, b = PROOF_B) {
  const S = a + b;
  const from: Pt[][] = [
    [
      { x: 0, y: 0 },
      { x: a, y: 0 },
      { x: 0, y: b },
    ],
    [
      { x: S, y: 0 },
      { x: a, y: 0 },
      { x: S, y: a },
    ],
    [
      { x: 0, y: S },
      { x: 0, y: b },
      { x: b, y: S },
    ],
    [
      { x: S, y: S },
      { x: b, y: S },
      { x: S, y: a },
    ],
  ];
  const to: Pt[][] = [
    [
      { x: 0, y: 0 },
      { x: b, y: 0 },
      { x: b, y: a },
    ],
    [
      { x: S, y: 0 },
      { x: b, y: 0 },
      { x: S, y: b },
    ],
    [
      { x: 0, y: a },
      { x: 0, y: 0 },
      { x: b, y: a },
    ],
    [
      { x: S, y: b },
      { x: b, y: b },
      { x: b, y: 0 },
    ],
  ];
  const inner: Pt[] = [
    { x: a, y: 0 },
    { x: 0, y: b },
    { x: b, y: S },
    { x: S, y: a },
  ];
  return { a, b, S, from, to, inner };
}

function rot(v: Pt, ang: number): Pt {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
}

/** 12-unit rope folding into a 3-4-5 right triangle. k = 0 straight, k = 1 closed. */
export function ropeKnots(k: number): Pt[] {
  const turnA = (Math.PI / 2) * k;
  const turnB = (Math.PI - Math.atan2(3, 4)) * k;
  let pos = { x: 0, y: 3 };
  let dir = { x: 0, y: -1 };
  const raw: Pt[] = [{ ...pos }];
  const segs = [
    { len: 3, turn: turnA },
    { len: 4, turn: turnB },
    { len: 5, turn: 0 },
  ];
  for (const seg of segs) {
    for (let i = 0; i < seg.len; i++) {
      pos = { x: pos.x + dir.x, y: pos.y + dir.y };
      raw.push({ ...pos });
    }
    dir = rot(dir, seg.turn);
  }
  const o = raw[0];
  return raw.map((p) => {
    const x = p.x - o.x;
    const y = p.y - o.y;
    const rx = -y;
    const ry = x;
    return { x: rx, y: -ry };
  });
}
