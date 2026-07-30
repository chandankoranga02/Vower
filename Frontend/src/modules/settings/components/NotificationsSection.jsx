import React from 'react';

const NotificationsSection = ({ 
  enabled, 
  preferences, 
  onToggleGlobal, 
  onTogglePreference,
  showToast 
}) => {
  const notificationTypes = [
    { key: 'reservationAlerts', label: 'Reservation Alerts', description: 'Get notified about your charging reservations' },
    { key: 'chargingCompleted', label: 'Charging Completed', description: 'Alert when your vehicle is fully charged' },
    { key: 'promotions', label: 'Promotions', description: 'Receive special offers and discounts' },
    { key: 'newStations', label: 'New Stations', description: 'Notify when new stations are added nearby' },
    { key: 'maintenanceAlerts', label: 'Maintenance Alerts', description: 'Updates about station maintenance' },
  ];

  return (
    <div className="settings-section">
      <h3 className="settings-section__title">Notifications</h3>

      <div className="toggle-row" style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '16px', marginBottom: '16px' }}>
        <div>
          <p className="toggle-row__label" style={{ fontWeight: '600' }}>Enable All Notifications</p>
          <p className="toggle-row__description">Turn all notifications on or off</p>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            className="toggle-switch__input"
            checked={enabled}
            onChange={(e) => onToggleGlobal(e.target.checked)}
          />
          <span className="toggle-switch__slider" />
        </label>
      </div>

      <div style={{ opacity: enabled ? 1 : 0.5, pointerEvents: enabled ? 'auto' : 'none' }}>
        {notificationTypes.map((item, index) => (
          <div 
            key={item.key} 
            className="toggle-row"
            style={{ borderBottom: index < notificationTypes.length - 1 ? '1px solid #f3f4f6' : 'none' }}
          >
            <div>
              <p className="toggle-row__label">{item.label}</p>
              <p className="toggle-row__description">{item.description}</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch__input"
                checked={preferences[item.key]}
                onChange={(e) => onTogglePreference(item.key, e.target.checked)}
                disabled={!enabled}
              />
              <span className="toggle-switch__slider" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSection;
