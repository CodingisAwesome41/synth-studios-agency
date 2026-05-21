"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idea: "",
    budget: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const { error } = await supabase
      .from("client_pitches")
      .insert([
        {
          client_name: formData.name,
          email: formData.email,
          project_title: "New Web Pitch", 
          idea_description: formData.idea,
          estimated_budget: formData.budget,
        },
      ]);

    if (error) {
      console.error("Supabase Error:", error);
      setStatus("error");
    } else {
      setStatus("success");
      setFormData({ name: "", email: "", idea: "", budget: "" }); 
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 lg:p-24">
      <div className="max-w-2xl w-full space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">
            You give the idea.<br />
            <span className="font-semibold text-accent">We build the reality.</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Submit your vision below. Our engineering team will review 
            the scope and contact you within 24 hours.
          </p>
        </div>

        <div className="bg-surface p-8 rounded-2xl border border-neutral-800 shadow-2xl">
          {status === "success" ? (
            <div className="text-center py-12 space-y-4">
              <h2 className="text-2xl font-medium text-white">Vision Received.</h2>
              <p className="text-gray-400">We will be in touch shortly.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-4 text-accent hover:text-white transition-colors"
              >
                Submit another idea
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">Your Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-background border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">Email Address</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-background border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">The Idea</label>
                <textarea required rows={4} value={formData.idea} onChange={(e) => setFormData({ ...formData, idea: e.target.value })} className="w-full bg-background border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Tell us what we are building..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Estimated Budget</label>
                <select required value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full bg-background border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                  <option value="" disabled>Select a range</option>
                  <option value="$1k - $5k">$1k - $5k (MVP)</option>
                  <option value="$5k - $15k">$5k - $15k (Full Application)</option>
                  <option value="$15k+">$15k+ (Enterprise Scale)</option>
                </select>
              </div>

              <button type="submit" disabled={status === "submitting"} className="w-full bg-accent hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50">
                {status === "submitting" ? "Encrypting & Sending..." : "Submit Pitch"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}