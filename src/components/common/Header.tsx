import { Bell, Search, User, Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar?: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sm:px-6 dark:bg-gray-900 dark:text-white">
      
      {/* --- LEFT SIDE: Menu Button + Search --- */}
      <div className="flex items-center gap-3 dark:bg-gray-900 dark:text-white">
        
        {/* 1. Hamburger Menu (Only visible on mobile: md:hidden) */}
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* 2. Search Bar (Input) */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200 dark:text-white" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition-all"
          />
        </div>
      </div>

      {/* --- RIGHT SIDE: Notifications + Profile --- */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* Notification Button */}
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-5 h-5" />
          {/* Notification Point */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-gray-200">
          
          {/* Name & Role (Hidden on mobile - hidden sm:block) */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">Manager</p>
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-300 transition-colors">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>
    </header>
  );
}