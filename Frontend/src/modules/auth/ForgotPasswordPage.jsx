import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EyeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.12 10.12 0 015.122-1.063c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21f-9-9m0 0L3 3" />
  </svg>
);

const ArrowLeftIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRequestOTP = (e) => {
    e.preventDefault();
    console.log('Sending OTP to:', formData.email);
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log('Resetting password with:', formData);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F5F7] flex items-center justify-center p-4 sm:p-6 font-sans text-zinc-900 overflow-x-hidden">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        {/* LOGO & HEADING SECTION */}
        <div className="text-center pt-8 mb-6 flex flex-col items-center justify-center relative w-full">
          <img 
            src="/logo.jpeg" 
            alt="Vower Logo" 
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-[2rem] shadow-lg z-10"
          />
          <div className="flex justify-center -mt-8 sm:-mt-10 z-20 pointer-events-none">
            <img 
              src="/WORDLOGON.png" 
              alt="Vower Brand" 
              className="h-28 sm:h-36 w-auto object-contain drop-shadow-md"
            />
          </div>
          <p className="text-[11px] sm:text-[12px] text-slate-400 font-bold tracking-[0.2em] uppercase -mt-3">
            POWERING EVERY PROMISE
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 mt-5 tracking-tight">
            {step === 1 ? 'Reset Password' : 'Verify Email OTP'}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1.5 px-2">
            {step === 1 
              ? 'Enter your registered email to receive a password reset code.' 
              : `Enter the 6-digit OTP code sent to ${formData.email}`}
          </p>
        </div>

        {/* FORMS SECTION */}
        <div className="w-full">
          {step === 1 ? (
            <form onSubmit={handleRequestOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5 ml-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-zinc-900 text-sm outline-none focus:border-zinc-900 transition-all placeholder:text-slate-400 shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-2xl bg-zinc-900 hover:bg-black text-white font-bold text-sm tracking-wide transition-all active:scale-[0.98] shadow-md cursor-pointer"
              >
                Send OTP Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5 px-1">
                  <label className="block text-xs font-semibold text-zinc-600">
                    6-Digit Email OTP
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="text-xs text-zinc-500 hover:text-black font-semibold transition-colors cursor-pointer"
                  >
                    Change Email?
                  </button>
                </div>
                <input
                  type="text"
                  name="otp"
                  maxLength="6"
                  required
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="123456"
                  className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-zinc-900 text-center tracking-[0.25em] font-bold text-lg outline-none focus:border-zinc-900 transition-all placeholder:text-slate-400 placeholder:font-normal placeholder:text-sm placeholder:tracking-normal shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5 ml-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    required
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 pr-11 rounded-2xl bg-white border border-slate-200 text-zinc-900 text-sm outline-none focus:border-zinc-900 transition-all placeholder:text-slate-400 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-zinc-700 transition-colors"
                    aria-label="Toggle Password Visibility"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-2xl bg-zinc-900 hover:bg-black text-white font-bold text-sm tracking-wide transition-all active:scale-[0.98] shadow-md cursor-pointer"
              >
                Verify OTP & Save Password
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center text-xs">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-black font-bold transition-colors"
          >
            <ArrowLeftIcon />
            <span>Back to Sign In</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
