export default function Portfolio() {
  const projects = [
    {
      title: "Aura Fintech Dashboard",
      category: "Full-Stack Web App",
      description: "A secure, real-time banking portal built with Next.js and PostgreSQL. Features dynamic data visualization and role-based access.",
    },
    {
      title: "Lumina Engine",
      category: "SaaS Platform",
      description: "An AI-driven content generation tool. We built the complete infrastructure from the landing page to the Stripe subscription back-end.",
    },
    {
      title: "Velocity Commerce",
      category: "E-Commerce Headless",
      description: "A sub-second load time custom storefront connected to a headless Shopify backend, resulting in a 40% conversion rate increase.",
    },
    {
      title: "Oasis Internal Tools",
      category: "Enterprise CRM",
      description: "A custom Supabase-powered dashboard replacing five different fragmented software tools for a logistics company.",
    }
  ];

  return (
    <main className="min-h-screen p-6 lg:p-24 max-w-6xl mx-auto">
      <div className="space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">
          Our <span className="font-semibold text-accent">Proof of Work.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          We don't just build websites; we engineer digital products. Here are a few examples of concepts we've turned into scalable realities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="group bg-surface p-8 rounded-2xl border border-neutral-800 hover:border-accent/50 transition-colors cursor-pointer">
            <div className="w-full h-48 bg-neutral-900 rounded-lg mb-6 flex items-center justify-center border border-neutral-800 group-hover:border-neutral-700 transition-colors">
              <span className="text-neutral-600 text-sm font-medium uppercase tracking-widest">Visual Mockup</span>
            </div>
            <p className="text-accent text-sm font-medium mb-2">{project.category}</p>
            <h3 className="text-2xl font-medium text-white mb-3">{project.title}</h3>
            <p className="text-gray-400 leading-relaxed">{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}