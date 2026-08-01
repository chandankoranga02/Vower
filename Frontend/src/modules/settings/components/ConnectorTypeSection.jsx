import React from 'react';

const ConnectorTypeSection = ({ selectedType, onSelect, showToast }) => {
  const options = [
    { id: 'ccs2', label: 'CCS2', description: 'Combined Charging System', icon: '🔌' },
    { id: 'type2', label: 'Type 2', description: 'Mennekes connector', icon: '⚡' },
    { id: 'chademo', label: 'CHAdeMO', description: 'Japanese fast charging', icon: '🇯🇵' },
    { id: 'auto', label: 'Auto Detect', description: 'Automatically detect', icon: '🤖' },
  ];

  return (
    <div className="settings-section">
      <h3 className="settings-section__title">Preferred Connector Type</h3>

      <div className="card-options">
        {options.map((option) => (
          <div
            key={option.id}
            className={`card-option ${selectedType === option.id ? 'card-option--selected' : ''}`}
            onClick={() => onSelect(option.id)}
          >
            <span className="card-option__icon">{option.icon}</span>
            <span className="card-option__label">{option.label}</span>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              {option.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '16px', padding: '12px', background: '#eff6ff', borderRadius: '8px' }}>
        <p style={{ fontSize: '14px', color: '#1e40af', margin: 0 }}>
          Current: <strong>{options.find(o => o.id === selectedType)?.label}</strong>
        </p>
      </div>
    </div>
  );
};

export default ConnectorTypeSection;
