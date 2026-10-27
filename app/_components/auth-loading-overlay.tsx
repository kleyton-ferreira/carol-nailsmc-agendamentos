"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";

export const AUTH_PENDING_KEY = "auth-pending";

export const AuthOverlay = () => (
  <div
    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-black/50 backdrop-blur-sm"
    role="status"
    aria-live="polite"
  >
    <Loader2Icon size={48} className="animate-spin text-white" />
    <p className="flex animate-pulse items-center text-sm font-medium text-white">
      Conectando com o Google
      <span className="ml-0.5 flex">
        <span className="animate-bounce [animation-delay:-0.3s]">.</span>
        <span className="animate-bounce [animation-delay:-0.15s]">.</span>
        <span className="animate-bounce">.</span>
      </span>
    </p>
  </div>
);

// Fica no layout: mantém a tela escura ao voltar do Google até a sessão carregar
const AuthLoadingOverlay = () => {
  const { status } = useSession();
  const [pending, setPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Roda só na montagem (ou seja, ao voltar do Google)
  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(AUTH_PENDING_KEY) === "true") {
        setPending(true);
      }
    } catch {}
  }, []);

  // Quando a sessão terminar de carregar, tira o loading
  useEffect(() => {
    if (pending && status !== "loading") {
      try {
        sessionStorage.removeItem(AUTH_PENDING_KEY);
      } catch {}
      setPending(false);
    }
  }, [pending, status]);

  // Se o usuário voltar pelo botão "voltar" do navegador
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        try {
          sessionStorage.removeItem(AUTH_PENDING_KEY);
        } catch {}
        setPending(false);
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  if (!mounted || !pending) return null;
  return createPortal(<AuthOverlay />, document.body);
};

export default AuthLoadingOverlay;
