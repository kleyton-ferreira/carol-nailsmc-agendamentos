"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";

const SidebarLoading = () => {
  const { data, status } = useSession();
  const isLoading = status === "loading";

  const initials =
    data?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "U";

  // pt-10 = espaço entre a borda do header e o avatar (mobile)
  const wrapper =
    "mb-3 flex items-center gap-3 px-4 pb-1 pt-10 md:mb-8 md:gap-4 md:px-8 md:pb-0 md:pt-8";
  const avatarSize = "relative h-14 w-14 shrink-0 md:h-28 md:w-28";

  return (
    <>
      {isLoading ? (
        <div className={wrapper}>
          <div className={avatarSize}>
            <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-purple-200 border-t-purple-500 md:border-4" />
            <div className="absolute inset-2 animate-pulse rounded-full bg-white/60 md:inset-3" />
          </div>
          <div className="min-w-0 flex-1 space-y-1.5 md:space-y-2">
            <div className="h-3.5 w-28 animate-pulse rounded bg-white/70 md:h-4 md:w-32" />
            <div className="h-3 w-36 animate-pulse rounded bg-white/50 md:w-44" />
          </div>
        </div>
      ) : data?.user ? (
        <div className={wrapper}>
          <div className={avatarSize}>
            <div className="animate-rotate_border absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-gray-300" />
            <div className="absolute inset-[2px] overflow-hidden rounded-full bg-white md:inset-1">
              <Avatar className="h-full w-full">
                <AvatarImage
                  src={data.user.image ?? undefined}
                  alt={data.user.name ?? "Foto de perfil"}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="bg-purple-100 text-base font-semibold text-purple-700 md:text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold leading-tight text-slate-600 md:text-[15px]">
              {data.user.name}
            </h1>
            <p className="mt-0.5 truncate text-xs text-slate-500 md:mt-1">
              {data.user.email}
            </p>
          </div>
        </div>
      ) : (
        <h2 className="mb-0 px-4 pt-2 text-base font-bold md:px-8 md:pt-4"></h2>
      )}
    </>
  );
};

export default SidebarLoading;
