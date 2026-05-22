"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import createGlobe from "cobe";

// --- Fluid Globe Component ---
function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.05],
      markerColor: [0.66, 0.33, 0.97],
      glowColor: [0.15, 0.05, 0.3],
      markers: [
        { location: [25.4484, 78.5685], size: 0.1 },
        { location: [40.7128, -74.0060], size: 0.06 }, 
        { location: [51.5074, -0.1278], size: 0.06 },
        { location: [35.6762, 139.6503], size: 0.06 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003; 
      }
    });
    return () => globe.destroy();
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", objectFit: "contain", cursor: "grab" }} />;
}

export default function Home() {
  // --- BUG FIX: Tie scroll to the container, not the whole page ---
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Animations now perfectly track the user's scroll within the hero section only
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 50]);
  
  const globeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const [formData, setFormData] = useState({ clientName: "", email: "", projectTitle: "", ideaDescription: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [users, setUsers] = useState(5000);
  const [complexity, setComplexity] = useState(1.5);
  const [calculatedBudget, setCalculatedBudget] = useState(0);

  const [auditUrl, setAuditUrl] = useState("");
  const [auditStatus, setAuditStatus] = useState<"idle" | "running" | "done">("idle");

  useEffect(() => {
    const baseRate = 3500;
    const userCost = (users / 1000) * 50;
    let actualComplexity = complexity === 1.5 ? 1.6 : complexity === 2.5 ? 2.4 : complexity;
    const total = (baseRate + userCost) * actualComplexity;
    setCalculatedBudget(Math.round(total / 500) * 500);
  }, [users, complexity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("/api/pitch", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, budget: `$${calculatedBudget.toLocaleString()}` })
      });
      if (response.ok) setStatus("success"); else setStatus("error");
    } catch { setStatus("error"); }
  };

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl) return;
    setAuditStatus("running");
    setTimeout(() => setAuditStatus("done"), 3000); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="relative bg-[#020202] text-white selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* --- FLUID CINEMATIC HERO --- */}
      {/* Uses 120svh on mobile to handle dynamic browser bars cleanly */}
      <section ref={heroRef} className="relative h-[120svh] md:h-[150vh] -mt-32">
        <div className="sticky top-0 h-[100svh] md:h-screen w-full flex items-center justify-center overflow-hidden">
          
          <div className="absolute w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-purple-900/20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

          {/* Liquid Globe Wrapper */}
          <motion.div style={{ opacity: globeOpacity, scale: globeScale }} className="absolute inset-0 flex items-center justify-center pointer-events-auto top-12 md:top-0">
            <div className="w-[120vw] h-[120vw] max-w-[800px] max-h-[800px]">
              <CobeGlobe />
            </div>
          </motion.div>

          {/* Liquid Headline Layer */}
          <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="relative z-20 flex flex-col items-center justify-center pointer-events-none px-4">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-6 md:mb-8 shadow-2xl">
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-purple-500"></span>
              </span>
              Next Generation Architectures
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-800 drop-shadow-2xl text-center">
              ENGINEERED <br /> FOR SCALE.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* --- NEW: SYSTEMS DATA BAR (Solves the "Less Data" on mobile issue) --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 px-6 border-y border-white/5 bg-[#050505] text-[9px] md:text-xs text-gray-400 uppercase tracking-[0.2em] font-mono text-center relative z-20">
        <div>Latency: <span className="text-white">12ms</span></div>
        <div>Uptime: <span className="text-white">99.99%</span></div>
        <div>Edge Nodes: <span className="text-white">124</span></div>
        <div>AI Triage: <span className="text-green-400">Online</span></div>
      </div>

      {/* --- RESPONSIVE DATA EXPANSION --- */}
      {/* Tightened Mobile Padding: pt-16 pb-16 instead of pt-32 pb-32 */}
      <section className="relative z-20 bg-[#020202] pt-16 pb-16 md:pt-32 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-6xl font-semibold tracking-tight mb-4 md:mb-8">
              We do not build templates. We deploy <span className="text-purple-400">digital realities.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-400 font-light leading-relaxed">
              Synth Studios represents the convergence of elite human engineering and autonomous AI systems. We have stripped away traditional agency bloat to deliver pure, sub-millisecond compute architecture to global enterprises.
            </motion.p>
          </div>

          {/* Denser Feature Grid (Reduced min-heights and padding on mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="col-span-1 lg:col-span-2 bg-neutral-950 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden group min-h-[180px] md:min-h-[400px] flex flex-col justify-end">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h3 className="text-xl md:text-4xl font-bold text-white mb-2 md:mb-4 relative z-10">Neural Operations.</h3>
              <p className="text-gray-400 text-xs md:text-lg max-w-xl relative z-10">Our entire infrastructure, from initial project screening to L1 client support, is natively routed through custom OpenAI deployments.</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-neutral-950 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden group min-h-[150px] md:min-h-[400px] flex flex-col justify-end">
              <div className="absolute top-4 right-4 md:top-8 md:right-8 text-4xl md:text-6xl font-light text-purple-500/20 group-hover:text-purple-500/40 transition-colors">01</div>
              <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4">Edge Delivery</h3>
              <p className="text-gray-400 text-xs md:text-sm">Deployed on global edge networks, routing compute directly to the user.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-neutral-950 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden group min-h-[150px] md:min-h-[400px] flex flex-col justify-end">
              <div className="absolute top-4 right-4 md:top-8 md:right-8 text-4xl md:text-6xl font-light text-blue-500/20 group-hover:text-blue-500/40 transition-colors">02</div>
              <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4">Serverless DB</h3>
              <p className="text-gray-400 text-xs md:text-sm">PostgreSQL architecture managed autonomously for infinite scale.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="col-span-1 lg:col-span-2 bg-neutral-950 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden group min-h-[180px] md:min-h-[400px] flex flex-col justify-end">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h3 className="text-xl md:text-4xl font-bold text-white mb-2 md:mb-4 relative z-10">Automated Revenue.</h3>
              <p className="text-gray-400 text-xs md:text-lg max-w-xl relative z-10">Zero-friction retainer capture via highly secure API pipelines. Invoicing is a machine problem, not a human one.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- RESPONSIVE AI AUDIT --- */}
      <section className="relative z-20 bg-neutral-950 py-16 md:py-32 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Autonomous Architecture Audits.</h2>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                Test our integrated AI models right now. Enter the URL of any existing platform, and our Neural Triage agent will run a simulated diagnostic.
              </p>
              
              <form onSubmit={handleAudit} className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                <input required type="url" value={auditUrl} onChange={(e) => setAuditUrl(e.target.value)} placeholder="https://your-competitor.com" className="w-full sm:flex-1 bg-black border border-white/10 rounded-xl px-5 py-4 text-xs md:text-sm focus:border-purple-500 outline-none text-white" />
                <button type="submit" disabled={auditStatus === "running"} className="w-full sm:w-auto bg-purple-600 text-white font-bold py-4 sm:py-0 px-8 rounded-xl hover:bg-purple-500 transition-colors disabled:opacity-50 text-sm">
                  Audit
                </button>
              </form>
            </div>

            <div className="w-full md:w-1/2 bg-black border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 h-auto min-h-[220px] md:h-[300px] font-mono text-xs md:text-sm relative overflow-hidden">
              <div className="flex gap-2 mb-4 md:mb-6 border-b border-white/10 pb-4">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/50" />
                <span className="ml-2 text-gray-500 tracking-widest text-[10px] md:text-xs uppercase">AI Audit Terminal</span>
              </div>
              
              <div className="text-green-400 space-y-2 text-[10px] md:text-sm">
                {auditStatus === "idle" && <p className="text-gray-500">System standby. Awaiting target URL...</p>}
                
                {auditStatus === "running" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                    <p className="truncate">{`> Fetching packets from ${auditUrl}...`}</p>
                    <p className="animate-pulse">{`> Analyzing DOM structure...`}</p>
                  </motion.div>
                )}

                {auditStatus === "done" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 md:space-y-3">
                    <p className="text-purple-400 truncate">{`> AUDIT COMPLETE: ${auditUrl}`}</p>
                    <p>{`> Latency Grade: D (Client-heavy)`}</p>
                    <p className="hidden sm:block">{`> DB Architecture: Monolithic. Vulnerable.`}</p>
                    <p className="text-white mt-2 md:mt-4 leading-relaxed">{`> RECOMMENDATION: Rewrite in Next.js.`}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RESPONSIVE SCOPE ENGINE --- */}
      <section className="relative z-20 bg-black py-16 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6">Architecture Scope Engine.</h2>
            <p className="text-gray-400 text-xs md:text-lg">Simulate server load and system complexity to generate a live deployment estimate.</p>
          </div>

          <div className="bg-[#050505] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 flex flex-col lg:flex-row gap-8 md:gap-16 items-center shadow-2xl">
            <div className="w-full lg:w-1/2 space-y-8 md:space-y-12">
              <div>
                <div className="flex justify-between text-[10px] md:text-sm font-bold tracking-widest uppercase mb-4 md:mb-6 text-gray-300">
                  <span>Expected Monthly Users</span>
                  <span className="text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">{users.toLocaleString()}</span>
                </div>
                <input type="range" min="100" max="100000" step="100" value={users} onChange={(e) => setUsers(Number(e.target.value))} className="w-full h-2 md:h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500" />
              </div>
              <div>
                <div className="text-[10px] md:text-sm font-bold tracking-widest uppercase mb-4 md:mb-6 text-gray-300">System Complexity</div>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <button onClick={() => setComplexity(1)} className={`py-3 md:py-4 text-[9px] md:text-xs font-bold uppercase tracking-widest rounded-xl md:rounded-2xl transition-all ${complexity === 1 ? 'bg-purple-500/20 border-purple-500 border-2 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-2 border-transparent text-gray-500 hover:text-white hover:bg-white/10'}`}>MVP</button>
                  <button onClick={() => setComplexity(1.5)} className={`py-3 md:py-4 text-[9px] md:text-xs font-bold uppercase tracking-widest rounded-xl md:rounded-2xl transition-all ${complexity === 1.5 ? 'bg-blue-500/20 border-blue-500 border-2 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-2 border-transparent text-gray-500 hover:text-white hover:bg-white/10'}`}>Standard</button>
                  <button onClick={() => setComplexity(2.5)} className={`py-3 md:py-4 text-[9px] md:text-xs font-bold uppercase tracking-widest rounded-xl md:rounded-2xl transition-all ${complexity === 2.5 ? 'bg-emerald-500/20 border-emerald-500 border-2 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-white/5 border-2 border-transparent text-gray-500 hover:text-white hover:bg-white/10'}`}>Scale</button>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 bg-black border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden group min-h-[220px] md:min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-50" />
              <span className="text-[9px] md:text-sm uppercase tracking-widest text-gray-400 font-bold mb-2 md:mb-4 relative z-10 text-center">Calculated Capital Required</span>
              <div className="text-5xl sm:text-6xl md:text-8xl font-bold text-white relative z-10 tracking-tighter">
                ${calculatedBudget.toLocaleString()}
              </div>
              <a href="#intake" className="mt-6 md:mt-12 px-6 md:px-8 py-3 md:py-4 bg-white text-black text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.2)]">Lock in Architecture</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- RESPONSIVE AI INTAKE --- */}
      <section id="intake" className="py-16 md:py-32 px-4 md:px-6 bg-[#020202] border-t border-white/5">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <div className="bg-neutral-950 p-6 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] md:w-[800px] md:h-[400px] bg-blue-500/10 blur-[80px] md:blur-[120px] pointer-events-none rounded-full" />
            
            <div className="mb-10 md:mb-16 relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 tracking-tight text-white">Initialize AI Pipeline.</h2>
              <p className="text-gray-400 text-xs md:text-lg">Your budget of <span className="text-white font-bold">${calculatedBudget.toLocaleString()}</span> will be attached to this brief.</p>
            </div>
            
            {status === "success" ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/5 border border-green-500/30 backdrop-blur-xl p-8 md:p-16 rounded-2xl md:rounded-3xl text-center relative z-10">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-green-500/50">
                  <svg className="w-8 h-8 md:w-12 md:h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-white">Encrypted Packet Received</h3>
                <p className="text-gray-400 text-xs md:text-lg">The Synth Studios Neural Network is analyzing your brief.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <input required type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-5 text-xs md:text-sm focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-500" placeholder="Client Name" />
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-5 text-xs md:text-sm focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-500" placeholder="Secure Email" />
                </div>
                <input required type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-5 text-xs md:text-sm focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-500" placeholder="Project Name" />
                <textarea required name="ideaDescription" value={formData.ideaDescription} onChange={handleChange} rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-5 text-xs md:text-sm focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-500 resize-none" placeholder="Detail your technical requirements..." />
                
                <button disabled={status === "submitting"} type="submit" className="w-full bg-white text-black font-bold text-xs md:text-lg py-4 md:py-6 rounded-xl md:rounded-2xl transition-all disabled:opacity-70 hover:bg-gray-200 mt-2 md:mt-4 tracking-widest uppercase shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  {status === "submitting" ? "Transmitting..." : "Execute Pipeline"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>

    </main>
  );
}