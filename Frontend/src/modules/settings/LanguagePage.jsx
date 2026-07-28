import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsSubPage.css';

const LanguagePage = () => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBack = () => navigate('/settings');

    const languages = [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'es', name: 'Spanish', native: 'Español' },
        { code: 'fr', name: 'French', native: 'Français' },
        { code: 'de', name: 'German', native: 'Deutsch' },
        { code: 'it', name: 'Italian', native: 'Italiano' },
        { code: 'pt', name: 'Portuguese', native: 'Português' },
        { code: 'zh', name: 'Chinese', native: '中文' },
        { code: 'ja', name: 'Japanese', native: '日本語' },
        { code: 'ko', name: 'Korean', native: '한국어' },
        { code: 'ar', name: 'Arabic', native: 'العربية' }
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
                    <h2 className="success-title">Language Updated!</h2>
                    <p className="success-text">Your language preference has been saved</p>
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
                <h1 className="settings-sub-title">Language</h1>
            </div>

            <div className="settings-sub-form">
                <div className="language-list">
                    {languages.map((lang) => (
                        <label key={lang.code} className="language-item">
                            <input
                                type="radio"
                                name="language"
                                value={lang.code}
                                checked={selectedLanguage === lang.code}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="language-radio"
                            />
                            <div className={`language-card ${selectedLanguage === lang.code ? 'selected' : ''}`}>
                                <span className="language-native">{lang.native}</span>
                                <span className="language-name">{lang.name}</span>
                                {selectedLanguage === lang.code && (
                                    <div className="language-check">
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

export default LanguagePage;
