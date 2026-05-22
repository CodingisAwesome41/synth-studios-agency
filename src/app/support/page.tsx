"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Support() {
  // FIXED: Added clientEmail to the state
  const [formData, setFormData] = useState({ clientRef: "", clientEmail: "", ticketType: "Bug / Glitch Report", description: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setAiResponse(null);
    setTicketId(null);

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus("success");
        setAiResponse(data.ai_response);
        setTicketId(data.ticket_id);
        // Reset form
        setFormData({ clientRef: "", clientEmail: "", ticketType: "Bug / Glitch Report", description: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="max-w-5xl mx-auto px-6 pb-32 pt-12 selection:bg-purple-500/30">
      <div className="mb-16">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          OPERATIONS <span className="text-purple-400">DESK.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg font-light">
          Client portals, system statuses, and automated AI triage routing.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-neutral-950 border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          <h3 className="text-2xl font-bold text-white mb-2">Initialize Support Protocol</h3>
          <p className="text-gray-400 text-sm mb-8">Our AI agent will immediately review your logs and provide a tracking ID.</p>
          
          <form className="space-y-4 flex-1 flex flex-col" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" name="clientRef" value={formData.clientRef} onChange={handleChange} placeholder="Project ID / Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none text-white transition-colors" />
              {/* FIXED: The new explicit email field */}
              <input required type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} placeholder="Secure Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none text-white transition-colors" />
            </div>
            <select required name="ticketType" value={formData.ticketType} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none text-gray-400 transition-colors appearance-none cursor-pointer">
              <option className="bg-black text-white">Bug / Glitch Report</option>
              <option className="bg-black text-white">Feature Request</option>
              <option className="bg-black text-white">Billing Inquiry</option>
            </select>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Describe the operational issue in detail..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none text-white transition-colors resize-none flex-1" />
            
            <button disabled={status === "submitting"} type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 mt-auto">
              {status === "submitting" ? "AI Analyzing Logs..." : "Submit Ticket"}
            </button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="h-full">
          <div className="h-full p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">🤖</div>
                <div>
                  <h4 className="text-white font-bold text-sm">Synth AI</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">L1 Diagnostic Agent</p>
                </div>
              </div>
              {ticketId && (
                <div className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-3 py-1 rounded-md font-mono text-xs font-bold">
                  {ticketId}
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {status === "idle" && (
                <div className="text-center text-gray-500 text-sm">
                  <p>Awaiting ticket submission.</p>
                </div>
              )}

              {status === "submitting" && (
                <div className="flex flex-col items-center justify-center text-purple-400">
                  <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-sm font-mono animate-pulse">Running diagnostic protocols...</p>
                </div>
              )}

              {status === "success" && aiResponse && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-black/50 border border-white/5 rounded-xl p-6 text-sm text-gray-300 leading-relaxed font-mono relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500 rounded-l-xl" />
                  {aiResponse}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}