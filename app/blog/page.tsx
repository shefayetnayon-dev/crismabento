'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowRight, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const categories = useMemo(() => {
    const cats = posts.map(p => p.category);
    return ['All', ...Array.from(new Set(cats))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-crimson selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            THE <span className="text-crimson">JOURNAL</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-base md:text-lg max-w-2xl mx-auto"
          >
            Insights on design, development, and the future of digital experiences.
          </motion.p>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-crimson text-white shadow-[0_0_20px_rgba(255,7,58,0.3)]' 
                    : 'glass text-white/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-crimson/50 transition-all text-sm"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-3xl glass h-[400px] animate-pulse" />
              ))
            ) : paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
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
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-white/40 text-[10px] md:text-xs font-mono">{post.date}</p>
                      <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{post.readingTime}</p>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-crimson transition-colors leading-tight mb-4">
                      {post.title}
                    </h3>
                    <p className="text-white/40 text-sm line-clamp-2 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-crimson font-bold text-sm group-hover:gap-4 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/20">
                <Filter className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-xl font-bold">No articles found matching your criteria.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-2 md:gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full glass flex items-center justify-center hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            <div className="flex gap-1 md:gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-10 w-10 md:h-12 md:w-12 rounded-full text-sm md:text-base font-bold transition-all ${
                    currentPage === i + 1 
                      ? 'bg-crimson text-white' 
                      : 'glass text-white/40 hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full glass flex items-center justify-center hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
