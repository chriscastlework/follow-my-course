import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function isAuthenticated() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  return { isLoggedIn };
}
