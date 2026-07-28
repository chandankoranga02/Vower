import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import './NotificationsPage.css';

const NotificationsPage = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        enabled: true,
        reservationAlerts: true,
        chargingCompleted: true,
        promotions: false,
        newStations: true,
        maintenanceAlerts: true
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBack = () => navigate('/settings');

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setShowSuccess(true);

        setTimeout(() => {
            navigate('/settings');
        }, 1500);
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
                    <h2 className="success-title">Settings Saved!</h2>
                    <p className="success-text">Your notification preferences have been updated</p>
                </div>
            </div>
        );
    }

    const notificationOptions = [
        { key: 'reservationAlerts', label: 'Reservation Alerts', description: 'Get notified about your upcoming reservations' },
        { key: 'chargingCompleted', label: 'Charging Completed', description: 'Receive alerts when charging is complete' },
        { key: 'promotions', label: 'Promotions', description: 'Stay updated with special offers and discounts' },
        { key: 'newStations', label: 'New Stations', description: 'Be the first to know about new charging stations' },
        { key: 'maintenanceAlerts', label: 'Maintenance Alerts', description: 'Get notified about scheduled maintenance' }
    ];

    return (
        <div className="settings-sub-page">
            <div className="settings-sub-header">
                <button className="settings-sub-back" onClick={handleBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h1 className="settings-sub-title">Notifications</h1>
            </div>

            <div className="settings-sub-form">
                <div className="notif-main-toggle">
                    <div className="notif-main-info">
                        <Bell size={24} />
                        <span>Enable Notifications</span>
                    </div>
                    <button 
                        className={`twofa-toggle ${settings.enabled ? 'active' : ''}`}
                        onClick={() => toggleSetting('enabled')}
                    >
                        <div className="twofa-toggle-knob"></div>
                    </button>
                </div>

                {settings.enabled && (
                    <div className="notif-options">
                        {notificationOptions.map((option) => (
                            <div key={option.key} className="notif-option">
                                <div className="notif-option-info">
                                    <h4>{option.label}</h4>
                                    <p>{option.description}</p>
                                </div>
                                <button 
                                    className={`twofa-toggle ${settings[option.key] ? 'active' : ''}`}
                                    onClick={() => toggleSetting(option.key)}
                                >
                                    <div className="twofa-toggle-knob"></div>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={handleBack}>
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        className="btn-primary" 
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
