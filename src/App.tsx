import { useCallback, useEffect, useState, type ReactNode } from "react";
import { WeaveField, MeshField, playWeaveSound } from "./engine";
import WeaveGraph from "./components/WeaveGraph";
import WeaveAI from "./WeaveAI";
import { architectureLayers, githubPages, lovableApps, profile, projects, skillThreads, socials, timeline, type Project } from "./data";

function App() {
  const [booting, setBooting] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);
  const [threading, setThreading] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [scroll, setScroll] = useState(0);
  const [copied, setCopied] = useState("");
  const [surface, setSurface] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const id = window.setTimeout(() => setBooting(false), 1500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const move = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    const onScroll = () => {
      const root = document.documentElement;
      setScroll(root.scrollTop / Math.max(1, root.scrollHeight - root.clientHeight));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navigate = useCallback((id: string) => {
    playWeaveSound("thread");
    setThreading(true);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 250);
    window.setTimeout(() => setThreading(false), 720);
  }, []);

  const openProject = useCallback((project: Project) => {
    playWeaveSound("select");
    setSelected(project);
  }, []);

  const copyEmail = useCallback((email: string) => {
    navigator.clipboard?.writeText(email);
    playWeaveSound("burst");
    setCopied(email);
    window.setTimeout(() => setCopied(""), 1800);
  }, []);

  const surfaceClass = surface === "light" ? "weave-light" : "";

  return (
    <div className={`min-h-screen overflow-x-hidden bg-[#071312] text-[#dcefe8] ${surfaceClass}`}>
      {booting && <BootSequence />}
      <div className="fixed inset-0 pointer-events-none z-30 weave-grain" />
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#0b211d]">
        <div className="h-full origin-left bg-gradient-to-r from-[#4be3c2] via-[#61c7f2] to-[#ef9366]" style={{ transform: `scaleX(${scroll})` }} />
      </div>
      <div className="weave-cursor" style={{ left: cursor.x, top: cursor.y }} />
      <div className={`thread-transition ${threading ? "is-threading" : ""}`}><span /><span /><span /><span /></div>

      <Header onNavigate={navigate} surface={surface} setSurface={setSurface} />

      <main>
        <section id="home" className="relative min-h-screen border-b border-[#4be3c2]/15 overflow-hidden pt-24">
          <WeaveField className="absolute inset-0 h-full w-full opacity-70" />
          <div className="absolute inset-0 hero-fade" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#4be3c2]/25 to-transparent" />
          <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1480px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_420px] lg:py-20">
            <div>
              <div className="mb-7 flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-[#8fb6a9]">
                <span className="thread-chip"><i /> Thread state / 01</span>
                <span>Digital fabric for mobile systems</span>
              </div>
              <div className="max-w-4xl">
                <p className="font-mono text-sm uppercase tracking-[0.25em] text-[#4be3c2]">{profile.nameMM} // {profile.handle}</p>
                <h1 className="mt-5 font-display text-[clamp(3.6rem,9.5vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.07em] text-[#e9fbf4]">
                  Complex systems,<br /><span className="thread-gradient">woven into products.</span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#b5d0c4] sm:text-xl">
                  Senior Android architect and technical founder. I connect Kotlin,
                  product thinking, and durable infrastructure into applications used
                  by <strong className="font-semibold text-[#e6c75c]">millions</strong>.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <button onClick={() => navigate("works")} className="weave-button weave-button-primary">Explore the weave <span>-&gt;</span></button>
                <button onClick={() => navigate("contact")} className="weave-button weave-button-quiet">Start a thread <span>+</span></button>
              </div>

              <div className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                {[
                  ["10M+", "users reached"], ["43", "apps shipped"], ["42", "modules"], ["99.98%", "crash-free"],
                ].map(([value, label]) => <div key={label} className="metric-line"><strong>{value}</strong><span>{label}</span></div>)}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[420px]">
              <div className="thread-frame absolute -inset-5 rounded-[2rem] opacity-60" />
              <div className="relative overflow-hidden rounded-[1.6rem] border border-[#4be3c2]/30 bg-[#0b211d]/80 p-3 shadow-[0_30px_100px_-35px_rgba(0,0,0,.8)]">
                <div className="mb-3 flex items-center justify-between px-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#7ca99a]"><span>Pattern portrait / MKA</span><span>01 / 01</span></div>
                <div className="relative overflow-hidden rounded-[1.15rem] border border-[#61c7f2]/25">
                  <img src={profile.avatar} alt={profile.name} className="aspect-[4/5] w-full object-cover object-center opacity-90 grayscale-[15%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071312] via-transparent to-[#4be3c2]/10 mix-blend-multiply" />
                  <MeshField className="absolute inset-0 h-full w-full opacity-35" pulse={0.4} />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[#4be3c2]/30 bg-[#071312]/75 p-3 backdrop-blur-sm">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#4be3c2]">Currently weaving</div>
                    <div className="mt-1 font-display text-sm text-[#f1fff9]">MoekyawTranslator</div>
                    <div className="mt-1 text-xs text-[#9ab9ab]">AI translation / Burmese &amp; English</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-2 font-mono text-[10px] text-[#8fb6a9]"><span>Tachileik &lt;-&gt; Bangkok</span><span className="text-[#e6c75c]">open to work</span></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[#63877c]"><span className="h-px w-10 bg-[#4be3c2]/40" /> scroll through the fabric <span className="h-px w-10 bg-[#4be3c2]/40" /></div>
        </section>

        <div className="relative overflow-hidden border-b border-[#4be3c2]/15 bg-[#0b211d] py-5">
          <div className="flex w-max gap-9 whitespace-nowrap weave-marquee font-display text-2xl text-[#4be3c2]/45">
            {["Kotlin", "Jetpack Compose", "Clean Architecture", "Multi-module", "Hilt", "Firebase", "CI/CD", "TFLite", "Product thinking", "Kotlin", "Jetpack Compose", "Clean Architecture"].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-9">{item}<b className="font-mono text-sm text-[#ef9366]">+</b></span>)}
          </div>
        </div>

        <section id="practice" className="relative border-b border-[#4be3c2]/15 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1480px]">
            <SectionHeading index="02" eyebrow="Pattern language" title={<>A practice built around<br /><span className="thread-gradient">strong intersections.</span></>} text="The best work happens where disciplines cross: an architecture decision that improves product speed, a security boundary that makes UX trustworthy, a local-first model that respects the real world." />
            <div className="mt-16 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem] border border-[#b39aff]/25 bg-[#0b211d] p-6">
                <div className="absolute inset-0 weave-grid-fine opacity-65" />
                <MeshField pulse={0.7} className="absolute inset-0 h-full w-full opacity-70" />
                <div className="relative z-10 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#a4c9bd]"><span>Mesh study / 001</span><span>warp + weft</span></div>
                <div className="absolute inset-x-8 bottom-8 z-10 flex items-end justify-between gap-4"><div><div className="font-display text-4xl text-[#e9fbf4]">Craft<br /><span className="text-[#ef9366]">the pattern.</span></div><p className="mt-3 max-w-xs text-sm leading-relaxed text-[#98b6aa]">Clean boundaries make room for creative product decisions.</p></div><span className="text-6xl font-light text-[#4be3c2]/45">&amp;</span></div>
              </div>
              <div className="space-y-0 border-t border-[#4be3c2]/20">
                {[
                  ["01", "Observe", "Start with user constraints, not framework fashion."],
                  ["02", "Separate", "Give each responsibility a clear, testable thread."],
                  ["03", "Connect", "Let data, product, and people cross intentionally."],
                  ["04", "Measure", "Keep the pattern honest with real production signals."],
                ].map(([n, title, desc]) => <div key={n} className="grid grid-cols-[54px_1fr] gap-5 border-b border-[#4be3c2]/15 py-6"><span className="font-mono text-xs text-[#ef9366]">{n}</span><div><h3 className="font-display text-xl text-[#e7fbf2]">{title}</h3><p className="mt-1 text-sm leading-relaxed text-[#8faea1]">{desc}</p></div></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="works" className="relative border-b border-[#4be3c2]/15 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1480px]">
            <SectionHeading index="03" eyebrow="Selected works" title={<>Products as<br /><span className="thread-gradient">woven systems.</span></>} text="Each node is a real product, a real constraint, and a set of decisions that had to hold together in production." />
            <div className="mt-14"><WeaveGraph projects={projects} onSelect={openProject} /></div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#668b80]"><span>16 product nodes / 1 shared design system</span><span>Click any thread intersection to unfold the case study</span></div>
          </div>
        </section>

        <section id="architecture" className="relative border-b border-[#4be3c2]/15 bg-[#0a1b18] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1480px]">
            <SectionHeading index="04" eyebrow="System architecture" title={<>The layers that let<br /><span className="thread-gradient">teams move fast.</span></>} text="Modularization is not only a build optimization. It is a social contract between features, teams, and the future." />
            <div className="mt-16 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
              <div className="woven-blueprint rounded-[1.8rem] border border-[#61c7f2]/25 p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-[#61c7f2]/20 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#90c9d8]"><span>Topology / dependency direction</span><span>no cycles</span></div>
                <div className="mt-8 space-y-3">
                  {architectureLayers.map((layer, i) => <div key={layer.code} className="relative"><div className="flex items-center gap-4 rounded-xl border px-4 py-4" style={{ borderColor: `${layer.color}55`, background: `linear-gradient(90deg, ${layer.color}12, transparent)` }}><span className="font-mono text-xs" style={{ color: layer.color }}>{layer.code}</span><span className="h-5 w-px bg-[#dcefe8]/15" /><div><div className="font-display text-base text-[#e4faf2]">{layer.name}</div><div className="mt-1 text-xs text-[#8cb6a9]">{layer.desc}</div></div><span className="ml-auto hidden font-mono text-[10px] text-[#688e83] sm:block">{i === 0 ? "user-facing" : i === 3 ? "shared" : "contracted"}</span></div>{i < architectureLayers.length - 1 && <div className="ml-10 h-3 border-l border-dashed border-[#61c7f2]/30" />}</div>)}
                </div>
                <p className="mt-8 font-mono text-[10px] leading-relaxed text-[#6f9e91]">Dependency direction is enforced in CI. Feature code can change quickly because the core pattern changes slowly.</p>
              </div>
              <div className="space-y-5">
                {skillThreads.slice(0, 4).map((thread) => <ThreadBar key={thread.name} {...thread} />)}
                <div className="rounded-[1.5rem] border border-[#ef9366]/25 bg-[#ef9366]/[.07] p-6"><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ef9366]">Signature decision</div><p className="mt-3 font-display text-2xl leading-tight text-[#e8fbf3]">Keep the domain pure enough to outlive the screen.</p><p className="mt-3 text-sm leading-relaxed text-[#91b4a8]">That one boundary makes testing, migration, and product iteration less expensive.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="founder" className="relative border-b border-[#4be3c2]/15 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1480px]">
            <SectionHeading index="05" eyebrow="Founder thread" title={<>Build small. Learn fast.<br /><span className="thread-gradient">Grow deliberately.</span></>} text="The technical founder work is a loop: find a real regional problem, ship the smallest useful weave, watch behavior, and strengthen what earns its place." />
            <div className="mt-14 grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
              <div className="space-y-8"><div className="border-l-2 border-[#ef9366] pl-6"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ef9366]">Currently building</div><h3 className="mt-3 font-display text-3xl text-[#e9fbf4]">MoekyawTranslator</h3><p className="mt-3 text-sm leading-relaxed text-[#91b4a8]">An AI translation product for Burmese and English, with on-device fallback for places where the network is part of the problem.</p></div><div className="grid grid-cols-2 gap-3">{[["12K", "waitlist"], ["1,200", "POS stores"], ["410K", "planner installs"], ["5.2M", "collection users"]].map(([v, l]) => <div key={l} className="border-t border-[#4be3c2]/25 pt-3"><div className="font-display text-3xl text-[#e6c75c]">{v}</div><div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#71978c]">{l}</div></div>)}</div></div>
              <div className="border-t border-[#4be3c2]/20">{timeline.map((item) => <div key={item.y} className="grid grid-cols-[74px_1fr] gap-5 border-b border-[#4be3c2]/15 py-5"><span className="font-mono text-sm text-[#4be3c2]">{item.y}</span><div><h3 className="font-display text-base text-[#e4f8ef]">{item.t}</h3><p className="mt-1 text-sm text-[#89aa9f]">{item.d}</p></div></div>)}</div>
            </div>
          </div>
        </section>

        <section id="signals" className="relative border-b border-[#4be3c2]/15 bg-[#0a1b18] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1480px]"><SectionHeading index="06" eyebrow="Skill signals" title={<>Read the <span className="thread-gradient">skill pattern.</span></>} text="A balanced weave: deep mobile craft, systems judgment, and enough product sense to choose the right thread." /><div className="mt-14 grid gap-12 lg:grid-cols-[.9fr_1.1fr]"><div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">{skillThreads.map((thread) => <ThreadBar key={thread.name} {...thread} />)}</div><div className="relative min-h-[340px] overflow-hidden rounded-[1.8rem] border border-[#b39aff]/25 bg-[#071312] p-7"><WeaveField dense className="absolute inset-0 h-full w-full opacity-55" /><div className="relative z-10 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#8eb5aa]"><span>Pattern matrix / live</span><span>confidence 0.93</span></div><div className="absolute inset-0 grid place-items-center"><div className="relative h-44 w-44 rounded-full border border-[#4be3c2]/40"><div className="absolute inset-5 rounded-full border border-[#61c7f2]/30" /><div className="absolute inset-10 rounded-full border border-[#ef9366]/40" /><div className="absolute inset-[4.4rem] grid place-items-center rounded-full bg-[#4be3c2]/15 font-mono text-[10px] text-[#4be3c2]">THREAD<br />STATE</div><span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#e6c75c] shadow-[0_0_16px_#e6c75c]" /><span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#ef9366] shadow-[0_0_16px_#ef9366]" /></div></div><div className="absolute bottom-6 left-7 right-7 flex items-end justify-between gap-5"><p className="max-w-sm text-sm leading-relaxed text-[#a0b9af]">Architecture, delivery, security, and product thinking are not separate boxes. They are the intersections that make the system trustworthy.</p><div className="text-right font-mono text-[9px] uppercase tracking-[0.16em] text-[#71978c]">8 active threads<br /><span className="text-[#4be3c2]">all connected</span></div></div></div></div></div>
        </section>

        <section id="network" className="relative border-b border-[#4be3c2]/15 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1480px]"><SectionHeading index="07" eyebrow="Ecosystem" title={<>One person.<br /><span className="thread-gradient">Many surfaces.</span></>} text="The public footprint: repositories, experiments, and the digital places where this work keeps moving." /><div className="mt-14 grid gap-8 lg:grid-cols-3"><LinkCluster title="Social threads" items={socials.map((s) => `${s.name} / ${s.handle}`)} links={socials.map((s) => s.url)} accent="#4be3c2" /><LinkCluster title="GitHub pages" items={githubPages} links={githubPages.map((s) => `https://${s}`)} accent="#61c7f2" /><LinkCluster title="Lovable experiments" items={lovableApps} links={lovableApps.map((s) => `https://${s}`)} accent="#b39aff" /></div></div>
        </section>

        <section id="contact" className="relative px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-[1480px]"><div className="grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><SectionHeading index="08" eyebrow="Open thread" title={<>What will we<br /><span className="thread-gradient">weave next?</span></>} text="Available for senior Android architecture, founding engineer work, focused MVPs, and systems that need a more durable pattern." /><div className="mt-9 flex flex-wrap gap-3"><a className="weave-button weave-button-primary" href={`mailto:${profile.email}`}>Email Moe <span>-&gt;</span></a><button className="weave-button weave-button-quiet" onClick={() => copyEmail(profile.email)}>Copy email <span>{copied ? "ok" : "+"}</span></button></div></div><div className="contact-signal"><div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#4be3c2]">Direct signal</div><a href={`mailto:${profile.email}`} className="mt-3 block break-all font-display text-2xl text-[#e7fbf2] hover:text-[#e6c75c]">{profile.email}</a><div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#4be3c2]/20 pt-4"><div><div className="font-mono text-[9px] uppercase text-[#6e9589]">phone</div><div className="mt-1 text-sm text-[#bdd8cc]">{profile.phone}</div></div><div><div className="font-mono text-[9px] uppercase text-[#6e9589]">second line</div><div className="mt-1 text-sm text-[#bdd8cc]">{profile.secondPhone}</div></div></div><div className="mt-5 flex items-center gap-2 text-xs text-[#8fb5a9]"><span className="h-2 w-2 rounded-full bg-[#4be3c2] animate-pulse" /> Reply window: within 24h</div></div></div></div></section>
      </main>

      <footer className="relative border-t border-[#4be3c2]/20 bg-[#06100e] px-5 py-10 sm:px-8"><div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="font-display text-2xl text-[#e9fbf4]">THREAD<span className="text-[#ef9366]">//</span>STATE</div><p className="mt-2 max-w-sm text-sm leading-relaxed text-[#75998d]">Moe Kyaw Aung - Senior Android architect, technical founder, and builder of useful systems.</p></div><div className="text-left font-mono text-[10px] uppercase tracking-[0.18em] text-[#668c80] md:text-right">Tachileik &lt;-&gt; Bangkok<br /><span className="text-[#4be3c2]">code with culture. build with purpose.</span></div></div></footer>

      {selected && <CaseStudy project={selected} onClose={() => setSelected(null)} />}
      <WeaveAI />
    </div>
  );
}

function Header({ onNavigate, surface, setSurface }: { onNavigate: (id: string) => void; surface: "dark" | "light"; setSurface: (value: "dark" | "light") => void }) {
  const [open, setOpen] = useState(false);
  const links = [["home", "Index"], ["practice", "Practice"], ["works", "Works"], ["architecture", "Systems"], ["founder", "Founder"], ["contact", "Contact"]];
  return <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#4be3c2]/15 bg-[#071312]/82 backdrop-blur-xl"><div className="mx-auto flex h-[70px] max-w-[1480px] items-center justify-between gap-5 px-5 sm:px-8"><button onClick={() => onNavigate("home")} className="flex items-center gap-3 text-left"><span className="relative grid h-9 w-9 place-items-center rounded-lg border border-[#4be3c2]/45 bg-[#0b211d] font-display text-xs text-[#4be3c2]"><span className="absolute inset-1 rounded border border-[#b39aff]/30" />TS</span><span><span className="block font-display text-sm tracking-[0.14em] text-[#e9fbf4]">THREAD<span className="text-[#ef9366]">//</span>STATE</span><span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-[#779c90]">Moe Kyaw Aung / digital weave</span></span></button><nav className="hidden items-center gap-1 lg:flex">{links.map(([id, label]) => <button key={id} onClick={() => onNavigate(id)} className="rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#98b9ae] transition hover:bg-[#4be3c2]/10 hover:text-[#4be3c2]">{label}</button>)}</nav><div className="flex items-center gap-2"><button onClick={() => setSurface(surface === "dark" ? "light" : "dark")} className="hidden rounded-full border border-[#4be3c2]/25 px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-[#8fb5a9] sm:block">{surface === "dark" ? "soft light" : "deep ink"}</button><button onClick={() => onNavigate("contact")} className="hidden rounded-full border border-[#ef9366]/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#ef9366] transition hover:bg-[#ef9366] hover:text-[#071312] sm:block">Work together</button><button onClick={() => setOpen((value) => !value)} className="rounded-lg border border-[#4be3c2]/30 px-3 py-2 font-mono text-xs text-[#4be3c2] lg:hidden">{open ? "x" : "menu"}</button></div></div>{open && <div className="grid grid-cols-2 gap-2 border-t border-[#4be3c2]/15 bg-[#071312] p-4 lg:hidden">{links.map(([id, label]) => <button key={id} onClick={() => { setOpen(false); onNavigate(id); }} className="rounded-lg border border-[#4be3c2]/20 px-3 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[#9fc4b7]">{label}</button>)}</div>}</header>;
}

function SectionHeading({ index, eyebrow, title, text }: { index: string; eyebrow: string; title: ReactNode; text: string }) {
  return <div className="grid gap-6 lg:grid-cols-[110px_1fr_330px] lg:items-end"><div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#ef9366]">{index}<br /><span className="text-[#61897d]">/ {eyebrow}</span></div><h2 className="font-display text-4xl font-bold leading-[0.96] tracking-[-0.04em] text-[#e7faf1] sm:text-6xl">{title}</h2><p className="text-sm leading-relaxed text-[#87a99d]">{text}</p></div>;
}

function ThreadBar({ name, value, color, note }: { name: string; value: number; color: string; note: string }) {
  return <div><div className="mb-2 flex items-baseline justify-between gap-3"><span className="font-display text-sm text-[#d9eee6]">{name}</span><span className="font-mono text-[10px]" style={{ color }}>{value}% / {note}</span></div><div className="h-2 overflow-hidden rounded-full bg-[#102720]"><div className="h-full rounded-full" style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, #61c7f2)`, boxShadow: `0 0 12px ${color}66` }} /></div></div>;
}

function LinkCluster({ title, items, links, accent }: { title: string; items: string[]; links: string[]; accent: string }) {
  return <div className="border-t border-[#4be3c2]/20"><div className="flex items-baseline justify-between py-3"><h3 className="font-display text-lg text-[#e7faf1]">{title}</h3><span className="font-mono text-[10px] text-[#668c80]">{items.length} threads</span></div><div className="space-y-1">{items.map((item, i) => <a key={`${item}-${i}`} href={links[i]} target="_blank" rel="noreferrer" className="group flex items-center gap-3 border-b border-[#4be3c2]/10 py-2.5 font-mono text-[11px] text-[#789d91] transition hover:text-[#e9fbf4]"><span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} /><span className="truncate">{item}</span><span className="ml-auto opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100">-&gt;</span></a>)}</div></div>;
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-[#020807]/88 p-4 backdrop-blur-md" onClick={onClose}><article className="case-modal relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[1.7rem] border bg-[#081513] shadow-[0_30px_120px_-30px_rgba(0,0,0,.9)]" style={{ borderColor: `${project.accent}66` }} onClick={(event) => event.stopPropagation()}><div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#081513]/92 px-5 py-4 backdrop-blur-md"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border font-mono text-xs" style={{ borderColor: `${project.accent}66`, color: project.accent }}>{project.icon}</span><div><div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: project.accent }}>{project.code} / {project.status}</div><h2 className="font-display text-lg text-[#e9fbf4]">{project.title}</h2></div></div><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 hover:border-[#ef9366] hover:text-[#ef9366]">x</button></div><div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[.8fr_1.2fr]"><div><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7ca699]">Woven case study</div><p className="mt-4 font-display text-2xl leading-tight text-[#e8faf2]">{project.summary}</p><div className="mt-8 space-y-6"><StudyBlock label="Context" value={project.context} /><StudyBlock label="The weave" value={project.weave} /><StudyBlock label="Result" value={project.result} /></div><div className="mt-8 flex flex-wrap gap-2">{project.stack.map((tag) => <span key={tag} className="rounded-full border border-[#4be3c2]/25 bg-[#4be3c2]/[.06] px-2.5 py-1 font-mono text-[10px] text-[#9cc8b8]">{tag}</span>)}</div><a href={project.url} target="_blank" rel="noreferrer" className="weave-button weave-button-primary mt-8 inline-flex">Open repository <span>-&gt;</span></a></div><div className="relative min-h-[430px] overflow-hidden rounded-[1.4rem] border border-[#4be3c2]/20 bg-[#071312] p-5"><WeaveField dense className="absolute inset-0 h-full w-full opacity-50" /><div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#81a99b]"><span>Case pattern / {project.code}</span><span>{project.kind}</span></div><svg className="relative z-10 mt-8 h-[250px] w-full" viewBox="0 0 520 250" fill="none" aria-label="Project layer diagram"><path d="M55 55 C140 12 180 92 260 55 S380 20 465 58" stroke={project.accent} strokeOpacity=".7" strokeWidth="2" strokeDasharray="5 7"><animate attributeName="stroke-dashoffset" from="0" to="-96" dur="3s" repeatCount="indefinite" /></path><path d="M55 190 C140 145 180 225 260 180 S380 146 465 192" stroke="#61c7f2" strokeOpacity=".45" strokeWidth="2" strokeDasharray="5 7"><animate attributeName="stroke-dashoffset" from="0" to="-96" dur="3s" repeatCount="indefinite" /></path><path d="M55 55 L55 190 M260 55 L260 180 M465 58 L465 192" stroke="#4be3c2" strokeOpacity=".22" strokeWidth="1" /><LayerNode x="55" y="55" label="surface" color={project.accent} /><LayerNode x="260" y="55" label="domain" color="#61c7f2" /><LayerNode x="465" y="58" label="edge" color="#b39aff" /><LayerNode x="55" y="190" label="local" color="#e6c75c" /><LayerNode x="260" y="180" label="sync" color="#4be3c2" /><LayerNode x="465" y="192" label="measure" color="#ef9366" /></svg><div className="relative z-10 border-t border-white/10 pt-4"><div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#e6c75c]">Observed metrics</div><div className="mt-2 font-display text-lg text-[#e7faf1]">{project.metrics}</div></div></div></div></article></div>;
}

function StudyBlock({ label, value }: { label: string; value: string }) { return <div className="border-l border-[#ef9366]/60 pl-4"><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ef9366]">{label}</div><p className="mt-2 text-sm leading-relaxed text-[#95b8ab]">{value}</p></div>; }
function LayerNode({ x, y, label, color }: { x: number | string; y: number | string; label: string; color: string }) { return <g><circle cx={x} cy={y} r="13" fill="#071312" stroke={color} strokeWidth="2" /><circle cx={x} cy={y} r="4" fill={color}><animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" /></circle><text x={x} y={typeof y === "number" ? y + 30 : y} fill="#a6c0b6" fontSize="11" textAnchor="middle" fontFamily="monospace">{label}</text></g>; }

function BootSequence() {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setProgress((value) => Math.min(100, value + 8)), 105); return () => window.clearInterval(id); }, []);
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-[#071312]"><WeaveField dense className="absolute inset-0 h-full w-full opacity-35" /><div className="relative w-[min(500px,calc(100vw-3rem))] rounded-2xl border border-[#4be3c2]/35 bg-[#081513]/80 p-6 backdrop-blur"><div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#4be3c2]"><span>Thread//State</span><span>boot 01</span></div><div className="my-8 text-center font-display text-4xl text-[#e9fbf4]">Weaving the system</div><div className="space-y-2 font-mono text-[11px] text-[#82a99c]"><div><span className="text-[#ef9366]">01</span> reading profile threads <span className="float-right text-[#4be3c2]">ok</span></div><div><span className="text-[#ef9366]">02</span> aligning product nodes <span className="float-right text-[#4be3c2]">ok</span></div><div><span className="text-[#ef9366]">03</span> binding skill pattern <span className="float-right text-[#4be3c2]">ok</span></div><div><span className="text-[#ef9366]">04</span> waking weave engine <span className="float-right text-[#4be3c2]">{progress >= 96 ? "ok" : "..."}</span></div></div><div className="mt-8 h-1 overflow-hidden rounded-full bg-[#15352c]"><div className="h-full bg-gradient-to-r from-[#4be3c2] to-[#ef9366] transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex justify-between font-mono text-[10px] text-[#668c80]"><span>pattern coherence</span><span>{progress}%</span></div></div></div>;
}

export default App;