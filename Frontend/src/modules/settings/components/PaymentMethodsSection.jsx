import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Wallet, Building2, Trash2, Star } from 'lucide-react';

const PaymentMethodsSection = ({ paymentMethods, defaultMethod, onAddMethod, onRemoveMethod, onSetDefault, showToast }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const methodTypes = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
  ];

  const handleOpenAddModal = () => {
    setShowAddModal(true);
    setSelectedType(null);
    setFormData({});
    setErrors({});
  };

  const handleSelectType = (typeId) => {
    setSelectedType(typeId);
  };

  const validateForm = () => {
    const newErrors = {};

    if (selectedType === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Enter valid 16-digit card number';
      }
      if (!formData.cardName) {
        newErrors.cardName = 'Cardholder name is required';
      }
      if (!formData.expiry) {
        newErrors.expiry = 'Expiry date is required';
      }
      if (!formData.cvv || formData.cvv.length !== 3) {
        newErrors.cvv = 'Enter valid CVV';
      }
    } else if (selectedType === 'upi') {
      if (!formData.upiId || !formData.upiId.includes('@')) {
        newErrors.upiId = 'Enter valid UPI ID';
      }
    } else if (selectedType === 'wallet') {
      if (!formData.walletProvider) {
        newErrors.walletProvider = 'Select wallet provider';
      }
      if (!formData.walletId) {
        newErrors.walletId = 'Wallet ID is required';
      }
    } else if (selectedType === 'netbanking') {
      if (!formData.bankName) {
        newErrors.bankName = 'Select bank';
      }
      if (!formData.accountNumber) {
        newErrors.accountNumber = 'Account number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      showToast('Please fix the errors', 'error');
      return;
    }

    const newMethod = {
      id: Date.now().toString(),
      type: selectedType,
      ...formData,
      displayName: getDisplayName(selectedType, formData),
    };

    onAddMethod(newMethod);
    setShowAddModal(false);
    setFormData({});
    setErrors({});
  };

  const getDisplayName = (type, data) => {
    switch (type) {
      case 'card':
        return `**** **** **** ${data.cardNumber?.slice(-4) || '0000'}`;
      case 'upi':
        return data.upiId || 'UPI';
      case 'wallet':
        return `${data.walletProvider || 'Wallet'} (${data.walletId || '***'})`;
      case 'netbanking':
        return `${data.bankName || 'Bank'} ****${data.accountNumber?.slice(-4) || '0000'}`;
      default:
        return 'Payment Method';
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setSelectedType(null);
    setFormData({});
    setErrors({});
  };

  return (
    <div className="settings-section">
      <h3 className="settings-section__title">Payment Methods</h3>

      {paymentMethods.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
          <p>No payment methods added yet</p>
        </div>
      ) : (
        paymentMethods.map((method) => {
          const Icon = methodTypes.find(t => t.id === method.type)?.icon || CreditCard;
          return (
            <div key={method.id} className="payment-method-card">
              <div className="payment-method-card__icon">
                <Icon size={24} />
              </div>
              <div className="payment-method-card__info">
                <p className="payment-method-card__name">{method.displayName}</p>
                <p className="payment-method-card__detail">
                  {methodTypes.find(t => t.id === method.type)?.label}
                </p>
              </div>
              {defaultMethod === method.id && (
                <span className="payment-method-card__badge">Default</span>
              )}
              <div className="payment-method-card__actions">
                {defaultMethod !== method.id && (
                  <button
                    className="payment-method-card__action"
                    onClick={() => onSetDefault(method.id)}
                    aria-label="Set as default"
                  >
                    <Star size={20} />
                  </button>
                )}
                <button
                  className={`payment-method-card__action ${paymentMethods.length === 1 ? 'payment-method-card__action--danger' : ''}`}
                  onClick={() => {
                    if (paymentMethods.length === 1) {
                      showToast('Cannot remove only payment method', 'error');
                    } else {
                      onRemoveMethod(method.id);
                    }
                  }}
                  disabled={paymentMethods.length === 1}
                  aria-label="Remove"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })
      )}

      <button 
        className="btn btn--primary btn--full" 
        style={{ marginTop: '16px' }}
        onClick={handleOpenAddModal}
      >
        Add Payment Method
      </button>

      {/* Add Method Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="modal__title">Add Payment Method</h3>
              <button className="modal__close" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal__content">
              {!selectedType ? (
                <div className="twofa-options">
                  {methodTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`twofa-option ${selectedType === type.id ? 'twofa-option--selected' : ''}`}
                        onClick={() => handleSelectType(type.id)}
                      >
                        <Icon className="twofa-option__icon" size={24} />
                        <span className="twofa-option__label">{type.label}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  {selectedType === 'card' && (
                    <>
                      <div className="form-group">
                        <label className="form-group__label">Card Number</label>
                        <input
                          type="text"
                          className={`form-group__input ${errors.cardNumber ? 'form-group__input--error' : ''}`}
                          value={formData.cardNumber || ''}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                            const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                            setFormData(prev => ({ ...prev, cardNumber: formatted }));
                          }}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <p className="form-group__error">{errors.cardNumber}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-group__label">Cardholder Name</label>
                        <input
                          type="text"
                          className={`form-group__input ${errors.cardName ? 'form-group__input--error' : ''}`}
                          value={formData.cardName || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, cardName: e.target.value }))}
                          placeholder="John Doe"
                        />
                        {errors.cardName && <p className="form-group__error">{errors.cardName}</p>}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-group__label">Expiry Date</label>
                          <input
                            type="text"
                            className={`form-group__input ${errors.expiry ? 'form-group__input--error' : ''}`}
                            value={formData.expiry || ''}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '').slice(0, 4);
                              if (value.length >= 2) {
                                value = value.slice(0, 2) + '/' + value.slice(2);
                              }
                              setFormData(prev => ({ ...prev, expiry: value }));
                            }}
                            placeholder="MM/YY"
                          />
                          {errors.expiry && <p className="form-group__error">{errors.expiry}</p>}
                        </div>

                        <div className="form-group">
                          <label className="form-group__label">CVV</label>
                          <input
                            type="text"
                            className={`form-group__input ${errors.cvv ? 'form-group__input--error' : ''}`}
                            value={formData.cvv || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                            placeholder="123"
                            maxLength={3}
                          />
                          {errors.cvv && <p className="form-group__error">{errors.cvv}</p>}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedType === 'upi' && (
                    <div className="form-group">
                      <label className="form-group__label">UPI ID</label>
                      <input
                        type="text"
                        className={`form-group__input ${errors.upiId ? 'form-group__input--error' : ''}`}
                        value={formData.upiId || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, upiId: e.target.value.toLowerCase() }))}
                        placeholder="example@oksbi"
                      />
                      {errors.upiId && <p className="form-group__error">{errors.upiId}</p>}
                    </div>
                  )}

                  {selectedType === 'wallet' && (
                    <>
                      <div className="form-group">
                        <label className="form-group__label">Wallet Provider</label>
                        <select
                          className={`form-group__input ${errors.walletProvider ? 'form-group__input--error' : ''}`}
                          value={formData.walletProvider || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, walletProvider: e.target.value }))}
                        >
                          <option value="">Select provider</option>
                          <option value="Paytm">Paytm</option>
                          <option value="PhonePe">PhonePe</option>
                          <option value="Google Pay">Google Pay</option>
                          <option value="Amazon Pay">Amazon Pay</option>
                        </select>
                        {errors.walletProvider && <p className="form-group__error">{errors.walletProvider}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-group__label">Wallet ID / Phone</label>
                        <input
                          type="text"
                          className={`form-group__input ${errors.walletId ? 'form-group__input--error' : ''}`}
                          value={formData.walletId || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, walletId: e.target.value }))}
                          placeholder="+91 XXXXX XXXXX"
                        />
                        {errors.walletId && <p className="form-group__error">{errors.walletId}</p>}
                      </div>
                    </>
                  )}

                  {selectedType === 'netbanking' && (
                    <>
                      <div className="form-group">
                        <label className="form-group__label">Bank Name</label>
                        <select
                          className={`form-group__input ${errors.bankName ? 'form-group__input--error' : ''}`}
                          value={formData.bankName || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                        >
                          <option value="">Select bank</option>
                          <option value="HDFC">HDFC Bank</option>
                          <option value="ICICI">ICICI Bank</option>
                          <option value="SBI">State Bank of India</option>
                          <option value="Axis">Axis Bank</option>
                        </select>
                        {errors.bankName && <p className="form-group__error">{errors.bankName}</p>}
                      </div>

                      <div className="form-group">
                        <label className="form-group__label">Account Number</label>
                        <input
                          type="text"
                          className={`form-group__input ${errors.accountNumber ? 'form-group__input--error' : ''}`}
                          value={formData.accountNumber || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value.replace(/\D/g, '') }))}
                          placeholder="Enter account number"
                        />
                        {errors.accountNumber && <p className="form-group__error">{errors.accountNumber}</p>}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="modal__actions">
              {selectedType ? (
                <>
                  <button className="btn btn--secondary" onClick={() => setSelectedType(null)}>
                    Back
                  </button>
                  <button className="btn btn--primary" onClick={handleSave}>
                    Save
                  </button>
                </>
              ) : (
                <button className="btn btn--secondary btn--full" onClick={handleCloseModal}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsSection;
