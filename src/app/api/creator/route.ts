import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getCreatorDataByHandle } from "@/lib/data/user";

export async function GET(req: NextRequest) {
  console.log("GET USER request received");
  const urlObj = new URL(req.url!);
  const searchParams = urlObj.searchParams;
  const handle = searchParams.get("handle");
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { message: "User must be authenticated" },
      { status: 401 }
    );
  }

  if (!handle) {
    return NextResponse.json(
      { message: "no handel provided" },
      { status: 400 }
    );
  }

  try {
    const existingUser = await getCreatorDataByHandle(handle);

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
