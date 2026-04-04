import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jamie2026magic";

export async function POST(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await req.json();

    if (!data) {
      return NextResponse.json(
        { error: "No image data provided" },
        { status: 400 }
      );
    }

    // Upload base64 image to Cloudinary
    const result = await cloudinary.uploader.upload(data, {
      folder: "jamie-blog",
      resource_type: "image",
      transformation: [
        { width: 1200, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    return NextResponse.json(
      { url: result.secure_url },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
