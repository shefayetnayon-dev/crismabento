'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold mb-6">CRIMSON<span className="text-crimson">.</span></h2>
            <p className="text-white/40 leading-relaxed">
              Crafting high-end digital experiences for the next generation of brands. 
              Focused on performance, aesthetics, and user emotion.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-6">Navigation</p>
              <ul className="space-y-4 text-white/60">
                <li><Link href="/" className="hover:text-white transition-colors">Work</Link></li>
                <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/#skills" className="hover:text-white transition-colors">Skills</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-6">Social</p>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-6">Contact</p>
              <ul className="space-y-4 text-white/60">
                <li>hello@crimson.design</li>
                <li>+1 (555) 000-1234</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-sm font-medium">
            © 2026 Crimson Design Studio. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8">
            <div className="flex gap-6">
              <a href="#" className="text-white/20 hover:text-crimson transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white/20 hover:text-crimson transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-white/20 hover:text-crimson transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-white/20 hover:text-crimson transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
            <button 
              onClick={scrollToTop}
              className="h-12 w-12 rounded-full glass flex items-center justify-center hover:bg-crimson hover:text-white transition-all group"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
