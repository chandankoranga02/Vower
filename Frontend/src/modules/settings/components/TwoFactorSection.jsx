import React, { useState } from 'react';
import { X, Shield, Smartphone, Mail, Key } from 'lucide-react';

const TwoFactorSection = ({ enabled, method, onToggle, showToast }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDisable, setShowConfirmDisable] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [setupStep, setSetupStep] = useState('method'); // 'method', 'verify', 'complete'
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const methods = [
    { id: 'sms', label: 'SMS', icon: Smartphone, description: 'Receive codes via text message' },
    { id: 'email', label: 'Email', icon: Mail, description: 'Receive codes via email' },
    { id: 'authenticator', label: 'Authenticator App', icon: Key, description: 'Use Google Authenticator or similar' },
  ];

  const handleToggle = () => {
    if (enabled) {
      setShowConfirmDisable(true);
    } else {
      setShowModal(true);
      setSetupStep('method');
      setSelectedMethod(null);
    }
  };

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
  };

  const handleNext = async () => {
    if (!selectedMethod) {
      showToast('Please select a method', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    setSetupStep('verify');
    showToast(`OTP sent to ${selectedMethod}`, 'success');
  };

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      showToast('Please enter complete code', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    setSetupStep('complete');
    showToast('2FA setup completed', 'success');
  };

  const handleFinish = () => {
    onToggle(true, selectedMethod);
    setShowModal(false);
    setSetupStep('method');
    setSelectedMethod(null);
    setVerificationCode('');
  };

  const handleConfirmDisable = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    onToggle(false, null);
    setShowConfirmDisable(false);
    showToast('2FA disabled successfully', 'success');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSetupStep('method');
    setSelectedMethod(null);
    setVerificationCode('');
  };

  return (
    <div className="settings-section">
      <h3 className="settings-section__title">Two-Factor Authentication</h3>

      <div className="toggle-row">
        <div>
          <p className="toggle-row__label">2FA Status</p>
          <p className="toggle-row__description">
            {enabled ? `Enabled via ${method}` : 'Add an extra layer of security'}
          </p>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            className="toggle-switch__input"
            checked={enabled}
            onChange={handleToggle}
          />
          <span className="toggle-switch__slider" />
        </label>
      </div>

      {/* Setup Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="modal__title">
                {setupStep === 'method' && 'Choose 2FA Method'}
                {setupStep === 'verify' && 'Verify Setup'}
                {setupStep === 'complete' && '2FA Enabled'}
              </h3>
              <button className="modal__close" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal__content">
              {setupStep === 'method' && (
                <div className="twofa-options">
                  {methods.map((m) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={m.id}
                        className={`twofa-option ${selectedMethod === m.id ? 'twofa-option--selected' : ''}`}
                        onClick={() => handleMethodSelect(m.id)}
                      >
                        <Icon className="twofa-option__icon" size={24} />
                        <div>
                          <p className="twofa-option__label">{m.label}</p>
                          <p style={{ fontSize: '13px', color: '#6b7280' }}>{m.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {setupStep === 'verify' && (
                <>
                  <p style={{ textAlign: 'center', marginBottom: '16px' }}>
                    Enter the verification code sent to your {selectedMethod}
                  </p>
                  
                  {selectedMethod === 'authenticator' && (
                    <div className="qr-placeholder">
                      QR Code Placeholder
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-group__label">Verification Code</label>
                    <input
                      type="text"
                      className="form-group__input"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                    />
                  </div>
                </>
              )}

              {setupStep === 'complete' && (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <Shield size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                    Two-Factor Authentication is now enabled!
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                    Your account is now more secure.
                  </p>
                </div>
              )}
            </div>

            <div className="modal__actions">
              {setupStep === 'method' && (
                <>
                  <button className="btn btn--secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button 
                    className="btn btn--primary" 
                    onClick={handleNext}
                    disabled={!selectedMethod || isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Next'}
                  </button>
                </>
              )}

              {setupStep === 'verify' && (
                <>
                  <button className="btn btn--secondary" onClick={() => setSetupStep('method')}>
                    Back
                  </button>
                  <button 
                    className="btn btn--primary" 
                    onClick={handleVerify}
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </button>
                </>
              )}

              {setupStep === 'complete' && (
                <button className="btn btn--primary" onClick={handleFinish}>
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirm Disable Modal */}
      {showConfirmDisable && (
        <div className="modal-overlay" onClick={() => setShowConfirmDisable(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="modal__title">Disable 2FA?</h3>
              <button className="modal__close" onClick={() => setShowConfirmDisable(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal__content">
              <p style={{ color: '#374151' }}>
                Are you sure you want to disable two-factor authentication? This will reduce your account security.
              </p>
            </div>

            <div className="modal__actions">
              <button className="btn btn--secondary" onClick={() => setShowConfirmDisable(false)}>
                Cancel
              </button>
              <button 
                className="btn btn--danger" 
                onClick={handleConfirmDisable}
                disabled={isLoading}
              >
                {isLoading ? 'Disabling...' : 'Disable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFactorSection;
