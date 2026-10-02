import React, { useEffect, useRef } from 'react';

/*
  Layered "ribbon" waves (Persona-style date widget).
  Each layer is a FILLED shape whose centre-line undulates and whose
  thickness swells/pinches to sharp points as it travels. Layers move at
  different speeds / directions so the colours slide over each other.

  Layers are drawn back -> front.
    base  : vertical centre of the ribbon in the 1200x300 viewBox
    amp   : how far the centre-line bobs up/down
    k     : horizontal frequency of the bobbing
    speed : bob travel speed (negative = other direction)
    thick : max ribbon thickness
    minT  : 0..1 floor on thickness (0 = fully pinches to points)
    k2/speed2 : frequency / speed of the swell-and-pinch cycle
*/
const W = 1200;
const H = 300;

// Ribbons are drawn well PAST both edges of the viewBox so the window edge
// never lands on a ribbon's tapered end. The overflow is clipped by the
// window (your .main-container has overflow: hidden).
const BLEED = 400;
const X_MIN = -BLEED;
const X_MAX = W + BLEED;
const N = 180; // samples per ribbon

const LAYERS = [
    { fill: '#1a2fe0', midnightFill: '#1aa334', opacity: 0.85, base: 150, amp: 26, amp2: 10, k: 0.0052, speed: 0.55, thick: 120, minT: 0.55, k2: 0.0035, speed2: 0.35, phase: 0.0, blur: 2.5 },
    { fill: '#2159f2', midnightFill: '#23bd44', opacity: 0.75, base: 138, amp: 30, amp2: 12, k: 0.0068, speed: -0.8, thick: 92, minT: 0.0, k2: 0.0048, speed2: 0.6, phase: 1.7, blur: 0 },
    { fill: '#2f8dff', midnightFill: '#38d95c', opacity: 0.60, base: 158, amp: 24, amp2: 9, k: 0.0085, speed: 0.95, thick: 62, minT: 0.0, k2: 0.0062, speed2: -0.75, phase: 3.1, blur: 0 },
    { fill: '#8fd6ff', midnightFill: '#9af5b2', opacity: 0.40, base: 146, amp: 34, amp2: 8, k: 0.0074, speed: -1.1, thick: 16, minT: 0.0, k2: 0.0071, speed2: 0.9, phase: 4.6, blur: 0 },
];

const ribbon = (L, t) => {
    const top = [];
    const bot = [];
    for (let i = 0; i <= N; i++) {
        const x = X_MIN + (i / N) * (X_MAX - X_MIN);
        const c =
            L.base +
            L.amp * Math.sin(L.k * x + L.speed * t + L.phase) +
            L.amp2 * Math.sin(L.k * 2.1 * x - L.speed * 0.7 * t);
        const s = Math.sin(L.k2 * x - L.speed2 * t + L.phase * 2);
        const th = L.thick * (L.minT + (1 - L.minT) * Math.pow(Math.max(0, s), 0.8));
        top.push(`${x.toFixed(1)},${(c - th / 2).toFixed(1)}`);
        bot.push(`${x.toFixed(1)},${(c + th / 2).toFixed(1)}`);
    }
    return `M${top.join('L')}L${bot.reverse().join('L')}Z`;
};

const Waves = ({ isMidnight }) => {
    const paths = useRef([]);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const start = performance.now();
        let raf;

        const draw = (now) => {
            const t = (now - start) / 1000;
            LAYERS.forEach((L, i) => paths.current[i]?.setAttribute('d', ribbon(L, t)));
            if (!reduce) raf = requestAnimationFrame(draw);
        };

        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        // left-0 w-full = exactly the window width; no vw tricks needed
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[55%] pointer-events-none z-0 waves-container-self">
            <svg
                className="w-full h-full overflow-visible"
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <defs>
                    {/* userSpaceOnUse + wide region so the blur isn't clipped in the bleed area */}
                    <filter id="wv-soft" filterUnits="userSpaceOnUse" x={X_MIN} y="-100" width={X_MAX - X_MIN} height={H + 200}>
                        <feGaussianBlur stdDeviation="2.5" />
                    </filter>
                </defs>

                <g>
                    {LAYERS.map((L, i) => (
                        <path
                            key={i}
                            ref={(el) => (paths.current[i] = el)}
                            fill={isMidnight ? L.midnightFill : L.fill}
                            opacity={L.opacity}
                            filter={L.blur ? 'url(#wv-soft)' : undefined}
                            style={{ transition: 'fill 1s ease-in-out' }}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default Waves;