import { useEffect, useRef, useState } from "react";
import { MeshField, playWeaveSound } from "./engine";
import { weaveAI } from "./data";

type Message = { from: "engine" | "visitor"; text: string; nodes?: string[] };

const responses = weaveAI.answers;

function answerFor(question: string) {
  const text = question.toLowerCase();
  if (text.includes("scale") || text.includes("performance")) return responses.scale;
  if (text.includes("founder") || text.includes("startup") || text.includes("product")) return responses.founder;
  if (text.includes("security") || text.includes("privacy")) return responses.security;
  if (text.includes("test") || text.includes("ci") || text.includes("delivery")) return responses.testing;
  if (text.includes("contact") || text.includes("hire") || text.includes("mvp")) return responses.contact;
  return responses.architecture;
}

export default function WeaveAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pulse, setPulse] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { from: "engine", text: weaveAI.greeting, nodes: ["KOTLIN", "ARCHITECTURE", "PRODUCT"] },
  ]);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const ask = (value?: string) => {
    const q = (value ?? input).trim();
    if (!q) return;
    playWeaveSound("burst");
    setMessages((items) => [...items, { from: "visitor", text: q }]);
    setInput("");
    setPulse((value) => value + 1);
    const response = answerFor(q);
    window.setTimeout(() => {
      playWeaveSound("thread");
      setMessages((items) => [...items, { from: "engine", text: response.text, nodes: response.nodes }]);
      setPulse((value) => value + 1);
    }, 480);
  };

  const prompts = ["How does the architecture weave?", "Show me the scale pattern", "What makes him a founder?", "How is it secured?"];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open ? (
        <button onClick={() => { playWeaveSound("select"); setOpen(true); }} className="group relative flex items-center gap-3 rounded-2xl border border-[#4be3c2]/60 bg-[#081513]/95 px-4 py-3 shadow-[0_0_36px_rgba(75,227,194,.18)] hover:border-[#e6c75c] transition-all">
          <span className="absolute -inset-2 rounded-2xl border border-[#61c7f2]/25 animate-pulse pointer-events-none" />
          <span className="relative w-10 h-10 rounded-full border border-[#4be3c2] bg-[#0c211b] grid place-items-center">
            <span className="absolute inset-1 rounded-full border border-[#b39aff]/50 animate-spin" />
            <span className="relative font-mono text-xs text-[#4be3c2]">WE</span>
          </span>
          <span className="text-left">
            <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[#91a99f]">AI Pattern Analyst</span>
            <span className="block font-display font-semibold text-sm text-[#4be3c2]">Weave Engine</span>
          </span>
          <span className="text-[#e6c75c] group-hover:translate-x-1 transition-transform">-&gt;</span>
        </button>
      ) : (
        <div className="w-[min(430px,calc(100vw-2.5rem))] overflow-hidden rounded-[1.5rem] border border-[#4be3c2]/65 bg-[#071312]/95 shadow-[0_0_60px_rgba(75,227,194,.18)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#0b1d19] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4be3c2] animate-pulse" />
              <span className="font-display text-xs tracking-[0.15em] text-[#dff8ef]">WEAVE ENGINE</span>
              <span className="font-mono text-[9px] text-[#6d9488]">v1.0 / PATTERN MODE</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-[#8ab8aa] hover:text-white">x</button>
          </div>
          <div className="relative border-b border-white/10 bg-[#05100e]">
            <MeshField pulse={pulse} className="block h-[120px] w-full opacity-80" />
            <div className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-widest text-[#4be3c2]">Live skill intersections</div>
          </div>
          <div className="h-[265px] space-y-3 overflow-y-auto p-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.from === "visitor" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[89%] rounded-xl border px-3 py-2.5 text-xs leading-relaxed ${message.from === "visitor" ? "border-[#61c7f2]/45 bg-[#61c7f2]/10 text-[#d9f5ff]" : "border-[#4be3c2]/25 bg-[#0c211b] text-[#d8eee7]"}`}>
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-widest" style={{ color: message.from === "visitor" ? "#61c7f2" : "#4be3c2" }}>{message.from === "visitor" ? "YOU" : "WEAVE ENGINE"}</div>
                  <p>{message.text}</p>
                  {message.nodes && <div className="mt-2 space-y-1 border-t border-white/10 pt-2 font-mono text-[9px] text-[#a0b9af]">{message.nodes.map((node, i) => <div key={node}><span className="mr-2 text-[#e6c75c]">{i === message.nodes!.length - 1 ? "o" : "+"}</span>{node}{i < message.nodes!.length - 1 && <span className="float-right text-[#4be3c2]">|</span>}</div>)}</div>}
                </div>
              </div>
            ))}
            <div ref={end} />
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-white/10 bg-[#0b1d19] p-2">
            {prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)} className="rounded-full border border-[#4be3c2]/25 px-2 py-1 font-mono text-[9px] text-[#91b9ac] hover:border-[#4be3c2] hover:text-[#4be3c2]">+ {prompt}</button>)}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); ask(); }} className="flex gap-2 border-t border-white/10 p-2.5">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Pull a thread..." className="min-w-0 flex-1 rounded-lg border border-[#4be3c2]/25 bg-[#05100e] px-3 py-2 font-mono text-xs text-white outline-none placeholder:text-[#55766b] focus:border-[#4be3c2]" />
            <button type="submit" className="rounded-lg bg-[#4be3c2] px-3 py-2 font-mono text-[10px] font-bold text-[#071312]">WEAVE</button>
          </form>
        </div>
      )}
    </div>
  );
}