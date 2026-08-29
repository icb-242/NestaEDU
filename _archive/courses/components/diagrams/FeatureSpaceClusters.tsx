"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Pt = { x: number; y: number };

function lerp(a: number, b: number, t: number) { 
  return a + (b - a) * t; 
}

function lerpPt(a: Pt, b: Pt, t: number): Pt { 
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }; 
}

export default function FeatureSpaceClusters() {
  const [t, setT] = useState(40); // 0..100

  // Generate deterministic points (memoized) so animation feels consistent
  const { initialBlue, finalBlue, initialRed, finalRed } = useMemo(() => {
    const N = 120;
    const rand = (seed: number) => () => { 
      seed = (seed * 9301 + 49297) % 233280; 
      return seed / 233280; 
    };
    const r1 = rand(7), r2 = rand(19);

    const mkCloud = (cx: number, cy: number, spread: number, R: () => number) =>
      Array.from({ length: N }, () => ({ 
        x: cx + (R() - 0.5) * spread, 
        y: cy + (R() - 0.5) * spread 
      }));

    // initial mixed clouds overlap around center
    const initialBlue = mkCloud(0, 0, 120, r1);
    const initialRed  = mkCloud(10, -10, 120, r2);

    // final clusters separated
    const finalBlue = mkCloud(-120, 80, 60, r1);
    const finalRed  = mkCloud(120, -80, 60, r2);

    return { initialBlue, finalBlue, initialRed, finalRed };
  }, []);

  const tt = t / 100;

  const blue = initialBlue.map((p, i) => lerpPt(p, finalBlue[i], tt));
  const red  = initialRed.map((p, i) => lerpPt(p, finalRed[i], tt));

  // Boundary path: morph from wavy line (t=0) to smooth separator (t=1)
  const boundaryPath = useMemo(() => {
    const x0 = -180, x1 = 180, yMid0 = 0, yMid1 = -10;
    // small sinusoidal noise when early; dampen with (1-tt)
    const samples = 40;
    const pts: Pt[] = [];
    for (let i = 0; i <= samples; i++) {
      const x = x0 + (i * (x1 - x0)) / samples;
      const base = lerp(yMid0, yMid1, tt) + (1 - tt) * 20 * Math.sin(i * 0.6);
      pts.push({ x, y: base + tt * (x * 0.1) }); // slight tilt as it stabilizes
    }
    // convert to SVG path
    const toPath = (arr: Pt[]) => arr.map((p, i) => `${i ? "L" : "M"} ${p.x},${p.y}`).join(" ");
    return toPath(pts);
  }, [tt]);

  // ViewBox coordinates (centered)
  const vb = "-220 -140 440 280";

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Legend */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-muted-foreground">Feature Space Clustering</div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500" /> 
            <span className="text-muted-foreground">Blue class</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500" /> 
            <span className="text-muted-foreground">Red class</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-6 h-0.5 bg-purple-500" /> 
            <span className="text-muted-foreground">Decision boundary</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative rounded-xl border-2 border-primary/20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 p-4 shadow-lg">
        <svg viewBox={vb} className="w-full aspect-[16/9]" aria-label="Animated feature space with clusters and decision boundary">
          {/* Grid */}
          <g opacity="0.1" stroke="currentColor">
            {Array.from({length: 10}, (_,i) => (
              <line key={"v"+i} x1={-200+i*40} y1={-120} x2={-200+i*40} y2={120} />
            ))}
            {Array.from({length: 6}, (_,i) => (
              <line key={"h"+i} x1={-200} y1={-120+i*40} x2={200} y2={-120+i*40} />
            ))}
          </g>

          {/* Axes */}
          <g stroke="currentColor" opacity="0.5" strokeWidth="1.5">
            <line x1={-200} y1={0} x2={200} y2={0} />
            <line x1={0} y1={-120} x2={0} y2={120} />
          </g>
          
          {/* Axis Labels */}
          <text x="205" y="5" fontSize="12" fill="currentColor" fontWeight="600">Feature 1</text>
          <text x="5" y="-125" fontSize="12" fill="currentColor" fontWeight="600">Feature 2</text>

          {/* Decision Boundary (purple) */}
          <motion.path
            d={boundaryPath}
            fill="none"
            stroke="#a855f7"
            strokeWidth="3"
            strokeDasharray="8,4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            key={`boundary-${t}`}
          />

          {/* Blue Points */}
          {blue.map((p, idx) => (
            <motion.circle 
              key={"b"+idx} 
              cx={p.x} 
              cy={p.y} 
              r="2.5" 
              fill="#3b82f6"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.8 }} 
              transition={{ duration: 0.3, delay: 0.01 * (idx % 20) }}
            />
          ))}
          
          {/* Red Points */}
          {red.map((p, idx) => (
            <motion.circle 
              key={"r"+idx} 
              cx={p.x} 
              cy={p.y} 
              r="2.5" 
              fill="#ef4444"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.8 }} 
              transition={{ duration: 0.3, delay: 0.01 * (idx % 20) }}
            />
          ))}
        </svg>
      </div>

      {/* Slider Control */}
      <div className="mt-6 bg-card border rounded-lg p-5 space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-foreground w-36">
            Training progress:
          </label>
          <input 
            type="range" 
            min={0} 
            max={100} 
            value={t} 
            onChange={(e) => setT(parseInt(e.target.value))}
            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <span className="text-sm font-semibold text-primary w-12 text-right">
            {t}%
          </span>
        </div>

        {/* Progress markers */}
        <div className="flex justify-between text-xs text-muted-foreground px-36">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>

        {/* Dynamic explanation */}
        <motion.div
          key={`msg-${Math.floor(t/20)}`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-primary/5 border border-primary/20 rounded-lg p-3"
        >
          <p className="text-sm text-muted-foreground text-center">
            {t < 20 && "🔍 Patterns are messy; the model can't separate classes yet."}
            {t >= 20 && t < 70 && "📊 With training, similar examples cluster together."}
            {t >= 70 && "✨ Clear clusters emerge; the decision boundary stabilizes."}
          </p>
        </motion.div>

        {/* Educational note */}
        <p className="text-xs text-center text-muted-foreground italic">
          💡 Notice how points move from chaos to organized clusters as training progresses
        </p>
      </div>
    </div>
  );
}

