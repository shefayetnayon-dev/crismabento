'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Github, Twitter, Linkedin, Mail, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6"
    >
      <div className="glass px-4 md:px-6 py-3 rounded-full flex items-center gap-4 md:gap-8 border-white/5 relative">
        <Link href="/" className="text-sm font-bold hover:text-crimson transition-colors">Work</Link>
        <Link href="/#about" className="text-sm font-bold hover:text-crimson transition-colors">About</Link>
        <Link href="/blog" className="text-sm font-bold hover:text-crimson transition-colors">Blog</Link>
        
        <div className="hidden md:flex h-4 w-[1px] bg-white/10" />
        
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="hover:text-crimson transition-colors"><Twitter className="w-4 h-4" /></a>
          <a href="#" className="hover:text-crimson transition-colors"><Github className="w-4 h-4" /></a>
          <a href="#" className="hover:text-crimson transition-colors"><Linkedin className="w-4 h-4" /></a>
        </div>
        
        <div className="h-4 w-[1px] bg-white/10" />
        
        <a href="mailto:hello@crimson.design" className="text-sm font-bold text-crimson hover:opacity-80 transition-all">
          <span className="hidden sm:inline">Let&apos;s Talk</span>
          <Mail className="sm:hidden w-4 h-4" />
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/60 hover:text-white transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-4 p-6 rounded-[32px] glass border-white/5 flex flex-col items-center gap-6 md:hidden"
            >
              <div className="flex gap-8">
                <a href="#" className="hover:text-crimson transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-crimson transition-colors"><Github className="w-5 h-5" /></a>
                <a href="#" className="hover:text-crimson transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
