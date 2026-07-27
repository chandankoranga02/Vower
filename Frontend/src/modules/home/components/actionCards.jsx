import React from "react";

export default function QuickAction({ icon: Icon, label, accent, onClick, className = "", bgImage }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-3 rounded-3xl border p-4 text-center hover:shadow-md transition-all cursor-pointer overflow-hidden active:scale-95 ${
        bgImage ? "border-transparent" : "border-black/10 bg-white hover:border-black/30 active:bg-neutral-50"
      } ${className}`}
    >
      {/* Background Image & Gradient Overlay */}
      {bgImage && (
        <>
          <img 
            src={bgImage} 
            alt={label} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors" />
        </>
      )}

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Render Icon ONLY if there is no background image */}
        {!bgImage && Icon && (
          <div
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center shrink-0 mb-1"
            style={{ backgroundColor: `${accent}20` }}
          >
            <Icon size={24} style={{ color: accent === "#B4FF39" ? "#4CA600" : accent }} />
          </div>
        )}
        
        {/* Dynamic Text Color based on background presence */}
        <span className={`text-sm sm:text-base font-bold ${bgImage ? "text-white drop-shadow-md" : "text-black/80"}`}>
          {label}
        </span>
      </div>
    </button>
  );
}
