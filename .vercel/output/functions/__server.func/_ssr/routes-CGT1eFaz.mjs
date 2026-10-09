import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Play, r as Pause } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CGT1eFaz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function clamp(v, min = 0, max = 1) {
	return Math.min(max, Math.max(min, v));
}
function lerp(a, b, t) {
	return a + (b - a) * t;
}
function smooth(t) {
	const x = clamp(t);
	return x * x * (3 - 2 * x);
}
function span(time, start, end) {
	return clamp((time - start) / Math.max(.001, end - start));
}
function mixPts(from, to, k) {
	return from.map((p, i) => ({
		x: lerp(p.x, to[i].x, k),
		y: lerp(p.y, to[i].y, k)
	}));
}
function pathOf(pts, close = true) {
	const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
	return close ? `${d} Z` : d;
}
function proofFrames(a = 96, b = 128) {
	const S = a + b;
	return {
		a,
		b,
		S,
		from: [
			[
				{
					x: 0,
					y: 0
				},
				{
					x: a,
					y: 0
				},
				{
					x: 0,
					y: b
				}
			],
			[
				{
					x: S,
					y: 0
				},
				{
					x: a,
					y: 0
				},
				{
					x: S,
					y: a
				}
			],
			[
				{
					x: 0,
					y: S
				},
				{
					x: 0,
					y: b
				},
				{
					x: b,
					y: S
				}
			],
			[
				{
					x: S,
					y: S
				},
				{
					x: b,
					y: S
				},
				{
					x: S,
					y: a
				}
			]
		],
		to: [
			[
				{
					x: 0,
					y: 0
				},
				{
					x: b,
					y: 0
				},
				{
					x: b,
					y: a
				}
			],
			[
				{
					x: S,
					y: 0
				},
				{
					x: b,
					y: 0
				},
				{
					x: S,
					y: b
				}
			],
			[
				{
					x: 0,
					y: a
				},
				{
					x: 0,
					y: 0
				},
				{
					x: b,
					y: a
				}
			],
			[
				{
					x: S,
					y: b
				},
				{
					x: b,
					y: b
				},
				{
					x: b,
					y: 0
				}
			]
		],
		inner: [
			{
				x: a,
				y: 0
			},
			{
				x: 0,
				y: b
			},
			{
				x: b,
				y: S
			},
			{
				x: S,
				y: a
			}
		]
	};
}
function rot(v, ang) {
	const c = Math.cos(ang);
	const s = Math.sin(ang);
	return {
		x: v.x * c - v.y * s,
		y: v.x * s + v.y * c
	};
}
/** 12-unit rope folding into a 3-4-5 right triangle. k = 0 straight, k = 1 closed. */
function ropeKnots(k) {
	const turnA = Math.PI / 2 * k;
	const turnB = (Math.PI - Math.atan2(3, 4)) * k;
	let pos = {
		x: 0,
		y: 3
	};
	let dir = {
		x: 0,
		y: -1
	};
	const raw = [{ ...pos }];
	const segs = [
		{
			len: 3,
			turn: turnA
		},
		{
			len: 4,
			turn: turnB
		},
		{
			len: 5,
			turn: 0
		}
	];
	for (const seg of segs) {
		for (let i = 0; i < seg.len; i++) {
			pos = {
				x: pos.x + dir.x,
				y: pos.y + dir.y
			};
			raw.push({ ...pos });
		}
		dir = rot(dir, seg.turn);
	}
	const o = raw[0];
	return raw.map((p) => {
		const x = p.x - o.x;
		return {
			x: -(p.y - o.y),
			y: -x
		};
	});
}
function useReduced$2() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	}, []);
	return reduced;
}
function Plate$1({ src, time, start, end }) {
	const reduced = useReduced$2();
	const p = span(time, start, end);
	const scale = reduced ? 1.04 : 1.06 + .08 * p;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		className: "absolute inset-0 h-full w-full object-cover",
		style: {
			transform: `scale(${scale})`,
			transformOrigin: "50% 45%"
		}
	});
}
function Opening({ src, time, start, end, kicker, title, name }) {
	const fade = time < start + 6.4 ? 1 : clamp(1 - (time - start - 6.4) / 1.1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate$1, {
				src,
				time,
				start,
				end
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-[14%] px-6 text-center",
				style: { opacity: fade },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-gold uppercase",
						children: kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl leading-none text-parchment sm:text-6xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-2xl text-gold italic sm:text-3xl",
						children: name
					})
				]
			})
		]
	});
}
function Still$1({ src, time, start, end, kicker, line }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate$1, {
				src,
				time,
				start,
				end
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-[16%] px-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-gold uppercase",
					children: kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-4xl text-parchment italic sm:text-6xl",
					children: line
				})]
			})
		]
	});
}
function WordCard({ eyebrow, line, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 flex flex-col items-center justify-center bg-ink px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-widest text-gold uppercase",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-4xl text-parchment italic sm:text-6xl",
				children: line
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-lg text-sm leading-normal text-parchment-dim sm:text-lg",
				children: sub
			})
		]
	});
}
function Lesson({ footer, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lesson-stage absolute inset-0 flex flex-col bg-ink px-3 pt-3 pb-3 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col rounded-2xl bg-ink-2",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pb-3 text-center font-display text-xl leading-tight text-parchment sm:text-3xl",
				children: footer
			})]
		})
	});
}
function poly(n, radius, cx, cy, outer) {
	const rad = outer ? radius / Math.cos(Math.PI / n) : radius;
	let d = "";
	for (let i = 0; i < n; i++) {
		const a = -Math.PI / 2 + i * 2 * Math.PI / n;
		const x = cx + rad * Math.cos(a);
		const y = cy + rad * Math.sin(a);
		d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
	}
	return `${d}Z`;
}
function sides(time, at) {
	if (time >= at("Then ninety-six")) return 96;
	if (time >= at("Then forty-eight")) return 48;
	if (time >= at("Twelve became twenty-four")) return 24;
	if (time >= at("Six became twelve")) return 12;
	return 6;
}
function Cage({ time, at }) {
	const n = sides(time, at);
	const showBound = time >= at("Pi is larger");
	const cx = 210;
	const cy = 168;
	const r = 112;
	const footer = showBound ? "3 + 10/71  <  π  <  3 + 1/7" : `${n} sides`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lesson, {
		footer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 640 360",
			className: "min-h-0 w-full flex-1",
			"aria-hidden": true,
			children: [
				n > 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: poly(6, r, cx, cy, true),
					fill: "none",
					stroke: "var(--color-terra)",
					strokeWidth: "2",
					opacity: "0.35"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: poly(n, r, cx, cy, true),
					fill: "none",
					stroke: "var(--color-gold)",
					strokeWidth: "3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r,
					fill: "none",
					stroke: "var(--color-aegean)",
					strokeWidth: "4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: poly(n, r, cx, cy, false),
					fill: "none",
					stroke: "var(--color-parchment)",
					strokeWidth: "3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "470",
					y: "150",
					textAnchor: "middle",
					fill: "var(--color-gold)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "72",
					children: n
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "470",
					y: "186",
					textAnchor: "middle",
					fill: "var(--color-parchment-dim)",
					fontFamily: "Outfit, system-ui, sans-serif",
					fontSize: "18",
					children: "sides"
				}),
				showBound && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "470",
					y: "250",
					textAnchor: "middle",
					fill: "var(--color-parchment)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "28",
					children: "3 + 10/71 < π"
				}),
				showBound && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "470",
					y: "286",
					textAnchor: "middle",
					fill: "var(--color-parchment)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "28",
					children: "π < 3 + 1/7"
				})
			]
		})
	});
}
var CAGE = /* @__PURE__ */ new Set([
	"trap",
	"double",
	"bound"
]);
function ArchimedesStage({ sceneId, time, start, end, at }) {
	const key = CAGE.has(sceneId) ? "cage" : sceneId === "name" || sceneId === "still" ? "word" : sceneId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scene-in absolute inset-0",
		children: [
			sceneId === "city" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opening, {
				src: "/art/syracuse.jpg",
				time,
				start,
				end,
				kicker: "Episode four",
				title: "The Cage",
				name: "Archimedes"
			}),
			CAGE.has(sceneId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cage, {
				time,
				at
			}),
			(sceneId === "name" || sceneId === "still") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				eyebrow: "The method",
				line: "Exhaustion",
				sub: sceneId === "still" ? "Every wheel and every orbit still lives in that squeeze." : "The circle runs out of places to hide."
			}),
			sceneId === "close" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still$1, {
				src: "/art/archimedes-sand.jpg",
				time,
				start,
				end,
				kicker: "Draw a circle",
				line: "Double the sides"
			})
		]
	}, key);
}
var cues = {
	"duration": 123.5,
	"captions": [
		{
			"t": .1,
			"text": "On the island of Samos, more than twenty five hundred years ago, a boy watched ships cut triangles across the water."
		},
		{
			"t": 8.3,
			"text": "His name was Pythagoras."
		},
		{
			"t": 10.3,
			"text": "He left home and wandered."
		},
		{
			"t": 12.16,
			"text": "In Egypt, he studied with priests who stretched ropes into perfect corners."
		},
		{
			"t": 16.7,
			"text": "In Babylon, he found clay tablets already full of whole numbers that hid a rule."
		},
		{
			"t": 21.9,
			"text": "In Croton, in the south of Italy, he founded a school."
		},
		{
			"t": 25.76,
			"text": "His students lived by a creed:"
		},
		{
			"t": 27.96,
			"text": "all is number."
		},
		{
			"t": 29.51,
			"text": "They heard music in the planets, and they treated mathematics like a secret worth keeping."
		},
		{
			"t": 34.55,
			"text": "The rule we name after him was older than he was."
		},
		{
			"t": 37.81,
			"text": "What his circle gave the world was a proof."
		},
		{
			"t": 40.47,
			"text": "A reason that rule can never fail."
		},
		{
			"t": 43.03,
			"text": "Draw a right triangle."
		},
		{
			"t": 44.69,
			"text": "The square corner sits between two shorter sides."
		},
		{
			"t": 47.79,
			"text": "Call them a and b."
		},
		{
			"t": 49.53,
			"text": "The long side, opposite that corner, is the hypotenuse."
		},
		{
			"t": 53.15,
			"text": "Call it c."
		},
		{
			"t": 54.41,
			"text": "The theorem says: the square on side a, plus the square on side b, equals the square on side c."
		},
		{
			"t": 61.49,
			"text": "Or, a squared plus b squared equals c squared."
		},
		{
			"t": 65.15,
			"text": "Here is why that must be true."
		},
		{
			"t": 67.29,
			"text": "Set four copies of the triangle inside one large square."
		},
		{
			"t": 71.05,
			"text": "The space left in the middle is exactly the square on the hypotenuse."
		},
		{
			"t": 75.07,
			"text": "Now slide those same four triangles."
		},
		{
			"t": 77.55,
			"text": "The empty space becomes the square on a, and the square on b."
		},
		{
			"t": 81.73,
			"text": "Same triangles. Same large square."
		},
		{
			"t": 84.4,
			"text": "So the two smaller squares equal the one large square."
		},
		{
			"t": 87.66,
			"text": "Always."
		},
		{
			"t": 88.6,
			"text": "Try the oldest builder's rope:"
		},
		{
			"t": 90.52,
			"text": "three, four, and five."
		},
		{
			"t": 92.18,
			"text": "Three squared is nine."
		},
		{
			"t": 93.76,
			"text": "Four squared is sixteen."
		},
		{
			"t": 95.52,
			"text": "Nine plus sixteen is twenty five."
		},
		{
			"t": 97.68,
			"text": "And five squared is twenty five."
		},
		{
			"t": 99.74,
			"text": "The corner is exact."
		},
		{
			"t": 101.36,
			"text": "The theorem never stayed in the dust."
		},
		{
			"t": 103.48,
			"text": "It sizes a roof."
		},
		{
			"t": 104.74,
			"text": "It sizes a screen."
		},
		{
			"t": 106.18,
			"text": "It finds the short path across a map."
		},
		{
			"t": 108.58,
			"text": "Know two sides of a right triangle, and the third side is no longer a mystery."
		},
		{
			"t": 113.3,
			"text": "Pythagoras died far from Samos."
		},
		{
			"t": 115.82,
			"text": "The proof did not."
		},
		{
			"t": 117.26,
			"text": "Look for the right angle."
		},
		{
			"t": 118.72,
			"text": "Square the sides. Add them."
		},
		{
			"t": 120.8,
			"text": "The long side was waiting in the numbers all along."
		}
	],
	"scenes": [
		{
			"id": "samos",
			"title": "Samos",
			"t": .1
		},
		{
			"id": "travel",
			"title": "Egypt & Babylon",
			"t": 10.3
		},
		{
			"id": "school",
			"title": "The School",
			"t": 21.9
		},
		{
			"id": "older",
			"title": "An Older Rule",
			"t": 34.55
		},
		{
			"id": "theorem",
			"title": "The Theorem",
			"t": 43.03
		},
		{
			"id": "proof",
			"title": "Why It Works",
			"t": 65.15
		},
		{
			"id": "rope",
			"title": "3, 4, 5",
			"t": 88.6
		},
		{
			"id": "today",
			"title": "Still True",
			"t": 101.36
		},
		{
			"id": "close",
			"title": "The Long Side",
			"t": 113.3
		}
	]
};
var euclidAt = {
	"city": "In Alexandria",
	"book": "He gathered the geometry",
	"list": "Suppose you have written",
	"product": "Multiply them together",
	"plus": "Now add one",
	"check": "Divide two hundred eleven",
	"forever": "It was not on the list",
	"method": "Euclid had not found",
	"close": "Start with the primes"
};
var euclidCues = {
	"duration": 66.71,
	"captions": [
		{
			"t": .12,
			"text": "In Alexandria, more than two thousand years ago, a book was written that outlived the man who ordered it."
		},
		{
			"t": 6.48,
			"text": "His name was Euclid."
		},
		{
			"t": 8.06,
			"text": "We know the book better than we know him."
		},
		{
			"t": 10.34,
			"text": "He gathered the geometry of his age and made each truth rest on the one before it."
		},
		{
			"t": 15.54,
			"text": "The book was called the Elements."
		},
		{
			"t": 17.66,
			"text": "Suppose you have written down every prime you know."
		},
		{
			"t": 20.54,
			"text": "Two. Three. Five. Seven."
		},
		{
			"t": 23.92,
			"text": "Multiply them together."
		},
		{
			"t": 25.52,
			"text": "Two times three is six."
		},
		{
			"t": 27.46,
			"text": "Six times five is thirty."
		},
		{
			"t": 29.52,
			"text": "Thirty times seven is two hundred ten."
		},
		{
			"t": 32.16,
			"text": "Now add one."
		},
		{
			"t": 33.46,
			"text": "Two hundred eleven."
		},
		{
			"t": 34.9,
			"text": "Divide two hundred eleven by two, by three, by five, or by seven, and the remainder is always one."
		},
		{
			"t": 42.04,
			"text": "None of those primes divides it."
		},
		{
			"t": 44.02,
			"text": "Two hundred eleven is itself a prime."
		},
		{
			"t": 46.44,
			"text": "It was not on the list."
		},
		{
			"t": 48.12,
			"text": "If the list had been longer, the same trick would build a number that none of them divide."
		},
		{
			"t": 52.82,
			"text": "So there is no last prime."
		},
		{
			"t": 54.84,
			"text": "Euclid had not found a bigger number."
		},
		{
			"t": 56.88,
			"text": "He had found a proof that the list can never close."
		},
		{
			"t": 60.17,
			"text": "Start with the primes you know."
		},
		{
			"t": 61.87,
			"text": "Multiply them."
		},
		{
			"t": 63.03,
			"text": "Add one."
		},
		{
			"t": 64.03,
			"text": "The next prime is already hiding in the remainder."
		}
	],
	"scenes": [
		{
			"id": "city",
			"title": "Alexandria",
			"t": .12
		},
		{
			"id": "book",
			"title": "The Elements",
			"t": 10.34
		},
		{
			"id": "list",
			"title": "The Primes",
			"t": 17.66
		},
		{
			"id": "product",
			"title": "Multiply",
			"t": 23.92
		},
		{
			"id": "plus",
			"title": "Add One",
			"t": 32.16
		},
		{
			"id": "check",
			"title": "Remainder One",
			"t": 34.9
		},
		{
			"id": "forever",
			"title": "No Last Prime",
			"t": 46.44
		},
		{
			"id": "method",
			"title": "A Proof",
			"t": 54.84
		},
		{
			"id": "close",
			"title": "Add One",
			"t": 60.17
		}
	]
};
var archimedesCues = {
	"duration": 56.72,
	"captions": [
		{
			"t": .12,
			"text": "On the island of Sicily, in the city of Syracuse, Archimedes wanted a number for the circle."
		},
		{
			"t": 6.3,
			"text": "He lived in the third century before the common era."
		},
		{
			"t": 9.36,
			"text": "He loved a problem he could squeeze."
		},
		{
			"t": 11.78,
			"text": "To measure a circle, he trapped it."
		},
		{
			"t": 14.24,
			"text": "One polygon sits inside, its corners on the rim."
		},
		{
			"t": 17.93,
			"text": "Another sits outside, its sides just grazing the rim."
		},
		{
			"t": 21.85,
			"text": "The true length is caught between them."
		},
		{
			"t": 24.35,
			"text": "Then he doubled the number of sides."
		},
		{
			"t": 26.65,
			"text": "Six became twelve."
		},
		{
			"t": 28.15,
			"text": "Twelve became twenty-four."
		},
		{
			"t": 29.99,
			"text": "Then forty-eight."
		},
		{
			"t": 31.23,
			"text": "Then ninety-six."
		},
		{
			"t": 32.77,
			"text": "At ninety-six sides, he could say this."
		},
		{
			"t": 35.77,
			"text": "Pi is larger than three and ten seventy-firsts."
		},
		{
			"t": 39.11,
			"text": "And smaller than three and one seventh."
		},
		{
			"t": 41.71,
			"text": "The method is called exhaustion."
		},
		{
			"t": 43.87,
			"text": "The circle has simply run out of places to hide."
		},
		{
			"t": 46.87,
			"text": "Every wheel and every orbit is still living inside that squeeze."
		},
		{
			"t": 50.96,
			"text": "Draw a circle."
		},
		{
			"t": 52.22,
			"text": "Cage it with polygons."
		},
		{
			"t": 53.86,
			"text": "Double the sides until the number has to tell the truth."
		}
	],
	"scenes": [
		{
			"id": "city",
			"title": "Syracuse",
			"t": .12
		},
		{
			"id": "trap",
			"title": "The Trap",
			"t": 11.78
		},
		{
			"id": "double",
			"title": "Double the Sides",
			"t": 24.35
		},
		{
			"id": "bound",
			"title": "Ninety-six Sides",
			"t": 32.77
		},
		{
			"id": "name",
			"title": "Exhaustion",
			"t": 41.71
		},
		{
			"id": "still",
			"title": "Still Squeezing",
			"t": 46.87
		},
		{
			"id": "close",
			"title": "Cage It",
			"t": 50.96
		}
	]
};
var khwarizmiAt = {
	"city": "In Baghdad",
	"book": "The Arabic word",
	"puzzle": "Here is one of his puzzles",
	"draw": "Draw the square",
	"corner": "A corner is still missing",
	"complete": "Add twenty-five",
	"check": "Check it",
	"word": "His name, carried",
	"close": "Name the unknown"
};
var khwarizmiCues = {
	"duration": 76.23,
	"captions": [
		{
			"t": .08,
			"text": "In Baghdad, in the ninth century, the House of Wisdom gathered Greece, India, and Persia under one roof."
		},
		{
			"t": 7.46,
			"text": "There, Muhammad ibn Musa al-Khwarizmi wrote a book about restoring equations."
		},
		{
			"t": 12.76,
			"text": "The Arabic word was al-jabr."
		},
		{
			"t": 15.32,
			"text": "English kept it as algebra."
		},
		{
			"t": 17.48,
			"text": "His other step was al-muqabala: make both sides equal, and keep them equal."
		},
		{
			"t": 23.4,
			"text": "Here is one of his puzzles."
		},
		{
			"t": 25.12,
			"text": "A square, plus ten times its side, equals thirty-nine."
		},
		{
			"t": 29.18,
			"text": "Draw the square. Its side is the unknown."
		},
		{
			"t": 32.24,
			"text": "Split the ten in half. Five, and five."
		},
		{
			"t": 35.49,
			"text": "Lay a rectangle of width five on two sides of the square."
		},
		{
			"t": 39.07,
			"text": "A corner is still missing."
		},
		{
			"t": 40.83,
			"text": "That corner is five by five. Its area is twenty-five."
		},
		{
			"t": 45.13,
			"text": "Add twenty-five to the thirty-nine as well."
		},
		{
			"t": 47.69,
			"text": "Thirty-nine plus twenty-five is sixty-four."
		},
		{
			"t": 50.39,
			"text": "Sixty-four is eight times eight, so the big side is eight."
		},
		{
			"t": 54.55,
			"text": "Five of those eight came from the rectangles."
		},
		{
			"t": 57.17,
			"text": "The unknown side is three."
		},
		{
			"t": 59.09,
			"text": "Check it."
		},
		{
			"t": 59.87,
			"text": "Three squared is nine. Ten times three is thirty. Nine plus thirty is thirty-nine."
		},
		{
			"t": 65.65,
			"text": "His name, carried into Latin, became the word algorithm. A list of steps that cannot wander."
		},
		{
			"t": 71.89,
			"text": "Name the unknown."
		},
		{
			"t": 73.19,
			"text": "Complete the square."
		},
		{
			"t": 74.63,
			"text": "Both sides must still agree."
		}
	],
	"scenes": [
		{
			"id": "city",
			"title": "Baghdad",
			"t": .08
		},
		{
			"id": "book",
			"title": "Algebra",
			"t": 12.76
		},
		{
			"id": "puzzle",
			"title": "Thirty-nine",
			"t": 23.4
		},
		{
			"id": "draw",
			"title": "The Unknown",
			"t": 29.18
		},
		{
			"id": "corner",
			"title": "The Corner",
			"t": 39.07
		},
		{
			"id": "complete",
			"title": "Sixty-four",
			"t": 45.13
		},
		{
			"id": "check",
			"title": "It Holds",
			"t": 59.09
		},
		{
			"id": "word",
			"title": "Algorithm",
			"t": 65.65
		},
		{
			"id": "close",
			"title": "Both Sides",
			"t": 71.89
		}
	]
};
var descartesAt = {
	"city": "In sixteen thirty-seven",
	"point": "A point, he said",
	"axes": "Draw two lines",
	"marks": "Mark one step across",
	"curve": "Join the points",
	"join": "Geometry had been pictures",
	"close": "Pick two numbers"
};
var descartesCues = {
	"duration": 49.43,
	"captions": [
		{
			"t": .06,
			"text": "In sixteen thirty-seven, René Descartes published a short essay behind a longer book about how to think."
		},
		{
			"t": 6.34,
			"text": "He was living in the Dutch Republic, in a rented room."
		},
		{
			"t": 9.34,
			"text": "He would not leave a curve as a picture you only admire."
		},
		{
			"t": 12.58,
			"text": "A point, he said, is a pair of numbers."
		},
		{
			"t": 15.26,
			"text": "How far across. How far up."
		},
		{
			"t": 17.66,
			"text": "Draw two lines that meet at a right angle."
		},
		{
			"t": 20.18,
			"text": "These are the axes, and they cross at zero."
		},
		{
			"t": 22.94,
			"text": "Mark one step across and one step up."
		},
		{
			"t": 25.47,
			"text": "Then two across and four up."
		},
		{
			"t": 27.43,
			"text": "Then three across and nine up."
		},
		{
			"t": 29.39,
			"text": "The height is the across-number multiplied by itself."
		},
		{
			"t": 32.71,
			"text": "Join the points, and a curve appears."
		},
		{
			"t": 35.05,
			"text": "The whole curve is one sentence: height equals across, squared."
		},
		{
			"t": 39.35,
			"text": "Geometry had been pictures. Algebra had been sentences."
		},
		{
			"t": 43.01,
			"text": "Descartes made them one subject."
		},
		{
			"t": 45.03,
			"text": "Pick two numbers."
		},
		{
			"t": 46.13,
			"text": "Mark the point."
		},
		{
			"t": 47.13,
			"text": "The shape was an equation waiting to be said."
		}
	],
	"scenes": [
		{
			"id": "city",
			"title": "Sixteen Thirty-seven",
			"t": .06
		},
		{
			"id": "point",
			"title": "A Pair of Numbers",
			"t": 12.58
		},
		{
			"id": "axes",
			"title": "The Axes",
			"t": 17.66
		},
		{
			"id": "marks",
			"title": "The Points",
			"t": 22.94
		},
		{
			"id": "curve",
			"title": "The Curve",
			"t": 32.71
		},
		{
			"id": "join",
			"title": "One Subject",
			"t": 39.35
		},
		{
			"id": "close",
			"title": "Mark the Point",
			"t": 45.03
		}
	]
};
var newtonAt = {
	"city": "In the plague years",
	"both": "In Germany",
	"draw": "Draw a smooth curve",
	"slide": "Now slide the second",
	"kiss": "When the points meet",
	"names": "Newton called these rates",
	"still": "A speedometer",
	"close": "Draw the curve"
};
var newtonCues = {
	"duration": 61.67,
	"captions": [
		{
			"t": .06,
			"text": "In the plague years of the sixteen sixties, Cambridge emptied, and Isaac Newton went home to Woolsthorpe."
		},
		{
			"t": 6.7,
			"text": "He wanted a rate of change at one instant."
		},
		{
			"t": 9.44,
			"text": "Not an average over an hour. The speed at a single moment."
		},
		{
			"t": 13.34,
			"text": "In Germany, Gottfried Leibniz was chasing that same instant."
		},
		{
			"t": 17.6,
			"text": "Leibniz published the method first."
		},
		{
			"t": 19.9,
			"text": "Newton's notes begin earlier."
		},
		{
			"t": 22,
			"text": "The quarrel was smaller than the idea. Both of them founded the calculus."
		},
		{
			"t": 26.47,
			"text": "Draw a smooth curve."
		},
		{
			"t": 28.05,
			"text": "Choose two points on it and join them."
		},
		{
			"t": 30.45,
			"text": "The slope of that line is an average: rise over run."
		},
		{
			"t": 34.13,
			"text": "Now slide the second point toward the first."
		},
		{
			"t": 36.73,
			"text": "The piece being averaged gets smaller."
		},
		{
			"t": 38.99,
			"text": "When the points meet, the line only kisses the curve."
		},
		{
			"t": 42.53,
			"text": "That slope is the rate at that instant."
		},
		{
			"t": 45.09,
			"text": "Newton called these rates fluxions."
		},
		{
			"t": 47.41,
			"text": "Leibniz wrote the same idea as two shrinking pieces, set in a ratio."
		},
		{
			"t": 52.25,
			"text": "A speedometer is that slope."
		},
		{
			"t": 54.29,
			"text": "So is the steepness of a hill, at the place you are standing."
		},
		{
			"t": 57.65,
			"text": "Draw the curve."
		},
		{
			"t": 58.81,
			"text": "Bring the points together."
		},
		{
			"t": 60.31,
			"text": "Read the slope where they meet."
		}
	],
	"scenes": [
		{
			"id": "city",
			"title": "Woolsthorpe",
			"t": .06
		},
		{
			"id": "both",
			"title": "Both of Them",
			"t": 13.34
		},
		{
			"id": "draw",
			"title": "Two Points",
			"t": 26.47
		},
		{
			"id": "slide",
			"title": "Slide",
			"t": 34.13
		},
		{
			"id": "kiss",
			"title": "The Kiss",
			"t": 38.99
		},
		{
			"id": "names",
			"title": "Fluxions",
			"t": 45.09
		},
		{
			"id": "still",
			"title": "The Slope",
			"t": 52.25
		},
		{
			"id": "close",
			"title": "Read the Slope",
			"t": 57.65
		}
	]
};
var noetherAt = {
	"city": "In Göttingen",
	"idea": "Her theorem ties",
	"slide": "If a law of motion reads the same after you slide",
	"turn": "If the law reads the same after you turn",
	"wait": "If the law reads the same after you simply wait",
	"later": "In nineteen thirty-three",
	"close": "Find a change"
};
var noetherCues = {
	"duration": 52.71,
	"captions": [
		{
			"t": .04,
			"text": "In Göttingen, in nineteen eighteen, Emmy Noether proved a theorem physicists had been using without a foundation."
		},
		{
			"t": 6.88,
			"text": "The university had tried to keep her off the faculty because she was a woman."
		},
		{
			"t": 11,
			"text": "David Hilbert told them the faculty was not a bathhouse."
		},
		{
			"t": 14.48,
			"text": "Her theorem ties a change to a constancy."
		},
		{
			"t": 17.48,
			"text": "If a law of motion reads the same after you slide the world sideways, momentum is conserved."
		},
		{
			"t": 23.24,
			"text": "The law picked no favorite place, so motion cannot leak away."
		},
		{
			"t": 27.41,
			"text": "If the law reads the same after you turn the world, angular momentum is conserved."
		},
		{
			"t": 32.51,
			"text": "Spin does not appear from nowhere."
		},
		{
			"t": 34.71,
			"text": "If the law reads the same after you simply wait, energy is conserved."
		},
		{
			"t": 39.03,
			"text": "The clock moves, and the books still balance."
		},
		{
			"t": 41.87,
			"text": "In nineteen thirty-three the Nazis expelled her."
		},
		{
			"t": 44.71,
			"text": "She taught on, at Bryn Mawr, in America."
		},
		{
			"t": 47.77,
			"text": "Find a change that leaves the law untouched."
		},
		{
			"t": 50.39,
			"text": "You have found the thing that cannot be lost."
		}
	],
	"scenes": [
		{
			"id": "city",
			"title": "Göttingen",
			"t": .04
		},
		{
			"id": "idea",
			"title": "The Theorem",
			"t": 14.48
		},
		{
			"id": "slide",
			"title": "Slide",
			"t": 17.48
		},
		{
			"id": "turn",
			"title": "Turn",
			"t": 27.41
		},
		{
			"id": "wait",
			"title": "Wait",
			"t": 34.71
		},
		{
			"id": "later",
			"title": "Bryn Mawr",
			"t": 41.87
		},
		{
			"id": "close",
			"title": "What Cannot Be Lost",
			"t": 47.77
		}
	]
};
var turingAt = {
	"city": "In Cambridge",
	"question": "David Hilbert had hoped",
	"checker": "Suppose a checker",
	"twist": "Build a second machine",
	"wrong": "Either answer is wrong",
	"later": "In the war that followed",
	"close": "Write the rules"
};
var turingCues = {
	"duration": 70.48,
	"captions": [
		{
			"t": .08,
			"text": "In Cambridge, in nineteen thirty-six, Alan Turing asked which problems a machine can be trusted to finish."
		},
		{
			"t": 6.9,
			"text": "He pictured a long tape of squares, and a head that reads one square at a time."
		},
		{
			"t": 11.76,
			"text": "The head may write a mark, then step left or right."
		},
		{
			"t": 15.13,
			"text": "That tape is a computer with the cabinet taken off."
		},
		{
			"t": 18.25,
			"text": "David Hilbert had hoped for a procedure that answers any mathematical question, yes or no."
		},
		{
			"t": 24.05,
			"text": "Turing chose a question that sounds simpler."
		},
		{
			"t": 26.45,
			"text": "Given a machine and its tape, will it halt, or run forever?"
		},
		{
			"t": 30.35,
			"text": "Suppose a checker exists, and that it always answers correctly."
		},
		{
			"t": 33.75,
			"text": "Halt. Or loop."
		},
		{
			"t": 35.37,
			"text": "Build a second machine that asks the checker about itself, and then disobeys."
		},
		{
			"t": 39.93,
			"text": "If the checker says halt, this machine loops on purpose."
		},
		{
			"t": 43.29,
			"text": "If the checker says loop, this machine halts on purpose."
		},
		{
			"t": 46.6,
			"text": "Either answer is wrong."
		},
		{
			"t": 48.18,
			"text": "So no such checker can exist."
		},
		{
			"t": 50.38,
			"text": "No machine can decide, for every program, whether that program ends."
		},
		{
			"t": 54.84,
			"text": "In the war that followed, he helped read ciphers built not to be read."
		},
		{
			"t": 59.02,
			"text": "After the war, Britain prosecuted him for loving men."
		},
		{
			"t": 62.2,
			"text": "He died in nineteen fifty-four. He was forty-one."
		},
		{
			"t": 65.38,
			"text": "Write the rules."
		},
		{
			"t": 66.54,
			"text": "Ask whether they end."
		},
		{
			"t": 68,
			"text": "Some questions have no machine that can settle them."
		}
	],
	"scenes": [
		{
			"id": "city",
			"title": "Cambridge",
			"t": .08
		},
		{
			"id": "question",
			"title": "The Question",
			"t": 18.25
		},
		{
			"id": "checker",
			"title": "The Checker",
			"t": 30.35
		},
		{
			"id": "twist",
			"title": "The Disobeyer",
			"t": 35.37
		},
		{
			"id": "wrong",
			"title": "No Checker",
			"t": 46.6
		},
		{
			"id": "later",
			"title": "After",
			"t": 54.84
		},
		{
			"id": "close",
			"title": "Some Questions",
			"t": 65.38
		}
	]
};
var OX$1 = 86;
var OY$1 = 312;
var SX = 150;
var SY = 24;
function X$1(x) {
	return OX$1 + x * SX;
}
function Y$1(y) {
	return OY$1 - y * SY;
}
function Plane({ time, at }) {
	const one = time >= at("Mark one step across");
	const two = time >= at("Then two across");
	const three = time >= at("Then three across");
	const curve = time >= at(descartesAt.curve);
	const equation = time >= at("The whole curve");
	const pts = [];
	if (one) pts.push([1, 1]);
	if (two) pts.push([2, 4]);
	if (three) pts.push([3, 9]);
	let d = "";
	if (curve) for (let x = 0; x <= 3.15; x += .06) d += `${x === 0 ? "M" : "L"}${X$1(x).toFixed(1)} ${Y$1(x * x).toFixed(1)}`;
	let footer = "Two lines. They cross at zero.";
	if (one && !two) footer = "One across, one up.";
	if (two && !three) footer = "Two across, four up.";
	if (three && !curve) footer = "Three across, nine up.";
	if (curve && !equation) footer = "The height is the across-number, squared.";
	if (equation) footer = "Up = across²";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lesson, {
		footer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 640 360",
			className: "min-h-0 w-full flex-1",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: OX$1,
					y1: 24,
					x2: OX$1,
					y2: OY$1,
					stroke: "var(--color-parchment)",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: OX$1,
					y1: OY$1,
					x2: 620,
					y2: OY$1,
					stroke: "var(--color-parchment)",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 70,
					y: 36,
					fill: "var(--color-gold)",
					fontFamily: "Outfit, system-ui, sans-serif",
					fontSize: "16",
					children: "up"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 588,
					y: 334,
					fill: "var(--color-gold)",
					fontFamily: "Outfit, system-ui, sans-serif",
					fontSize: "16",
					children: "across"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 72,
					y: 330,
					fill: "var(--color-parchment-dim)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "16",
					children: "0"
				}),
				curve && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d,
					fill: "none",
					stroke: "var(--color-gold)",
					strokeWidth: "3"
				}),
				pts.map(([x, y]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: X$1(x),
					cy: Y$1(y),
					r: "7",
					fill: "var(--color-terra)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: X$1(x) + 14,
					y: Y$1(y) - 10,
					fill: "var(--color-parchment)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "20",
					children: `${x}, ${y}`
				})] }, `${x}-${y}`)),
				equation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "120",
					y: "48",
					fill: "var(--color-gold)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "32",
					children: "up = across²"
				})
			]
		})
	});
}
var PLANE = /* @__PURE__ */ new Set([
	"axes",
	"marks",
	"curve"
]);
function DescartesStage({ sceneId, time, start, end, at }) {
	const key = PLANE.has(sceneId) ? "plane" : sceneId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scene-in absolute inset-0",
		children: [
			sceneId === "city" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opening, {
				src: "/art/holland.jpg",
				time,
				start,
				end,
				kicker: "Episode six",
				title: "The Plane",
				name: "Descartes"
			}),
			sceneId === "point" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				eyebrow: "Sixteen thirty-seven",
				line: "A pair of numbers.",
				sub: "How far across. How far up."
			}),
			PLANE.has(sceneId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, {
				time,
				at
			}),
			sceneId === "join" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				eyebrow: "Pictures and sentences",
				line: "One subject."
			}),
			sceneId === "close" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still$1, {
				src: "/art/descartes-desk.jpg",
				time,
				start,
				end,
				kicker: "Pick two numbers",
				line: "Mark the point"
			})
		]
	}, key);
}
var eulerCues = {
	"duration": 92.15,
	"captions": [
		{
			"t": .04,
			"text": "In the spring of seventeen thirty-six, the city of Konigsberg had a Sunday habit."
		},
		{
			"t": 5.68,
			"text": "Seven bridges crossed its forked river."
		},
		{
			"t": 8.2,
			"text": "People tried to walk each bridge once, and come home again."
		},
		{
			"t": 11.86,
			"text": "Nobody could."
		},
		{
			"t": 13.26,
			"text": "They wrote to Leonhard Euler."
		},
		{
			"t": 15.48,
			"text": "Born in Basel, he was already in Saint Petersburg, answering letters the way other people breathe."
		},
		{
			"t": 21.5,
			"text": "Euler did not pace the banks."
		},
		{
			"t": 23.58,
			"text": "He drew the city smaller."
		},
		{
			"t": 25.44,
			"text": "Each shore and each island became a point."
		},
		{
			"t": 28.5,
			"text": "Each bridge became a line."
		},
		{
			"t": 30.54,
			"text": "Count the lines that meet at a point."
		},
		{
			"t": 32.66,
			"text": "That number is its degree."
		},
		{
			"t": 34.64,
			"text": "A walk that uses every line once can exist only when every degree is even, or exactly two degrees are odd."
		},
		{
			"t": 42.44,
			"text": "Konigsberg had four points."
		},
		{
			"t": 44.68,
			"text": "Every one of them was odd."
		},
		{
			"t": 46.44,
			"text": "Four odd points."
		},
		{
			"t": 47.97,
			"text": "The walk was impossible."
		},
		{
			"t": 49.75,
			"text": "Not unlucky."
		},
		{
			"t": 50.85,
			"text": "Impossible."
		},
		{
			"t": 52.21,
			"text": "Take one bridge away, and only two points stay odd."
		},
		{
			"t": 55.93,
			"text": "Now a walk exists."
		},
		{
			"t": 57.77,
			"text": "It starts at one odd point and ends at the other."
		},
		{
			"t": 61.07,
			"text": "Euler had drawn a new geometry."
		},
		{
			"t": 63.39,
			"text": "Distance did not matter."
		},
		{
			"t": 64.91,
			"text": "Shape did not matter."
		},
		{
			"t": 66.41,
			"text": "Only what connected to what."
		},
		{
			"t": 68.33,
			"text": "He had founded graph theory."
		},
		{
			"t": 70.35,
			"text": "The same drawing now routes a letter,"
		},
		{
			"t": 72.51,
			"text": "a flight,"
		},
		{
			"t": 73.35,
			"text": "a wire under the sea."
		},
		{
			"t": 75.13,
			"text": "Any time you ask for a path that does not repeat, you are still walking those bridges."
		},
		{
			"t": 80.35,
			"text": "Euler later went blind, and he kept working."
		},
		{
			"t": 83.43,
			"text": "The bridges of Konigsberg are gone."
		},
		{
			"t": 85.75,
			"text": "The question is not."
		},
		{
			"t": 87.33,
			"text": "Draw the points."
		},
		{
			"t": 88.47,
			"text": "Count the odds."
		},
		{
			"t": 89.73,
			"text": "The city tells you whether the walk exists."
		}
	],
	"scenes": [
		{
			"id": "city",
			"title": "Konigsberg",
			"t": .04
		},
		{
			"id": "letter",
			"title": "The Letter",
			"t": 11.86
		},
		{
			"id": "draw",
			"title": "A Smaller City",
			"t": 21.5
		},
		{
			"id": "degree",
			"title": "Degree",
			"t": 30.54
		},
		{
			"id": "impossible",
			"title": "Four Odd Points",
			"t": 42.44
		},
		{
			"id": "repair",
			"title": "One Bridge Less",
			"t": 52.21
		},
		{
			"id": "theory",
			"title": "Graph Theory",
			"t": 61.07
		},
		{
			"id": "routes",
			"title": "Still Walking",
			"t": 70.35
		},
		{
			"id": "close",
			"title": "Count the Odds",
			"t": 80.35
		}
	]
};
function useReduced$1() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	}, []);
	return reduced;
}
function Plate({ src, time, start, end }) {
	const reduced = useReduced$1();
	const p = span(time, start, end);
	const scale = reduced ? 1.04 : 1.06 + .08 * p;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		className: "absolute inset-0 h-full w-full object-cover",
		style: {
			transform: `scale(${scale})`,
			transformOrigin: "50% 45%"
		}
	});
}
var NODES = {
	A: {
		x: 200,
		y: 78,
		label: "North",
		lx: 200,
		ly: 40
	},
	B: {
		x: 200,
		y: 322,
		label: "South",
		lx: 200,
		ly: 362
	},
	C: {
		x: 200,
		y: 200,
		label: "Island",
		lx: 78,
		ly: 206
	},
	D: {
		x: 470,
		y: 200,
		label: "East",
		lx: 548,
		ly: 206
	}
};
var EDGES = [
	{
		id: "ac1",
		a: "A",
		b: "C",
		bend: -36
	},
	{
		id: "ac2",
		a: "A",
		b: "C",
		bend: 36
	},
	{
		id: "bc1",
		a: "B",
		b: "C",
		bend: -36
	},
	{
		id: "bc2",
		a: "B",
		b: "C",
		bend: 36
	},
	{
		id: "ad",
		a: "A",
		b: "D",
		bend: -48
	},
	{
		id: "bd",
		a: "B",
		b: "D",
		bend: 48
	},
	{
		id: "cd",
		a: "C",
		b: "D",
		bend: 0
	}
];
var WALK = [
	"ad",
	"bd",
	"bc1",
	"ac1",
	"ac2",
	"bc2"
];
function curve(a, b, bend) {
	const p = NODES[a];
	const q = NODES[b];
	const mx = (p.x + q.x) / 2;
	const my = (p.y + q.y) / 2;
	const dx = q.x - p.x;
	const dy = q.y - p.y;
	const len = Math.hypot(dx, dy) || 1;
	const cx = mx + -dy / len * bend;
	const cy = my + dx / len * bend;
	return `M ${p.x} ${p.y} Q ${cx} ${cy} ${q.x} ${q.y}`;
}
function degrees(skip) {
	const tally = {
		A: 0,
		B: 0,
		C: 0,
		D: 0
	};
	for (const edge of EDGES) {
		if (edge.id === skip) continue;
		tally[edge.a] += 1;
		tally[edge.b] += 1;
	}
	return tally;
}
function City({ time, end }) {
	const title = time < 7.2 ? 1 : clamp(1 - (time - 7.2) / 1.2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
				src: "/art/konigsberg.jpg",
				time,
				start: 0,
				end
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/45" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-[14%] px-6 text-center",
				style: { opacity: title },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-gold uppercase",
					children: "Episode two"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl leading-none text-parchment sm:text-6xl",
					children: "Seven Bridges"
				})]
			})
		]
	});
}
function Letter({ time, start, end }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
				src: "/art/euler.jpg",
				time,
				start,
				end
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-[16%] px-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-gold uppercase",
					children: "Basel · Saint Petersburg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-4xl text-parchment italic sm:text-6xl",
					children: "Leonhard Euler"
				})]
			})
		]
	});
}
function GraphLesson({ time, at }) {
	const draw = smooth(span(time, at("Each shore"), at("Count the lines")));
	const showDegree = span(time, at("That number is its degree"), at("That number is its degree") + .6);
	const showRule = time >= at("A walk that uses");
	const dropped = time >= at("Take one bridge");
	const walkP = smooth(span(time, at("Now a walk exists"), at("Euler had drawn")));
	const tally = degrees(dropped ? "cd" : null);
	const litCount = Math.ceil(walkP * WALK.length);
	const impossible = time >= at("Four odd points") && !dropped;
	const odds = Object.values(tally).filter((n) => n % 2 === 1).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lesson-stage absolute inset-0 flex flex-col bg-ink px-3 pt-3 pb-3 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col rounded-2xl bg-ink-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 640 400",
				className: "min-h-0 w-full flex-1",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "200",
						cy: "70",
						rx: "150",
						ry: "42",
						fill: "var(--color-aegean)",
						fillOpacity: "0.25"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "200",
						cy: "330",
						rx: "150",
						ry: "42",
						fill: "var(--color-aegean)",
						fillOpacity: "0.25"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "200",
						cy: "200",
						rx: "54",
						ry: "40",
						fill: "var(--color-aegean)",
						fillOpacity: "0.35"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "480",
						cy: "200",
						rx: "70",
						ry: "48",
						fill: "var(--color-aegean)",
						fillOpacity: "0.28"
					}),
					EDGES.map((edge, index) => {
						const shown = draw > index / EDGES.length;
						const gone = edge.id === "cd" && dropped;
						const step = WALK.indexOf(edge.id);
						const lit = step >= 0 && step < litCount;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: curve(edge.a, edge.b, edge.bend),
							fill: "none",
							stroke: lit ? "var(--color-gold)" : "var(--color-parchment)",
							strokeWidth: lit ? 7 : 4,
							strokeLinecap: "round",
							opacity: gone ? .12 : shown ? .95 : .12,
							pathLength: 1,
							strokeDasharray: 1,
							strokeDashoffset: shown ? 0 : 1
						}, edge.id);
					}),
					Object.keys(NODES).map((id) => {
						const node = NODES[id];
						const odd = tally[id] % 2 === 1;
						const mark = showRule && odd;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: node.x,
								cy: node.y,
								r: "22",
								fill: mark ? "var(--color-terra)" : "var(--color-parchment)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: node.lx,
								y: node.ly,
								textAnchor: "middle",
								fill: "var(--color-parchment)",
								fontFamily: "Outfit, system-ui, sans-serif",
								fontSize: "16",
								children: node.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: node.x,
								y: node.y + 8,
								textAnchor: "middle",
								fill: mark ? "var(--color-parchment)" : "var(--color-ink)",
								fontFamily: "Fraunces, Georgia, serif",
								fontSize: "22",
								opacity: showDegree,
								children: tally[id]
							})
						] }, id);
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "px-4 pb-3 text-center font-display text-xl text-parchment sm:text-3xl",
				children: [
					!showRule && "Seven lines. Four points.",
					showRule && !dropped && (impossible ? `${odds} odd points. Impossible.` : "A walk needs 0 or 2 odd points."),
					dropped && walkP < .08 && `${odds} odd points. A walk exists.`,
					dropped && walkP >= .08 && "Start at one odd point. End at the other."
				]
			})]
		})
	});
}
function Theory({ time, at }) {
	const named = span(time, at("He had founded graph theory"), at("He had founded graph theory") + .5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 flex flex-col items-center justify-center bg-ink px-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl text-parchment-dim sm:text-4xl",
			children: "Only what is connected."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 font-display text-4xl text-gold italic sm:text-6xl",
			style: { opacity: named },
			children: "Graph theory"
		})]
	});
}
function Routes({ time, at }) {
	const bits = [
		{
			t: at("routes a letter"),
			label: "A letter"
		},
		{
			t: at("a flight"),
			label: "A flight"
		},
		{
			t: at("a wire"),
			label: "A wire under the sea"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 bg-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 640 360",
			className: "absolute inset-0 h-full w-full opacity-40",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M40 80 L180 140 L300 60 L460 160 L600 90",
					fill: "none",
					stroke: "var(--color-gold)",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M80 260 L200 200 L340 280 L520 210 L600 250",
					fill: "none",
					stroke: "var(--color-aegean)",
					strokeWidth: "2"
				}),
				[
					[180, 140],
					[300, 60],
					[460, 160],
					[200, 200],
					[340, 280],
					[520, 210]
				].map(([x, y]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x,
					cy: y,
					r: "6",
					fill: "var(--color-parchment)"
				}, `${x}-${y}`))
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-x-0 top-[18%] flex flex-col items-center gap-2 px-6 text-center",
			children: bits.map((bit, i) => {
				const on = time >= bit.t;
				const hot = on && (i === bits.length - 1 || time < bits[i + 1].t);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: hot ? "font-display text-3xl text-parchment sm:text-5xl" : on ? "font-display text-xl text-parchment-dim sm:text-3xl" : "font-display text-xl text-transparent sm:text-3xl",
					children: bit.label
				}, bit.label);
			})
		})]
	});
}
function Close$1({ time, start, end, at }) {
	const line = span(time, at("Draw the points"), at("Draw the points") + .6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
				src: "/art/euler-late.jpg",
				time,
				start,
				end
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-[16%] px-6 text-center",
				style: { opacity: line },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl text-gold sm:text-6xl",
					children: "Count the odds"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm tracking-widest text-parchment uppercase",
					children: "The walk either exists, or it does not"
				})]
			})
		]
	});
}
var GRAPH = /* @__PURE__ */ new Set([
	"draw",
	"degree",
	"impossible",
	"repair"
]);
function EulerStage({ sceneId, time, start, end, at }) {
	const key = GRAPH.has(sceneId) ? "graph" : sceneId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scene-in absolute inset-0",
		children: [
			sceneId === "city" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(City, {
				time,
				end
			}),
			sceneId === "letter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letter, {
				time,
				start,
				end
			}),
			GRAPH.has(sceneId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraphLesson, {
				time,
				at
			}),
			sceneId === "theory" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Theory, {
				time,
				at
			}),
			sceneId === "routes" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Routes, {
				time,
				at
			}),
			sceneId === "close" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close$1, {
				time,
				start,
				end,
				at
			})
		]
	}, key);
}
var PRIMES = [
	2,
	3,
	5,
	7
];
function EuclidLesson({ time, at }) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lesson, {
		footer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 640 360",
			className: "min-h-0 w-full flex-1",
			"aria-hidden": true,
			children: [
				PRIMES.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 145 + i * 116,
					cy: 70,
					r: 34,
					fill: forever ? "var(--color-ink)" : "var(--color-parchment)",
					stroke: "var(--color-gold)",
					strokeWidth: forever ? 3 : 0
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 145 + i * 116,
					y: 82,
					textAnchor: "middle",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "32",
					fill: forever ? "var(--color-parchment)" : "var(--color-ink)",
					children: n
				})] }, n)),
				showProd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "320",
					y: "175",
					textAnchor: "middle",
					fill: "var(--color-parchment)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "40",
					children: line
				}),
				plus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "320",
					y: "230",
					textAnchor: "middle",
					fill: "var(--color-gold)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "42",
					children: "210 + 1 = 211"
				}),
				check && PRIMES.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					opacity: i < rows ? 1 : .12,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 110 + i * 140,
						y: 292,
						textAnchor: "middle",
						fill: "var(--color-parchment-dim)",
						fontFamily: "Outfit, system-ui, sans-serif",
						fontSize: "18",
						children: `211 ÷ ${n}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 110 + i * 140,
						y: 324,
						textAnchor: "middle",
						fill: "var(--color-gold)",
						fontFamily: "Fraunces, Georgia, serif",
						fontSize: "26",
						children: "rem 1"
					})]
				}, `r${n}`))
			]
		})
	});
}
var LESSON$1 = /* @__PURE__ */ new Set([
	"list",
	"product",
	"plus",
	"check",
	"forever"
]);
function EuclidStage({ sceneId, time, start, end, at }) {
	const key = LESSON$1.has(sceneId) ? "primes" : sceneId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scene-in absolute inset-0",
		children: [
			sceneId === "city" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opening, {
				src: "/art/alexandria.jpg",
				time,
				start,
				end,
				kicker: "Episode three",
				title: "No Last Prime",
				name: "Euclid"
			}),
			sceneId === "book" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				eyebrow: "The Elements",
				line: "Each truth rests on the one before."
			}),
			LESSON$1.has(sceneId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EuclidLesson, {
				time,
				at
			}),
			sceneId === "method" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				eyebrow: "Not a bigger number",
				line: "A proof.",
				sub: "The list can never close."
			}),
			sceneId === "close" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still$1, {
				src: "/art/euclid-late.jpg",
				time,
				start,
				end,
				kicker: "Start with the primes you know",
				line: "Add one"
			})
		]
	}, key);
}
function SquareLesson({ time, at }) {
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
	const side = 84;
	const five = 140;
	const x0 = 208;
	const y0 = 68;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lesson, {
		footer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 640 360",
			className: "min-h-0 w-full flex-1",
			"aria-hidden": true,
			children: [!drawn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "320",
				y: "190",
				textAnchor: "middle",
				fill: "var(--color-parchment)",
				fontFamily: "Fraunces, Georgia, serif",
				fontSize: "36",
				children: "square + 10 × side = 39"
			}), drawn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: x0,
					y: y0,
					width: side,
					height: side,
					fill: "var(--color-aegean)",
					fillOpacity: "0.55",
					stroke: "var(--color-parchment)",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 250,
					y: 118,
					textAnchor: "middle",
					fill: "var(--color-parchment)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "28",
					children: three ? "3" : "side"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 292,
					y: y0,
					width: five,
					height: side,
					fill: "var(--color-parchment)",
					fillOpacity: rects ? .18 : 0,
					stroke: "var(--color-parchment)",
					strokeWidth: "2",
					opacity: rects ? 1 : 0
				}),
				rects && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 362,
					y: 116,
					textAnchor: "middle",
					fill: "var(--color-parchment)",
					fontFamily: "Outfit, system-ui, sans-serif",
					fontSize: "18",
					children: "5 × side"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: x0,
					y: 152,
					width: side,
					height: five,
					fill: "var(--color-parchment)",
					fillOpacity: rects ? .18 : 0,
					stroke: "var(--color-parchment)",
					strokeWidth: "2",
					opacity: rects ? 1 : 0
				}),
				rects && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 250,
					y: 222,
					textAnchor: "middle",
					fill: "var(--color-parchment)",
					fontFamily: "Outfit, system-ui, sans-serif",
					fontSize: "18",
					transform: `rotate(-90 250 222)`,
					children: "5 × side"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 292,
					y: 152,
					width: five,
					height: five,
					fill: corner ? "var(--color-gold)" : "var(--color-terra)",
					fillOpacity: corner ? .85 : missing ? .08 : 0,
					stroke: corner ? "var(--color-gold)" : "var(--color-parchment)",
					strokeWidth: "2",
					strokeDasharray: corner ? void 0 : "6 6",
					opacity: missing || corner ? 1 : 0
				}),
				corner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 362,
					y: 232,
					textAnchor: "middle",
					fill: "var(--color-ink)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "40",
					children: "25"
				}),
				eight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 320,
					y: 56,
					textAnchor: "middle",
					fill: "var(--color-gold)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "24",
					children: "8"
				})
			] })]
		})
	});
}
var LESSON = /* @__PURE__ */ new Set([
	"puzzle",
	"draw",
	"corner",
	"complete",
	"check"
]);
function KhwarizmiStage({ sceneId, time, start, end, at }) {
	const key = LESSON.has(sceneId) ? "square" : sceneId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scene-in absolute inset-0",
		children: [
			sceneId === "city" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opening, {
				src: "/art/baghdad.jpg",
				time,
				start,
				end,
				kicker: "Episode five",
				title: "The Unknown",
				name: "Al-Khwarizmi"
			}),
			sceneId === "book" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				eyebrow: "Al-jabr",
				line: "Algebra",
				sub: "Restore the equation. Then keep both sides equal."
			}),
			LESSON.has(sceneId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareLesson, {
				time,
				at
			}),
			sceneId === "word" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				eyebrow: "His name, carried into Latin",
				line: "Algorithm",
				sub: "A list of steps that cannot wander."
			}),
			sceneId === "close" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still$1, {
				src: "/art/khwarizmi-desk.jpg",
				time,
				start,
				end,
				kicker: "Name the unknown",
				line: "Complete the square"
			})
		]
	}, key);
}
var S = 34;
var OX = 78;
var OY = 348;
function X(x) {
	return OX + x * S;
}
function Y(y) {
	return OY - y * S;
}
function SlopeLesson({ time, at }) {
	const reduced = useReduced$2();
	const started = time >= at(newtonAt.slide);
	const kissing = time >= at(newtonAt.kiss);
	const names = time >= at(newtonAt.names);
	const still = time >= at(newtonAt.still);
	const xb = kissing || reduced && started ? 1 : 3 - 2 * smooth(span(time, at(newtonAt.slide), at(newtonAt.kiss)));
	const m = Math.abs(xb - 1) < .02 ? 2 : xb + 1;
	const yb = xb * xb;
	let d = "";
	for (let x = 0; x <= 3.15; x += .05) d += `${x === 0 ? "M" : "L"}${X(x).toFixed(1)} ${Y(x * x).toFixed(1)}`;
	const lo = Math.max(.15, 1 - 1 / m);
	const hi = Math.min(3.1, 1 + 8.8 / m);
	const yOn = (x) => 1 + m * (x - 1);
	let footer = "Join two points. The slope is an average.";
	if (started && !kissing) footer = `Rise over run = ${m.toFixed(2)}`;
	if (kissing && !names) footer = "This instant. Slope 2.";
	if (names && !still) footer = "Newton called that rate a fluxion.";
	if (still) footer = "A speedometer is this slope.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lesson, {
		footer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 640 360",
			className: "min-h-0 w-full flex-1",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: OX,
					y1: 16,
					x2: OX,
					y2: OY,
					stroke: "var(--color-parchment)",
					strokeWidth: "1.5",
					opacity: "0.7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: OX,
					y1: OY,
					x2: X(3.2),
					y2: OY,
					stroke: "var(--color-parchment)",
					strokeWidth: "1.5",
					opacity: "0.7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d,
					fill: "none",
					stroke: "var(--color-aegean)",
					strokeWidth: "4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: X(lo),
					y1: Y(yOn(lo)),
					x2: X(hi),
					y2: Y(yOn(hi)),
					stroke: kissing ? "var(--color-gold)" : "var(--color-parchment)",
					strokeWidth: kissing ? 4 : 2
				}),
				!kissing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M${X(1)} ${Y(1)} L${X(xb)} ${Y(1)} L${X(xb)} ${Y(yb)}`,
					fill: "none",
					stroke: "var(--color-terra)",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: X(1),
					cy: Y(1),
					r: "7",
					fill: "var(--color-parchment)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: X(xb),
					cy: Y(yb),
					r: "7",
					fill: "var(--color-gold)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "400",
					y: "120",
					fill: "var(--color-parchment-dim)",
					fontFamily: "Outfit, system-ui, sans-serif",
					fontSize: "18",
					children: kissing ? "this instant" : "average"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "400",
					y: "180",
					fill: "var(--color-gold)",
					fontFamily: "Fraunces, Georgia, serif",
					fontSize: "64",
					children: kissing ? "2" : m.toFixed(2)
				})
			]
		})
	});
}
var SLOPE = /* @__PURE__ */ new Set([
	"draw",
	"slide",
	"kiss",
	"names",
	"still"
]);
function NewtonStage({ sceneId, time, start, end, at }) {
	const key = SLOPE.has(sceneId) ? "slope" : sceneId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scene-in absolute inset-0",
		children: [
			sceneId === "city" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opening, {
				src: "/art/woolsthorpe.jpg",
				time,
				start,
				end,
				kicker: "Episode seven",
				title: "The Instant",
				name: "Newton"
			}),
			sceneId === "both" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				eyebrow: "Newton and Leibniz",
				line: "Calculus",
				sub: "One published first. The other had begun earlier. The idea belongs to both."
			}),
			SLOPE.has(sceneId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlopeLesson, {
				time,
				at
			}),
			sceneId === "close" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still$1, {
				src: "/art/newton-late.jpg",
				time,
				start,
				end,
				kicker: "Bring the points together",
				line: "Read the slope"
			})
		]
	}, key);
}
function Laws({ time, at }) {
	const reduced = useReduced$2();
	const turn = time >= at(noetherAt.turn);
	const mode = time >= at(noetherAt.wait) ? "wait" : turn ? "turn" : "slide";
	const shift = reduced ? 0 : time * 28 % 56;
	const angle = reduced ? 20 : time * 48 % 360;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lesson, {
		footer: mode === "wait" ? "Energy is conserved." : mode === "turn" ? "Angular momentum is conserved." : "Momentum is conserved.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid min-h-0 flex-1 grid-rows-3 gap-2 p-3 sm:p-4",
			children: [
				{
					id: "slide",
					title: "Slide the world",
					kept: "Momentum stays"
				},
				{
					id: "turn",
					title: "Turn the world",
					kept: "Spin stays"
				},
				{
					id: "wait",
					title: "Let time pass",
					kept: "Energy stays"
				}
			].map((row) => {
				const on = row.id === mode;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 rounded-xl px-3",
					style: {
						background: on ? "color-mix(in srgb, var(--color-gold) 16%, transparent)" : "transparent",
						opacity: on ? 1 : .4
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-gold uppercase",
								children: row.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl text-parchment sm:text-4xl",
								children: row.kept
							})]
						}),
						row.id === "slide" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 160 36",
							className: "h-9 w-28 shrink-0",
							"aria-hidden": true,
							children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: (i * 28 + shift) % 168 - 8,
								cy: "18",
								r: "5",
								fill: "var(--color-parchment)"
							}, i))
						}),
						row.id === "turn" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 36 36",
							className: "h-9 w-9 shrink-0",
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								style: {
									transform: `rotate(${angle}deg)`,
									transformOrigin: "18px 18px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "18",
									cy: "18",
									r: "14",
									fill: "none",
									stroke: "var(--color-parchment)",
									strokeWidth: "2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "18",
									y1: "18",
									x2: "18",
									y2: "6",
									stroke: "var(--color-gold)",
									strokeWidth: "2"
								})]
							})
						}),
						row.id === "wait" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 120 36",
							className: "h-9 w-24 shrink-0",
							"aria-hidden": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "4",
								y1: "18",
								x2: "116",
								y2: "18",
								stroke: "var(--color-gold)",
								strokeWidth: "3"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: reduced ? 40 : 20 + time * 16 % 80,
								cy: "18",
								r: "4",
								fill: "var(--color-parchment)"
							})]
						})
					]
				}, row.id);
			})
		})
	});
}
var LAWS = /* @__PURE__ */ new Set([
	"slide",
	"turn",
	"wait"
]);
function NoetherStage({ sceneId, time, start, end, at }) {
	const key = LAWS.has(sceneId) ? "laws" : sceneId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scene-in absolute inset-0",
		children: [
			sceneId === "city" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opening, {
				src: "/art/gottingen.jpg",
				time,
				start,
				end,
				kicker: "Episode eight",
				title: "What Is Kept",
				name: "Noether"
			}),
			sceneId === "idea" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				eyebrow: "Emmy Noether, 1918",
				line: "A change, a constancy.",
				sub: "If the law does not notice the change, something cannot be lost."
			}),
			LAWS.has(sceneId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laws, {
				time,
				at
			}),
			sceneId === "later" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still$1, {
				src: "/art/noether-board.jpg",
				time,
				start,
				end,
				kicker: "Nineteen thirty-three",
				line: "She taught on"
			}),
			sceneId === "close" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still$1, {
				src: "/art/noether-board.jpg",
				time,
				start,
				end,
				kicker: "Find the change that leaves the law alone",
				line: "What cannot be lost"
			})
		]
	}, key);
}
var CELLS = [
	"·",
	"1",
	"0",
	"1",
	"1",
	"0",
	"1",
	"·"
];
function Machine({ time, at }) {
	const head = useReduced$2() ? 3 : Math.floor(time / .7) % CELLS.length;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lesson, {
		footer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col justify-center gap-4 px-3 py-3 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end justify-center gap-1",
				children: CELLS.map((cell, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-8 flex-col items-center sm:w-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-4 text-center text-gold",
						children: i === head ? "▼" : ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-full items-center justify-center border text-lg text-parchment",
						style: {
							borderColor: i === head ? "var(--color-gold)" : "color-mix(in srgb, var(--color-parchment) 35%, transparent)",
							background: i === head ? "color-mix(in srgb, var(--color-gold) 18%, transparent)" : "transparent"
						},
						children: cell
					})]
				}, `${cell}-${i}`))
			}), checker && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-ink px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-gold uppercase",
						children: "Checker"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl text-parchment",
						children: "Halt, or loop."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-ink px-4 py-3",
					style: { opacity: twist ? 1 : .35 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-gold uppercase",
							children: "Then it disobeys"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl text-parchment",
							style: { opacity: saysHalt ? 1 : .35 },
							children: "Says halt → it loops"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							style: {
								color: saysLoop || wrong ? "var(--color-terra)" : "var(--color-parchment)",
								opacity: saysLoop ? 1 : .35
							},
							children: "Says loop → it halts"
						})
					]
				})]
			})]
		})
	});
}
var MACHINE = /* @__PURE__ */ new Set([
	"question",
	"checker",
	"twist",
	"wrong"
]);
function TuringStage({ sceneId, time, start, end, at }) {
	const onTape = time >= at("He pictured a long tape");
	const diagram = MACHINE.has(sceneId) || sceneId === "city" && onTape;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scene-in absolute inset-0",
		children: [
			sceneId === "city" && !onTape && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opening, {
				src: "/art/cambridge.jpg",
				time,
				start,
				end,
				kicker: "Episode nine",
				title: "The Halt",
				name: "Turing"
			}),
			diagram && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Machine, {
				time,
				at
			}),
			sceneId === "later" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still$1, {
				src: "/art/turing-tape.jpg",
				time,
				start,
				end,
				kicker: "Nineteen fifty-four",
				line: "The question remained"
			}),
			sceneId === "close" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still$1, {
				src: "/art/turing-tape.jpg",
				time,
				start,
				end,
				kicker: "Write the rules",
				line: "Ask whether they end"
			})
		]
	}, diagram ? "machine" : sceneId);
}
function useReduced() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	}, []);
	return reduced;
}
function Scrim({ strong = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: strong ? "absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" : "absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" });
}
function Still({ src, time, start, end, focus = "50% 42%", zoom = .1 }) {
	const reduced = useReduced();
	const p = span(time, start, end);
	const scale = reduced ? 1.04 : 1.06 + zoom * p;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		className: "absolute inset-0 h-full w-full object-cover",
		style: {
			transform: `scale(${scale})`,
			transformOrigin: focus
		}
	});
}
function Samos({ time, end }) {
	const title = time < 6.2 ? 1 : clamp(1 - (time - 6.2) / 1.1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/samos.jpg",
				time,
				start: 0,
				end,
				focus: "62% 40%"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-[12%] px-6 text-center",
				style: { opacity: title },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-gold uppercase",
					children: "A short film"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl leading-none text-parchment sm:text-6xl",
					children: "All Is Number"
				})]
			})
		]
	});
}
function Travel({ time, start, end, at }) {
	const babylon = at("In Babylon");
	const fade = span(time, babylon, babylon + .9);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/egypt.jpg",
				time,
				start,
				end,
				focus: "50% 55%",
				zoom: .08
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/babylon.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover",
				style: { opacity: fade }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, {})
		]
	});
}
function School({ time, start, end, at }) {
	const quoteAt = at("all is number");
	const op = span(time, quoteAt, quoteAt + .7);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/croton.jpg",
				time,
				start,
				end,
				focus: "50% 60%",
				zoom: .07
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, { strong: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-[18%] px-6 text-center",
				style: { opacity: op },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-gold uppercase",
					children: "The creed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-4xl text-parchment italic sm:text-6xl",
					children: "all is number"
				})]
			})
		]
	});
}
function Older({ time, at }) {
	const lines = [
		at("The rule we name"),
		at("What his circle"),
		at("A reason that rule")
	];
	const draw = smooth(span(time, lines[0], lines[2] + 1.4));
	const copy = [
		"Older than Pythagoras.",
		"His circle gave the world a proof.",
		"A reason the rule can never fail."
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 bg-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 100 88",
			className: "absolute inset-0 m-auto h-[78%] w-auto opacity-50",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M50 6 L94 82 L6 82 Z",
				fill: "none",
				stroke: "var(--color-gold)",
				strokeWidth: "0.7",
				pathLength: 1,
				strokeDasharray: 1,
				strokeDashoffset: 1 - draw
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center",
			children: copy.map((line, i) => {
				const on = time >= lines[i];
				const hot = on && (i === copy.length - 1 || time < lines[i + 1]);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: hot ? "font-display text-2xl text-parchment sm:text-4xl" : on ? "font-display text-lg text-parchment-dim sm:text-2xl" : "font-display text-lg text-transparent sm:text-2xl",
					children: line
				}, line);
			})
		})]
	});
}
var AX = 250;
var AY = 400;
var LEG_B = 200;
var A = {
	x: AX,
	y: AY
};
var C = {
	x: AX,
	y: 250
};
var B = {
	x: 450,
	y: AY
};
var HYP_OUT = {
	x: 150,
	y: -200
};
function growSquare(p1, p2, outward, p) {
	return [
		p1,
		p2,
		{
			x: p2.x + outward.x * p,
			y: p2.y + outward.y * p
		},
		{
			x: p1.x + outward.x * p,
			y: p1.y + outward.y * p
		}
	];
}
function center(pts) {
	return {
		x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
		y: pts.reduce((s, p) => s + p.y, 0) / pts.length
	};
}
function Theorem({ time, at }) {
	const t0 = at("Draw a right triangle");
	const tLegs = t0 + 2.4;
	const tHyp = at("Call them a and b");
	const tC = at("Call it c");
	const tSq = at("The theorem says");
	const tEq = at("a squared plus b squared");
	const legP = smooth(span(time, t0, tLegs));
	const hypP = smooth(span(time, tLegs, tHyp));
	const abP = span(time, tHyp, tHyp + 1.1);
	const cP = span(time, tC, tC + .7);
	const sqP = smooth(span(time, tSq, tEq));
	const eqP = span(time, tEq, tEq + 1.2);
	const zoom = smooth(span(time, tSq, tSq + 3.2));
	const focus = {
		x: 200,
		y: 200,
		w: 300,
		h: 250
	};
	const full = {
		x: 70,
		y: 20,
		w: 560,
		h: 610
	};
	const box = {
		x: lerp(focus.x, full.x, zoom),
		y: lerp(focus.y, full.y, zoom),
		w: lerp(focus.w, full.w, zoom),
		h: lerp(focus.h, full.h, zoom)
	};
	const sqA = growSquare(A, C, {
		x: -150,
		y: 0
	}, sqP);
	const sqB = growSquare(A, B, {
		x: 0,
		y: LEG_B
	}, sqP);
	const sqC = growSquare(C, B, HYP_OUT, sqP);
	const midC = center(sqC);
	const legs = pathOf([
		C,
		A,
		B
	], false);
	const hyp = pathOf([C, B], false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lesson-stage absolute inset-0 flex flex-col bg-ink px-3 pt-3 pb-3 sm:px-8 sm:pt-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col rounded-2xl bg-parchment text-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: `${box.x} ${box.y} ${box.w} ${box.h}`,
				className: "min-h-0 w-full flex-1",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: pathOf(sqA),
						fill: "var(--color-terra)",
						fillOpacity: .28 * sqP,
						stroke: "var(--color-ink)",
						strokeWidth: 3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: pathOf(sqB),
						fill: "var(--color-aegean)",
						fillOpacity: .28 * sqP,
						stroke: "var(--color-ink)",
						strokeWidth: 3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: pathOf(sqC),
						fill: "var(--color-gold)",
						fillOpacity: .38 * sqP,
						stroke: "var(--color-ink)",
						strokeWidth: 3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: legs,
						fill: "none",
						stroke: "var(--color-ink)",
						strokeWidth: 4,
						strokeLinejoin: "round",
						strokeLinecap: "round",
						pathLength: 1,
						strokeDasharray: 1,
						strokeDashoffset: 1 - legP
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: hyp,
						fill: "none",
						stroke: "var(--color-ink)",
						strokeWidth: 4,
						strokeLinecap: "round",
						pathLength: 1,
						strokeDasharray: 1,
						strokeDashoffset: 1 - hypP
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: `M ${A.x} ${A.y - 26} L ${A.x + 26} ${A.y - 26} L ${A.x + 26} ${A.y}`,
						fill: "none",
						stroke: "var(--color-ink)",
						strokeWidth: 3,
						opacity: legP
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: A.x + 16,
						y: (A.y + C.y) / 2 + 8,
						fill: "var(--color-ink)",
						fontFamily: "Fraunces, Georgia, serif",
						fontSize: 34,
						opacity: abP,
						children: "a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: (A.x + B.x) / 2 - 8,
						y: A.y - 14,
						fill: "var(--color-ink)",
						fontFamily: "Fraunces, Georgia, serif",
						fontSize: 34,
						opacity: abP,
						children: "b"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 308,
						y: 352,
						fill: "var(--color-ink)",
						fontFamily: "Fraunces, Georgia, serif",
						fontSize: 34,
						opacity: cP,
						children: "c"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: center(sqA).x - 22,
						y: center(sqA).y + 10,
						fill: "var(--color-ink)",
						fontFamily: "Fraunces, Georgia, serif",
						fontSize: 32,
						opacity: sqP,
						children: "a²"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: center(sqB).x - 18,
						y: center(sqB).y + 8,
						fill: "var(--color-ink)",
						fontFamily: "Fraunces, Georgia, serif",
						fontSize: 32,
						opacity: sqP,
						children: "b²"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: midC.x - 18,
						y: midC.y + 8,
						fill: "var(--color-ink)",
						fontFamily: "Fraunces, Georgia, serif",
						fontSize: 32,
						opacity: sqP,
						children: "c²"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pb-3 text-center font-display text-2xl text-ink sm:pb-4 sm:text-4xl",
				style: { opacity: eqP },
				children: "a² + b² = c²"
			})]
		})
	});
}
function Proof({ time, at }) {
	const tSet = at("Set four copies");
	const tSlide = at("Now slide");
	const tSame = at("Same triangles");
	const tAlways = at("Always.");
	const appear = smooth(span(time, tSet, tSet + 2.2));
	const k = smooth(span(time, tSlide, tSame));
	const { S, from, to, inner, a, b } = proofFrames();
	const innerOp = (1 - smooth(span(k, .05, .4))) * appear;
	const restOp = smooth(span(k, .62, .92));
	const pulse = time >= tAlways ? 1 : .72;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lesson-stage absolute inset-0 flex flex-col bg-ink px-3 pt-3 pb-3 sm:px-10 sm:pt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col items-center rounded-2xl bg-parchment text-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: `-36 -36 ${S + 72} ${S + 72}`,
				className: "min-h-0 w-full flex-1",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: 0,
						y: 0,
						width: S,
						height: S,
						fill: "none",
						stroke: "var(--color-ink)",
						strokeWidth: 3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: pathOf(inner),
						fill: "var(--color-gold)",
						fillOpacity: .85 * innerOp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: 0,
						y: a,
						width: b,
						height: b,
						fill: "var(--color-aegean)",
						fillOpacity: .35 * restOp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: b,
						y: b,
						width: a,
						height: a,
						fill: "var(--color-terra)",
						fillOpacity: .4 * restOp
					}),
					from.map((tri, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: pathOf(mixPts(tri, to[i], k)),
						fill: "var(--color-terra)",
						fillOpacity: .9 * appear,
						stroke: "var(--color-ink)",
						strokeWidth: 2.5,
						strokeLinejoin: "round"
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: S / 2,
						y: S / 2 + 8,
						textAnchor: "middle",
						fill: "var(--color-ink)",
						fontFamily: "Fraunces, Georgia, serif",
						fontSize: 28,
						opacity: innerOp,
						children: "c²"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: b / 2,
						y: a + b / 2 + 8,
						textAnchor: "middle",
						fill: "var(--color-ink)",
						fontFamily: "Fraunces, Georgia, serif",
						fontSize: 26,
						opacity: restOp,
						children: "b²"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: b + a / 2,
						y: b + a / 2 + 8,
						textAnchor: "middle",
						fill: "var(--color-ink)",
						fontFamily: "Fraunces, Georgia, serif",
						fontSize: 26,
						opacity: restOp,
						children: "a²"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pb-3 text-center font-display text-2xl sm:pb-4 sm:text-4xl",
				style: { opacity: Math.max(appear, pulse) },
				children: "a² + b² = c²"
			})]
		})
	});
}
function Row({ show, label, hot = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: hot ? "font-display text-xl text-gold sm:text-3xl" : "font-display text-xl text-parchment sm:text-3xl",
		style: { opacity: show ? 1 : .18 },
		children: label
	});
}
function Rope({ time, at }) {
	const t0 = at("Try the oldest");
	const nineAt = at("Three squared is nine");
	const k = smooth(span(time, t0, nineAt));
	const knots = ropeKnots(k);
	const d = pathOf(knots, false);
	const nine = time >= nineAt;
	const sixteen = time >= at("Four squared is sixteen");
	const sum = time >= at("Nine plus sixteen");
	const match = time >= at("five squared is twenty five");
	const exact = time >= at("The corner is exact");
	const corner = knots[3];
	const back = knots[2];
	const fwd = knots[4];
	const mark = .42;
	const pBack = {
		x: corner.x + (back.x - corner.x) * mark,
		y: corner.y + (back.y - corner.y) * mark
	};
	const pFwd = {
		x: corner.x + (fwd.x - corner.x) * mark,
		y: corner.y + (fwd.y - corner.y) * mark
	};
	const pIn = {
		x: pBack.x + pFwd.x - corner.x,
		y: pBack.y + pFwd.y - corner.y
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lesson-stage absolute inset-0 flex flex-col bg-ink px-4 pt-2 pb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "-1.2 -7.9 14 8.6",
			className: "min-h-0 w-full flex-1",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d,
					fill: "none",
					stroke: "var(--color-gold)",
					strokeWidth: .18,
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				knots.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: p.x,
					cy: p.y,
					r: .12,
					fill: "var(--color-parchment)"
				}, i)),
				k > .86 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M ${pBack.x} ${pBack.y} L ${pIn.x} ${pIn.y} L ${pFwd.x} ${pFwd.y}`,
					fill: "none",
					stroke: "var(--color-parchment)",
					strokeWidth: .07
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-x-4 gap-y-1 px-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					show: nine,
					label: "3² = 9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					show: sixteen,
					label: "4² = 16"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					show: sum,
					label: "9 + 16 = 25",
					hot: exact
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					show: match,
					label: "5² = 25",
					hot: exact
				})
			]
		})]
	});
}
function Today({ time, start, end, at }) {
	const bits = [
		{
			t: at("It sizes a roof"),
			label: "A roof"
		},
		{
			t: at("It sizes a screen"),
			label: "A screen"
		},
		{
			t: at("short path"),
			label: "A path across a map"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/roof.jpg",
				time,
				start,
				end,
				focus: "50% 45%",
				zoom: .08
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, { strong: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-[16%] flex flex-col items-center gap-2 px-6 text-center sm:gap-3",
				children: bits.map((bit, i) => {
					const on = time >= bit.t;
					const hot = on && (i === bits.length - 1 || time < bits[i + 1].t);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: hot ? "font-display text-3xl text-parchment sm:text-5xl" : on ? "font-display text-xl text-parchment-dim sm:text-3xl" : "font-display text-xl text-transparent sm:text-3xl",
						children: bit.label
					}, bit.label);
				})
			})
		]
	});
}
function Close({ time, start, end, at }) {
	const eq = span(time, at("Look for the right angle"), at("Look for the right angle") + .8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/stars.jpg",
				time,
				start,
				end,
				focus: "50% 30%",
				zoom: .06
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, { strong: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-[16%] px-6 text-center",
				style: { opacity: eq },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl text-gold sm:text-6xl",
					children: "a² + b² = c²"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm tracking-widest text-parchment uppercase sm:text-base",
					children: "Look for the right angle"
				})]
			})
		]
	});
}
function Stage({ sceneId, time, start, end, at }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scene-in absolute inset-0",
		children: [
			sceneId === "samos" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Samos, {
				time,
				end
			}),
			sceneId === "travel" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Travel, {
				time,
				start,
				end,
				at
			}),
			sceneId === "school" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(School, {
				time,
				start,
				end,
				at
			}),
			sceneId === "older" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Older, {
				time,
				at
			}),
			sceneId === "theorem" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Theorem, {
				time,
				at
			}),
			sceneId === "proof" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Proof, {
				time,
				at
			}),
			sceneId === "rope" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rope, {
				time,
				at
			}),
			sceneId === "today" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Today, {
				time,
				start,
				end,
				at
			}),
			sceneId === "close" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
				time,
				start,
				end,
				at
			})
		]
	}, sceneId);
}
var episodes = [
	{
		id: "pythagoras",
		number: "Episode 1",
		person: "Pythagoras",
		title: "All Is Number",
		line: "A right angle, and why the squares must agree.",
		poster: "/art/samos.jpg",
		audio: "/audio/narration.mp3",
		cues,
		Stage
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
		Stage: EulerStage
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
		Stage: EuclidStage
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
		Stage: ArchimedesStage
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
		Stage: KhwarizmiStage
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
		Stage: DescartesStage
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
		Stage: NewtonStage
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
		Stage: NoetherStage
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
		Stage: TuringStage
	}
];
function fmt(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
	const s = Math.floor(seconds);
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function captionAt(time, cues) {
	let text = "";
	for (const cue of cues.captions) if (time >= cue.t - .04) text = cue.text;
	return text;
}
function Film({ episode, onBack, onNext, nextLabel }) {
	const cues = episode.cues;
	const audioRef = (0, import_react.useRef)(null);
	const [time, setTime] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [ended, setEnded] = (0, import_react.useState)(false);
	const [captionsOn, setCaptionsOn] = (0, import_react.useState)(true);
	const [record, setRecord] = (0, import_react.useState)(false);
	const [chapters, setChapters] = (0, import_react.useState)(false);
	const [hot, setHot] = (0, import_react.useState)(true);
	const at = (0, import_react.useCallback)((fragment) => {
		return cues.captions.find((cue) => cue.text.includes(fragment))?.t ?? 0;
	}, [cues]);
	const scene = (0, import_react.useMemo)(() => {
		let current = cues.scenes[0];
		for (const item of cues.scenes) if (time >= item.t) current = item;
		const index = cues.scenes.findIndex((item) => item.id === current.id);
		const end = cues.scenes[index + 1]?.t ?? cues.duration;
		return {
			...current,
			end
		};
	}, [cues, time]);
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const tick = () => {
			const audio = audioRef.current;
			if (audio && !audio.paused) setTime(audio.currentTime);
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!record || !playing) return;
		setHot(true);
		const id = window.setTimeout(() => setHot(false), 1600);
		return () => window.clearTimeout(id);
	}, [record, playing]);
	const seek = (0, import_react.useCallback)((next) => {
		const audio = audioRef.current;
		const t = Math.min(cues.duration, Math.max(0, next));
		if (audio) audio.currentTime = t;
		setTime(t);
		setEnded(false);
	}, [cues.duration]);
	const toggle = (0, import_react.useCallback)(async () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (ended || audio.currentTime >= cues.duration - .05) {
			audio.currentTime = 0;
			setTime(0);
			setEnded(false);
			try {
				await audio.play();
			} catch {}
			return;
		}
		if (audio.paused) try {
			await audio.play();
		} catch {}
		else audio.pause();
	}, [ended]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target instanceof HTMLElement && target.closest("input")) return;
			if (event.code === "Space") {
				if (target instanceof HTMLElement && target.closest("button")) return;
				event.preventDefault();
				toggle();
			} else if (event.code === "ArrowRight") seek((audioRef.current?.currentTime ?? time) + 5);
			else if (event.code === "ArrowLeft") seek((audioRef.current?.currentTime ?? time) - 5);
			else if (event.key === "c" || event.key === "C") setCaptionsOn((on) => !on);
			else if (event.key === "Escape") {
				setRecord(false);
				setChapters(false);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		seek,
		time,
		toggle
	]);
	const caption = captionAt(time, cues);
	const showCaption = captionsOn && (playing || time > .25) && caption.length > 0;
	const pct = cues.duration > 0 ? time / cues.duration * 100 : 0;
	const poster = !playing && time < .2 && !ended;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "theater grid h-dvh grid-rows-[auto_minmax(0,1fr)_auto] bg-ink text-parchment",
		"data-record": record ? "true" : "false",
		onMouseMove: () => {
			if (record) setHot(true);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				ref: audioRef,
				src: episode.audio,
				playsInline: true,
				preload: "auto",
				onPlay: () => {
					setPlaying(true);
					setEnded(false);
				},
				onPause: () => setPlaying(false),
				onEnded: () => {
					setPlaying(false);
					setEnded(true);
					setTime(cues.duration);
				}
			}),
			record ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-12 items-center justify-between gap-3 px-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onBack,
						className: "h-11 text-sm text-gold",
						children: "Series"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg text-parchment",
						children: "All Is Number"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-parchment-dim",
						children: episode.person
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: record ? "stage-slot" : "stage-slot p-2 sm:p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full w-full items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fit-16x9 film-frame relative bg-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(episode.Stage, {
								sceneId: scene.id,
								time,
								start: scene.t,
								end: scene.end,
								at
							}),
							showCaption && record && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-x-3 bottom-3 z-10 flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-2xl rounded-md bg-ink/80 px-3 py-1.5 text-center text-xs leading-normal text-parchment sm:text-base",
									children: caption
								})
							}),
							!playing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-ink/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void toggle(),
										className: "flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink",
										"aria-label": ended ? "Play again" : poster ? "Play the film" : "Play",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
											"aria-hidden": true,
											className: "ml-1 h-7 w-7",
											fill: "currentColor"
										})
									}),
									poster && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-parchment",
										children: "Play the film"
									}),
									ended && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-parchment",
										children: "Play again"
									}),
									ended && onNext && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: onNext,
										className: "h-11 rounded-full bg-parchment px-4 text-sm font-medium text-ink",
										children: ["Next: ", nextLabel]
									})
								]
							}),
							record && (hot || !playing) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setRecord(false),
								className: "absolute top-3 right-3 z-30 h-11 rounded-full bg-ink/75 px-4 text-sm text-parchment",
								children: "Exit"
							})
						]
					})
				})
			}),
			record ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "px-3 pt-1 pb-3 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-5xl flex-col gap-1",
					children: [
						showCaption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "min-h-6 text-center text-sm leading-normal text-parchment",
							children: caption
						}),
						!showCaption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-6" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-10 text-xs text-parchment-dim tabular-nums",
									children: fmt(time)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex h-11 flex-1 items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative h-1.5 w-full rounded-full bg-ink-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-y-0 left-0 rounded-full bg-gold",
											style: { width: `${pct}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										suppressHydrationWarning: true,
										className: "scrub absolute inset-0 h-full w-full",
										type: "range",
										min: 0,
										max: cues.duration,
										step: .05,
										value: Math.min(time, cues.duration),
										"aria-label": "Seek",
										onChange: (event) => seek(Number(event.target.value))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-10 text-right text-xs text-parchment-dim tabular-nums",
									children: fmt(cues.duration)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void toggle(),
									className: "inline-flex h-11 items-center gap-2 rounded-full bg-gold px-4 text-sm font-medium text-ink",
									"aria-label": playing ? "Pause" : "Play",
									children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
										className: "h-4 w-4",
										fill: "currentColor"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										className: "h-4 w-4",
										fill: "currentColor"
									}), playing ? "Pause" : ended ? "Replay" : "Play"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCaptionsOn((on) => !on),
									className: "inline-flex h-11 items-center rounded-full bg-ink-2 px-4 text-sm text-parchment",
									"aria-pressed": captionsOn,
									children: captionsOn ? "Captions on" : "Captions off"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setChapters((open) => !open),
									className: "inline-flex h-11 items-center rounded-full bg-ink-2 px-4 text-sm text-parchment",
									"aria-expanded": chapters,
									children: "Scenes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setRecord(true);
										setChapters(false);
										setHot(true);
									},
									className: "inline-flex h-11 items-center rounded-full bg-ink-2 px-4 text-sm text-parchment",
									children: "Clean frame"
								})
							]
						}),
						chapters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 overflow-x-auto py-1",
							children: cues.scenes.map((item) => {
								const on = item.id === scene.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										seek(item.t);
										if (audioRef.current?.paused) audioRef.current.play();
									},
									className: on ? "h-10 shrink-0 rounded-full bg-gold px-3 text-sm text-ink" : "h-10 shrink-0 rounded-full bg-ink-2 px-3 text-sm text-parchment",
									children: item.title
								}, item.id);
							})
						})
					]
				})
			})
		]
	});
}
function Library({ onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "h-dvh overflow-y-auto bg-ink text-parchment",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-gold uppercase",
						children: "A series"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-5xl leading-none text-parchment sm:text-6xl",
						children: "All Is Number"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-base leading-normal text-parchment-dim",
						children: "Nine short films. A new voice each time. Each one turns a puzzle into a theory."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: episodes.map((episode) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onOpen(episode.id),
					className: "overflow-hidden rounded-2xl bg-ink-2 text-left text-parchment",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: episode.poster,
						alt: "",
						className: "aspect-video w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col gap-1 px-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium tracking-widest text-gold uppercase",
								children: episode.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl",
								children: episode.person
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm leading-normal text-parchment-dim",
								children: episode.line
							})
						]
					})]
				}, episode.id))
			})]
		})
	});
}
function Home() {
	const [id, setId] = (0, import_react.useState)(null);
	const episode = episodes.find((item) => item.id === id);
	if (episode) {
		const next = episodes[episodes.findIndex((item) => item.id === episode.id) + 1];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, {
			episode,
			onBack: () => setId(null),
			onNext: next ? () => setId(next.id) : void 0,
			nextLabel: next?.person
		}, episode.id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, { onOpen: setId });
}
//#endregion
export { Home as component };
