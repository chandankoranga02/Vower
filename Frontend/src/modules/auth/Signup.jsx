import { useState } from 'react'
import BrandPanel from './components/BrandPanel.jsx'
import MethodSelect from './components/MethodSelect.jsx'
import SignupEmailPage from './components/SignupEmailPage.jsx'
import PhoneForm from './components/PhoneForm.jsx'
import OtpStep from './components/OtpStep.jsx'
import SuccessScreen from './components/SuccessScreen.jsx'

/* Map each step to a progress index (0–2). Success has no dot. */
const STEP_INDEX = {
  method: 0,
  emailForm: 1,
  phoneForm: 1,
  emailOtp: 2,
  phoneOtp: 2,
  success: -1,
}

function ProgressDots({ step }) {
  const active = STEP_INDEX[step] ?? -1
  if (active < 0) return null

  return (
    <div className="mb-6 flex items-center justify-center gap-2 lg:hidden">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`block rounded-full transition-all duration-300 ${i === active
              ? 'h-2.5 w-2.5 bg-volt-deep'
              : i < active
                ? 'h-2 w-2 bg-volt-deep/30'
                : 'h-2 w-2 bg-volt-deep/15'
            }`}
        />
      ))}
    </div>
  )
}

export default function Signup() {
  const [step, setStep] = useState('method')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function handleMethodSelect(method) {
    if (method === 'email') setStep('emailForm')
    else if (method === 'phone') setStep('phoneForm')
    // Google is handled inside MethodSelect as a toast now
  }

  function renderStep() {
    switch (step) {
      case 'method':
        return <MethodSelect onSelect={handleMethodSelect} />

      case 'emailForm':
        return (
          <SignupEmailPage
            onBack={() => setStep('method')}
            onSubmitted={(values) => {
              setEmail(values.email)
              setStep('emailOtp')
            }}
          />
        )

      case 'emailOtp':
        return (
          <OtpStep
            mode="email"
            contact={email}
            onBack={() => setStep('emailForm')}
            onVerified={() => setStep('success')}
          />
        )

      case 'phoneForm':
        return (
          <PhoneForm
            onBack={() => setStep('method')}
            onSubmitted={(values) => {
              setPhone(values.phone)
              setStep('phoneOtp')
            }}
          />
        )

      case 'phoneOtp':
        return (
          <OtpStep
            mode="phone"
            contact={phone}
            onBack={() => setStep('phoneForm')}
            onVerified={() => setStep('success')}
          />
        )

      case 'success':
        return <SuccessScreen />

      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F5F5F7]">
      <BrandPanel />

      <div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-12 lg:w-1/2 bg-[#F5F5F7]">
        <ProgressDots step={step} />

        {/* Animated step wrapper — key forces re-mount for the entrance animation */}
        <div key={step} className="w-full flex justify-center animate-fadeSlideIn">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}
