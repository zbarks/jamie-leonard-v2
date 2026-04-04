"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

interface Post {
  id: string;
  title: string;
  body: string;
  image: string | null;
  date: string;
  published: boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getExcerpt(body: string, maxLength = 160) {
  if (body.length <= maxLength) return body;
  return body.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      <section className="pt-48 pb-32 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-tight mb-6">
              Blog
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-gold/50" />
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-sans font-medium">
                News & Behind the Scenes
              </p>
              <div className="h-[1px] w-12 bg-gold/50" />
            </div>
          </motion.div>

          {/* Posts */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <p className="text-white/40 text-center text-lg font-serif italic">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="space-y-0">
              {posts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Link href={`/blog/${post.id}`} className="group block">
                    <article className="py-10 border-b border-white/5 hover:border-gold/20 transition-all duration-500">
                      {post.image && (
                        <div className="rounded-xl overflow-hidden mb-6 border border-white/5">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-56 md:h-72 object-cover group-hover:scale-[1.02] transition-transform duration-700"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-3 mb-4">
                        <Calendar size={12} className="text-gold/50" />
                        <time className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
                          {formatDate(post.date)}
                        </time>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-serif text-white group-hover:text-gold transition-colors duration-300 mb-4">
                        {post.title}
                      </h2>

                      <p className="text-white/40 leading-relaxed max-w-2xl mb-6">
                        {getExcerpt(post.body)}
                      </p>

                      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold/60 font-bold group-hover:text-gold group-hover:gap-4 transition-all duration-300">
                        Read more
                        <ArrowRight size={12} />
                      </span>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
