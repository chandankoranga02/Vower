import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialValues = {
    fullName: '',
    phone: '',
}

function validate(values) {
    const errors = {}

    if (!values.fullName.trim()) {
        errors.fullName = 'Enter your full name.'
    }

    if (!values.phone.trim()) {
        errors.phone = 'Enter your phone number.'
    } else if (!/^\d{10,15}$/.test(values.phone.replace(/[\s\-+()]/g, ''))) {
        errors.phone = 'Enter a valid phone number.'
    }

    return errors
}

export default function PhoneForm({ onSubmitted, onBack }) {
    const [values, setValues] = useState(initialValues)
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
        const nextErrors = validate(values)
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

            <div className="mb-7">
                <h2 className="font-display text-2xl font-semibold text-volt-deep">
                    Sign up with phone
                </h2>
                <p className="mt-1 text-sm text-volt-deep/50">
                    We&apos;ll send you an OTP to verify.
                </p>
            </div>

            {/* Google button */}
            {/* <button
                type="button"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-volt-deep/10 bg-white py-2.5 text-sm font-medium text-volt-deep transition hover:border-volt-deep/20 hover:bg-volt-soft/60"
            >
                <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.89c2.27-2.09 3.56-5.17 3.56-8.81Z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.92l-3.89-3c-1.08.73-2.46 1.16-4.05 1.16-3.11 0-5.75-2.1-6.69-4.92H1.28v3.09A12 12 0 0 0 12 24Z" />
                    <path fill="#FBBC05" d="M5.31 14.32a7.2 7.2 0 0 1 0-4.64V6.59H1.28a12 12 0 0 0 0 10.82l4.03-3.09Z" />
                    <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.59l4.03 3.09C6.25 6.86 8.89 4.77 12 4.77Z" />
                </svg>
                Sign up with Google
            </button> */}

            {/* <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-volt-deep/10" />
                <span className="text-xs font-medium uppercase tracking-wide text-volt-deep/35">or</span>
                <span className="h-px flex-1 bg-volt-deep/10" />
            </div> */}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="block">
                    <div className="relative">
                        <input
                            type="text"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                            autoComplete="name"
                            placeholder="Full name"
                            className={`w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-[15px] text-volt-deep placeholder:text-volt-deep/40 outline-none transition focus:border-volt focus:bg-white focus:ring-4 focus:ring-volt/15 ${errors.fullName ? 'border-red-400' : 'border-volt-deep/10'}`}
                        />
                    </div>
                    {errors.fullName && <span className="mt-1 block text-xs text-red-500">{errors.fullName}</span>}
                </div>

                <div className="block">
                    <div className="relative">
                        <input
                            type="tel"
                            name="phone"
                            inputMode="numeric"
                            value={values.phone}
                            onChange={handleChange}
                            autoComplete="tel"
                            placeholder="Phone number"
                            className={`w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-[15px] text-volt-deep placeholder:text-volt-deep/40 outline-none transition focus:border-volt focus:bg-white focus:ring-4 focus:ring-volt/15 ${errors.phone ? 'border-red-400' : 'border-volt-deep/10'}`}
                        />
                    </div>
                    {errors.phone && <span className="mt-1 block text-xs text-red-500">{errors.phone}</span>}
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#2A2A2E] py-3 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:bg-[#3A3A3E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? 'Sending OTP…' : 'Continue'}
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
