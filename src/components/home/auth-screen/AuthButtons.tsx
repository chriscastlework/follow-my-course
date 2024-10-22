"use client";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Suspense, useState } from "react";

const AuthButtons = () => {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <div className="flex">
      {!isAuthenticated ? (
        <>
          <RegisterLink className="flex-1" onClick={() => setLoading(true)}>
            <Button className="w-full" disabled={loading}>
              Sign up
            </Button>
          </RegisterLink>
          <LoginLink className="flex-1" onClick={() => setLoading(true)}>
            <Button className="w-full" disabled={loading}>
              Login
            </Button>
          </LoginLink>
        </>
      ) : (
        <LogoutLink className="flex-1" onClick={() => setLoading(true)}>
          <Button className="w-full" disabled={loading}>
            Log Out
          </Button>
        </LogoutLink>
      )}
    </div>
  );
};

const AuthButtonsWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthButtons />
    </Suspense>
  );
};

export default AuthButtonsWithSuspense;
