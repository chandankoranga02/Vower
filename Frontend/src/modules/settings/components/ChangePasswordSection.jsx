import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const ChangePasswordSection = ({ showToast }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const togglePassword = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    if (!validate()) {
      showToast('Please fix the errors', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    showToast('Password changed successfully', 'success');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleCancel = () => {
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="settings-section">
      <h3 className="settings-section__title">Change Password</h3>
      
      <div className="form-group">
        <label className="form-group__label">Current Password</label>
        <div className="password-input-wrapper">
          <input
            type={showPasswords.current ? 'text' : 'password'}
            className={`form-group__input ${errors.currentPassword ? 'form-group__input--error' : ''}`}
            value={formData.currentPassword}
            onChange={(e) => handleChange('currentPassword', e.target.value)}
            placeholder="Enter current password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => togglePassword('current')}
            aria-label={showPasswords.current ? 'Hide password' : 'Show password'}
          >
            {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.currentPassword && <p className="form-group__error">{errors.currentPassword}</p>}
      </div>

      <div className="form-group">
        <label className="form-group__label">New Password</label>
        <div className="password-input-wrapper">
          <input
            type={showPasswords.new ? 'text' : 'password'}
            className={`form-group__input ${errors.newPassword ? 'form-group__input--error' : ''}`}
            value={formData.newPassword}
            onChange={(e) => handleChange('newPassword', e.target.value)}
            placeholder="Enter new password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => togglePassword('new')}
            aria-label={showPasswords.new ? 'Hide password' : 'Show password'}
          >
            {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.newPassword && <p className="form-group__error">{errors.newPassword}</p>}
      </div>

      <div className="form-group">
        <label className="form-group__label">Confirm New Password</label>
        <div className="password-input-wrapper">
          <input
            type={showPasswords.confirm ? 'text' : 'password'}
            className={`form-group__input ${errors.confirmPassword ? 'form-group__input--error' : ''}`}
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="Confirm new password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => togglePassword('confirm')}
            aria-label={showPasswords.confirm ? 'Hide password' : 'Show password'}
          >
            {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="form-group__error">{errors.confirmPassword}</p>}
      </div>

      <div className="btn-group">
        <button className="btn btn--secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button 
          className="btn btn--primary btn--full" 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Password'}
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordSection;
