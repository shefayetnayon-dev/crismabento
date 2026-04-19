'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:auto-rows-[200px]">
        {/* Main Bio */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-8 md:row-span-2 rounded-3xl glass p-8 md:p-10 flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Passionate about <span className="text-crimson">User-Centric</span> Design.</h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            With over 6 years of experience in the digital space, I bridge the gap between complex engineering and intuitive design. My approach is rooted in minimalism, performance, and emotional connection.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 md:gap-8">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-crimson">50+</p>
              <p className="text-[10px] md:text-sm text-white/40 uppercase tracking-widest">Projects</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-crimson">12</p>
              <p className="text-[10px] md:text-sm text-white/40 uppercase tracking-widest">Awards</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-crimson">6y</p>
              <p className="text-[10px] md:text-sm text-white/40 uppercase tracking-widest">Experience</p>
            </div>
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-4 md:row-span-2 h-[300px] md:h-auto rounded-3xl overflow-hidden relative"
        >
          <Image 
            src="https://picsum.photos/seed/profile/600/800"
            alt="Profile"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Small Bento Items */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4 md:row-span-1 py-10 md:py-0 rounded-3xl glass p-8 flex flex-col justify-center items-center text-center"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Location</p>
          <p className="text-lg md:text-xl font-bold">San Francisco, CA</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4 md:row-span-1 py-10 md:py-0 rounded-3xl glass p-8 flex flex-col justify-center items-center text-center"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Current Role</p>
          <p className="text-lg md:text-xl font-bold text-crimson">Senior Product Designer</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4 md:row-span-1 py-10 md:py-0 rounded-3xl glass p-8 flex flex-col justify-center items-center text-center"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Education</p>
          <p className="text-lg md:text-xl font-bold">BFA in Interaction Design</p>
        </motion.div>
      </div>
    </section>
  );
}
