import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/appWriteConfig";
import { ID } from "node-appwrite";
export async function GET(req: NextRequest) {
  const urlObj = new URL(req.url!);
  const searchParams = urlObj.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "User ID is required" });
  }

  // Fetch the user from the database
  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" });
  }

  // Return the user data
  return NextResponse.json(existingUser);
}

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   console.log(body);

//   const result = await users.create(
//     ID.unique(), // userId
//     "email@example.com", // email (optional)
//     "+12065550100", // phone (optional)
//     "something*123", // password (optional)
//     "Chris" // name (optional)
//   );

//   return NextResponse.json({ message: "User created" });
// }

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const file = formData.get("file") as File;

    console.log(name, file);
    console.log(typeof name, typeof file);

    if (!name || !file) {
      return NextResponse.json(
        { error: "Name and file are required" },
        { status: 400 }
      );
    }

    // Generate a unique ID for the file
    const fileId = ID.unique();
    const fileName = `${fileId}-${file.name}`;

    // Upload the file to AppWrite storage
    const uploadedFile = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID!, // Make sure to set this in your .env file
      fileId,
      file
    );

    // Here you can save additional information to your database if needed
    // For example, you might want to save the user's name and the file details

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        fileId: uploadedFile.$id,
        fileName: fileName,
        name: name,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
