import React, { useState } from 'react';

const LanguageSection = ({ selectedLanguage, onSelectLanguage, showToast }) => {
  const [tempSelection, setTempSelection] = useState(selectedLanguage);
  const [showSaved, setShowSaved] = useState(false);

  const languages = [
    { id: 'en', name: 'English', nativeName: 'English' },
    { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { id: 'es', name: 'Spanish', nativeName: 'Español' },
    { id: 'de', name: 'German', nativeName: 'Deutsch' },
    { id: 'fr', name: 'French', nativeName: 'Français' },
    { id: 'zh', name: 'Chinese', nativeName: '中文' },
    { id: 'ja', name: 'Japanese', nativeName: '日本語' },
    { id: 'ko', name: 'Korean', nativeName: '한국어' },
  ];

  const handleSelect = (lang) => {
    setTempSelection(lang);
  };

  const handleSave = () => {
    if (tempSelection !== selectedLanguage) {
      onSelectLanguage(tempSelection);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }
  };

  const handleCancel = () => {
    setTempSelection(selectedLanguage);
  };

  return (
    <div className="settings-section">
      <h3 className="settings-section__title">Language</h3>

      <div className="radio-options">
        {languages.map((lang) => (
          <label
            key={lang.id}
            className={`radio-option ${tempSelection === lang.name ? 'radio-option--selected' : ''}`}
          >
            <input
              type="radio"
              name="language"
              className="radio-option__input"
              checked={tempSelection === lang.name}
              onChange={() => handleSelect(lang.name)}
            />
            <span className="radio-option__indicator" />
            <div style={{ flex: 1 }}>
              <span className="radio-option__label">{lang.name}</span>
              {lang.nativeName !== lang.name && (
                <span style={{ marginLeft: '8px', color: '#6b7280', fontSize: '14px' }}>
                  {lang.nativeName}
                </span>
              )}
            </div>
          </label>
        ))}
      </div>

      {showSaved && (
        <p style={{ color: '#10b981', fontSize: '14px', marginTop: '12px', textAlign: 'center' }}>
          ✓ Language preference saved
        </p>
      )}

      <div className="btn-group">
        <button className="btn btn--secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button 
          className="btn btn--primary" 
          onClick={handleSave}
          disabled={tempSelection === selectedLanguage}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LanguageSection;
