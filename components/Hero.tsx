'use client';

import { motion } from 'motion/react';
import { LiveStatus } from './LiveStatus';
import { ArrowDown } from 'lucide-react';
import { Magnetic } from './Magnetic';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
      <LiveStatus />
      
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.95] md:leading-[0.9]"
      >
        CRAFTING <br />
        <span className="text-gradient">DIGITAL EDGE</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 max-w-2xl text-base md:text-xl text-white/60 font-medium px-4 md:px-0"
      >
        Independent design engineer specializing in high-performance web experiences 
        for forward-thinking agencies and startups.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0"
      >
        <Magnetic strength={0.2}>
          <button className="w-full sm:w-auto px-8 py-4 bg-crimson text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,7,58,0.3)]">
            View Projects
          </button>
        </Magnetic>
        <Magnetic strength={0.2}>
          <button className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
            Download CV
          </button>
        </Magnetic>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
