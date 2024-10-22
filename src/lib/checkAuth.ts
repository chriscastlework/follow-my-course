import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

// Helper function
export const CheckAuth = async (currentUrl: string) => {

  console.log(currentUrl);

  const { isAuthenticated } = getKindeServerSession();
  const isLogged = await isAuthenticated();

  if (!isLogged) {
    // Redirect to login with the current URL as a query parameter
    redirect(`/api/auth/login?postLoginRedirectURL=${encodeURIComponent(currentUrl)}`);
  }
};
