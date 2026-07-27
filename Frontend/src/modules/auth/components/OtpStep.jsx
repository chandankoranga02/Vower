import { useEffect, useRef, useState } from 'react'

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

export default function OtpStep({ email, contact, mode = 'email', onVerified, onBack }) {
  const displayContact = contact || email
  const isPhone = mode === 'phone'
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputsRef = useRef([])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  function handleChange(index, value) {
    const char = value.replace(/[^0-9]/g, '').slice(-1)
    const next = [...digits]
    next[index] = char
    setDigits(next)
    setError('')
    if (char && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    e.preventDefault()
    const next = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((d, i) => (next[i] = d))
    setDigits(next)
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  function handleVerify(e) {
    e.preventDefault()
    const code = digits.join('')
    if (code.length < OTP_LENGTH) {
      setError('Enter all 6 digits.')
      return
    }
    setVerifying(true)
    // Simulated verification — swap for a real API call.
    setTimeout(() => {
      setVerifying(false)
      onVerified(code)
    }, 700)
  }

  function handleResend() {
    if (secondsLeft > 0) return
    setSecondsLeft(RESEND_SECONDS)
    setDigits(Array(OTP_LENGTH).fill(''))
    inputsRef.current[0]?.focus()
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

      <h2 className="font-display text-2xl font-semibold text-volt-deep">
        {isPhone ? 'Verify your phone' : 'Verify your email'}
      </h2>
      <p className="mt-1.5 text-sm text-volt-deep/50">
        We sent a 6-digit code to <span className="font-medium text-volt-deep/80">{displayContact}</span>
      </p>

      <form onSubmit={handleVerify} className="mt-7">
        <div className="flex justify-between gap-2" onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-12 rounded-xl border border-volt-deep/10 bg-white text-center text-xl font-semibold text-volt-deep outline-none transition focus:border-volt focus:ring-4 focus:ring-volt/15"
            />
          ))}
        </div>
        {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={verifying}
          className="mt-7 flex w-full items-center justify-center rounded-xl bg-[#2A2A2E] py-3 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:bg-[#3A3A3E] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {verifying ? 'Verifying…' : 'Verify & continue'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-volt-deep/60">
        Didn&apos;t get the code?{' '}
        {secondsLeft > 0 ? (
          <span className="text-volt-deep/40">Resend in {secondsLeft}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-volt-dim hover:underline"
          >
            Resend OTP
          </button>
        )}
      </p>
    </div>
  )
}
