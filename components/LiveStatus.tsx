'use client';

import { motion } from 'motion/react';
import { Circle } from 'lucide-react';

export function LiveStatus() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-crimson/20 text-xs font-medium tracking-wider uppercase"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson"></span>
      </span>
      <span className="text-white/80">Available for work</span>
    </motion.div>
  );
}
