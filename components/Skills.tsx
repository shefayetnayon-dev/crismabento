'use client';

import { motion } from 'motion/react';

const skills = [
  { name: 'UI/UX Design', level: 95 },
  { name: 'Frontend Development', level: 90 },
  { name: 'Brand Identity', level: 85 },
  { name: 'Motion Graphics', level: 80 },
  { name: 'Product Strategy', level: 88 },
  { name: '3D Modeling', level: 75 },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Technical <span className="text-crimson">Mastery</span></h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            I specialize in creating high-performance digital products that combine aesthetic beauty with technical excellence.
          </p>
        </div>
        
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {skills.map((skill, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-base md:text-lg font-bold">{skill.name}</span>
                <span className="text-crimson font-mono text-xs md:text-sm">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-crimson shadow-[0_0_10px_rgba(255,7,58,0.5)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
