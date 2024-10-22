"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
async function getUser() {
  console.log("getUser");
  const { user } = useKindeBrowserClient();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    console.log("calling api");
    const response = await fetch(`/api/user?id=${user.id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    console.log("response ok");
    const data = await response.json();

    console.log("data", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export default getUser;
