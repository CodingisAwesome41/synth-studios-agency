"use client";

import { motion } from "framer-motion";

const projects = [
  { title: "Project Nova", category: "Fintech Platform", tag: "React / Node", color: "from-blue-500/20" },
  { title: "Aura Commerce", category: "E-Commerce", tag: "Next.js / Stripe", color: "from-purple-500/20" },
  { title: "Nexus AI", category: "Machine Learning UI", tag: "Python / React", color: "from-emerald-500/20" },
  { title: "Atlas Core", category: "Enterprise Dashboard", tag: "Supabase / Vue", color: "from-orange-500/20" }
];

export default function Portfolio() {
  return (
    <main className="max-w-7xl mx-auto px-6 pb-32">
      <div className="mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
        >
          THE ARCHIVES.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-gray-400 text-xl font-light max-w-2xl"
        >
          A selection of enterprise architectures, scaled platforms, and digital realities engineered by our team.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative h-96 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden cursor-pointer"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2 block">{project.category}</span>
                <h3 className="text-3xl font-semibold mb-4 text-white">{project.title}</h3>
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-gray-300 border border-white/5">
                  {project.tag}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}