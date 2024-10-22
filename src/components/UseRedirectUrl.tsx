"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const UseRedirectUrl = (): React.ReactNode => {
  const router = useRouter();
  const { isAuthenticated } = useKindeBrowserClient();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
    const redirectUrl = localStorage.getItem("redirectUrl");
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      router.push("/discover");
    }
  }, [isAuthenticated]);

  return <></>;
};

export default UseRedirectUrl;
