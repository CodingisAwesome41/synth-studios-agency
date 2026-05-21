"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    projectTitle: "",
    budget: "",
    ideaDescription: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="p-6 lg:px-24 flex justify-between items-center border-b border-neutral-900">
        <div className="text-xl tracking-widest font-light uppercase">
          Synth <span className="font-bold text-purple-500">Studios</span>
        </div>
        <a href="mailto:hello@synthstudios.com" className="text-sm text-gray-400 hover:text-white transition-colors">
          Contact
        </a>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-24 py-24 md:py-32 max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight mb-8">
          We architect <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 font-semibold">
            digital realities.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12">
          Synth Studios is an elite technical agency. We transform complex visions into scalable, production-ready platforms. Submit your project brief below to initiate the discovery phase.
        </p>
      </section>

      {/* The Intake Pipeline */}
      <section className="px-6 lg:px-24 pb-32">
        <div className="max-w-2xl bg-neutral-950 p-8 md:p-12 rounded-2xl border border-neutral-800">
          <h2 className="text-2xl font-medium mb-8">Project Initiation</h2>
          
          {status === "success" ? (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-xl text-center">
              <h3 className="text-xl font-medium mb-2">Brief Received.</h3>
              <p className="text-sm">Our systems are analyzing your requirements. We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500">Your Name</label>
                  <input required type="text" name="clientName" value={formData.clientName} onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500">Project Title</label>
                  <input required type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500">Estimated Budget</label>
                  <select required name="budget" value={formData.budget} onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors text-white">
                    <option value="" disabled>Select a range...</option>
                    <option value="$2.5k - $5k">$2,500 - $5,000</option>
                    <option value="$5k - $15k">$5,000 - $15,000</option>
                    <option value="$15k+">$15,000+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-500">The Vision</label>
                <textarea required name="ideaDescription" value={formData.ideaDescription} onChange={handleChange} rows={4}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors" 
                  placeholder="Describe the platform you want to build..." />
              </div>

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full bg-white text-black font-semibold py-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? "Transmitting..." : "Submit Project Brief"}
              </button>
              
              {status === "error" && (
                <p className="text-red-500 text-sm text-center">Transmission failed. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}