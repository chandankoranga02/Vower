import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Plus,
  BatteryCharging,
  Gauge,
  Palette,
  Fuel,
  User,
  Phone,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

/**
 * MOCK DATA: Initial vehicles array
 * In production, replace this state with API / Redux state management
 */
const INITIAL_VEHICLES = [
  {
    id: 1,
    vehicleType: "4-Wheeler",
    brand: "Tata",
    model: "Nexon EV",
    regNumber: "UP15 AB 1234",
    fuelType: "Electric",
    connector: "CCS2 (DC)",
    batteryCapacity: "40.5",
    color: "White",
    ownerName: "Rahul Sharma",
    mobile: "9876543210",
    registrationDate: "10 May 2026",
    status: "Verified & Active",
    imageUrl:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=60",
  },
];

export default function VehicleProfilePage() {
  const navigate = useNavigate();

  // Selected vehicle state for toggling between List View and Detail View
  const [vehicles] = useState(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // VIEW 1: FULL VEHICLE DETAILS
  if (selectedVehicle) {
    return (
      <VehicleDetailView
        vehicle={selectedVehicle}
        onBack={() => setSelectedVehicle(null)}
      />
    );
  }

  // VIEW 2: VEHICLES SUMMARY LIST
  return (
    <div className="w-full min-h-screen bg-slate-50 text-black">
      <main className="px-4 py-6 max-w-md w-full mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold tracking-tight">Vehicle Profile</h1>
          <p className="text-black/50 text-xs mt-0.5">
            Click on any card to view complete specifications
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/vehicle-registration")}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-black text-white py-3.5 text-sm font-semibold hover:bg-[#B4FF39] hover:text-black transition-all duration-200 shadow-sm mb-6"
        >
          <Plus size={18} />
          Add New Vehicle
        </button>

        {/* Vehicles List / Empty State */}
        {vehicles.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4 pb-12">
            {vehicles.map((vehicle) => (
              <VehicleSummaryCard
                key={vehicle.id}
                vehicle={vehicle}
                onClick={() => setSelectedVehicle(vehicle)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ==========================================================================
   COMPONENT 1: VEHICLE SUMMARY CARD
   ========================================================================== */
function VehicleSummaryCard({ vehicle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm cursor-pointer hover:border-black/30 transition-all duration-200 active:scale-[0.99]"
    >
      {/* Card Header */}
      <div className="bg-black text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#B4FF39]/20 flex items-center justify-center">
            <Car size={20} className="text-[#B4FF39]" />
          </div>
          <div>
            <h3 className="text-base font-bold leading-tight">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-xs text-white/60 font-medium mt-0.5">
              {vehicle.regNumber}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-[#B4FF39] px-2.5 py-1 rounded-md">
          {vehicle.vehicleType}
        </span>
      </div>

      {/* Grid Specs */}
      <div className="p-4 grid grid-cols-2 gap-3 text-xs">
        <DetailItem icon={Fuel} label="Fuel Type" value={vehicle.fuelType} />
        <DetailItem icon={Gauge} label="Connector" value={vehicle.connector} />
        <DetailItem
          icon={BatteryCharging}
          label="Battery"
          value={`${vehicle.batteryCapacity} kWh`}
        />
        <DetailItem icon={User} label="Owner" value={vehicle.ownerName} />
      </div>

      {/* Footer Action Hint */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-black/60">
        <span>Tap to view full details</span>
        <ChevronRight size={16} />
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPONENT 2: FULL VEHICLE DETAIL VIEW (WITH PHOTO & EXTRA INFO)
   ========================================================================== */
function VehicleDetailView({ vehicle, onBack }) {
  return (
    <div className="w-full min-h-screen bg-white text-black">
      <main className="px-4 py-6 max-w-md w-full mx-auto">
        {/* Navigation Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-black/70 hover:text-black mb-4 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to Vehicles
        </button>

        {/* Vehicle Image Space */}
        <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-100 border border-black/10 mb-5 shadow-sm">
          {vehicle.imageUrl ? (
            <img
              src={vehicle.imageUrl}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-black/30 bg-slate-100">
              <Car size={48} />
              <span className="text-xs font-semibold mt-2">No Image Uploaded</span>
            </div>
          )}

          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#B4FF39] px-2.5 py-1 rounded-md">
            {vehicle.vehicleType}
          </span>
        </div>

        {/* Title Block */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            {vehicle.brand} {vehicle.model}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-black text-white px-2.5 py-0.5 rounded text-xs font-mono font-bold">
              {vehicle.regNumber}
            </span>
            <span className="text-xs text-black/50 font-semibold">• Active Profile</span>
          </div>
        </div>

        {/* Categorized Details Grid */}
        <div className="flex flex-col gap-4 pb-12">
          {/* SECTION 1: Technical Specs */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-black/5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-black/40 mb-3 flex items-center gap-1.5">
              <Gauge size={14} /> Technical Specifications
            </p>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem icon={Fuel} label="Fuel Type" value={vehicle.fuelType} />
              <DetailItem icon={Gauge} label="Connector Type" value={vehicle.connector} />
              <DetailItem
                icon={BatteryCharging}
                label="Battery Capacity"
                value={`${vehicle.batteryCapacity} kWh`}
              />
              <DetailItem icon={Palette} label="Vehicle Color" value={vehicle.color || "N/A"} />
            </div>
          </div>

          {/* SECTION 2: Owner Information */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-black/5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-black/40 mb-3 flex items-center gap-1.5">
              <User size={14} /> Owner Details
            </p>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem icon={User} label="Owner Name" value={vehicle.ownerName} />
              <DetailItem icon={Phone} label="Mobile Number" value={vehicle.mobile} />
            </div>
          </div>

          {/* SECTION 3: Registration & Verification (Fills remaining mobile space) */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-black/5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-black/40 mb-3 flex items-center gap-1.5">
              <ShieldCheck size={14} /> Additional Record Information
            </p>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem
                icon={Calendar}
                label="Registration Date"
                value={vehicle.registrationDate || "N/A"}
              />
              <DetailItem
                icon={ShieldCheck}
                label="Status"
                value={vehicle.status || "Verified"}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ==========================================================================
   HELPER SUB-COMPONENTS
   ========================================================================== */

/** Single detail item layout */
function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <div className="p-1.5 rounded-lg bg-black/5 text-black/50 shrink-0 mt-0.5">
        <Icon size={14} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-black/40 font-medium leading-none">{label}</p>
        <p className="text-xs font-bold mt-1 text-black/90 truncate">{value}</p>
      </div>
    </div>
  );
}

/** Displayed when vehicles array is empty */
function EmptyState() {
  return (
    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-black/15 p-6">
      <Car size={32} className="mx-auto text-black/30 mb-2" />
      <p className="font-semibold text-sm">No vehicles registered</p>
      <p className="text-xs text-black/50 mt-1">
        Click above to add your first EV details.
      </p>
    </div>
  );
}