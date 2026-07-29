import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Plus,
  BatteryCharging,
  Gauge,
  Palette,
  Hash,
  Fuel,
  User,
  Phone,
} from "lucide-react";

/**
 * SAMPLE INITIAL DATA
 * Replace this with actual API data from Backend / Redux / Context
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
  },
];

export default function VehicleProfilePage() {
  const navigate = useNavigate();
  
  // State for managing registered vehicles list
  const [vehicles] = useState(INITIAL_VEHICLES);

  return (
    <div className="w-full min-h-screen bg-slate-50 text-black">
      <main className="px-4 py-6 max-w-md w-full mx-auto">
        
        {/* PAGE HEADER */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold tracking-tight">Vehicle Profile</h1>
          <p className="text-black/50 text-xs mt-0.5">
            Details submitted during vehicle registration
          </p>
        </div>

        {/* ADD VEHICLE ACTION BUTTON */}
        <button
          onClick={() => navigate("/vehicle-registration")}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-black text-white py-3.5 text-sm font-semibold hover:bg-[#B4FF39] hover:text-black transition-all duration-200 shadow-sm mb-6"
        >
          <Plus size={18} />
          Add New Vehicle
        </button>

        {/* VEHICLES LIST SECTION */}
        {vehicles.length === 0 ? (
          /* Empty State when no vehicle is registered */
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-black/15 p-6">
            <Car size={32} className="mx-auto text-black/30 mb-2" />
            <p className="font-semibold text-sm">No vehicles registered</p>
            <p className="text-xs text-black/50 mt-1">
              Click above to add your first EV details.
            </p>
          </div>
        ) : (
          /* Clean vertical list for multiple vehicles with proper gap */
          <div className="flex flex-col gap-4 pb-12">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ------------------------------------------------------------------
// COMPONENT: Vehicle Card (Displays individual vehicle details)
// ------------------------------------------------------------------
function VehicleCard({ vehicle }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm">
      {/* Card Top Banner Header */}
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

      {/* Submitted Details Grid View */}
      <div className="p-4 grid grid-cols-2 gap-4 text-xs">
        <DetailItem icon={Fuel} label="Fuel Type" value={vehicle.fuelType} />
        <DetailItem icon={Gauge} label="Connector" value={vehicle.connector} />
        <DetailItem
          icon={BatteryCharging}
          label="Battery Capacity"
          value={`${vehicle.batteryCapacity} kWh`}
        />
        <DetailItem icon={Palette} label="Color" value={vehicle.color || "N/A"} />
        <DetailItem icon={User} label="Owner Name" value={vehicle.ownerName} />
        <DetailItem icon={Phone} label="Mobile" value={vehicle.mobile} />
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// HELPER COMPONENT: Single Detail Row
// ------------------------------------------------------------------
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