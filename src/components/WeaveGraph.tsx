import { useEffect, useRef, useState } from "react";
import type { Project } from "../data";
import { playWeaveSound } from "../engine";

export default function WeaveGraph({ projects, onSelect }: { projects: Project[]; onSelect: (p: Project) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [phase, setPhase] = useState(0);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setPhase((value) => value + 1), 2600);
    return () => window.clearInterval(timer);
  }, []);

  const centers = projects.map((p) => ({ x: p.x, y: p.y }));

  return (
    <div ref={graphRef} className="relative h-[520px] md:h-[590px] overflow-hidden rounded-[2rem] bg-[#081513] border border-[#4be3c2]/20">
      <div className="absolute inset-0 weave-grid opacity-80" />
      <div className="absolute inset-0 contour-lines opacity-30" />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="thread-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#4be3c2" stopOpacity=".65" />
            <stop offset=".5" stopColor="#61c7f2" stopOpacity=".42" />
            <stop offset="1" stopColor="#b39aff" stopOpacity=".3" />
          </linearGradient>
          <filter id="thread-glow">
            <feGaussianBlur stdDeviation=".55" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {centers.map((a, i) => centers.slice(i + 1).map((b, j) => {
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 54) return null;
          const active = hovered === projects[i].id || hovered === projects[i + j + 1]?.id;
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2 - distance * 0.15;
          return (
            <g key={`${i}-${j}`}>
              <path d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`} fill="none" stroke="url(#thread-gradient)" strokeWidth={active ? ".42" : ".18"} opacity={active ? ".9" : ".32"} filter={active ? "url(#thread-glow)" : undefined} />
              {active && <circle r=".7" fill="#e6fffa" filter="url(#thread-glow)"><animateMotion dur="2.2s" repeatCount="indefinite" path={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`} /></circle>}
            </g>
          );
        }))}
        <path d="M 16 24 C 34 2, 58 6, 73 21 S 86 53, 78 72 S 44 95, 11 84" fill="none" stroke="#4be3c2" strokeOpacity=".11" strokeWidth=".6" strokeDasharray="1 2" />
        <path d="M 8 76 C 24 61, 34 64, 50 44 S 78 12, 94 16" fill="none" stroke="#ef9366" strokeOpacity=".13" strokeWidth=".45" strokeDasharray="1.4 2.4" />
      </svg>

      <div className="absolute top-5 left-5 z-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8ab8aa]">
        <span className="w-2 h-2 rounded-full bg-[#4be3c2] animate-pulse" />
        Live weave · {projects.length} nodes · {phase % 2 === 0 ? "sampling" : "synchronizing"}
      </div>
      <div className="absolute top-5 right-5 z-10 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-[#8ab8aa]">
        x / product<br />y / system
      </div>

      {projects.map((project, index) => {
        const active = hovered === project.id;
        return (
          <button
            key={project.id}
            onMouseEnter={() => { setHovered(project.id); playWeaveSound("hover"); }}
            onMouseLeave={() => setHovered(null)}
            onClick={() => { playWeaveSound("select"); onSelect(project); }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 group text-left transition-all duration-500 ${active ? "z-20 scale-110" : "z-10"}`}
            style={{ left: `${project.x}%`, top: `${project.y}%` }}
            aria-label={`Open ${project.title} case study`}
          >
            <span className="absolute -inset-3 rounded-full border opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" style={{ borderColor: project.accent }} />
            <span className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 bg-[#071312] shadow-xl" style={{ borderColor: project.accent, boxShadow: active ? `0 0 28px ${project.accent}66` : `0 0 14px ${project.accent}25` }}>
              <span className="font-mono text-[10px] font-bold" style={{ color: project.accent }}>{project.icon}</span>
              {index % 3 === 0 && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ef9366]" />}
            </span>
            <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#071312]/95 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="block font-mono text-[9px] uppercase tracking-widest" style={{ color: project.accent }}>{project.code}</span>
              <span className="block text-xs text-[#e6f5ef]">{project.title}</span>
            </span>
          </button>
        );
      })}

      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-[#6d9488]">
        <span>Hover to highlight intersections</span>
        <span>Click a node to open its weave</span>
      </div>
    </div>
  );
}