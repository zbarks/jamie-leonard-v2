"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Send,
  X,
  FileText,
  ImagePlus,
  XCircle,
} from "lucide-react";
import Link from "next/link";

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

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  // Editor state
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [storedPw, setStoredPw] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(false);

    const res = await fetch("/api/posts", {
      headers: { "x-admin-password": password },
    });

    if (res.ok) {
      setStoredPw(password);
      setAuthed(true);
      const data = await res.json();
      setPosts(data);
    } else {
      setAuthError(true);
    }
  }

  async function loadPosts() {
    setLoading(true);
    const res = await fetch("/api/posts", {
      headers: { "x-admin-password": storedPw },
    });
    if (res.ok) {
      setPosts(await res.json());
    }
    setLoading(false);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImageUrl(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    setImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return imageUrl;

    setUploading(true);

    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": storedPw,
      },
      body: JSON.stringify({ data: base64 }),
    });

    setUploading(false);

    if (res.ok) {
      const data = await res.json();
      return data.url;
    }
    return null;
  }

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setPublishing(true);

    const finalImage = await uploadImage();

    if (editingPost) {
      const res = await fetch("/api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": storedPw,
        },
        body: JSON.stringify({
          id: editingPost.id,
          title: title.trim(),
          body: body.trim(),
          image: finalImage,
        }),
      });

      if (res.ok) {
        setSuccessMsg("Post updated!");
        resetEditor();
        loadPosts();
      }
    } else {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": storedPw,
        },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          image: finalImage,
          published: true,
        }),
      });

      if (res.ok) {
        setSuccessMsg("Post published!");
        resetEditor();
        loadPosts();
      }
    }

    setPublishing(false);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This can't be undone.")) return;

    await fetch("/api/posts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": storedPw,
      },
      body: JSON.stringify({ id }),
    });

    loadPosts();
  }

  async function handleTogglePublish(post: Post) {
    await fetch("/api/posts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": storedPw,
      },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    });

    loadPosts();
  }

  function handleEdit(post: Post) {
    setEditingPost(post);
    setTitle(post.title);
    setBody(post.body);
    setImageUrl(post.image || null);
    setImagePreview(post.image || null);
    setImageFile(null);
    setShowEditor(true);
  }

  function resetEditor() {
    setShowEditor(false);
    setEditingPost(null);
    setTitle("");
    setBody("");
    setImageUrl(null);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // --- LOGIN SCREEN ---
  if (!authed) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-white/5 mb-6">
              <Lock size={20} className="text-gold/60" />
            </div>
            <h1 className="text-2xl font-serif text-white uppercase tracking-tight">
              Admin
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors text-sm tracking-wide"
              autoFocus
            />

            {authError && (
              <p className="text-red-400/80 text-xs tracking-wide text-center">
                Incorrect password
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-gold hover:text-white transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white/40 transition-colors"
            >
              Back to Site
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  // --- ADMIN DASHBOARD ---
  return (
    <main className="min-h-screen bg-black px-6 md:px-20 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-3xl font-serif text-white uppercase tracking-tight">
              Blog Admin
            </h1>
            <p className="text-white/30 text-xs mt-2 tracking-wide">
              {posts.length} post{posts.length !== 1 && "s"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setShowEditor(true);
                setEditingPost(null);
                setTitle("");
                setBody("");
                setImageUrl(null);
                setImageFile(null);
                setImagePreview(null);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-[0.15em] text-[10px] rounded-full hover:bg-gold hover:text-white transition-all duration-300"
            >
              <Plus size={14} />
              New Post
            </button>

            <button
              onClick={() => {
                setAuthed(false);
                setStoredPw("");
              }}
              className="p-3 border border-white/10 rounded-full text-white/30 hover:text-white hover:border-white/30 transition-all"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Success toast */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 px-6 py-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center"
            >
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post Editor Modal */}
        <AnimatePresence>
          {showEditor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center pt-12 px-6 overflow-y-auto"
            >
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={resetEditor}
              />

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                className="relative z-10 w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden mb-12"
              >
                <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
                  <h2 className="text-sm font-bold text-white uppercase tracking-[0.15em]">
                    {editingPost ? "Edit Post" : "New Post"}
                  </h2>
                  <button
                    onClick={resetEditor}
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handlePublish} className="p-8 space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-3">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Post title…"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-lg font-serif placeholder:text-white/15 focus:outline-none focus:border-gold/40 transition-colors"
                      autoFocus
                    />
                  </div>

                  {/* Image upload */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-3">
                      Photo <span className="text-white/15">(optional)</span>
                    </label>

                    {imagePreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-white/10">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-colors"
                        >
                          <XCircle size={20} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-8 border border-dashed border-white/10 rounded-xl flex flex-col items-center gap-3 text-white/20 hover:text-white/40 hover:border-white/20 transition-all"
                      >
                        <ImagePlus size={24} />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                          Click to add a photo
                        </span>
                      </button>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-3">
                      Body
                    </label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Write your post…"
                      rows={12}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white leading-relaxed placeholder:text-white/15 focus:outline-none focus:border-gold/40 transition-colors resize-none"
                    />
                    <p className="text-white/15 text-[10px] mt-2 tracking-wide">
                      Use blank lines to separate paragraphs
                    </p>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={resetEditor}
                      className="px-6 py-3 text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={publishing || uploading || !title.trim() || !body.trim()}
                      className="flex items-center gap-2 px-8 py-3 bg-gold text-black font-bold uppercase tracking-[0.15em] text-[10px] rounded-full hover:bg-gold-light transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Send size={12} />
                      {uploading
                        ? "Uploading…"
                        : publishing
                        ? "Saving…"
                        : editingPost
                        ? "Update"
                        : "Publish"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <FileText size={40} className="text-white/10 mx-auto mb-6" />
            <p className="text-white/30 font-serif text-lg italic">
              No posts yet. Create your first one.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group flex items-start justify-between gap-6 py-6 border-b border-white/5"
              >
                <div className="flex gap-5 flex-1 min-w-0">
                  {post.image && (
                    <img
                      src={post.image}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-white/5"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
                        {formatDate(post.date)}
                      </span>
                      {!post.published && (
                        <span className="text-[9px] uppercase tracking-[0.2em] text-yellow-500/60 font-bold bg-yellow-500/10 px-2 py-0.5 rounded-full">
                          Draft
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-serif text-white truncate">
                      {post.title}
                    </h3>
                    <p className="text-white/30 text-sm mt-1 truncate max-w-lg">
                      {post.body}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 opacity-30 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleTogglePublish(post)}
                    className="p-2.5 border border-white/10 rounded-lg text-white/50 hover:text-white hover:border-white/30 transition-all"
                    title={post.published ? "Unpublish" : "Publish"}
                  >
                    {post.published ? (
                      <Eye size={14} />
                    ) : (
                      <EyeOff size={14} />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2.5 border border-white/10 rounded-lg text-white/50 hover:text-white hover:border-white/30 transition-all"
                    title="Edit"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2.5 border border-white/10 rounded-lg text-red-400/50 hover:text-red-400 hover:border-red-400/30 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer links */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/5">
          <Link
            href="/blog"
            className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-gold transition-colors font-bold"
          >
            View Blog
          </Link>
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-gold transition-colors font-bold"
          >
            Back to Site
          </Link>
        </div>
      </div>
    </main>
  );
}
