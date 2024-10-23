"user client";

export async function clientGetUser() {
  try {
    const response = await fetch("/api/user");
    if (!response.ok) {
      return null;
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function clientGetCreator(handle: string) {
  try {
    const response = await fetch(`/api/creator?handle=${handle}`);
    if (!response.ok) {
      return null;
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
