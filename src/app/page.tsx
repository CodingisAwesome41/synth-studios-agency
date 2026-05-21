"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [formData, setFormData] = useState({
    clientName: "", email: "", projectTitle: "", budget: "", ideaDescription: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse for the spotlight glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("/api/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="relative selection:bg-purple-500/30">
      
      {/* Dynamic Cursor Spotlight */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.05), transparent 80%)`
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-6 pt-20 pb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium uppercase tracking-widest text-gray-300 mb-8 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Accepting Enterprise Contracts
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
        >
          ENGINEERED <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
            FOR SCALE.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-gray-400 font-light leading-relaxed"
        >
          We are an elite technical collective bridging the gap between raw compute and human experience. Full-stack infrastructure, natively AI-integrated.
        </motion.p>
      </section>

      {/* Tech Stack Marquee */}
      <div className="relative z-10 flex overflow-hidden border-y border-white/5 bg-black/50 py-6 backdrop-blur-md">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap gap-16 text-xl md:text-2xl font-black uppercase tracking-widest text-gray-800"
        >
          {/* Duplicated for seamless loop */}
          <span>Next.js 14</span><span>•</span><span>React</span><span>•</span><span>Supabase</span><span>•</span><span>Stripe</span><span>•</span><span>OpenAI</span><span>•</span><span>Tailwind</span><span>•</span><span>Framer Motion</span><span>•</span>
          <span>Next.js 14</span><span>•</span><span>React</span><span>•</span><span>Supabase</span><span>•</span><span>Stripe</span><span>•</span><span>OpenAI</span><span>•</span><span>Tailwind</span><span>•</span><span>Framer Motion</span><span>•</span>
        </motion.div>
      </div>

      {/* Bento Box Architecture (Features) */}
      <section id="services" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-16 text-center">The Infrastructure.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Box 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-8 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Neural Intake</h3>
            <p className="text-gray-400">Incoming briefs are instantly screened by integrated LLMs to evaluate scope, budget matching, and technical feasibility before a human ever reads them.</p>
          </motion.div>

          {/* Box 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-2xl font-semibold mb-2">Automated Revenue</h3>
            <p className="text-gray-400">Zero-friction retainer capture via secure Stripe pipelines.</p>
          </motion.div>

          {/* Box 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-2xl font-semibold mb-2">Serverless DB</h3>
            <p className="text-gray-400">PostgreSQL architecture managed by Supabase.</p>
          </motion.div>

          {/* Box 4 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-8 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-2xl font-semibold mb-2">Global Edge Delivery</h3>
            <p className="text-gray-400">Deployed seamlessly on Vercel's global edge network, guaranteeing sub-millisecond routing and flawless CI/CD pipeline deployments.</p>
          </motion.div>
        </div>
      </section>

      {/* The Intake Pipeline (Form) */}
      <section id="intake" className="relative z-10 py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-neutral-950 p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
            
            {/* Form Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-purple-500/20 blur-[100px] pointer-events-none rounded-full" />

            <div className="mb-12 relative z-10">
              <h2 className="text-4xl font-semibold mb-4 tracking-tight text-white">Initialize Pipeline.</h2>
              <p className="text-gray-400">Input your project parameters. Our systems will run an immediate feasibility analysis.</p>
            </div>
            
            {status === "success" ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/5 border border-green-500/30 backdrop-blur-xl p-10 rounded-2xl text-center relative z-10"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50">
                  <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white tracking-tight">Packet Received</h3>
                <p className="text-gray-400">The Synth Studios AI is currently analyzing your brief. Stand by for contact.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold ml-1">Client Identifier</label>
                    <input required type="text" name="clientName" value={formData.clientName} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-600" placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold ml-1">Secure Contact</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-600" placeholder="john@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold ml-1">Operation Name</label>
                    <input required type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-600" placeholder="Project Nova" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold ml-1">Capital Allocation</label>
                    <select required name="budget" value={formData.budget} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 text-white appearance-none cursor-pointer">
                      <option value="" disabled className="bg-black text-gray-500">Select parameter...</option>
                      <option value="$2.5k - $5k" className="bg-black text-white">$2,500 - $5,000</option>
                      <option value="$5k - $15k" className="bg-black text-white">$5,000 - $15,000</option>
                      <option value="$15k+" className="bg-black text-white">$15,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold ml-1">Architecture Schematic</label>
                  <textarea required name="ideaDescription" value={formData.ideaDescription} onChange={handleChange} rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-600 resize-none" 
                    placeholder="Detail the technical requirements and scale of your vision..." />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full relative overflow-hidden bg-white text-black font-bold py-5 rounded-2xl transition-all duration-300 disabled:opacity-70 mt-4 group"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Transmitting Data...
                      </>
                    ) : "Execute Pipeline"}
                  </span>
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </section>
    </main>
  );
}