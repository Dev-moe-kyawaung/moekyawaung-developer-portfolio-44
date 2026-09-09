import { useEffect, useRef } from "react";

export type WeaveSound = "hover" | "select" | "thread" | "burst";

export function playWeaveSound(type: WeaveSound) {
  try {
    const Context = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Context) return;
    const ctx = new Context();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const settings: Record<WeaveSound, [number, number, number, OscillatorType, number]> = {
      hover: [1400, 1400, 0.035, "sine", 0.018],
      select: [360, 920, 0.18, "triangle", 0.045],
      thread: [240, 680, 0.22, "sine", 0.04],
      burst: [120, 1300, 0.34, "sawtooth", 0.045],
    };
    const [start, end, duration, wave, volume] = settings[type];
    osc.type = wave;
    osc.frequency.setValueAtTime(start, now);
    osc.frequency.exponentialRampToValueAtTime(end, now + duration);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  } catch {
    // Browsers can block audio until a user gesture.
  }
}

/* Warp and weft threads: a living fabric field rendered without DOM overhead. */
export function WeaveField({ dense = false, className = "" }: { dense?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;

    const resize = () => {
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.007;
      ctx.clearRect(0, 0, width, height);
      const gap = dense ? 22 : 34;
      const cols = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;

      for (let i = -1; i < cols; i += 1) {
        const base = i * gap;
        ctx.beginPath();
        for (let y = -20; y <= height + 20; y += 10) {
          const x = base + Math.sin(time * 1.1 + y * 0.012 + i) * (dense ? 8 : 13) + Math.sin(time * 0.4 + y * 0.004) * 5;
          y === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = i % 5 === 0 ? "rgba(75,227,194,.24)" : "rgba(97,199,242,.08)";
        ctx.lineWidth = i % 5 === 0 ? 1.1 : 0.6;
        ctx.stroke();
      }

      for (let j = -1; j < rows; j += 1) {
        const base = j * gap;
        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += 10) {
          const y = base + Math.cos(time * 0.9 + x * 0.01 + j) * (dense ? 8 : 12) + Math.sin(time * 0.5 + x * 0.004) * 5;
          x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = j % 4 === 0 ? "rgba(239,147,102,.2)" : "rgba(179,154,255,.07)";
        ctx.lineWidth = j % 4 === 0 ? 1 : 0.55;
        ctx.stroke();
      }

      for (let i = 0; i < Math.min(110, cols * rows); i += 1) {
        const x = (i * 73) % Math.max(1, width) + Math.sin(time + i) * 4;
        const y = (i * 47) % Math.max(1, height) + Math.cos(time * 0.8 + i) * 4;
        const alpha = 0.08 + (Math.sin(time * 2 + i) + 1) * 0.06;
        ctx.fillStyle = i % 3 === 0 ? `rgba(75,227,194,${alpha})` : `rgba(97,199,242,${alpha})`;
        ctx.fillRect(x, y, 1.5, 1.5);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dense]);
  return <canvas ref={ref} className={className} />;
}

/* The mesh is a responsive morphing surface for the hero and AI panel. */
export function MeshField({ pulse = 0, className = "" }: { pulse?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let time = 0;
    const draw = () => {
      time += 0.008;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
      ctx.clearRect(0, 0, width, height);
      const columns = 11;
      const rows = 8;
      const points: { x: number; y: number }[] = [];
      for (let y = 0; y <= rows; y += 1) {
        for (let x = 0; x <= columns; x += 1) {
          points.push({
            x: (x / columns) * width + Math.sin(time + y * 0.7) * 11 + Math.sin(time * 0.4 + x) * 5,
            y: (y / rows) * height + Math.cos(time * 0.8 + x * 0.5) * 9 + pulse * Math.sin(x + y) * 3,
          });
        }
      }
      for (let y = 0; y <= rows; y += 1) {
        for (let x = 0; x <= columns; x += 1) {
          const point = points[y * (columns + 1) + x];
          if (x < columns) {
            const next = points[y * (columns + 1) + x + 1];
            ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = `rgba(75,227,194,${0.12 + pulse * 0.03})`; ctx.lineWidth = 1; ctx.stroke();
          }
          if (y < rows) {
            const next = points[(y + 1) * (columns + 1) + x];
            ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = `rgba(179,154,255,${0.1 + pulse * 0.04})`; ctx.lineWidth = 1; ctx.stroke();
          }
          ctx.beginPath(); ctx.arc(point.x, point.y, 1.3 + pulse * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = x % 3 === 0 ? "rgba(75,227,194,.55)" : "rgba(97,199,242,.34)";
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [pulse]);
  return <canvas ref={ref} className={className} />;
}