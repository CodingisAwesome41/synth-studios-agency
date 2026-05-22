"use client";

import { motion } from "framer-motion";

const caseStudies = [
  { 
    title: "Project Nova", 
    category: "Fintech Infrastructure", 
    tag: "React / Node / Stripe", 
    // High-contrast abstract tech image
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    metrics: [{ label: "Transaction Speed", value: "+450%" }, { label: "Volume (Wk 1)", value: "$2.4M" }],
    review: "Synth Studios rebuilt our core payment engine while we were flying the plane. Zero downtime, flawless execution.",
    author: "Elena R., CTO @ NovaPay"
  },
  { 
    title: "Aura Commerce", 
    category: "Global E-Commerce", 
    tag: "Next.js / Supabase", 
    // Abstract fluid gradient
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    metrics: [{ label: "Page Load Time", value: "0.4s" }, { label: "Conversion Rate", value: "+120%" }],
    review: "They don't just write code; they engineer revenue. Our conversion rates doubled the day the new architecture went live.",
    author: "Marcus T., Founder @ Aura"
  },
  { 
    title: "Atlas Core", 
    category: "Enterprise Dashboard", 
    tag: "Next.js / OpenAI", 
    // Server room / hardware
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    metrics: [{ label: "Manual Hours Saved", value: "40 hrs/wk" }, { label: "Data Latency", value: "<10ms" }],
    review: "The AI integration they built into our internal dashboard effectively replaced an entire administrative department.",
    author: "Sarah K., VP of Ops @ Atlas"
  }
];

export default function Portfolio() {
  return (
    <main className="max-w-7xl mx-auto px-6 pb-32">
      <div className="mb-24 pt-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-6"
        >
          THE ARCHIVES.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-400 text-xl font-light max-w-2xl"
        >
          We measure success strictly through performance metrics and revenue generated. Review our declassified operations below.
        </motion.p>
      </div>

      <div className="space-y-32">
        {caseStudies.map((study, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}
          >
            {/* Visual Image Block */}
            <div className="w-full md:w-1/2 group relative h-80 md:h-[500px] rounded-[2rem] bg-black border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src={study.image} 
                alt={study.title}
                className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-80"
              />
              
              {/* Technical UI Overlay overlay */}
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Data Block */}
            <div className="w-full md:w-1/2 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3 block">{study.category}</span>
                <h3 className="text-4xl md:text-5xl font-semibold mb-4 text-white">{study.title}</h3>
                <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-xs text-gray-300 border border-white/10">
                  {study.tag}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-6 border-y border-white/10 py-6">
                {study.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">{metric.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="relative pl-6 border-l border-purple-500/30">
                <svg className="absolute -top-2 -left-3 w-6 h-6 text-purple-500/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                <p className="text-gray-300 text-lg italic leading-relaxed">"{study.review}"</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-4 font-semibold">{study.author}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}