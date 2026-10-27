"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import LoginDialog from "./login-dialog";

const LoginOpen = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  const handleLogout = () => signOut();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="hidden min-w-0 flex-col gap-1 md:flex">
          <h2 className="hidden text-base font-bold text-slate-800 md:block md:text-lg">
            Faturamentos & Atendimentos
          </h2>
          <p className="hidden text-sm text-slate-500 sm:block">
            Histórico de faturamentos e serviços
          </p>
        </div>

        {/* Mobile */}
        {!isLoading &&
          (isLoggedIn ? (
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent md:hidden"
              onClick={handleLogout}
            >
              Encerrar sessão!
              <LogOutIcon
                size={20}
                className="box-content rounded-md bg-purple-500 p-1.5 text-white"
              />
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent md:hidden"
              onClick={() => setLoginOpen(true)}
            >
              Faça seu login!
              <LogInIcon
                size={20}
                className="box-content rounded-md bg-purple-500 p-1.5 text-white"
              />
            </Button>
          ))}

        {/* Desktop */}
        {!isLoading &&
          (isLoggedIn ? (
            <Button
              variant="secondary"
              className="hidden md:inline-flex"
              onClick={handleLogout}
            >
              Encerrar sessão!
              <LogOutIcon />
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="hidden md:inline-flex"
              onClick={() => setLoginOpen(true)}
            >
              Faça seu login!
              <LogInIcon />
            </Button>
          ))}
      </div>

      <LoginDialog loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
    </>
  );
};

export default LoginOpen;
