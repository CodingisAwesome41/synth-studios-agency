"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Support() {
  const [formData, setFormData] = useState({ 
    clientRef: "", 
    clientEmail: "", 
    ticketType: "Bug / Glitch Report", 
    description: "" 
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
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
        setTicketId(data.ticket_id); // This comes from your route.ts
        setFormData({ clientRef: "", clientEmail: "", ticketType: "Bug / Glitch Report", description: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="max-w-5xl mx-auto px-6 pb-32 pt-32">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          OPERATIONS <span className="text-purple-400">DESK.</span>
        </h1>
        <p className="text-gray-400 text-lg font-light">
          Submit your ticket below. We will review your request and contact you at your email.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-neutral-950 border border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input required type="text" name="clientRef" value={formData.clientRef} onChange={handleChange} placeholder="Project ID or Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none" />
            <input required type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} placeholder="Your Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none" />
            
            <select name="ticketType" value={formData.ticketType} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 outline-none">
              <option>Bug / Glitch Report</option>
              <option>Feature Request</option>
              <option>Billing Inquiry</option>
            </select>
            
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Describe the issue..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none resize-none" />
            
            <button disabled={status === "submitting"} type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors">
              {status === "submitting" ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>

        {/* Success Panel */}
        <div className="h-full p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col justify-center items-center text-center">
            {status === "idle" && <p className="text-gray-500">Awaiting submission...</p>}
            {status === "success" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-green-400 font-bold mb-4">✓ Ticket Logged</div>
                <p className="text-gray-300 mb-2">We have received your request.</p>
                <div className="bg-white/5 px-4 py-2 rounded-lg font-mono text-purple-400">{ticketId}</div>
              </motion.div>
            )}
        </div>
      </div>
    </main>
  );
}