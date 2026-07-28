import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import './SettingsPage.css';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const handleMenuItemClick = (itemId) => {
        const routes = {
            'change-password': '/settings/change-password',
            'email': '/settings/email',
            'phone': '/settings/phone',
            'two-factor': '/settings/two-factor',
            'language': '/settings/language',
            'notifications': '/settings/notifications',
            'location': '/settings/location',
            'charging-speed': '/settings/charging-speed',
            'connector': '/settings/connector',
            'payment': '/settings/payment',
        };

        if (routes[itemId]) {
            navigate(routes[itemId]);
        } else if (itemId === 'logout') {
            setShowLogoutDialog(true);
        }
    };

    const handleLogout = () => {
        // Clear auth session
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
    };

    return (
        <div className="settings-page">
            <div className="settings-header">
                <button className="settings-header__back" onClick={handleBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h1 className="settings-header__title">Settings</h1>
            </div>

            <div className="settings-content">
                {/* Security Section */}
                <div className="settings-section">
                    <h3 className="settings-section__title">Security</h3>
                    <div className="settings-list">
                        <SettingsItem icon="lock" label="Change Password" onClick={() => handleMenuItemClick('change-password')} />
                        <SettingsItem icon="mail" label="Email Address" onClick={() => handleMenuItemClick('email')} />
                        <SettingsItem icon="phone" label="Phone Number" onClick={() => handleMenuItemClick('phone')} />
                        <SettingsItem icon="shield" label="Two-Factor Authentication" onClick={() => handleMenuItemClick('two-factor')} />
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="settings-section">
                    <h3 className="settings-section__title">Preferences</h3>
                    <div className="settings-list">
                        <SettingsItem icon="globe" label="Language" onClick={() => handleMenuItemClick('language')} />
                        <SettingsItem icon="bell" label="Notifications" onClick={() => handleMenuItemClick('notifications')} />
                        <SettingsItem icon="map-pin" label="Location Permission" onClick={() => handleMenuItemClick('location')} />
                    </div>
                </div>

                {/* Charging Settings Section */}
                <div className="settings-section">
                    <h3 className="settings-section__title">Charging Settings</h3>
                    <div className="settings-list">
                        <SettingsItem icon="zap" label="Preferred Charging Speed" onClick={() => handleMenuItemClick('charging-speed')} />
                        <SettingsItem icon="plug" label="Preferred Connector" onClick={() => handleMenuItemClick('connector')} />
                    </div>
                </div>

                {/* Payment Section */}
                <div className="settings-section">
                    <h3 className="settings-section__title">Payment</h3>
                    <div className="settings-list">
                        <SettingsItem icon="credit-card" label="Payment Method" onClick={() => handleMenuItemClick('payment')} />
                    </div>
                </div>

                {/* Account Section */}
                <div className="settings-section">
                    <div className="settings-list">
                        <button className="settings-item settings-item--danger" onClick={() => handleMenuItemClick('logout')}>
                            <div className="settings-item__icon settings-item__icon--danger">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className="settings-item__label">Logout</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c0c0c0" strokeWidth="2" className="settings-item__chevron">
                                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Dialog */}
            {showLogoutDialog && (
                <div className="dialog-overlay" onClick={() => setShowLogoutDialog(false)}>
                    <div className="dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="dialog__header">
                            <h3 className="dialog__title">Logout</h3>
                            <button className="dialog__close" onClick={() => setShowLogoutDialog(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="dialog__content">
                            <p>Are you sure you want to logout?</p>
                        </div>
                        <div className="dialog__actions">
                            <button className="dialog__btn dialog__btn--secondary" onClick={() => setShowLogoutDialog(false)}>
                                Cancel
                            </button>
                            <button className="dialog__btn dialog__btn--danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const SettingsItem = ({ icon, label, onClick }) => {
    const iconPaths = {
        lock: <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM12 7V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3" strokeLinecap="round" strokeLinejoin="round"/>,
        mail: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>,
        phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>,
        shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>,
        globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round"/></>,
        bell: <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>,
        'map-pin': <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/></>,
        zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round"/>,
        plug: <><path d="M12 22v-5M9 17l6 0M5 12H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"/><path d="M19 12h3a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3" strokeLinecap="round" strokeLinejoin="round"/></>,
        'credit-card': <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><path d="M1 10h22" strokeLinecap="round" strokeLinejoin="round"/></>,
    };

    return (
        <button className="settings-item" onClick={onClick}>
            <div className="settings-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {iconPaths[icon]}
                </svg>
            </div>
            <span className="settings-item__label">{label}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c0c0c0" strokeWidth="2" className="settings-item__chevron">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
};

export default SettingsPage;
