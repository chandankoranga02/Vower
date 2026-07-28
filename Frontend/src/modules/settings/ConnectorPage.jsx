import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsSubPage.css';

const ConnectorPage = () => {
    const navigate = useNavigate();
    const [selectedConnectors, setSelectedConnectors] = useState(['auto']);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBack = () => navigate('/settings');

    const connectors = [
        { value: 'auto', label: 'Auto Detect', description: 'Automatically detect compatible connectors' },
        { value: 'ccs2', label: 'CCS2', description: 'Combined Charging System Type 2' },
        { value: 'type2', label: 'Type 2 (Mennekes)', description: 'European standard AC connector' },
        { value: 'chademo', label: 'CHAdeMO', description: 'Japanese fast charging standard' }
    ];

    const handleToggleConnector = (value) => {
        if (value === 'auto') {
            setSelectedConnectors(['auto']);
        } else {
            setSelectedConnectors(prev => {
                if (prev.includes('auto')) {
                    return [value];
                }
                if (prev.includes(value)) {
                    return prev.filter(c => c !== value);
                }
                return [...prev, value];
            });
        }
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
                    <h2 className="success-title">Preference Saved!</h2>
                    <p className="success-text">Your connector preference has been updated</p>
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
                <h1 className="settings-sub-title">Preferred Connector</h1>
            </div>

            <div className="settings-sub-form">
                <div className="connector-info">
                    <p>Select your preferred connector type. This will be used to filter charging stations.</p>
                </div>

                <div className="options-list">
                    {connectors.map((connector) => (
                        <label key={connector.value} className="option-item">
                            <input
                                type="checkbox"
                                name="connector"
                                value={connector.value}
                                checked={selectedConnectors.includes(connector.value)}
                                onChange={() => handleToggleConnector(connector.value)}
                                className="option-radio"
                                disabled={connector.value !== 'auto' && selectedConnectors.includes('auto')}
                            />
                            <div className={`option-card ${selectedConnectors.includes(connector.value) ? 'selected' : ''}`}>
                                <span className="option-label">{connector.label}</span>
                                <span className="option-description">{connector.description}</span>
                                {selectedConnectors.includes(connector.value) && (
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

export default ConnectorPage;
