"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
// import { signIn } from "next-auth/react";

interface LoginDialogProps {
  loginOpen?: boolean;
  setLoginOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginDialog = ({ loginOpen, setLoginOpen }: LoginDialogProps) => {
  //   const handleLoginGoogleClick = async () => {
  //     await signIn("google");
  //   };

  return (
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

        {/* <Button className="w-full gap-2 font-bold" onClick={handleLoginGoogleClick}> */}
        <Button
          className="h-10 w-full gap-2 text-sm font-bold sm:h-11 sm:text-base"
          variant="secondary"
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
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
