"use client";

import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import SidebarButton from "./ui/sidebar-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Sidebar = () => {
  const { data, status } = useSession();
  const isLoading = status === "loading";

  const initials =
    data?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "U";

  return (
    <div
      className="hidden h-screen w-full flex-col shadow-lg md:flex md:w-[440px]"
      style={{
        background:
          "linear-gradient(-45deg, #bc91e4, #ebd8df, #f2ebfc, #D5F0E8)",
      }}
    >
      {isLoading ? (
        <div className="mb-6 flex items-center gap-4 px-6 pt-6 md:px-8 md:pt-8">
          <div className="relative h-24 w-24 shrink-0 md:h-28 md:w-28">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-purple-200 border-t-purple-500" />
            <div className="absolute inset-3 animate-pulse rounded-full bg-white/60" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-white/70" />
            <div className="h-3 w-44 animate-pulse rounded bg-white/50" />
          </div>
        </div>
      ) : data?.user ? (
        <div className="mb-6 flex items-center gap-4 px-6 pt-6 md:px-8 md:pt-8">
          <div className="relative h-24 w-24 shrink-0 md:h-28 md:w-28">
            <div className="animate-rotate_border absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-gray-300" />
            <div className="absolute inset-1 overflow-hidden rounded-full bg-white">
              <Avatar className="h-full w-full">
                <AvatarImage
                  src={data.user.image ?? undefined}
                  alt={data.user.name ?? "Foto de perfil"}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="bg-purple-100 text-2xl font-semibold text-purple-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-slate-600 md:text-[15px]">
              {data.user.name}
            </h1>
            <p className="mt-1 truncate text-xs text-slate-500">
              {data.user.email}
            </p>
          </div>
        </div>
      ) : (
        <h2 className="mb-0 px-6 pt-2 text-base font-bold md:px-8 md:pt-4"></h2>
      )}

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 pb-2 pt-4 md:px-4">
        <SidebarButton href="/">
          <LayoutGridIcon size={18} /> Inicio
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon size={18} /> Clientes
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasketIcon size={18} /> Serviços
        </SidebarButton>
      </nav>
    </div>
  );
};

export default Sidebar;
