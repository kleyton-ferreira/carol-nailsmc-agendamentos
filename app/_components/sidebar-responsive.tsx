"use client";

import {
  LayoutGridIcon,
  PackageIcon,
  ShoppingBasketIcon,
  X,
} from "lucide-react";
import SidebarButton from "./ui/sidebar-button";
import LoginOpen from "./login-open";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onLoginClick?: () => void;
}

const SidebarResponsive = ({ isOpen = false, onClose }: SidebarProps) => {
  const { data } = useSession();

  const initials =
    data?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "U";

  return (
    <div>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-[320px] flex-col shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(-45deg, #bc91e4, #ebd8df, #f2ebfc, #D5F0E8)",
        }}
      >
        {/* Close Button */}
        <div className="group">
          <button
            onClick={onClose}
            className="absolute right-4 top-5 z-50 rounded-lg p-2 transition-colors duration-300 hover:bg-purple-500"
            aria-label="Fechar menu"
            type="button"
          >
            <X
              size={24}
              className="text-slate-700 transition-colors duration-300 group-hover:text-white"
            />
          </button>
        </div>

        {/* Mobile Profile Section */}
        <div
          className={`relative top-5 flex cursor-pointer items-center gap-3 px-6 pb-4 ${
            data?.user ? "border-b border-purple-500" : ""
          }`}
        >
          <LoginOpen />
        </div>

        {data?.user ? (
          <div className="mb-0 flex items-center gap-3 px-6 pt-8">
            <div className="relative h-20 w-20 shrink-0">
              <div className="animate-rotate_border absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-gray-300" />
              <div className="absolute inset-1 overflow-hidden rounded-full bg-white">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src={data.user.image ?? undefined}
                    alt={data.user.name ?? "Foto de perfil"}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback className="bg-purple-100 text-lg font-semibold text-purple-700">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm text-slate-600">
                {data.user.name}
              </h1>
              <p className="mt-1 truncate text-xs text-slate-500">
                {data.user.email}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Mobile Navigation */}
        <nav className="relative top-6 flex flex-1 flex-col gap-2 overflow-y-auto px-3 pb-6">
          <SidebarButton href="/" onClick={onClose}>
            <LayoutGridIcon size={18} /> Inicio
          </SidebarButton>

          <SidebarButton href="/products" onClick={onClose}>
            <PackageIcon size={18} /> Clientes
          </SidebarButton>

          <SidebarButton href="/sales" onClick={onClose}>
            <ShoppingBasketIcon size={18} /> Serviços
          </SidebarButton>
        </nav>
      </div>
    </div>
  );
};

export default SidebarResponsive;
