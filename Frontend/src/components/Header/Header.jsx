import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Sliders,
  Menu,
  X
} from "lucide-react";
import logoImage from "/logo.jpeg";

const Header = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("overview");
  const navigate = useNavigate();

  const handleNavigate = (routeKey, path) => {
    setActiveItem(routeKey);
    setProfileDropdownOpen(false);
    setDesktopSidebarOpen(false);
    navigate(path);
  };

const logouthandler = async () => {
  try {
    const response = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.msg);

      alert("logout successfully")
      window.location.href = "/login";
    } else {
      console.error(data.msg);
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  const desktopMenuLinks = [
    { id: 1, label: "Admin Dashboard", path: "/coming-soon" },
    { id: 2, label: "Analytics & Reports", path: "/coming-soon" },
    { id: 3, label: "Team Management", path: "/coming-soon" },
    { id: 4, label: "Billing & Invoices", path: "/coming-soon" },
  ];

  return (
    <header className="h-16 w-full border-b border-black/10 bg-white shrink-0 relative z-30">
      
      {/* ========================================== */}
      {/* MOBILE LAYOUT (Hidden on Desktop)          */}
      {/* ========================================== */}
      <div className="flex h-full w-full items-center justify-between px-3 sm:px-6 md:hidden">
        
        <div className="flex items-center gap-2 sm:gap-4">
          <img 
            src="/logo.jpeg" 
            alt="Header Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover shrink-0 bg-neutral-100"
          />
          <button 
            onClick={() => handleNavigate("wallet", "/coming-soon")}
            className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-black text-white px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium hover:bg-[#B4FF39] hover:text-black transition-colors"
          >
            <Wallet size={14} className="shrink-0" />
            <span className="hidden min-[380px]:inline">Wallet</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button 
            onClick={() => handleNavigate("notifications", "/coming-soon")}
            className="relative p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2F6FED]" />
          </button>

          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1.5 rounded-full border border-black/15 p-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium hover:border-black/40 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">U</div>
              <ChevronDown size={14} className="text-black/50 hidden sm:inline" />
            </button>
            
            {profileDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-black/10 shadow-xl py-2 z-50 overflow-hidden">
                  <button onClick={() => handleNavigate("profile", "/profile")} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 hover:bg-neutral-100">
                    <User size={16} /> Profile Details
                  </button>
                  <button onClick={() => handleNavigate("settings", "/coming-soon")} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 hover:bg-neutral-100">
                    <Sliders size={16} /> Preferences
                  </button>
                  <hr className="my-1 border-black/10" />
                  <button onClick={() => { logouthandler() }} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 hover:bg-red-50 text-red-600">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* DESKTOP LAYOUT (Hidden on Mobile)          */}
      {/* ========================================== */}
      <div className="hidden md:flex h-full w-full items-center justify-between px-8">
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setDesktopSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-black/5 transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-3">
             <img src="/logo.jpeg" alt="Brand" className="w-8 h-8 rounded object-cover" />
             <span className="font-bold text-lg tracking-tight">Vower</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <button onClick={() => handleNavigate("wallet", "/coming-soon")} className="font-medium text-sm hover:opacity-70">Wallet</button>
           <button onClick={() => handleNavigate("notifications", "/coming-soon")} className="font-medium text-sm hover:opacity-70">Notifications</button>
           
           {/* Fix: Desktop Profile Dropdown properly implemented here */}
           <div className="relative">
             <button 
               onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
               className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold cursor-pointer active:scale-95 transition-transform"
             >
               U
             </button>

             {profileDropdownOpen && (
               <>
                 <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
                 <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-white border border-black/10 shadow-xl py-2 z-50 overflow-hidden">
                   <button onClick={() => handleNavigate("profile", "/profile")} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 hover:bg-neutral-100 transition-colors">
                     <User size={16} /> Profile Details
                   </button>
                   <button onClick={() => handleNavigate("settings", "/coming-soon")} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 hover:bg-neutral-100 transition-colors">
                     <Sliders size={16} /> Preferences
                   </button>
                   <hr className="my-1 border-black/10" />
                   <button onClick={() => { logouthandler() }} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 hover:bg-red-50 text-red-600 transition-colors">
                     <LogOut size={16} /> Logout
                   </button>
                 </div>
               </>
             )}
           </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* DESKTOP SIDEBAR (Slide-out)                */}
      {/* ========================================== */}
      {desktopSidebarOpen && (
        <div className="hidden md:block fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setDesktopSidebarOpen(false)} 
          />
          <div className="absolute top-0 left-0 w-80 h-screen bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <span className="font-bold text-xl">Menu</span>
              <button onClick={() => setDesktopSidebarOpen(false)} className="p-2 hover:bg-black/5 rounded-full text-black/60 hover:text-black">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {desktopMenuLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigate(link.label.toLowerCase(), link.path)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-neutral-100 font-medium text-black/80 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
