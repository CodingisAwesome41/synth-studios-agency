import { createClient } from "@supabase/supabase-js";

// Initialize Supabase with the Master Key (Server-side only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Prevent Next.js from caching this page so you always see new leads instantly
export const revalidate = 0; 

export default async function AdminDashboard() {
  // Fetch all pitches from the database, ordered by newest first
  const { data: pitches, error } = await supabase
    .from("client_pitches")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-red-500">
        System Error: {error.message}
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 lg:p-24 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="text-3xl font-light text-white">Command <span className="font-semibold text-accent">Center</span></h1>
          <p className="text-gray-400 mt-2">Manage incoming pitches and client pipelines.</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-light text-white">{pitches?.length || 0}</span>
          <p className="text-gray-400 text-sm uppercase tracking-wider">Active Leads</p>
        </div>
      </div>

      {(!pitches || pitches.length === 0) ? (
        <div className="text-center py-24 bg-surface rounded-2xl border border-neutral-800">
          <p className="text-gray-400">No pitches in the pipeline yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pitches.map((pitch) => (
            <div key={pitch.id} className="bg-surface p-6 rounded-xl border border-neutral-800 flex flex-col md:flex-row gap-8">
              
              {/* Client Info Pillar */}
              <div className="md:w-1/4 space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  {new Date(pitch.created_at).toLocaleDateString()}
                </p>
                <h3 className="text-lg font-medium text-white">{pitch.client_name}</h3>
                <a href={`mailto:${pitch.email}`} className="text-sm text-accent hover:underline">
                  {pitch.email}
                </a>
                <div className="mt-4 inline-block bg-neutral-900 border border-neutral-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                  Budget: {pitch.estimated_budget}
                </div>
              </div>

              {/* Idea Pillar */}
              <div className="md:w-3/4 bg-background p-6 rounded-lg border border-neutral-800/50">
                <h4 className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wider">The Vision</h4>
                <p className="text-gray-300 leading-relaxed">
                  {pitch.idea_description}
                </p>
                
                {/* Action Buttons */}
                <div className="mt-6 flex gap-4 pt-6 border-t border-neutral-800/50">
                  <button className="bg-accent hover:bg-blue-600 text-white text-sm font-medium py-2 px-6 rounded transition-colors">
                    Approve & Quote
                  </button>
                  <button className="bg-transparent border border-red-900/50 text-red-500 hover:bg-red-950/30 text-sm font-medium py-2 px-6 rounded transition-colors">
                    Pass
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}