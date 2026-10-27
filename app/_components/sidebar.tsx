import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./ui/sidebar-button";

import SidebarLoading from "./sidebar-loading";

const Sidebar = () => {
  return (
    <div
      className="hidden h-screen w-full flex-col shadow-lg md:flex md:w-[440px]"
      style={{
        background:
          "linear-gradient(-45deg, #bc91e4, #ebd8df, #f2ebfc, #D5F0E8)",
      }}
    >
      {/* CONTA - GOOGLE - LOGGED IN */}
      <SidebarLoading />

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
