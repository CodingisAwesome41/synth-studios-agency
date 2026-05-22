import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "../components/Navbar"; // Importing the new mobile-ready Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synth Studios | Elite Digital Architecture",
  description: "We architect digital realities. Enterprise-grade Next.js development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#020202]">
      <body className={`${inter.className} bg-[#020202] text-white antialiased flex flex-col min-h-screen`}>
        
        {/* Responsive Grid Background */}
        <div className="fixed inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] pointer-events-none"></div>

        {/* Global Responsive Navigation */}
        <Navbar />

        <main className="relative z-10 flex-grow pt-32">
          {children}
        </main>

        {/* Responsive Footer */}
        <footer className="relative z-10 pt-24 pb-12 md:pt-32 md:pb-16 px-6 border-t border-white/5 bg-black mt-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
            <div className="md:col-span-2">
              <div className="text-2xl md:text-3xl tracking-widest font-light uppercase mb-4 md:mb-6">
                Synth <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Studios</span>
              </div>
              <p className="text-gray-500 font-light max-w-sm leading-relaxed text-sm md:text-base">
                We don't build websites. We engineer decentralized, scalable, AI-integrated digital realities for enterprise clients globally.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-widest text-[10px] md:text-xs">Infrastructure</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-500 text-xs md:text-sm">
                <li><Link href="/services" className="hover:text-purple-400 transition-colors">Capabilities</Link></li>
                <li><Link href="/portfolio" className="hover:text-purple-400 transition-colors">The Archives</Link></li>
                <li><Link href="/about" className="hover:text-purple-400 transition-colors">Agency Model</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-widest text-[10px] md:text-xs">Operations</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-500 text-xs md:text-sm">
                <li><Link href="/support" className="hover:text-purple-400 transition-colors">Client Portal</Link></li>
                <li><Link href="/#intake" className="hover:text-purple-400 transition-colors">Initialize Project</Link></li>
                <li><a href="mailto:ops@synthstudios.com" className="hover:text-purple-400 transition-colors">ops@synthstudios.com</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-600 uppercase tracking-widest font-semibold gap-4 md:gap-0 text-center">
            <div>© {new Date().getFullYear()} Synth Studios. All rights reserved.</div>
            <div>Systems Online / AI Triage Active</div>
          </div>
        </footer>

      </body>
    </html>
  );
}