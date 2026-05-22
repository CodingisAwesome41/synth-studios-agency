"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="max-w-7xl mx-auto px-6 pb-32 pt-12">
      <div className="mb-24 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-medium uppercase tracking-widest text-purple-300 mb-8 backdrop-blur-md">
          The Synth Studios Model
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          THE AGENCY MODEL <br/> IS BROKEN.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 text-xl font-light leading-relaxed">
          Traditional tech agencies charge you $50,000 for an app because you are paying for their account managers, ping-pong tables, and expensive downtown offices. <strong className="text-white">We stripped all of that away.</strong>
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-4xl font-light text-purple-400 mb-4">01</h3>
          <h4 className="text-xl font-bold mb-2 text-white">Zero Overhead</h4>
          <p className="text-gray-400 text-sm leading-relaxed">We operate as a decentralized collective of elite engineers. No physical offices. No middle-management bloat. Every dollar you spend goes directly into the code.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-4xl font-light text-blue-400 mb-4">02</h3>
          <h4 className="text-xl font-bold mb-2 text-white">AI-Accelerated</h4>
          <p className="text-gray-400 text-sm leading-relaxed">By integrating OpenAI directly into our CI/CD pipelines, we write, test, and deploy architectures 400% faster than traditional developers. We pass those savings directly to you.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-4xl font-light text-emerald-400 mb-4">03</h3>
          <h4 className="text-xl font-bold mb-2 text-white">Modern Stack</h4>
          <p className="text-gray-400 text-sm leading-relaxed">We refuse to build on outdated legacy tech like WordPress. We build exclusively on Next.js, React, and Supabase—guaranteeing sub-millisecond load times and infinite scale.</p>
        </motion.div>
      </div>
    </main>
  );
}