import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jamie040426MAGIC";
const COLLECTION = "posts";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// GET — return all published posts (or all if admin)
export async function GET(req: NextRequest) {
  try {
    const isAdmin =
      req.headers.get("x-admin-password") === ADMIN_PASSWORD;

    let query = db.collection(COLLECTION).orderBy("date", "desc");

    const snapshot = await query.get();
    let posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!isAdmin) {
      posts = posts.filter((p: any) => p.published);
    }

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST — create a new post
export async function POST(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, body, image = null, published = true } = await req.json();

    if (!title || !body) {
      return NextResponse.json(
        { error: "Title and body are required" },
        { status: 400 }
      );
    }

    const slug = slugify(title);

    // Check for duplicate slugs
    let finalSlug = slug;
    let counter = 1;
    while (true) {
      const existing = await db.collection(COLLECTION).doc(finalSlug).get();
      if (!existing.exists) break;
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const postData = {
      title,
      body,
      image,
      date: new Date().toISOString(),
      published,
    };

    await db.collection(COLLECTION).doc(finalSlug).set(postData);

    return NextResponse.json(
      { id: finalSlug, ...postData },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

// PUT — edit a post
export async function PUT(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, title, body, published, image } = await req.json();

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (body !== undefined) updates.body = body;
    if (published !== undefined) updates.published = published;
    if (image !== undefined) updates.image = image;

    await docRef.update(updates);

    return NextResponse.json({ id, ...doc.data(), ...updates });
  } catch (error: any) {
    console.error("PUT /api/posts error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE — remove a post
export async function DELETE(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    await db.collection(COLLECTION).doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/posts error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
