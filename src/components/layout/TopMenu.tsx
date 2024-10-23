"use client";

import Link from "next/link";
import AuthButtons from "../home/auth-screen/AuthButtons";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import MenuSvg from "@/assets/MenuSvg";
import { ModeToggle } from "../ModeToggle";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const navigation = [
  {
    title: "Discover",
    url: "/discover",
    onlyMobile: false,
    hash: "/discover",
  },
  {
    title: "Library",
    url: "/Library",
    onlyMobile: false,
    hash: "/Library",
  },
  {
    title: "Dashboard",
    url: "/secret-dashboard",
    onlyMobile: false,
  },
];

export default function TopMenu() {
  const [openNavigation, setOpenNavigation] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useKindeBrowserClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      console.log("fetching user");
      var thing = fetch("/api/user").then((res) => res.json());
      console.log("got user", thing);
      return thing;
    },
  });

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleClick = () => {
    if (!openNavigation) return;
    setOpenNavigation(false);
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="block w-[12rem] xl:mr-8" href="/">
          <Image
            src="/logo-sm.jpg"
            width={60}
            height={60}
            alt="Follow my course"
            className="rounded-full object-cover"
          />
        </Link>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item, key) => (
              <Link
                key={key}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </Link>
            ))}
            {isAuthenticated ? (
              <LogoutLink className="block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 lg:hidden lg:leading-5 lg:hover:text-n-1 xl:px-12 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold">
                Sign out
              </LogoutLink>
            ) : (
              <>
                <>
                  <RegisterLink className="block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 lg:hidden lg:leading-5 lg:hover:text-n-1 xl:px-12 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold">
                    Register
                  </RegisterLink>
                </>
                <>
                  <LoginLink className="block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 lg:hidden lg:leading-5 lg:hover:text-n-1 xl:px-12 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold">
                    Login
                  </LoginLink>
                </>
              </>
            )}
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <AuthButtons />
          <ModeToggle />
        </div>

        <Button className="ml-auto lg:hidden" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
}
