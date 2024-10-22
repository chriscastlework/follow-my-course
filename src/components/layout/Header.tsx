import Link from "next/link";
import Image from "next/image";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { useServerUser } from "@/serverHooks/useServerUser";
import { Menu } from "lucide-react";

async function Header() {
  const user = await useServerUser();

  return (
    <header className="bg-gradient-to-r from-purple-400 to-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Site Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <span className="ml-2 text-lg md:text-xl font-bold text-white">
              Follow my course
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-4">
              {user ? (
                <>
                  <li>
                    <Link
                      href="/update-profile"
                      className="flex items-center text-white hover:text-purple-200 transition-colors"
                    >
                      <Image
                        src={user.image || "/default-avatar.png"}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                      <span className="hidden lg:inline">{user.name}</span>
                    </Link>
                  </li>
                  <li>
                    <LogoutLink className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors">
                      Log out
                    </LogoutLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <LoginLink className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors">
                      Log in
                    </LoginLink>
                  </li>
                  <li>
                    <RegisterLink className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors">
                      Sign up
                    </RegisterLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="md:hidden">
            <button className="text-white p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
