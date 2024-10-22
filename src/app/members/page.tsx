import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import BaseLayout from "@/components/layout/BaseLayout";

export default async function MembersPage() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login?postLoginRedirectURL=/members");
  }

  const user = await getUser();

  return (
    <BaseLayout>
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 flex flex-col items-center justify-center text-white p-8">
        <div className="max-w-4xl w-full bg-white bg-opacity-10 rounded-xl shadow-2xl p-8 backdrop-filter backdrop-blur-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Welcome to the Members Area, {user?.given_name}!
          </h1>
          <p className="text-xl mb-8 text-center">
            Here you can access exclusive content and manage your courses.
          </p>
          <div className="flex flex-col space-y-4">
            <Link
              href="/my-courses"
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors text-center"
            >
              My Courses
            </Link>
            <Link
              href="/browse-courses"
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors text-center"
            >
              Browse Courses
            </Link>
            <Link
              href="/profile"
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors text-center"
            >
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
