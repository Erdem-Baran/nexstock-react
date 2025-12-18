import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  X,
  FileArchive,
} from "lucide-react";
import { cn } from "../../lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: FileArchive, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

// Props tip definition (for TypeScript)
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* BACKGROUND DARKENING FOR MOBILE (OVERLAY) */}
      {/* Only visible on mobile and when the menu is open. Clicking closes the menu. */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden",
          isOpen ? "opacity-100 block" : "opacity-0 hidden pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <aside
        className={cn(
          // Basic styles + Fixed position for mobile + Sliding effect
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col h-full",
          // Always visible on the desktop (md) and takes up space (relative)
          "md:relative md:translate-x-0",
          // Slides in or out depending on the situation on mobile
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">NexStock</h1>
          {/* Close button in the top right corner on mobile */}
          <button 
            onClick={onClose} 
            className="md:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  onClick={onClose} // Close the menu on mobile when you click the link
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Lower Section - Exit */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}