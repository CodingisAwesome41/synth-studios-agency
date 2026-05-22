"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center pt-6 px-4 md:pt-8 md:px-6 pointer-events-none bg-gradient-to-b from-[#020202] via-[#020202]/90 to-transparent pb-12">
      <div className="flex flex-col w-full max-w-7xl bg-black/50 border border-white/10 backdrop-blur-3xl px-6 py-4 md:px-8 md:py-5 rounded-3xl pointer-events-auto shadow-2xl transition-all duration-500">
        
        {/* Top Bar (Logo & Hamburger) */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7] group-hover:scale-150 transition-transform duration-500" />
            <span className="font-bold tracking-widest uppercase text-xs md:text-sm">Synth<span className="text-gray-500 font-light">Studios</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
            <Link href="/#intake" className="bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition-transform hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] text-center">Initiate</Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="flex md:hidden flex-col gap-6 pt-6 pb-2 border-t border-white/10 mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors px-2">About</Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors px-2">Services</Link>
            <Link href="/portfolio" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors px-2">Portfolio</Link>
            <Link href="/support" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors px-2">Support</Link>
            <Link href="/#intake" onClick={() => setIsOpen(false)} className="bg-white text-black px-6 py-4 mt-2 rounded-xl text-center hover:scale-105 transition-transform">Initialize Project</Link>
          </div>
        )}
      </div>
    </nav>
  );
}