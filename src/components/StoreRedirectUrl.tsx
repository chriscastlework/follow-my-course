"use client";

import { useEffect } from "react";

export default function StoreRedirectUrl({
  redirectUrl,
}: {
  redirectUrl: string;
}) {
  useEffect(() => {
    localStorage.setItem("redirectUrl", redirectUrl);
  }, [redirectUrl]);

  return null;
}
