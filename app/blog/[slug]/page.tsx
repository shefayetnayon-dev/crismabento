'use client';

import { use, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Share2, Twitter, Linkedin, Github, Clock, Calendar, User, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch('/api/blog');
        const data: BlogPost[] = await response.json();
        const found = data.find(p => p.slug === slug);
        setPost(found || null);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#050505] pt-32 px-6">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-12 w-3/4 bg-white/5 rounded-xl mb-8" />
          <div className="h-[400px] w-full bg-white/5 rounded-3xl mb-12" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-white/5 rounded" />
            <div className="h-4 w-full bg-white/5 rounded" />
            <div className="h-4 w-2/3 bg-white/5 rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-6">Post Not Found</h1>
        <Link href="/blog" className="text-crimson font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Journal
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-crimson selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-crimson transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </motion.div>

        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            <span className="px-3 py-1 rounded-full glass text-[10px] font-bold uppercase tracking-widest text-crimson">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
              <Calendar className="w-3 h-3" /> {post.date}
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
              <Clock className="w-3 h-3" /> {post.readingTime}
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-[21/9] rounded-[32px] overflow-hidden mb-12 border border-white/5"
          >
            <Image 
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
            />
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="prose prose-invert prose-crimson max-w-none prose-p:text-white/70 prose-p:leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-a:text-crimson prose-blockquote:border-crimson prose-blockquote:bg-crimson/5 prose-blockquote:p-6 prose-blockquote:rounded-2xl prose-code:text-crimson prose-pre:bg-white/5 prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-img:rounded-3xl"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </motion.div>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            {/* Author Info */}
            <div className="p-8 rounded-3xl glass border-white/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full overflow-hidden border border-crimson/20 relative">
                  <Image 
                    src="https://picsum.photos/seed/author/100/100" 
                    alt="Author" 
                    fill 
                    className="object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="font-bold">Crimson Studio</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Design Engineer</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Exploring the intersection of high-performance engineering and emotional design.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white/20 hover:text-crimson transition-colors"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="text-white/20 hover:text-crimson transition-colors"><Linkedin className="w-4 h-4" /></a>
                <a href="#" className="text-white/20 hover:text-crimson transition-colors"><Github className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Share */}
            <div className="p-8 rounded-3xl glass border-white/5">
              <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-6 flex items-center gap-2">
                <Share2 className="w-3 h-3" /> Share Insight
              </p>
              <div className="flex flex-col gap-3">
                <button className="w-full py-3 px-6 glass rounded-xl text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Twitter className="w-4 h-4" /> Twitter
                </button>
                <button className="w-full py-3 px-6 glass rounded-xl text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
