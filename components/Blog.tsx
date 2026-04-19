'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest <span className="text-crimson">Insights</span></h2>
          <p className="text-white/40">Thoughts on design, code, and digital culture.</p>
        </div>
        <Link href="/blog" className="flex items-center gap-2 text-crimson font-bold hover:gap-4 transition-all">
          View All Posts <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-3xl glass h-[400px] animate-pulse" />
          ))
        ) : (
          posts.map((post, i) => (
            <motion.article 
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6">
                  <Image 
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-[10px] font-bold uppercase tracking-widest text-crimson">
                    {post.category}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-white/40 text-xs font-mono">{post.date}</p>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{post.readingTime}</p>
                </div>
                <h3 className="text-xl font-bold group-hover:text-crimson transition-colors leading-tight">
                  {post.title}
                </h3>
              </Link>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
}
