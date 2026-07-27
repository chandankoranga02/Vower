import { Link } from 'react-router-dom'

export default function MethodSelect({ onSelect }) {
    return (
        <div className="w-full max-w-md px-2">


            {/* Mobile "Get started" subheading */}
            <div className="mb-2 text-center lg:hidden">
                <h2 className="text-xl font-semibold text-volt-deep">Create your account</h2>
            </div>

            {/* Desktop heading */}
            <div className="mb-7 hidden lg:block">
                <h2 className="font-display text-2xl font-semibold text-volt-deep">
                    Get started
                </h2>
                <p className="mt-1 text-sm text-volt-deep/50">
                    Choose how you'd like to sign up.
                </p>
            </div>

            <div className="space-y-3">
                {/* Sign up with Email — primary action */}
                <button
                    type="button"
                    onClick={() => onSelect('email')}
                    className="flex w-full items-center gap-4 rounded-2xl border border-volt-deep/10 bg-white px-5 py-4 text-base font-medium text-volt-deep shadow-sm shadow-black/5 transition active:scale-[0.97] hover:border-volt-deep/20 hover:bg-gray-50"
                >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-volt-deep/5">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </span>
                    <span className="flex-1 text-left">Continue with Email</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </button>

                {/* Sign up with Phone */}
                <button
                    type="button"
                    onClick={() => onSelect('phone')}
                    className="flex w-full items-center gap-4 rounded-2xl border border-volt-deep/10 bg-white px-5 py-4 text-base font-medium text-volt-deep shadow-sm shadow-black/5 transition active:scale-[0.97] hover:border-volt-deep/20 hover:bg-gray-50"
                >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-volt-deep/5">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="2" width="14" height="20" rx="2" />
                            <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                    </span>
                    <span className="flex-1 text-left">Continue with Phone</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                    <span className="h-px flex-1 bg-volt-deep/10" />
                    <span className="text-xs font-medium uppercase tracking-widest text-volt-deep/30">or</span>
                    <span className="h-px flex-1 bg-volt-deep/10" />
                </div>

                {/* Sign up with Google */}
                <button
                    type="button"
                    onClick={() => onSelect('google')}
                    className="flex w-full items-center gap-4 rounded-2xl border border-volt-deep/10 bg-white px-5 py-4 text-base font-medium text-volt-deep shadow-sm shadow-black/5 transition active:scale-[0.97] hover:border-volt-deep/20 hover:bg-gray-50"
                >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-volt-deep/5">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.89c2.27-2.09 3.56-5.17 3.56-8.81Z" />
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.92l-3.89-3c-1.08.73-2.46 1.16-4.05 1.16-3.11 0-5.75-2.1-6.69-4.92H1.28v3.09A12 12 0 0 0 12 24Z" />
                            <path fill="#FBBC05" d="M5.31 14.32a7.2 7.2 0 0 1 0-4.64V6.59H1.28a12 12 0 0 0 0 10.82l4.03-3.09Z" />
                            <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.59l4.03 3.09C6.25 6.86 8.89 4.77 12 4.77Z" />
                        </svg>
                    </span>
                    <span className="flex-1 text-left">Continue with Google</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </button>
            </div>

            {/* Login link */}
            <div className="mt-10 flex items-center justify-center gap-2">
                <span className="text-sm text-volt-deep/50">Already have an account?</span>
                <Link
                    to="/login"
                    className="rounded-lg px-3 py-1.5 text-sm font-semibold text-volt-deep transition hover:bg-volt-deep/5 active:scale-95"
                >
                    Log in →
                </Link>
            </div>
        </div>
    )
}
