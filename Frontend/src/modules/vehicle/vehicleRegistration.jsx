import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  ChevronDown,
  User,
  Phone,
  Hash,
  Fuel,
  Gauge,
  BatteryCharging,
  ArrowLeft,
  Check,
} from "lucide-react";

const VEHICLE_TYPES = ["2-Wheeler", "3-Wheeler", "4-Wheeler", "Commercial"];
const BRANDS = ["Tata", "Mahindra", "Hyundai", "MG", "Ather", "Ola Electric", "Other"];
const POPULAR_MODELS = [
  "Tata Nexon EV",
  "Tata Punch EV",
  "Tata Tiago EV",
  "Mahindra XUV400",
  "MG ZS EV",
  "Ather 450X",
  "Ola S1 Pro",
  "Other",
];
const FUEL_TYPES = ["Electric", "Hybrid"];
const CONNECTOR_TYPES = ["Type 2 (AC)", "CCS2 (DC)", "CHAdeMO", "GB/T"];

export default function VehicleRegistration({ onSuccess, onCancel, hasRegisteredVehicle = false }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    vehicleType: "",
    brand: "",
    model: "",
    customModel: "",
    regNumber: "",
    fuelType: "",
    connector: "",
    batteryCapacity: "",
    ownerName: "",
    mobile: "",
  });

  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError(""); // Clear error on edit
  };

  // SMART BACK BUTTON HANDLER
  const handleBackToVehicleProfile = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    // Check if vehicle exists (Props ya LocalStorage ke trough)
    if (!hasRegisteredVehicle) {
      alert("No vehicle registered yet! Please fill in the details and save your vehicle first.");
    } else {
      navigate("/vehicles");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Strict Validation: Ek bhi field khali hui toh submit nahi hoga
    if (
      !form.vehicleType ||
      !form.brand ||
      !form.model ||
      !form.regNumber ||
      !form.fuelType ||
      !form.connector ||
      !form.batteryCapacity ||
      !form.ownerName ||
      !form.mobile
    ) {
      setError("Please fill in all details before registering.");
      return;
    }

    if (form.model === "Other" && !form.customModel) {
      setError("Please enter your custom vehicle model name.");
      return;
    }

    if (form.mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Success - Pass data back to Parent Component
    const finalVehicle = {
      id: Date.now(),
      ...form,
      model: form.model === "Other" ? form.customModel : form.model,
    };

    if (onSuccess) {
      onSuccess(finalVehicle);
    } else {
      navigate("/vehicles");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-black px-4 py-6 max-w-md mx-auto">
      {/* Top Back Button (UPDATED NAME & ALERT HANDLER) */}
      <button
        type="button"
        onClick={handleBackToVehicleProfile}
        className="flex items-center gap-1.5 text-xs font-semibold text-black/60 hover:text-black mb-4 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Vehicle Profile
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Vehicle Registration</h1>
        <p className="text-black/50 text-xs mt-1">
          Enter your vehicle information to create a new profile.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-black/40">
            Vehicle Details
          </p>
          <Dropdown
            icon={Car}
            label="Vehicle Type *"
            value={form.vehicleType}
            options={VEHICLE_TYPES}
            onChange={(v) => update("vehicleType", v)}
            placeholder="Select type"
          />
          <Dropdown
            icon={Car}
            label="Brand *"
            value={form.brand}
            options={BRANDS}
            onChange={(v) => update("brand", v)}
            placeholder="Select brand"
          />
          <Dropdown
            icon={Car}
            label="Model *"
            value={form.model}
            options={POPULAR_MODELS}
            onChange={(v) => update("model", v)}
            placeholder="Select model"
          />

          {form.model === "Other" && (
            <TextField
              icon={Car}
              label="Specify Model Name *"
              value={form.customModel}
              onChange={(v) => update("customModel", v)}
              placeholder="e.g. Nexon Max"
            />
          )}

          <TextField
            icon={Hash}
            label="Registration Number *"
            value={form.regNumber}
            onChange={(v) => update("regNumber", v.toUpperCase())}
            placeholder="e.g. UP15 AB 1234"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-black/40">
            Power & Battery
          </p>
          <Dropdown
            icon={Fuel}
            label="Fuel Type *"
            value={form.fuelType}
            options={FUEL_TYPES}
            onChange={(v) => update("fuelType", v)}
            placeholder="Select fuel type"
          />
          <Dropdown
            icon={Gauge}
            label="Connector Type *"
            value={form.connector}
            options={CONNECTOR_TYPES}
            onChange={(v) => update("connector", v)}
            placeholder="Select connector"
          />
          <TextField
            icon={BatteryCharging}
            label="Battery Capacity (kWh) *"
            value={form.batteryCapacity}
            onChange={(v) => update("batteryCapacity", v)}
            placeholder="e.g. 40.5"
            inputMode="decimal"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-black/40">
            Owner Info
          </p>
          <TextField
            icon={User}
            label="Owner Name *"
            value={form.ownerName}
            onChange={(v) => update("ownerName", v)}
            placeholder="Full Name"
          />
          <TextField
            icon={Phone}
            label="Mobile Number *"
            value={form.mobile}
            onChange={(v) => update("mobile", v)}
            placeholder="10-digit Mobile Number"
            inputMode="numeric"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-black text-white py-3.5 text-sm font-semibold hover:bg-[#B4FF39] hover:text-black transition-all duration-200 shadow-sm"
        >
          Save & Create Profile
        </button>
      </form>
    </div>
  );
}

// Reusable Form Controls
function TextField({ icon: Icon, label, value, onChange, placeholder, inputMode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-black/80">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-black/15 px-3.5 py-2.5 focus-within:border-black bg-slate-50/50">
        <Icon size={16} className="text-black/40 shrink-0" />
        <input
          type="text"
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-black/30"
        />
      </div>
    </label>
  );
}

function Dropdown({ icon: Icon, label, value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1 relative">
      <span className="text-xs font-semibold text-black/80">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-black/15 px-3.5 py-2.5 text-left bg-slate-50/50"
      >
        <Icon size={16} className="text-black/40 shrink-0" />
        <span className={`flex-1 text-sm ${value ? "text-black" : "text-black/30"}`}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`text-black/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 right-0 z-30 rounded-xl border border-black/10 bg-white shadow-xl max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-left hover:bg-black/5"
            >
              {opt}
              {opt === value && <Check size={14} className="text-black" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}