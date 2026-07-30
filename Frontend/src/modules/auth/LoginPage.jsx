import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGoogleAuth from './hooks/useGoogleAuth';
import { AUTH_ENDPOINTS } from '../../apis/endpoints';
import { useAuth } from '../../context/AuthContext';

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

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.89c2.27-2.09 3.56-5.17 3.56-8.81Z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.92l-3.89-3c-1.08.73-2.46 1.16-4.05 1.16-3.11 0-5.75-2.1-6.69-4.92H1.28v3.09A12 12 0 0 0 12 24Z" />
    <path fill="#FBBC05" d="M5.31 14.32a7.2 7.2 0 0 1 0-4.64V6.59H1.28a12 12 0 0 0 0 10.82l4.03-3.09Z" />
    <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.59l4.03 3.09C6.25 6.86 8.89 4.77 12 4.77Z" />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  // Google Authentication — cookie set by backend, just navigate to home
  const googleLogin = useGoogleAuth({
    onSuccess: () => {
      checkAuth();
      navigate('/home', { replace: true });
    },
    onError: (errMsg) => {
      setError(errMsg || 'Google sign-in failed. Please try again.');
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(AUTH_ENDPOINTS.LOGIN_EMAIL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || 'Login failed. Please check your credentials.');
        return;
      }

      // Cookie is set by backend — refresh auth state then navigate
      await checkAuth();
      navigate('/home', { replace: true });
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
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
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1.5 px-2">
            Please enter your details to sign in.
          </p>
        </div>

        {/* FORMS SECTION */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5 ml-1">
                Email Address
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

            <div>
              <div className="flex justify-between items-center mb-1.5 px-1">
                <label className="block text-xs font-semibold text-zinc-600">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-zinc-500 hover:text-black font-semibold transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
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

            {/* Error message */}
            {error && (
              <p className="text-xs text-red-500 font-medium text-center px-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 rounded-2xl bg-zinc-900 hover:bg-black text-white font-bold text-sm tracking-wide transition-all active:scale-[0.98] shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-5">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-widest text-slate-400">or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {/* GOOGLE SIGN-IN */}
          <button
            type="button"
            onClick={googleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:border-slate-300 hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-zinc-900 font-bold hover:underline">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}

