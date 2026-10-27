"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { AUTH_PENDING_KEY } from "./auth-loading-overlay";
import { Button } from "./ui/button";
import Image from "next/image";

export interface LoginGoogleProps {
  isLoggingIn?: boolean;
  setIsLoggingIn: (value: boolean) => void;
}

const LoginGoogle = ({ isLoggingIn, setIsLoggingIn }: LoginGoogleProps) => {
  const handleLoginGoogleClick = async () => {
    try {
      setIsLoggingIn(true);
      sessionStorage.setItem(AUTH_PENDING_KEY, "true");
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(AUTH_PENDING_KEY);
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        className="h-10 w-full gap-2 text-sm font-bold sm:h-11 sm:text-base"
        onClick={handleLoginGoogleClick}
        disabled={isLoggingIn}
      >
        <Image
          src="/google.svg"
          width={16}
          height={16}
          alt="Fazer login com o Google"
          className="h-4 w-4 sm:h-5 sm:w-5"
        />
        Google
      </Button>
    </>
  );
};

export default LoginGoogle;
