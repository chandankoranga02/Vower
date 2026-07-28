import React, { useState } from "react";
import {
  BatteryCharging,
  Car,
  ChevronDown,
  User,
  Phone,
  Hash,
  Fuel,
  Gauge,
  Check,
} from "lucide-react";

// ------------------------------------------------------------------
// Vehicle Registration Page — Mobile-first (Nested inside Layout)
// Theme: Clean light base, "volt" green (#B4FF39) accents
// ------------------------------------------------------------------

const VEHICLE_TYPES = ["2-Wheeler", "3-Wheeler", "4-Wheeler", "Commercial"];
const BRANDS = ["Tata", "Mahindra", "Hyundai", "MG", "Ather", "Ola Electric", "Other"];
const FUEL_TYPES = ["Electric", "Hybrid"];
const CONNECTOR_TYPES = ["Type 2 (AC)", "CCS2 (DC)", "CHAdeMO", "GB/T"];

export default function VehicleRegistration() {
  const [form, setForm] = useState({
    vehicleType: "",
    brand: "",
    model: "",
    regNumber: "",
    fuelType: "",
    connector: "",
    batteryCapacity: "",
    ownerName: "",
    mobile: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-black min-h-[calc(100vh-8rem)] flex flex-col justify-center">
      {/* ---------------- Main Page Content ---------------- */}
      <main className="flex-1 px-4 py-8 max-w-md w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Register your vehicle</h1>
          <p className="text-black/60 text-sm mt-1">
            Add your EV details to start charging and tracking sessions.
          </p>
        </div>

        {submitted ? (
          <SuccessState onReset={() => setSubmitted(false)} />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Section title="Vehicle details">
              <Dropdown
                icon={Car}
                label="Vehicle type"
                value={form.vehicleType}
                options={VEHICLE_TYPES}
                onChange={(v) => update("vehicleType", v)}
                placeholder="Select vehicle type"
              />
              <Dropdown
                icon={Car}
                label="Brand"
                value={form.brand}
                options={BRANDS}
                onChange={(v) => update("brand", v)}
                placeholder="Select brand"
              />
              <TextField
                icon={Car}
                label="Model"
                value={form.model}
                onChange={(v) => update("model", v)}
                placeholder="e.g. Nexon EV"
              />
              <TextField
                icon={Hash}
                label="Registration number"
                value={form.regNumber}
                onChange={(v) => update("regNumber", v.toUpperCase())}
                placeholder="e.g. UP15 AB 1234"
              />
            </Section>

            <Section title="Power & charging">
              <Dropdown
                icon={Fuel}
                label="Fuel type"
                value={form.fuelType}
                options={FUEL_TYPES}
                onChange={(v) => update("fuelType", v)}
                placeholder="Select fuel type"
              />
              <Dropdown
                icon={Gauge}
                label="Connector type"
                value={form.connector}
                options={CONNECTOR_TYPES}
                onChange={(v) => update("connector", v)}
                placeholder="Select connector type"
              />
              <TextField
                icon={BatteryCharging}
                label="Battery capacity (kWh)"
                value={form.batteryCapacity}
                onChange={(v) => update("batteryCapacity", v)}
                placeholder="e.g. 30.2"
                inputMode="decimal"
              />
            </Section>

            <Section title="Owner details">
              <TextField
                icon={User}
                label="Owner name"
                value={form.ownerName}
                onChange={(v) => update("ownerName", v)}
                placeholder="Full name"
              />
              <TextField
                icon={Phone}
                label="Mobile number"
                value={form.mobile}
                onChange={(v) => update("mobile", v)}
                placeholder="10-digit number"
                inputMode="numeric"
              />
            </Section>

            <button
              type="submit"
              className="mt-3 w-full rounded-xl bg-black text-white py-3.5 text-sm font-semibold hover:bg-[#B4FF39] hover:text-black transition-all duration-200 shadow-sm"
            >
              Register vehicle
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

// ------------------------------------------------------------------
// Sub-components
// ------------------------------------------------------------------

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-black/40">{title}</p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function TextField({ icon: Icon, label, value, onChange, placeholder, inputMode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-black/80">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-black/15 px-3.5 py-2.5 focus-within:border-black transition-colors bg-slate-50/50">
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
        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-left transition-colors bg-slate-50/50 ${
          open ? "border-black" : "border-black/15"
        }`}
      >
        <Icon size={16} className="text-black/40 shrink-0" />
        <span className={`flex-1 text-sm ${value ? "text-black" : "text-black/30"}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-black/40 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 right-0 z-30 rounded-xl border border-black/10 bg-white shadow-xl overflow-hidden max-h-52 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-left hover:bg-black/5 transition-colors ${
                opt === value ? "bg-[#B4FF39]/20 font-medium" : ""
              }`}
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

function SuccessState({ onReset }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-12">
      <div className="h-14 w-14 rounded-full bg-[#B4FF39] flex items-center justify-center shadow-md">
        <Check size={24} className="text-black" />
      </div>
      <div>
        <p className="font-bold text-xl">Vehicle registered!</p>
        <p className="text-black/60 text-sm mt-1 max-w-xs">
          Your vehicle details have been saved. You can now start searching for compatible charging stations.
        </p>
      </div>
      <button
        onClick={onReset}
        className="mt-2 rounded-xl border border-black/20 px-5 py-2.5 text-sm font-semibold hover:bg-black hover:text-white transition-all duration-200"
      >
        Register another vehicle
      </button>
    </div>
  );
}