'use client';

import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 2000);
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Get in <span className="text-crimson">Touch</span></h2>
        <p className="text-white/40">Have a question or want to work together?</p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="glass p-8 md:p-12 rounded-[40px] space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Name</label>
            <input 
              required
              type="text" 
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-crimson/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Email</label>
            <input 
              required
              type="email" 
              placeholder="john@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-crimson/50 transition-all"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Message</label>
          <textarea 
            required
            rows={5}
            placeholder="Tell me about your project..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-crimson/50 transition-all resize-none"
          />
        </div>

        <button 
          disabled={status !== 'idle'}
          className="w-full py-5 bg-crimson text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
        >
          {status === 'idle' && (
            <>
              Send Message <Send className="w-5 h-5" />
            </>
          )}
          {status === 'sending' && "Sending..."}
          {status === 'sent' && "Message Sent!"}
        </button>
      </motion.form>
    </section>
  );
}
