

﻿import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Camera } from 'lucide-react';
import './RaiseTicketPage.css';

const ISSUE_TYPES = [
    'Select Issue Type',
    'Charging Station Issue',
    'Charging Session Failed',
    'Connector Damaged',
    'Payment Issue',
    'Wallet Issue',
    'Reservation Problem',
    'Charging Speed Too Slow',
    'Charger Offline',
    'Mobile App Bug',
    'Login Issue',
    'Account Issue',
    'Vehicle Compatibility',
    'Refund Request',
    'Billing Problem',
    'Suggestion',
    'Other'
];

const CATEGORIES = {
    'Charging Station Issue': ['Station Closed', 'Charger Offline', 'Connector Locked', 'Charging Interrupted', 'RFID Failed', 'QR Code Not Working'],
    'Charging Session Failed': ['Session Not Starting', 'Session Ended Prematurely', 'Authentication Failed', 'Connection Lost'],
    'Connector Damaged': ['Cable Damage', 'Connector Broken', 'Socket Issue', 'Physical Damage'],
    'Payment Issue': ['Double Payment', 'Failed Payment', 'Payment Pending', 'Card Declined'],
    'Wallet Issue': ['Wallet Not Updated', 'Insufficient Balance', 'Refund Not Received', 'Transaction Failed'],
    'Reservation Problem': ['Unable to Reserve', 'Reservation Expired', 'Slot Occupied', 'Cancellation Issue'],
    'Charging Speed Too Slow': ['Below Expected Speed', 'Speed Fluctuation', 'Charger Limitation'],
    'Charger Offline': ['Network Issue', 'Power Outage', 'Maintenance Mode', 'System Error'],
    'Mobile App Bug': ['App Crash', 'UI Issue', 'Feature Not Working', 'Sync Problem'],
    'Login Issue': ['Invalid Credentials', 'OTP Not Received', 'Account Locked', 'Password Reset'],
    'Account Issue': ['Profile Update', 'Email Change', 'Phone Change', 'Account Deletion'],
    'Vehicle Compatibility': ['Connector Mismatch', 'Vehicle Not Recognized', 'Charging Protocol Issue'],
    'Refund Request': ['Duplicate Charge', 'Service Not Provided', 'Overcharged', 'Cancellation Refund'],
    'Billing Problem': ['Invoice Issue', 'Tax Calculation', 'Rate Discrepancy', 'Billing Cycle'],
    'Suggestion': ['Feature Request', 'Improvement Idea', 'Feedback', 'General Suggestion'],
    'Other': ['General Inquiry', 'Partnership', 'Media Inquiry', 'Other']
};

const CONNECTOR_TYPES = ['CCS2', 'Type 2', 'CHAdeMO', 'GB/T', 'AC Socket'];

const RaiseTicketPage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        issueType: '',
        category: '',
        station: '',
        connectorType: '',
        vehicle: '',
        incidentDate: '',
        incidentTime: '',
        description: ''
    });
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [ticketId, setTicketId] = useState('');

    const handleBack = () => {
        navigate(-1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'issueType' ? { category: '' } : {})
        }));
    };

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            alert('Maximum 5 images allowed');
            return;
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const newImages = [];

        files.forEach(file => {
            if (validTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    newImages.push({
                        file,
                        preview: event.target.result,
                        name: file.name
                    });
                    if (newImages.length === files.filter(f => validTypes.includes(f.type)).length) {
                        setImages(prev => [...prev, ...newImages]);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.issueType || formData.issueType === 'Select Issue Type') {
            alert('Please select an issue type');
            return;
        }
        if (!formData.category) {
            alert('Please select a problem category');
            return;
        }
        if (!formData.description || formData.description.length < 20) {
            alert('Please provide a detailed description (minimum 20 characters)');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const generatedTicketId = `TKT-${Math.floor(Math.random() * 90000) + 10000}`;
            setTicketId(generatedTicketId);
            setIsSubmitting(false);
            setShowSuccess(true);
        }, 2000);
    };

    const handleGoToMyTickets = () => {
        navigate('/support/my-tickets');
    };

    const handleBackToHome = () => {
        navigate('/home');
    };

    if (showSuccess) {
        return (
            <div className="raise-ticket-page">
                <div className="success-container">
                    <div className="success-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                    <h2 className="success-title">Ticket Submitted Successfully</h2>
                    <p className="success-subtitle">Ticket ID: <span className="ticket-id">{ticketId}</span></p>
                    <p className="success-message">Our support team will review your ticket and respond within 24-48 hours.</p>
                    <div className="success-actions">
                        <button className="btn btn--secondary" onClick={handleBackToHome}>
                            Back to Home
                        </button>
                        <button className="btn btn--primary" onClick={handleGoToMyTickets}>
                            Go to My Tickets
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const availableCategories = formData.issueType && formData.issueType !== 'Select Issue Type' 
        ? (CATEGORIES[formData.issueType] || []) 
        : [];

    return (
        <div className="raise-ticket-page">
            <header className="raise-ticket-header">
                <button className="raise-ticket-header__back" onClick={handleBack} aria-label="Go back">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <h1 className="raise-ticket-header__title">Raise a Ticket</h1>
            </header>

            <form className="raise-ticket-form" onSubmit={handleSubmit}>
                {/* Issue Type */}
                <div className="form-group">
                    <label className="form-label">Issue Type *</label>
                    <select
                        name="issueType"
                        value={formData.issueType}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        {ISSUE_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Problem Category */}
                <div className="form-group">
                    <label className="form-label">Problem Category *</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-select"
                        disabled={!formData.issueType || formData.issueType === 'Select Issue Type'}
                    >
                        <option value="">Select Category</option>
                        {availableCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Charging Station */}
                <div className="form-group">
                    <label className="form-label">Charging Station</label>
                    <select
                        name="station"
                        value={formData.station}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="">Select Station</option>
                        <option value="station1">Main Street Charging Hub</option>
                        <option value="station2">Downtown EV Station</option>
                        <option value="station3">Mall Parking Charger</option>
                    </select>
                </div>

                {/* Connector Type */}
                <div className="form-group">
                    <label className="form-label">Connector Type</label>
                    <select
                        name="connectorType"
                        value={formData.connectorType}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="">Select Connector</option>
                        {CONNECTOR_TYPES.map(connector => (
                            <option key={connector} value={connector}>{connector}</option>
                        ))}
                    </select>
                </div>

                {/* Vehicle */}
                <div className="form-group">
                    <label className="form-label">Vehicle</label>
                    <select
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="">Select Vehicle</option>
                        <option value="vehicle1">Tesla Model 3</option>
                        <option value="vehicle2">Nissan Leaf</option>
                    </select>
                </div>

                {/* Incident Date & Time */}
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Incident Date</label>
                        <input
                            type="date"
                            name="incidentDate"
                            value={formData.incidentDate}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Incident Time</label>
                        <input
                            type="time"
                            name="incidentTime"
                            value={formData.incidentTime}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the issue in as much detail as possible..."
                        className="form-textarea"
                        rows="5"
                    />
                    <span className="form-hint">Minimum 20 characters</span>
                </div>

                {/* Upload Photos */}
                <div className="form-group">
                    <label className="form-label">Upload Photos</label>
                    <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            onChange={handleImageSelect}
                            className="upload-input"
                        />
                        <div className="upload-content">
                            <Upload size={32} strokeWidth={1.5} />
                            <p className="upload-text">Drag & drop or browse files</p>
                            <p className="upload-hint">Supports: JPG, PNG, WEBP (Max 5 images)</p>
                        </div>
                    </div>
                    {images.length > 0 && (
                        <div className="image-preview-grid">
                            {images.map((img, index) => (
                                <div key={index} className="image-preview-item">
                                    <img src={img.preview} alt={img.name} className="image-preview" />
                                    <button
                                        type="button"
                                        className="image-remove-btn"
                                        onClick={() => removeImage(index)}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                </button>
            </form>
        </div>
    );
};

export default RaiseTicketPage;
