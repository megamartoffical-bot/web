import type React from "react";
import Link from "next/link";
import { Home, Heart } from "lucide-react";
import MobileMenu from "../modules/Navbar/MobileMenu";

export default function SmallNavbar({ showSidebar }: { showSidebar?: any }) {
  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-4 inset-x-4 z-50 rounded-full shadow-lg">
      <div className="flex items-center justify-around py-2">
        <NavItem icon={Home} label="Home" href="/" isActive />
        <NavItem icon={Heart} label="Wishlist" href="/dashboard/wishlistItems" />
        {!showSidebar &&
          <div className="flex-shrink-0">
            <MobileMenu />
          </div>
        }

      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  isActive?: boolean;
}

function NavItem({ icon: Icon, label, href, isActive = false }: NavItemProps) {
  return (
    <Link href={href}>
      <div
        className={`flex flex-col items-center justify-center gap-1 p-3 transition-all duration-200 ${isActive
            ? "text-white bg-black rounded-full shadow-md scale-110"
            : "text-gray-500 hover:text-orange-500 hover:scale-105"
          }`}
      >
        <Icon className="w-5 h-5" />
        {/* <span className="text-xs font-semibold">{label}</span> */}
      </div>
    </Link>
  );
}
