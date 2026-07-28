import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsSubPage.css';

const LocationPermissionPage = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('while-using');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBack = () => navigate('/settings');

    const options = [
        { value: 'always', label: 'Always Allow', description: 'Allow location access even when the app is closed' },
        { value: 'while-using', label: 'While Using App', description: 'Allow location access only when using the app' },
        { value: 'ask-every-time', label: 'Ask Every Time', description: 'Ask for permission each time you open the app' },
        { value: 'never', label: 'Never', description: 'Do not allow location access' }
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
                    <p className="success-text">Your location permission has been updated</p>
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
                <h1 className="settings-sub-title">Location Permission</h1>
            </div>

            <div className="settings-sub-form">
                <div className="permission-info">
                    <p>We use your location to find nearby charging stations and provide navigation.</p>
                </div>

                <div className="options-list">
                    {options.map((option) => (
                        <label key={option.value} className="option-item">
                            <input
                                type="radio"
                                name="location-permission"
                                value={option.value}
                                checked={selectedOption === option.value}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                className="option-radio"
                            />
                            <div className={`option-card ${selectedOption === option.value ? 'selected' : ''}`}>
                                <span className="option-label">{option.label}</span>
                                <span className="option-description">{option.description}</span>
                                {selectedOption === option.value && (
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

export default LocationPermissionPage;
