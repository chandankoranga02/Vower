import { useState } from 'react'
import BrandPanel from './BrandPanel.jsx'
import MethodSelect from './MethodSelect.jsx'
import SignupEmailPage from './SignupEmailForm.jsx'
import PhoneForm from './PhoneForm.jsx'
import OtpStep from './OtpStep.jsx'
import useGoogleAuth from '../hooks/useGoogleAuth'

export default function Signup() {
  const [step, setStep] = useState('method')

  // Store complete email signup data until OTP verification is complete
  const [emailSignupData, setEmailSignupData] = useState(null)

  // Phone flow
  const [phone, setPhone] = useState('')

  // Google Authentication
  const googleLogin = useGoogleAuth({
    onSuccess: (response) => {
      console.log('Google Login Success:', response)

      // TODO:
      // Send Google token to backend
      // Receive your backend JWT
      // Store session
      // Navigate to dashboard
    },

    onError: (error) => {
      console.error('Google Login Failed:', error)
    },
  })

  function handleMethodSelect(method) {
    if (method === 'email') {
      setStep('emailForm')
    } else if (method === 'phone') {
      setStep('phoneForm')
    } else if (method === 'google') {
      googleLogin()
    }
  }

  function renderStep() {
    switch (step) {
      // -----------------------------------
      // SELECT SIGNUP METHOD
      // -----------------------------------

      case 'method':
        return <MethodSelect onSelect={handleMethodSelect} />

      // -----------------------------------
      // EMAIL SIGNUP FORM
      // -----------------------------------

      case 'emailForm':
        return (
          <SignupEmailPage
            onBack={() => setStep('method')}
            onSubmitted={(values) => {
              // OTP has successfully been sent at this point.
              // Keep required signup information until OTP verification.

              setEmailSignupData({
                fullName: values.fullName,
                email: values.email,
                password: values.password,
              })

              setStep('emailOtp')
            }}
          />
        )

      // -----------------------------------
      // EMAIL OTP VERIFICATION
      // -----------------------------------

      case 'emailOtp':
        if (!emailSignupData) {
          setStep('emailForm')
          return null
        }

        return (
          <OtpStep
            mode="email"
            email={emailSignupData.email}
            fullName={emailSignupData.fullName}
            password={emailSignupData.password}

            onBack={() => {
              setStep('emailForm')
            }}

            onVerified={(data) => {
              console.log('Email signup completed:', data)

              // Backend should return JWT here
              console.log('JWT:', data.token)

              // Signup information is no longer needed
              setEmailSignupData(null)

              alert('Account created. Welcome to Vower!')

              // Later:
              // localStorage.setItem('token', data.token)
              // navigate('/dashboard')
            }}
          />
        )

      // -----------------------------------
      // PHONE SIGNUP FORM
      // -----------------------------------

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

      // -----------------------------------
      // PHONE OTP
      // -----------------------------------

      case 'phoneOtp':
        return (
          <OtpStep
            mode="phone"
            contact={phone}

            onBack={() => {
              setStep('phoneForm')
            }}

            onVerified={(data) => {
              console.log('Phone signup completed:', data)

              alert('Account verified. Welcome to Vower!')
            }}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F5F5F7] lg:flex-row">

      <BrandPanel />

      <div className="flex w-full flex-1 items-start justify-center bg-[#F5F5F7] px-6 pb-6 pt-[9vh] lg:w-1/2 lg:items-center lg:py-12">

        {renderStep()}

      </div>

    </div>
  )
}