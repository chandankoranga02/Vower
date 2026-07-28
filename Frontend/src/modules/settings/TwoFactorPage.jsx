import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Shield, Smartphone, Mail, Key } from 'lucide-react';
import './TwoFactorPage.css';

const TwoFactorPage = () => {
    const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState(false);
    const [showSetupDialog, setShowSetupDialog] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [setupStep, setSetupStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBack = () => navigate('/settings');

    const handleToggle = () => {
        if (isEnabled) {
            // Disable 2FA
            setIsEnabled(false);
        } else {
            // Show setup dialog
            setShowSetupDialog(true);
            setSetupStep(1);
            setSelectedMethod(null);
        }
    };

    const handleSelectMethod = (method) => {
        setSelectedMethod(method);
        setSetupStep(2);
    };

    const handleVerifySetup = async () => {
        if (!otp || otp.length !== 6) return;
        
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setShowSuccess(true);
        setIsEnabled(true);
        
        setTimeout(() => {
            navigate('/settings');
        }, 2000);
    };

    const handleCloseDialog = () => {
        setShowSetupDialog(false);
        setSetupStep(1);
        setSelectedMethod(null);
        setOtp('');
    };

    const methods = [
        {
            id: 'sms',
            icon: <Smartphone size={24} />,
            title: 'SMS',
            description: 'Receive codes via text message'
        },
        {
            id: 'email',
            icon: <Mail size={24} />,
            title: 'Email',
            description: 'Receive codes via email'
        },
        {
            id: 'authenticator',
            icon: <Key size={24} />,
            title: 'Authenticator App',
            description: 'Use Google Authenticator or similar'
        }
    ];

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
                    <h2 className="success-title">2FA Enabled!</h2>
                    <p className="success-text">Two-factor authentication is now active</p>
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
                <h1 className="settings-sub-title">Two-Factor Authentication</h1>
            </div>

            <div className="twofa-content">
                <div className="twofa-card">
                    <div className="twofa-icon">
                        <Shield size={48} />
                    </div>
                    <h2 className="twofa-title">Secure Your Account</h2>
                    <p className="twofa-description">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    
                    <div className="twofa-status">
                        <span className="twofa-status-label">Status:</span>
                        <span className={`twofa-status-badge ${isEnabled ? 'enabled' : 'disabled'}`}>
                            {isEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                    </div>

                    <div className="twofa-toggle-wrapper">
                        <span className="twofa-toggle-label">Enable Two-Factor Authentication</span>
                        <button 
                            className={`twofa-toggle ${isEnabled ? 'active' : ''}`}
                            onClick={handleToggle}
                        >
                            <div className="twofa-toggle-knob"></div>
                        </button>
                    </div>
                </div>

                {isEnabled && (
                    <div className="twofa-info">
                        <h3>How it works</h3>
                        <ul>
                            <li>When you sign in, you'll enter your password</li>
                            <li>Then, you'll receive a code on your chosen device</li>
                            <li>Enter the code to complete sign-in</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Setup Dialog */}
            {showSetupDialog && (
                <div className="dialog-overlay" onClick={handleCloseDialog}>
                    <div className="dialog twofa-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="dialog__header">
                            <h3 className="dialog__title">
                                {setupStep === 1 ? 'Choose Verification Method' : 'Verify Setup'}
                            </h3>
                            <button className="dialog__close" onClick={handleCloseDialog}>
                                <X size={20} />
                            </button>
                        </div>

                        {setupStep === 1 && (
                            <div className="dialog__content">
                                <p className="dialog-description">
                                    Select how you'd like to receive verification codes:
                                </p>
                                <div className="method-list">
                                    {methods.map((method) => (
                                        <button
                                            key={method.id}
                                            className="method-item"
                                            onClick={() => handleSelectMethod(method.id)}
                                        >
                                            <div className="method-icon">{method.icon}</div>
                                            <div className="method-info">
                                                <h4>{method.title}</h4>
                                                <p>{method.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {setupStep === 2 && (
                            <div className="dialog__content">
                                <p className="dialog-description">
                                    Enter the verification code sent to your {selectedMethod}:
                                </p>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className="form-input otp-input"
                                    placeholder="000000"
                                    maxLength={6}
                                    style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '18px' }}
                                />
                            </div>
                        )}

                        <div className="dialog__actions">
                            <button className="dialog__btn dialog__btn--secondary" onClick={handleCloseDialog}>
                                Cancel
                            </button>
                            {setupStep === 2 && (
                                <button 
                                    className="dialog__btn dialog__btn--primary" 
                                    onClick={handleVerifySetup}
                                    disabled={isLoading || !otp}
                                >
                                    {isLoading ? 'Verifying...' : 'Verify & Enable'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TwoFactorPage;
