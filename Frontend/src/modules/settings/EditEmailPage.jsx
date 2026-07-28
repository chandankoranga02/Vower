import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Eye, EyeOff } from 'lucide-react';
import './SettingsSubPage.css';

const EditEmailPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Enter email, 2: Verify OTP
    const [formData, setFormData] = useState({
        newEmail: '',
        otp: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/settings');
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSendOTP = async () => {
        if (!validateEmail(formData.newEmail)) {
            setErrors({ newEmail: 'Please enter a valid email address' });
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setOtpSent(true);
        setResendTimer(30);
        
        // Start countdown timer
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
                    <h2 className="success-title">Email Updated!</h2>
                    <p className="success-text">Your email has been changed successfully</p>
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
                <h1 className="settings-sub-title">
                    {step === 1 ? 'Change Email' : 'Verify OTP'}
                </h1>
            </div>

            <div className="settings-sub-form">
                {step === 1 && (
                    <>
                        <div className="form-group">
                            <label className="form-label">New Email Address</label>
                            <input
                                type="email"
                                value={formData.newEmail}
                                onChange={(e) => {
                                    setFormData({...formData, newEmail: e.target.value});
                                    setErrors({});
                                }}
                                className={`form-input ${errors.newEmail ? 'error' : ''}`}
                                placeholder="Enter new email address"
                            />
                            {errors.newEmail && <span className="error-message">{errors.newEmail}</span>}
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={handleBack}>
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn-primary" 
                                onClick={handleSendOTP}
                                disabled={isLoading || !formData.newEmail}
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
                                We've sent a verification code to <strong>{formData.newEmail}</strong>
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

export default EditEmailPage;
