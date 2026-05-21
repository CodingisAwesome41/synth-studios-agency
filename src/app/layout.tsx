import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Synth Studios | Idea to Reality",
  description: "Premium web development and technical execution.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Global Navigation Bar */}
        <nav className="w-full border-b border-neutral-800/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-medium tracking-tighter text-white">
              Synth<span className="text-accent">.</span>
            </Link>
            <div className="space-x-8 text-sm font-medium text-gray-400">
              <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/" className="hover:text-white transition-colors">Pitch an Idea</Link>
            </div>
          </div>
        </nav>
        
        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}