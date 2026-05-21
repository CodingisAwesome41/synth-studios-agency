import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#020202] text-white selection:bg-purple-500/30 overflow-x-hidden`}>
        
        {/* Global Grid Background */}
        <div className="fixed inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Global Navigation */}
        <nav className="fixed top-0 w-full z-50 flex justify-center pt-6 px-6 pointer-events-none">
          <div className="flex items-center justify-between w-full max-w-5xl bg-black/40 border border-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl pointer-events-auto shadow-2xl">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] group-hover:scale-150 transition-transform" />
              <span className="font-semibold tracking-wider uppercase text-sm">Synth<span className="text-gray-500">Studios</span></span>
            </Link>
            <div className="flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-gray-400">
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
              <Link href="/#intake" className="bg-white text-black px-4 py-2 rounded-full hover:scale-105 transition-transform">Initiate</Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="relative z-10 min-h-screen pt-32">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="relative z-10 py-12 px-6 border-t border-white/5 bg-black">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xl tracking-widest font-light uppercase">
              Synth <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Studios</span>
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-widest font-semibold">
              © {new Date().getFullYear()} Synth Studios. All rights reserved.
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}