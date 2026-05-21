import Link from "next/link";

export default function Pricing() {
  const tiers = [
    {
      name: "The MVP",
      price: "$2,500+",
      description: "Perfect for testing an idea. A clean, functional prototype to get you to market fast.",
      features: ["Next.js Front-End", "Basic Database Setup", "1 Round of Revisions", "14-Day Delivery"],
      highlight: false,
    },
    {
      name: "Full Stack Reality",
      price: "$8,500+",
      description: "A production-grade web application built to scale from day one.",
      features: ["Custom Authentication", "Supabase Back-End", "Stripe Payment Integration", "Admin Dashboard", "30-Day Delivery"],
      highlight: true,
    },
    {
      name: "Enterprise Scale",
      price: "$20k+",
      description: "Complex architecture for established businesses needing custom infrastructure.",
      features: ["Microservices Architecture", "Advanced Analytics", "SLA & Retainer Support", "Dedicated Engineering Team", "Custom Timeline"],
      highlight: false,
    }
  ];

  return (
    <main className="min-h-screen p-6 lg:p-24 max-w-6xl mx-auto">
      <div className="text-center space-y-4 mb-20">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">
          Transparent <span className="font-semibold text-accent">Investment.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We price based on the complexity of the architecture, not the size of your company. Choose the engine you need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <div 
            key={index} 
            className={`p-8 rounded-2xl border flex flex-col ${
              tier.highlight 
              ? "bg-neutral-900 border-accent shadow-[0_0_30px_rgba(59,130,246,0.15)] relative scale-105" 
              : "bg-surface border-neutral-800"
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-medium text-white mb-2">{tier.name}</h3>
            <div className="text-4xl font-light text-white mb-4">{tier.price}</div>
            <p className="text-gray-400 text-sm mb-8 h-12">{tier.description}</p>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-gray-300">
                  <svg className="w-4 h-4 text-accent mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Link 
              href="/" 
              className={`w-full py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                tier.highlight 
                ? "bg-accent hover:bg-blue-600 text-white" 
                : "bg-neutral-800 hover:bg-neutral-700 text-white"
              }`}
            >
              Pitch This Scope
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}