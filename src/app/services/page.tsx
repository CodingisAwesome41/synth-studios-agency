"use client";

import { motion } from "framer-motion";

const capabilities = [
  { id: "01", title: "Full-Stack Development", desc: "End-to-end architectures utilizing Next.js, React, and Node environments. We build for zero latency and infinite scale." },
  { id: "02", title: "AI Integration", desc: "Natively wired OpenAI and custom LLM integrations to automate workflows, screen data, and generate dynamic content." },
  { id: "03", title: "Cloud Infrastructure", desc: "Serverless PostgreSQL databases, Edge network deployments, and secure CI/CD pipelines via Vercel and Supabase." },
  { id: "04", title: "Revenue Pipelines", desc: "Custom Stripe billing architectures, subscription models, and automated invoicing loops." }
];

export default function Services() {
  return (
    <main className="max-w-5xl mx-auto px-6 pb-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">CAPABILITIES.</h1>
        <p className="text-gray-400 text-xl font-light">We do not use templates. We engineer custom digital infrastructure.</p>
      </motion.div>

      <div className="space-y-6">
        {capabilities.map((cap, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col md:flex-row gap-6 md:gap-12 p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
          >
            <div className="text-4xl font-light text-purple-500/50">{cap.id}</div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">{cap.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg">{cap.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}