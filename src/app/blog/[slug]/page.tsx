"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

interface Post {
  id: string;
  title: string;
  body: string;
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

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((posts: Post[]) => {
        const found = posts.find((p) => p.id === slug);
        if (found) {
          setPost(found);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  // Render body with paragraph breaks
  function renderBody(body: string) {
    return body.split(/\n\n+/).map((para, i) => (
      <p key={i} className="text-white/60 leading-[1.9] text-lg mb-6 last:mb-0">
        {para.split(/\n/).map((line, j) => (
          <span key={j}>
            {j > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    ));
  }

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      <section className="pt-48 pb-32 px-6 md:px-20">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : notFound ? (
            <div className="text-center py-20">
              <h1 className="text-4xl font-serif text-white mb-6">
                Post Not Found
              </h1>
              <Link
                href="/blog"
                className="text-gold text-sm uppercase tracking-widest hover:underline"
              >
                Back to Blog
              </Link>
            </div>
          ) : post ? (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold hover:text-gold transition-colors mb-16 group"
              >
                <ArrowLeft
                  size={12}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Back to Blog
              </Link>

              <div className="flex items-center gap-3 mb-8">
                <Calendar size={12} className="text-gold/50" />
                <time className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
                  {formatDate(post.date)}
                </time>
              </div>

              <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tight mb-12 leading-tight">
                {post.title}
              </h1>

              <div className="h-[1px] w-16 bg-gold/30 mb-12" />

              <div>{renderBody(post.body)}</div>

              <div className="mt-20 pt-12 border-t border-white/5">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold hover:text-gold transition-colors group"
                >
                  <ArrowLeft
                    size={12}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  All Posts
                </Link>
              </div>
            </motion.article>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}
