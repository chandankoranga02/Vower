import React from 'react';

const ChargingSpeedSection = ({ selectedSpeed, onSelect, showToast }) => {
  const options = [
    { id: 'slow', label: 'Slow (AC)', description: 'Standard charging, 3-8 hours', icon: '🐢' },
    { id: 'fast', label: 'Fast (DC)', description: 'Quick charging, 30-60 mins', icon: '⚡' },
    { id: 'ultra', label: 'Ultra Fast (HPC)', description: 'High power, 15-30 mins', icon: '🚀' },
  ];

  return (
    <div className="settings-section">
      <h3 className="settings-section__title">Preferred Charging Speed</h3>

      <div className="card-options">
        {options.map((option) => (
          <div
            key={option.id}
            className={`card-option ${selectedSpeed === option.id ? 'card-option--selected' : ''}`}
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
          Current: <strong>{options.find(o => o.id === selectedSpeed)?.label}</strong>
        </p>
      </div>
    </div>
  );
};

export default ChargingSpeedSection;
