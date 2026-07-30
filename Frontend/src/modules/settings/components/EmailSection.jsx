import React, { useState, useEffect } from 'react';

const EmailSection = ({ currentEmail, onUpdateEmail, showToast }) => {
  const [newEmail, setNewEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState('email'); // 'email', 'otp', 'verified'
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const validateEmail = () => {
    if (!newEmail) {
      setError('Email is required');
      return false;
    }
    if (!emailRegex.test(newEmail)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendOTP = async () => {
    if (!validateEmail()) {
      showToast('Please enter a valid email', 'error');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    setStep('otp');
    setTimer(60);
    showToast('OTP sent to your email', 'success');
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    showToast('OTP resent successfully', 'success');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      showToast('Please enter complete OTP', 'error');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    setStep('verified');
    showToast('Email verified successfully', 'success');
  };

  const handleSave = () => {
    onUpdateEmail(newEmail);
    setStep('email');
    setNewEmail('');
    setOtp(['', '', '', '', '', '']);
  };

  const handleCancel = () => {
    setNewEmail('');
    setOtp(['', '', '', '', '', '']);
    setStep('email');
    setError('');
  };

  return (
    <div className="settings-section">
      <h3 className="settings-section__title">Email Address</h3>

      {currentEmail && step === 'email' && (
        <div className="form-group">
          <label className="form-group__label">Current Email</label>
          <input
            type="text"
            className="form-group__input"
            value={currentEmail}
            disabled
          />
        </div>
      )}

      {step === 'email' && (
        <>
          <div className="form-group">
            <label className="form-group__label">New Email</label>
            <input
              type="email"
              className={`form-group__input ${error ? 'form-group__input--error' : ''}`}
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter new email address"
            />
            {error && <p className="form-group__error">{error}</p>}
          </div>

          <div className="btn-group">
            <button className="btn btn--secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button 
              className="btn btn--primary" 
              onClick={handleSendOTP}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        </>
      )}

      {step === 'otp' && (
        <>
          <div className="form-group">
            <label className="form-group__label">Enter New Email</label>
            <input
              type="email"
              className="form-group__input"
              value={newEmail}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-group__label">Enter OTP</label>
            <div className="otp-input-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  maxLength={1}
                />
              ))}
            </div>
          </div>

          {timer > 0 ? (
            <p className="timer">
              Resend OTP in <span>{timer}s</span>
            </p>
          ) : (
            <p className="timer">
              <span 
                className="timer__resend" 
                onClick={handleResendOTP}
                role="button"
                tabIndex={0}
              >
                Resend OTP
              </span>
            </p>
          )}

          <div className="btn-group">
            <button className="btn btn--secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button 
              className="btn btn--primary" 
              onClick={handleVerify}
              disabled={isLoading || otp.some(d => !d)}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </>
      )}

      {step === 'verified' && (
        <>
          <div className="form-group">
            <label className="form-group__label">Verified Email</label>
            <input
              type="email"
              className="form-group__input"
              value={newEmail}
              disabled
            />
          </div>

          <div className="btn-group">
            <button className="btn btn--secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn--primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailSection;
