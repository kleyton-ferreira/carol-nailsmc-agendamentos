"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { createPortal } from "react-dom";
import { AuthOverlay } from "./auth-loading-overlay";
import LoginGoogle from "./login-google";
import { useState } from "react";

interface LoginDialogProps {
  loginOpen?: boolean;
  setLoginOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginDialog = ({ loginOpen, setLoginOpen }: LoginDialogProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <>
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-[90vw] overflow-y-auto rounded-lg p-4 sm:max-w-md sm:p-6 md:max-w-lg [&>button.absolute]:right-2 [&>button.absolute]:top-1 sm:[&>button.absolute]:right-3 sm:[&>button.absolute]:top-2">
          <DialogHeader className="space-y-1 sm:text-left">
            <DialogTitle className="text-left text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
              Faça seu login!
            </DialogTitle>
            <DialogDescription className="text-left text-sm sm:text-base">
              Conecte-se usando sua conta do Google
            </DialogDescription>
          </DialogHeader>

          {/* BUTTON - GOOGLE */}
          <LoginGoogle setIsLoggingIn={setIsLoggingIn} />
        </DialogContent>
      </Dialog>

      {isLoggingIn &&
        typeof document !== "undefined" &&
        createPortal(<AuthOverlay />, document.body)}
    </>
  );
};

export default LoginDialog;
