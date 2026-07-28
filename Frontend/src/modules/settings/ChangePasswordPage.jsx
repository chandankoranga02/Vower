import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Eye, EyeOff } from 'lucide-react';
import './SettingsSubPage.css';

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBack = () => navigate(-1);

    const validateForm = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
        setShowSuccess(true);
        
        setTimeout(() => {
            navigate('/settings');
        }, 2000);
    };

    const togglePassword = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
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
                    <h2 className="success-title">Password Changed!</h2>
                    <p className="success-text">Your password has been updated successfully</p>
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
                <h1 className="settings-sub-title">Change Password</h1>
            </div>

            <form className="settings-sub-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPasswords.current ? 'text' : 'password'}
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                            className={`form-input ${errors.currentPassword ? 'error' : ''}`}
                            placeholder="Enter current password"
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => togglePassword('current')}
                        >
                            {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">New Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPasswords.new ? 'text' : 'password'}
                            value={formData.newPassword}
                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                            className={`form-input ${errors.newPassword ? 'error' : ''}`}
                            placeholder="Enter new password"
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => togglePassword('new')}
                        >
                            {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPasswords.confirm ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                            placeholder="Confirm new password"
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => togglePassword('confirm')}
                        >
                            {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={handleBack}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Password'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordPage;
