import { useState } from 'react'
import BrandPanel from './BrandPanel.jsx'
import MethodSelect from './MethodSelect.jsx'
import SignupEmailPage from './SignupEmailForm.jsx'
import PhoneForm from './PhoneForm.jsx'
import OtpStep from './OtpStep.jsx'
import useGoogleAuth from '../hooks/useGoogleAuth' // <-- Import the hook

export default function Signup() {
  const [step, setStep] = useState('method')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Initialise the hook once
  const googleLogin = useGoogleAuth({
  onSuccess: (response) => {
    console.log("Google Login Success:", response);

    // TODO:
    // 1. Send the token to your backend
    // 2. Store JWT/session
    // 3. Navigate to dashboard
  },

  onError: (error) => {
    console.error("Google Login Failed:", error);
  },
});

  function handleMethodSelect(method) {
    if (method === 'email') {
      setStep('emailForm')
    } else if (method === 'phone') {
      setStep('phoneForm')
    } else if (method === 'google') {
      googleLogin() // <-- Launch Google Sign-In
    }
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
            onVerified={() => {
              alert('Account verified. Welcome to Vower!')
            }}
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
            onVerified={() => {
              alert('Account verified. Welcome to Vower!')
            }}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#F5F5F7]">
      <BrandPanel />

      <div className="flex w-full flex-1 items-start lg:items-center justify-center px-6 pt-[9vh] pb-6 lg:py-12 lg:w-1/2 bg-[#F5F5F7]">
        {renderStep()}
      </div>
    </div>
  )
}
