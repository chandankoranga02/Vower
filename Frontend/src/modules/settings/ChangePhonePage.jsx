import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsSubPage.css';

const ChangePhonePage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        currentNumber: '+1 234567890',
        newNumber: '',
        otp: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/settings');
        }
    };

    const handleSendOTP = async () => {
        if (!formData.newNumber || formData.newNumber.length < 10) {
            setErrors({ newNumber: 'Please enter a valid phone number' });
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setResendTimer(30);
        
        const interval = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleVerifyOTP = async () => {
        if (!formData.otp || formData.otp.length !== 6) {
            setErrors({ otp: 'Please enter a valid 6-digit OTP' });
            return;
        }

        setIsVerifying(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsVerifying(false);
        setShowSuccess(true);

        setTimeout(() => {
            navigate('/settings');
        }, 2000);
    };

    const handleResendOTP = async () => {
        if (resendTimer > 0) return;
        
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setResendTimer(30);
        
        const interval = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    if (showSuccess) {
        return (
            <div className="settings-sub-page">
                <div className="success-animation">
                    <div className="success-checkmark">
                        <svg width="80" height="80" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="36" fill="#4CAF50" opacity="0.2"/>
                            <path d="M24 40l12 12 20-24" stroke="#4CAF50" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h2 className="success-title">Phone Updated!</h2>
                    <p className="success-text">Your phone number has been changed successfully</p>
                </div>
            </div>
        );
    }

    return (
        <div className="settings-sub-page">
            <div className="settings-sub-header">
                <button className="settings-sub-back" onClick={handleBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h1 className="settings-sub-title">Change Phone Number</h1>
            </div>

            <div className="settings-sub-form">
                {step === 1 && (
                    <>
                        <div className="form-group">
                            <label className="form-label">Current Number</label>
                            <input
                                type="tel"
                                value={formData.currentNumber}
                                disabled
                                className="form-input form-input--disabled"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">New Phone Number</label>
                            <input
                                type="tel"
                                value={formData.newNumber}
                                onChange={(e) => {
                                    setFormData({...formData, newNumber: e.target.value});
                                    setErrors({});
                                }}
                                className={`form-input ${errors.newNumber ? 'error' : ''}`}
                                placeholder="+1 2345678900"
                            />
                            {errors.newNumber && <span className="error-message">{errors.newNumber}</span>}
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={handleBack}>
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn-primary" 
                                onClick={handleSendOTP}
                                disabled={isLoading || !formData.newNumber}
                            >
                                {isLoading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="form-group">
                            <p className="otp-instruction">
                                We've sent a verification code to <strong>{formData.newNumber}</strong>
                            </p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Enter Verification Code</label>
                            <input
                                type="text"
                                value={formData.otp}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                    setFormData({...formData, otp: value});
                                    setErrors({});
                                }}
                                className={`form-input ${errors.otp ? 'error' : ''}`}
                                placeholder="000000"
                                maxLength={6}
                                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '18px' }}
                            />
                            {errors.otp && <span className="error-message">{errors.otp}</span>}
                        </div>

                        <div className="otp-resend">
                            <p className="otp-resend-text">Didn't receive code?</p>
                            <button 
                                className="otp-resend-btn" 
                                onClick={handleResendOTP}
                                disabled={resendTimer > 0 || isLoading}
                            >
                                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                            </button>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                                Back
                            </button>
                            <button 
                                type="button" 
                                className="btn-primary" 
                                onClick={handleVerifyOTP}
                                disabled={isVerifying || !formData.otp}
                            >
                                {isVerifying ? 'Verifying...' : 'Verify & Save'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChangePhonePage;
