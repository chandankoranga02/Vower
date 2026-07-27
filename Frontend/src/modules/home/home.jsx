import React, { useState } from "react";
import {
  Wallet,
  LifeBuoy,
  LayoutGrid,
  MapPin,
  History,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Plug,
  BatteryCharging,
  Car,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  Sliders,
} from "lucide-react";

// ------------------------------------------------------------------
// NAV CONFIGURATION WITH ROUTES
// ------------------------------------------------------------------
const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: LayoutGrid, route: "/overview" },
  { key: "stations", label: "Find Stations", icon: MapPin, route: "/stations" },
  { key: "sessions", label: "Charging History", icon: History, route: "/sessions" },
  { key: "support", label: "Support", icon: LifeBuoy, route: "/support" },
  { key: "settings", label: "Settings", icon: Settings, route: "/settings" },
];

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("overview");

  // Router handler
  const handleNavigate = (routeKey, path) => {
    setActiveItem(routeKey);
    setMobileMenuOpen(false);
    console.log(`Navigating to: ${path}`);
  };

  return (
    <div className="flex h-screen w-full bg-neutral-100 text-black overflow-hidden font-sans">
      
      {/* ========================================================= */}
      {/* 1. MOBILE BACKDROP OVERLAY                                */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ========================================================= */}
      {/* 2. SIDEBAR (Responsive Mobile Drawer + Desktop Sidebar)    */}
      {/* ========================================================= */}
      <aside
        className={`fixed md:relative z-50 h-full flex flex-col justify-between border-r border-black/10 bg-black text-white transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0 w-[260px]" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "md:w-[76px]" : "md:w-[240px]"}`}
      >
        <div>
          {/* BRAND HEADER */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-white/10 border border-white/20">
                <img
                  src="/logo.jpeg"
                  alt="Vower Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              
              {(!collapsed || mobileMenuOpen) && (
                <span className="font-bold text-lg tracking-wider text-white uppercase">
                  Vower
                </span>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-2 text-white/70 hover:text-white cursor-pointer active:scale-95"
            >
              <X size={22} />
            </button>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="mt-4 flex flex-col gap-1.5 px-2">
            {NAV_ITEMS.map(({ key, label, icon: Icon, route }) => {
              const isActive = activeItem === key;
              return (
                <button
                  key={key}
                  onClick={() => handleNavigate(key, route)}
                  className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 md:py-2.5 text-sm transition-all duration-150 cursor-pointer active:scale-98 ${
                    isActive
                      ? "bg-white text-black font-semibold"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  title={collapsed ? label : undefined}
                >
                  <Icon
                    className={`w-5 h-5 md:w-4.5 md:h-4.5 shrink-0 ${
                      isActive ? "text-black" : "text-white/70 group-hover:text-[#B4FF39]"
                    }`}
                  />
                  {(!collapsed || mobileMenuOpen) && (
                    <span className="whitespace-nowrap">{label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* DESKTOP COLLAPSE TOGGLE */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden md:flex mx-2 mb-4 items-center justify-center gap-2 rounded-xl border border-white/15 py-2 text-white/70 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-xs font-medium">Collapse</span>}
        </button>
      </aside>

      {/* ========================================================= */}
      {/* 3. MAIN CONTENT AREA                                      */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* TOP BAR - FULLY MOBILE OPTIMIZED (Safe Breakpoints) */}
        <header className="h-16 flex items-center justify-between px-3 sm:px-6 border-b border-black/10 bg-white shrink-0 relative z-30">
          
          {/* LEFT: MOBILE TOGGLE & WALLET */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl hover:bg-black/5 text-black cursor-pointer active:scale-95 shrink-0"
            >
              <Menu size={22} />
            </button>

            {/* Wallet Button */}
            <button 
              onClick={() => handleNavigate("wallet", "/wallet")}
              className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-black text-white px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium hover:bg-[#B4FF39] hover:text-black transition-colors cursor-pointer active:scale-95 shrink-0"
            >
              <Wallet size={14} className="shrink-0" />
              <span className="hidden min-[380px]:inline">Wallet</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap">
                ₹1,240
              </span>
            </button>
          </div>

          {/* RIGHT: NOTIFICATIONS & PROFILE DROPDOWN */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button 
              onClick={() => handleNavigate("notifications", "/notifications")}
              className="relative p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer active:scale-95 shrink-0"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2F6FED]" />
            </button>

            {/* Profile Dropdown Container */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 rounded-full border border-black/15 p-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium hover:border-black/40 transition-colors cursor-pointer active:scale-95 shrink-0"
              >
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                  U
                </div>
                <span className="text-black font-semibold text-xs hidden sm:inline">
                  My Profile
                </span>
                <ChevronDown size={14} className="text-black/50 hidden sm:inline" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setProfileDropdownOpen(false)} 
                  />
                  
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-black/10 shadow-xl py-2 z-50">
                    <button 
                      onClick={() => { setProfileDropdownOpen(false); handleNavigate("profile", "/profile"); }}
                      className="w-full px-4 py-2.5 text-left text-xs sm:text-sm flex items-center gap-2.5 hover:bg-neutral-100 cursor-pointer"
                    >
                      <User size={16} /> Profile Details
                    </button>
                    <button 
                      onClick={() => { setProfileDropdownOpen(false); handleNavigate("settings", "/settings"); }}
                      className="w-full px-4 py-2.5 text-left text-xs sm:text-sm flex items-center gap-2.5 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Sliders size={16} /> Preferences
                    </button>
                    <hr className="my-1 border-black/10" />
                    <button 
                      onClick={() => { setProfileDropdownOpen(false); console.log("Logging out..."); }}
                      className="w-full px-4 py-2.5 text-left text-xs sm:text-sm flex items-center gap-2.5 hover:bg-red-50 text-red-600 cursor-pointer"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY (Scrollable Area) */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 bg-white space-y-5 sm:space-y-6">
          
          {/* HERO BANNER - COMPACT ON MOBILE */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 shadow-sm min-h-[170px] sm:min-h-[240px] flex items-end">
            <img 
              src="https://images.hindustantimes.com/auto/img/2024/09/09/1600x900/World_EV_Day_1725852183267_1725852184506.png" 
              alt="EV Banner" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 p-4 sm:p-6 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-white">
              <div>
                <span className="inline-flex items-center gap-1 bg-[#B4FF39] text-black font-bold px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs mb-1.5">
                  <BatteryCharging size={12} />
                  82% Battery • Ready
                </span>
                
                <h1 className="text-xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                  Powering Every Promise
                </h1>
                
                <p className="text-white/80 text-xs sm:text-sm mt-0.5">
                  Estimated Range: <span className="font-semibold text-white">410 km</span>
                </p>
              </div>

              <button 
                onClick={() => handleNavigate("vehicles", "/vehicles")}
                className="w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-white text-black hover:bg-[#B4FF39] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer active:scale-98"
              >
                <Car size={15} />
                <span>Vehicle Details</span>
              </button>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-black mb-2.5">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              <QuickAction 
                icon={Plug} 
                label="Start Charging" 
                accent="#B4FF39" 
                onClick={() => handleNavigate("charging", "/charging/start")} 
              />
              <QuickAction 
                icon={User} 
                label="My Profile" 
                accent="#B4FF39" 
                onClick={() => handleNavigate("profile", "/profile")} 
              />
              <QuickAction 
                icon={Car} 
                label="My Vehicles" 
                accent="#2F6FED" 
                onClick={() => handleNavigate("vehicles", "/vehicles")} 
              />
              <QuickAction 
                icon={History} 
                label="Sessions" 
                accent="#2F6FED" 
                onClick={() => handleNavigate("sessions", "/sessions")} 
              />
            </div>
          </div>

          {/* OVERVIEW STATS */}
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-black mb-2.5">Overview Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
              <StatCard title="Active Session" value="None" hint="Plug in to start" />
              <StatCard title="This Month" value="42.6 kWh" hint="↑ 12% vs last month" />
              <StatCard title="Wallet Balance" value="₹1,240" hint="Auto top-up: off" />
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// HELPER COMPONENTS
// ------------------------------------------------------------------
function QuickAction({ icon: Icon, label, accent, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-start gap-2.5 rounded-2xl border border-black/10 p-3 sm:p-4 text-left hover:border-black/30 transition-all cursor-pointer bg-white active:scale-98 active:bg-neutral-50"
    >
      <div
        className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accent}20` }}
      >
        <Icon size={16} style={{ color: accent === "#B4FF39" ? "#4CA600" : accent }} />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-black/80">{label}</span>
    </button>
  );
}

function StatCard({ title, value, hint }) {
  return (
    <div className="rounded-2xl border border-black/10 p-3.5 sm:p-5 hover:border-black/20 transition-colors bg-white">
      <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-black/40">{title}</p>
      <p className="text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 text-black">{value}</p>
      <p className="text-[11px] sm:text-xs text-black/50 mt-0.5 font-medium">{hint}</p>
    </div>
  );
}