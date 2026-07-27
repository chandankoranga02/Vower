import { useState } from 'react'
import { Link } from 'react-router-dom'

const emailInitialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

function validateEmailForm(values) {
    const errors = {}

    if (!values.fullName.trim()) {
        errors.fullName = 'Enter your full name.'
    }

    if (!values.email.trim()) {
        errors.email = 'Enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Enter a valid email address.'
    }

    if (!values.password) {
        errors.password = 'Create a password.'
    } else if (values.password.length < 8) {
        errors.password = 'Use at least 8 characters.'
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm your password.'
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match.'
    }

    return errors
}

function EyeIcon({ open }) {
    return open ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    )
}

function EmailField({ label, name, type = 'text', value, error, onChange, autoComplete }) {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
        <div className="block">
            <div className="relative">
                <input
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    placeholder={label}
                    className={`w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-[15px] text-volt-deep placeholder:text-volt-deep/40 outline-none transition focus:border-volt focus:bg-white focus:ring-4 focus:ring-volt/15 ${isPassword ? 'pr-11' : ''} ${error ? 'border-red-400' : 'border-volt-deep/10'}`}
                />
                {isPassword && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-volt-deep/40 hover:text-volt-deep transition"
                    >
                        <EyeIcon open={showPassword} />
                    </button>
                )}
            </div>
            {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
        </div>
    )
}

export default function SignupEmailPage({ onBack, onSubmitted }) {
    const [values, setValues] = useState(emailInitialValues)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target
        setValues((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const nextErrors = validateEmailForm(values)
        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            onSubmitted(values)
        }, 700)
    }

    return (
        <div className="w-full max-w-sm">
            <button
                type="button"
                onClick={onBack}
                className="mb-6 flex items-center gap-1.5 text-sm text-volt-deep/50 hover:text-volt-deep"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
            </button>

            <div className="mb-7 hidden lg:block">
                <h2 className="font-display text-2xl font-semibold text-volt-deep">
                    Sign up with email
                </h2>
                <p className="mt-1 text-sm text-volt-deep/50">
                    We&apos;ll send you an OTP to verify.
                </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <EmailField
                    label="Full name"
                    name="fullName"
                    value={values.fullName}
                    error={errors.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                />
                <EmailField
                    label="Email address"
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={handleChange}
                    autoComplete="email"
                />
                <EmailField
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                />
                <EmailField
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#2A2A2E] py-3 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:bg-[#3A3A3E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? 'Sending OTP…' : 'Create account'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-volt-deep/60">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-volt-dim hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    )
}
