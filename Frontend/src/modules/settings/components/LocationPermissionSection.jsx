import React from 'react';

const LocationPermissionSection = ({ permission, onChange, showToast }) => {
  const options = [
    { id: 'always', label: 'Always Allow', description: 'Allow location access at all times' },
    { id: 'whileUsing', label: 'While Using App', description: 'Only when the app is open' },
    { id: 'askEveryTime', label: 'Ask Every Time', description: 'Request permission each time' },
    { id: 'never', label: 'Never', description: 'Deny location access' },
  ];

  return (
    <div className="settings-section">
      <h3 className="settings-section__title">Location Permission</h3>

      <div className="radio-options">
        {options.map((option) => (
          <label
            key={option.id}
            className={`radio-option ${permission === option.id ? 'radio-option--selected' : ''}`}
          >
            <input
              type="radio"
              name="locationPermission"
              className="radio-option__input"
              checked={permission === option.id}
              onChange={() => onChange(option.id)}
            />
            <span className="radio-option__indicator" />
            <div style={{ flex: 1 }}>
              <span className="radio-option__label">{option.label}</span>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>

      <div style={{ marginTop: '16px', padding: '12px', background: '#eff6ff', borderRadius: '8px' }}>
        <p style={{ fontSize: '14px', color: '#1e40af', margin: 0 }}>
          Current: <strong>{options.find(o => o.id === permission)?.label}</strong>
        </p>
      </div>
    </div>
  );
};

export default LocationPermissionSection;
