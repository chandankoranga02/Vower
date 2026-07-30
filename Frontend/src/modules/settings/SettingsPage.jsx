import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { X, ChevronLeft } from 'lucide-react';
import './SettingsPage.css';

// Import section components
import ChangePasswordSection from './components/ChangePasswordSection';
import EmailSection from './components/EmailSection';
import PhoneSection from './components/PhoneSection';
import TwoFactorSection from './components/TwoFactorSection';
import LanguageSection from './components/LanguageSection';
import NotificationsSection from './components/NotificationsSection';
import LocationPermissionSection from './components/LocationPermissionSection';
import ChargingSpeedSection from './components/ChargingSpeedSection';
import ConnectorTypeSection from './components/ConnectorTypeSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import LogoutModal from './components/LogoutModal';
import Toast from './components/Toast';

const SECTIONS = [
  { id: 'security', label: 'Security', icon: '🔒' },
  { id: 'communication', label: 'Communication', icon: '📧' },
  { id: 'preferences', label: 'Preferences', icon: '⚙️' },
  { id: 'payment', label: 'Payment', icon: '💳' },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [activeSection, setActiveSection] = useState('security');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // User settings state
  const [settings, setSettings] = useState({
    // Security
    twoFactorEnabled: false,
    twoFactorMethod: null,
    
    // Communication
    email: user?.email || '',
    phone: user?.phone || '',
    language: 'English',
    
    // Notifications
    notificationsEnabled: true,
    reservationAlerts: true,
    chargingCompleted: true,
    promotions: false,
    newStations: true,
    maintenanceAlerts: true,
    
    // Preferences
    locationPermission: 'whileUsing',
    preferredChargingSpeed: 'fast',
    preferredConnectorType: 'ccs2',
    
    // Payment
    paymentMethods: [],
    defaultPaymentMethod: null,
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    showToast('Logged out successfully', 'success');
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'security':
        return (
          <>
            <ChangePasswordSection showToast={showToast} />
            <EmailSection 
              currentEmail={settings.email}
              onUpdateEmail={(newEmail) => {
                updateSetting('email', newEmail);
                showToast('Email updated successfully', 'success');
              }}
              showToast={showToast}
            />
            <PhoneSection 
              currentPhone={settings.phone}
              onUpdatePhone={(newPhone) => {
                updateSetting('phone', newPhone);
                showToast('Phone number updated successfully', 'success');
              }}
              showToast={showToast}
            />
            <TwoFactorSection 
              enabled={settings.twoFactorEnabled}
              method={settings.twoFactorMethod}
              onToggle={(enabled, method) => {
                updateSetting('twoFactorEnabled', enabled);
                updateSetting('twoFactorMethod', method);
                showToast(enabled ? '2FA enabled successfully' : '2FA disabled successfully', 'success');
              }}
              showToast={showToast}
            />
          </>
        );
      
      case 'communication':
        return (
          <>
            <LanguageSection 
              selectedLanguage={settings.language}
              onSelectLanguage={(lang) => {
                updateSetting('language', lang);
                showToast(`Language changed to ${lang}`, 'success');
              }}
              showToast={showToast}
            />
            <NotificationsSection 
              enabled={settings.notificationsEnabled}
              preferences={{
                reservationAlerts: settings.reservationAlerts,
                chargingCompleted: settings.chargingCompleted,
                promotions: settings.promotions,
                newStations: settings.newStations,
                maintenanceAlerts: settings.maintenanceAlerts,
              }}
              onToggleGlobal={(enabled) => {
                updateSetting('notificationsEnabled', enabled);
                if (!enabled) {
                  updateSetting('reservationAlerts', false);
                  updateSetting('chargingCompleted', false);
                  updateSetting('promotions', false);
                  updateSetting('newStations', false);
                  updateSetting('maintenanceAlerts', false);
                }
                showToast(enabled ? 'Notifications enabled' : 'Notifications disabled', 'success');
              }}
              onTogglePreference={(key, value) => {
                updateSetting(key, value);
              }}
              showToast={showToast}
            />
          </>
        );
      
      case 'preferences':
        return (
          <>
            <LocationPermissionSection 
              permission={settings.locationPermission}
              onChange={(permission) => {
                updateSetting('locationPermission', permission);
                showToast('Location permission updated', 'success');
              }}
              showToast={showToast}
            />
            <ChargingSpeedSection 
              selectedSpeed={settings.preferredChargingSpeed}
              onSelect={(speed) => {
                updateSetting('preferredChargingSpeed', speed);
                showToast('Charging speed preference updated', 'success');
              }}
              showToast={showToast}
            />
            <ConnectorTypeSection 
              selectedType={settings.preferredConnectorType}
              onSelect={(type) => {
                updateSetting('preferredConnectorType', type);
                showToast('Connector type preference updated', 'success');
              }}
              showToast={showToast}
            />
          </>
        );
      
      case 'payment':
        return (
          <PaymentMethodsSection 
            paymentMethods={settings.paymentMethods}
            defaultMethod={settings.defaultPaymentMethod}
            onAddMethod={(method) => {
              updateSetting('paymentMethods', [...settings.paymentMethods, method]);
              if (!settings.defaultPaymentMethod) {
                updateSetting('defaultPaymentMethod', method.id);
              }
              showToast('Payment method added successfully', 'success');
            }}
            onRemoveMethod={(id) => {
              updateSetting('paymentMethods', settings.paymentMethods.filter(m => m.id !== id));
              if (settings.defaultPaymentMethod === id) {
                updateSetting('defaultPaymentMethod', null);
              }
              showToast('Payment method removed', 'success');
            }}
            onSetDefault={(id) => {
              updateSetting('defaultPaymentMethod', id);
              showToast('Default payment method updated', 'success');
            }}
            showToast={showToast}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <header className="settings-header">
        <button 
          className="settings-header__back" 
          onClick={handleBack}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="settings-header__title">Settings</h1>
        <div className="settings-header__spacer" />
      </header>

      {/* Section Tabs */}
      <nav className="settings-tabs">
        {SECTIONS.map(section => (
          <button
            key={section.id}
            className={`settings-tabs__tab ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="settings-tabs__icon">{section.icon}</span>
            <span className="settings-tabs__label">{section.label}</span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="settings-content">
        {renderSection()}
      </main>

      {/* Logout Button */}
      <div className="settings-footer">
        <button 
          className="settings-footer__logout"
          onClick={() => setShowLogoutModal(true)}
        >
          Logout
        </button>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal 
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {/* Toast Notification */}
      {toast.show && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default SettingsPage;
