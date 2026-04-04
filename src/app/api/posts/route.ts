import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const POSTS_FILE = path.join(process.cwd(), "src/data/posts.json");

// Simple admin password — change this!
const ADMIN_PASSWORD = "jamie040426MAGIC";

function getPosts() {
  const raw = fs.readFileSync(POSTS_FILE, "utf-8");
  return JSON.parse(raw);
}

function savePosts(posts: any[]) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// GET — return all published posts (or all posts if authed)
export async function GET(req: NextRequest) {
  const posts = getPosts();
  const isAdmin = req.headers.get("x-admin-password") === ADMIN_PASSWORD;

  const filtered = isAdmin
    ? posts
    : posts.filter((p: any) => p.published);

  // Sort newest first
  filtered.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return NextResponse.json(filtered);
}

// POST — create a new post (requires password)
export async function POST(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, body, published = true } = await req.json();

  if (!title || !body) {
    return NextResponse.json(
      { error: "Title and body are required" },
      { status: 400 }
    );
  }

  const posts = getPosts();
  const slug = slugify(title);

  // Avoid duplicate slugs
  let finalSlug = slug;
  let counter = 1;
  while (posts.some((p: any) => p.id === finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }

  const newPost = {
    id: finalSlug,
    title,
    body,
    date: new Date().toISOString(),
    published,
  };

  posts.push(newPost);
  savePosts(posts);

  return NextResponse.json(newPost, { status: 201 });
}

// DELETE — remove a post (requires password)
export async function DELETE(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  let posts = getPosts();
  posts = posts.filter((p: any) => p.id !== id);
  savePosts(posts);

  return NextResponse.json({ success: true });
}

// PUT — edit a post (requires password)
export async function PUT(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, title, body, published } = await req.json();
  const posts = getPosts();
  const idx = posts.findIndex((p: any) => p.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (title !== undefined) posts[idx].title = title;
  if (body !== undefined) posts[idx].body = body;
  if (published !== undefined) posts[idx].published = published;

  savePosts(posts);
  return NextResponse.json(posts[idx]);
}
