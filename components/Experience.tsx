'use client';

import { motion } from 'motion/react';

const experience = [
  {
    company: 'Apple',
    role: 'Senior Product Designer',
    period: '2022 - Present',
    desc: 'Leading design for core ecosystem features, focusing on accessibility and seamless cross-device interaction.'
  },
  {
    company: 'Stripe',
    role: 'Product Designer',
    period: '2020 - 2022',
    desc: 'Redesigned the checkout experience for millions of users, increasing conversion by 12%.'
  },
  {
    company: 'Meta',
    role: 'UI Engineer',
    period: '2018 - 2020',
    desc: 'Developed high-fidelity prototypes and design systems for the future of social connection.'
  }
];

const education = [
  {
    school: 'Stanford University',
    degree: 'MS in Computer Science',
    period: '2016 - 2018',
    desc: 'Specialized in Human-Computer Interaction and AI-driven design tools.'
  },
  {
    school: 'RISD',
    degree: 'BFA in Graphic Design',
    period: '2012 - 2016',
    desc: 'Explored the intersection of traditional typography and digital interfaces.'
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Experience */}
        <div>
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
            <span className="h-8 w-1 bg-crimson rounded-full" />
            Experience
          </h2>
          <div className="space-y-12">
            {experience.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 border-l border-white/10"
              >
                <div className="absolute top-0 left-[-5px] h-2 w-2 rounded-full bg-crimson" />
                <p className="text-crimson text-sm font-mono mb-1">{item.period}</p>
                <h3 className="text-xl font-bold">{item.role}</h3>
                <p className="text-white/40 text-sm mb-4">{item.company}</p>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
            <span className="h-8 w-1 bg-crimson rounded-full" />
            Education
          </h2>
          <div className="space-y-12">
            {education.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 border-l border-white/10"
              >
                <div className="absolute top-0 left-[-5px] h-2 w-2 rounded-full bg-crimson" />
                <p className="text-crimson text-sm font-mono mb-1">{item.period}</p>
                <h3 className="text-xl font-bold">{item.degree}</h3>
                <p className="text-white/40 text-sm mb-4">{item.school}</p>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
