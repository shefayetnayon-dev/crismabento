'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BentoGrid } from '@/components/BentoGrid';
import { TechMarquee } from '@/components/TechMarquee';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Testimonials } from '@/components/Testimonials';
import { Blog } from '@/components/Blog';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ParallaxSection } from '@/components/ParallaxSection';
import { motion, useScroll, useSpring } from 'motion/react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen bg-[#050505] selection:bg-crimson selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-crimson z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Background Noise/Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://picsum.photos/seed/noise/1000/1000')] bg-repeat" />
      
      {/* Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-crimson/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-crimson/5 blur-[120px] rounded-full pointer-events-none" />

      <Navbar />
      
      <Hero />
      
      <ScrollReveal>
        <About />
      </ScrollReveal>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <ScrollReveal direction="left">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-crimson" />
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/40">Selected Works</h2>
            </div>
          </ScrollReveal>
        </div>
        <ParallaxSection offset={30}>
          <BentoGrid />
        </ParallaxSection>
      </div>

      <ScrollReveal>
        <Skills />
      </ScrollReveal>

      <TechMarquee />

      <ScrollReveal>
        <Experience />
      </ScrollReveal>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Strategy', desc: 'Defining the core purpose and roadmap for digital products.' },
            { title: 'Design', desc: 'Crafting visually stunning and highly functional interfaces.' },
            { title: 'Development', desc: 'Building robust, scalable, and high-performance applications.' }
          ].map((service, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="p-10 rounded-3xl glass glass-hover h-full">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal>
        <Blog />
      </ScrollReveal>

      <ScrollReveal>
        <ContactForm />
      </ScrollReveal>

      <Footer />
    </main>
  );
}
