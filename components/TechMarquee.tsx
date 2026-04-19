'use client';

import { motion } from 'motion/react';

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'Node.js', 
  'GraphQL', 'PostgreSQL', 'Docker', 'AWS', 'Figma', 'Three.js',
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'Node.js' // Duplicate for seamless loop
];

export function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-10 bg-[#050505]">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap gap-8 md:gap-12 items-center"
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {techStack.map((tech, i) => (
          <span 
            key={i} 
            className="text-3xl md:text-6xl font-bold text-white/10 hover:text-crimson transition-colors cursor-default select-none"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
