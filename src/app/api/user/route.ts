import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/appWriteConfig";
import { ID } from "node-appwrite";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getCurrentUser, getUserById } from "@/lib/data/user";

export async function GET(req: NextRequest) {
  console.log("GET USER request received");
  const urlObj = new URL(req.url!);
  const searchParams = urlObj.searchParams;
  const id = searchParams.get("id");
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);

  if (!user) {
    return NextResponse.json(
      { message: "User must be authenticated" },
      { status: 401 }
    );
  }

  try {
    let existingUser;
    if (!id) {
      existingUser = await getCurrentUser();
    } else {
      existingUser = await getUserById(id);
    }

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not with request id was not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(existingUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 500 }
    );
  }
}

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
