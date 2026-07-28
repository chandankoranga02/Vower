import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, CreditCard, Smartphone, Wallet } from 'lucide-react';
import './PaymentMethodPage.css';

const PaymentMethodPage = () => {
    const navigate = useNavigate();
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'card', name: 'Visa ending in 4242', isDefault: true },
        { id: 2, type: 'upi', name: 'user@paytm', isDefault: false }
    ]);
    const [defaultId, setDefaultId] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBack = () => navigate('/settings');

    const handleSetDefault = (id) => {
        setDefaultId(id);
        setPaymentMethods(prev => prev.map(m => ({ ...m, isDefault: m.id === id })));
    };

    const handleRemove = (id) => {
        setPaymentMethods(prev => prev.filter(m => m.id !== id));
    };

    const handleAddMethod = (type) => {
        const newMethod = {
            id: Date.now(),
            type,
            name: type === 'card' ? 'New Card' : type === 'upi' ? 'New UPI ID' : 'Wallet Balance',
            isDefault: paymentMethods.length === 0
        };
        setPaymentMethods([...paymentMethods, newMethod]);
        if (newMethod.isDefault) setDefaultId(newMethod.id);
        setShowAddDialog(false);
        setShowSuccess(true);
        
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const methodIcons = {
        card: <CreditCard size={24} />,
        upi: <Smartphone size={24} />,
        wallet: <Wallet size={24} />
    };

    return (
        <div className="settings-sub-page">
            <div className="settings-sub-header">
                <button className="settings-sub-back" onClick={handleBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h1 className="settings-sub-title">Payment Methods</h1>
            </div>

            <div className="settings-sub-form">
                {showSuccess && (
                    <div className="success-toast">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Payment method added successfully</span>
                    </div>
                )}

                <div className="payment-list">
                    {paymentMethods.map((method) => (
                        <div key={method.id} className="payment-card">
                            <div className="payment-icon">
                                {methodIcons[method.type]}
                            </div>
                            <div className="payment-info">
                                <h4>{method.name}</h4>
                                {method.isDefault && <span className="default-badge">Default</span>}
                            </div>
                            <div className="payment-actions">
                                {!method.isDefault && (
                                    <button 
                                        className="action-btn"
                                        onClick={() => handleSetDefault(method.id)}
                                    >
                                        Set Default
                                    </button>
                                )}
                                <button 
                                    className="action-btn remove"
                                    onClick={() => handleRemove(method.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    className="add-payment-btn"
                    onClick={() => setShowAddDialog(true)}
                >
                    <Plus size={20} />
                    Add Payment Method
                </button>
            </div>

            {/* Add Payment Dialog */}
            {showAddDialog && (
                <div className="dialog-overlay" onClick={() => setShowAddDialog(false)}>
                    <div className="dialog payment-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="dialog__header">
                            <h3 className="dialog__title">Add Payment Method</h3>
                            <button className="dialog__close" onClick={() => setShowAddDialog(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="dialog__content">
                            <p className="dialog-description">Select a payment method to add:</p>
                            <div className="method-list">
                                <button
                                    className="method-item"
                                    onClick={() => handleAddMethod('card')}
                                >
                                    <div className="method-icon"><CreditCard size={24} /></div>
                                    <div className="method-info">
                                        <h4>Credit/Debit Card</h4>
                                        <p>Add a new card</p>
                                    </div>
                                </button>
                                <button
                                    className="method-item"
                                    onClick={() => handleAddMethod('upi')}
                                >
                                    <div className="method-icon"><Smartphone size={24} /></div>
                                    <div className="method-info">
                                        <h4>UPI</h4>
                                        <p>Link your UPI ID</p>
                                    </div>
                                </button>
                                <button
                                    className="method-item"
                                    onClick={() => handleAddMethod('wallet')}
                                >
                                    <div className="method-icon"><Wallet size={24} /></div>
                                    <div className="method-info">
                                        <h4>Wallet</h4>
                                        <p>Add funds to wallet</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="dialog__actions">
                            <button className="dialog__btn dialog__btn--secondary" onClick={() => setShowAddDialog(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentMethodPage;
