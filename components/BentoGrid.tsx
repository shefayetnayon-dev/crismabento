'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  category: string;
  image: string;
  size: 'small' | 'medium' | 'large';
}

const projects: Project[] = [
  {
    title: 'Lumina Dashboard',
    category: 'SaaS / Fintech',
    image: 'https://picsum.photos/seed/lumina/800/600',
    size: 'large',
  },
  {
    title: 'Aether OS',
    category: 'Design System',
    image: 'https://picsum.photos/seed/aether/600/600',
    size: 'medium',
  },
  {
    title: 'Nova App',
    category: 'Mobile / UX',
    image: 'https://picsum.photos/seed/nova/600/800',
    size: 'medium',
  },
  {
    title: 'Pulse Beats',
    category: 'Audio / Web',
    image: 'https://picsum.photos/seed/pulse/600/600',
    size: 'small',
  },
  {
    title: 'Zenith Agency',
    category: 'Branding',
    image: 'https://picsum.photos/seed/zenith/800/800',
    size: 'large',
  },
];

export function BentoGrid() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[300px]">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "group relative overflow-hidden rounded-3xl glass glass-hover cursor-pointer h-[300px] md:h-auto",
              project.size === 'large' && "md:col-span-2 md:row-span-2",
              project.size === 'medium' && "md:col-span-2 md:row-span-1",
              project.size === 'small' && "md:col-span-1 md:row-span-1"
            )}
          >
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-0 left-0 p-8 z-10 w-full">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-crimson text-xs font-bold uppercase tracking-widest mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-bold text-white group-hover:text-crimson transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full glass flex items-center justify-center group-hover:bg-crimson group-hover:text-white transition-all">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
