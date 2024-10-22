import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import test from "node:test";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const urlObj = new URL(req.url!);
    const searchParams = urlObj.searchParams;
    const testParam = searchParams.get("publicId");

    const signedUrl = cloudinary.url("sulttw3zmcomqzni4pzr", {
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 1,
    });
    return Response.json({ url: signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return Response.json({ message: "Failed to generate signed URL" });
  }
}

export const dynamic = "force-dynamic";
