import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsSubPage.css';

const ChargingSpeedPage = () => {
    const navigate = useNavigate();
    const [selectedSpeed, setSelectedSpeed] = useState('fast');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBack = () => navigate('/settings');

    const speeds = [
        { value: 'slow', label: 'Slow (AC)', description: '3-7 kW - Home charging, overnight' },
        { value: 'fast', label: 'Fast (DC)', description: '50-150 kW - Public charging stations' },
        { value: 'ultra-fast', label: 'Ultra Fast (DC)', description: '150-350 kW - High-speed charging hubs' }
    ];

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
                    <h2 className="success-title">Preference Saved!</h2>
                    <p className="success-text">Your charging speed preference has been updated</p>
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
                <h1 className="settings-sub-title">Preferred Charging Speed</h1>
            </div>

            <div className="settings-sub-form">
                <div className="speed-info">
                    <p>Select your preferred charging speed. This will be used as the default when searching for stations.</p>
                </div>

                <div className="options-list">
                    {speeds.map((speed) => (
                        <label key={speed.value} className="option-item">
                            <input
                                type="radio"
                                name="charging-speed"
                                value={speed.value}
                                checked={selectedSpeed === speed.value}
                                onChange={(e) => setSelectedSpeed(e.target.value)}
                                className="option-radio"
                            />
                            <div className={`option-card ${selectedSpeed === speed.value ? 'selected' : ''}`}>
                                <span className="option-label">{speed.label}</span>
                                <span className="option-description">{speed.description}</span>
                                {selectedSpeed === speed.value && (
                                    <div className="option-check">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </label>
                    ))}
                </div>

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

export default ChargingSpeedPage;
