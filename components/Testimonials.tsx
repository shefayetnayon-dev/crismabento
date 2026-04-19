'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'CEO at TechFlow',
    content: 'Working with this studio was a game-changer. They didn&apos;t just build a website; they crafted an experience that truly represents our brand.',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    name: 'Marcus Thorne',
    role: 'Creative Director at Vibe',
    content: 'The attention to detail is unparalleled. The Bento layout they implemented for our portfolio has received endless compliments from our clients.',
    avatar: 'https://picsum.photos/seed/marcus/100/100'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Product Lead at Nova',
    content: 'Fast, reliable, and incredibly talented. The crimson accents and glassmorphism effects brought our app to life in ways we didn&apos;t expect.',
    avatar: 'https://picsum.photos/seed/elena/100/100'
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Client <span className="text-crimson">Voices</span></h2>
        <p className="text-white/40">Trusted by industry leaders worldwide.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl glass flex flex-col justify-between"
          >
            <div>
              <Quote className="text-crimson w-8 h-8 mb-6 opacity-50" />
              <p className="text-white/80 italic leading-relaxed mb-8">
                &quot;{t.content}&quot;
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border border-crimson/20 relative">
                <Image 
                  src={t.avatar} 
                  alt={t.name} 
                  fill 
                  className="object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
