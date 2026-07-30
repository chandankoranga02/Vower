import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandPanel from './components/BrandPanel.jsx'
import MethodSelect from './components/MethodSelect.jsx'
import SignupEmailPage from './components/SignupEmailForm.jsx'
import PhoneForm from './components/PhoneForm.jsx'
import OtpStep from './components/OtpStep.jsx'
import useGoogleAuth from './hooks/useGoogleAuth'

export default function SignupPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState('method')

  // Store complete email signup data until OTP verification is complete
  const [emailSignupData, setEmailSignupData] = useState(null)


  // Google Authentication — cookie set by backend, navigate on success
  const googleLogin = useGoogleAuth({
    onSuccess: () => {
      navigate('/home', { replace: true })
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

            onVerified={() => {
              console.log('Email signup completed — cookie set by backend')
              setEmailSignupData(null)
              navigate('/home', { replace: true })
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
            onSubmitted={({ phone: phoneNumber }) => {
              // Phone signup — token returned in body (not changed to cookie)
              navigate('/home', { replace: true })
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

      <div className="flex w-full flex-1 items-center justify-center bg-[#F5F5F7] px-6 pb-6 pt-6 lg:w-1/2 lg:py-12">

        <div className="m-auto">
          {renderStep()}
        </div>

      </div>

    </div>
  )
}
