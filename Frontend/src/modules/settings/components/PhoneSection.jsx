import React, { useState, useEffect } from 'react';

const PhoneSection = ({ currentPhone, onUpdatePhone, showToast }) => {
  const [newPhone, setNewPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'verified'
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const phoneRegex = /^[6-9]\d{9}$/;

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const validatePhone = () => {
    if (!newPhone) {
      setError('Phone number is required');
      return false;
    }
    if (!phoneRegex.test(newPhone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendOTP = async () => {
    if (!validatePhone()) {
      showToast('Please enter a valid phone number', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    setStep('otp');
    setTimer(60);
    showToast('OTP sent to your phone', 'success');
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    setStep('verified');
    showToast('Phone number verified successfully', 'success');
  };

  const handleSave = () => {
    onUpdatePhone(newPhone);
    setStep('phone');
    setNewPhone('');
    setOtp(['', '', '', '', '', '']);
  };

  const handleCancel = () => {
    setNewPhone('');
    setOtp(['', '', '', '', '', '']);
    setStep('phone');
    setError('');
  };

  return (
    <div className="settings-section">
      <h3 className="settings-section__title">Phone Number</h3>

      {currentPhone && step === 'phone' && (
        <div className="form-group">
          <label className="form-group__label">Current Number</label>
          <input
            type="text"
            className="form-group__input"
            value={currentPhone}
            disabled
          />
        </div>
      )}

      {step === 'phone' && (
        <>
          <div className="form-group">
            <label className="form-group__label">New Phone Number</label>
            <input
              type="tel"
              className={`form-group__input ${error ? 'form-group__input--error' : ''}`}
              value={newPhone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                  setNewPhone(value);
                  if (error) setError('');
                }
              }}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
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
            <label className="form-group__label">Enter Phone Number</label>
            <input
              type="tel"
              className="form-group__input"
              value={newPhone}
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
            <label className="form-group__label">Verified Number</label>
            <input
              type="tel"
              className="form-group__input"
              value={newPhone}
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

export default PhoneSection;
