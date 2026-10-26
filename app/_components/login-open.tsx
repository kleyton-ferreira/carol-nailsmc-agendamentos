"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import LoginDialog from "./login-dialog";

interface LoginOpenProps {
  isLoggedIn?: boolean;
}

const LoginOpen = ({ isLoggedIn = false }: LoginOpenProps) => {
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLogout = () => {
    // TODO: coloque aqui sua lógica de logout (ex: signOut())
  };

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

        {/* Mobile: sempre o botão de login, sem lógica de sessão */}
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

        {/* Desktop: alterna entre login e sair */}
        {isLoggedIn ? (
          <Button
            variant="outline"
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
        )}
      </div>

      <LoginDialog loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
    </>
  );
};

export default LoginOpen;
