import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, X, Camera, Image as ImageIcon, Calendar, CheckCircle } from 'lucide-react';
import './RaiseTicket.css';

const RaiseTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    issueType: '',
    category: '',
    description: '',
    incidentDate: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errors, setErrors] = useState({});

  const issueTypes = [
    'Charging Issue',
    'Reservation Issue',
    'Payment Issue',
    'Vehicle Issue',
    'Charging Station Issue',
    'Account Issue',
    'App Bug',
    'Other'
  ];

  const categories = {
    'Charging Issue': ['Session Stopped Early', 'Slow Charging', 'Connector Error', 'Unable to Start'],
    'Reservation Issue': ['Cannot Reserve', 'Reservation Cancelled', 'Wrong Time Slot', 'Station Unavailable'],
    'Payment Issue': ['Payment Failed', 'Overcharged', 'Refund Request', 'Billing Error'],
    'Vehicle Issue': ['Vehicle Not Recognized', 'Wrong Vehicle Data', 'Add Vehicle Problem'],
    'Charging Station Issue': ['Station Offline', 'Wrong Location', 'Amenities Not Available', 'Safety Concern'],
    'Account Issue': ['Login Problem', 'Profile Update', 'Email/Phone Change', 'Account Deletion'],
    'App Bug': ['Crash', 'UI Issue', 'Performance', 'Feature Request'],
    'Other': ['General Inquiry', 'Feedback', 'Partnership', 'Other']
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.issueType) {
      newErrors.issueType = 'Please select an issue type';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.description || formData.description.trim().length < 20) {
      newErrors.description = 'Please describe your issue in detail (minimum 20 characters)';
    }
    
    if (!formData.incidentDate) {
      newErrors.incidentDate = 'Please select incident date';
    } else {
      const selectedDate = new Date(formData.incidentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) {
        newErrors.incidentDate = 'Future dates are not allowed';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedTicketId = `EV-${Math.floor(Math.random() * 90000) + 10000}`;
    setTicketId(generatedTicketId);
    setLoading(false);
    setShowSuccess(true);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form? All data will be lost.')) {
      setFormData({
        issueType: '',
        category: '',
        description: '',
        incidentDate: ''
      });
      setImages([]);
      setErrors({});
    }
  };

  const getMaxDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="raise-ticket-page">
      {/* Header */}
      <div className="ticket-header">
        <button className="back-button" onClick={() => navigate('/help')}>
          <ChevronLeft size={24} />
        </button>
        <h1>Raise New Ticket</h1>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="ticket-content">
        {/* Issue Type */}
        <div className="form-group">
          <label>Issue Type *</label>
          <select
            value={formData.issueType}
            onChange={(e) => setFormData({ ...formData, issueType: e.target.value, category: '' })}
            className={`form-select ${errors.issueType ? 'error' : ''}`}
          >
            <option value="">Select Issue Type</option>
            {issueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.issueType && <span className="error-text">{errors.issueType}</span>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={`form-select ${errors.category ? 'error' : ''}`}
            disabled={!formData.issueType}
          >
            <option value="">Select Category</option>
            {formData.issueType && categories[formData.issueType].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Describe Your Issue *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your issue in detail..."
            rows={6}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
          />
          <span className="char-count">{formData.description.length}/500</span>
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        {/* Incident Date */}
        <div className="form-group">
          <label>Incident Date *</label>
          <div className="date-input-wrapper">
            <Calendar size={20} className="date-icon" />
            <input
              type="date"
              value={formData.incidentDate}
              onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
              max={getMaxDate()}
              className={`form-input ${errors.incidentDate ? 'error' : ''}`}
            />
          </div>
          {errors.incidentDate && <span className="error-text">{errors.incidentDate}</span>}
        </div>

        {/* Upload Images */}
        <div className="form-group">
          <label>Upload Photos (Optional)</label>
          <p className="helper-text">Maximum 5 images. Supported formats: JPG, PNG</p>
          
          <div className="image-upload-area">
            <label className="upload-btn">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={images.length >= 5}
                hidden
              />
              <Camera size={24} />
              <span>{images.length >= 5 ? 'Maximum Reached' : 'Upload Images'}</span>
            </label>
          </div>

          {images.length > 0 && (
            <div className="image-preview-grid">
              {images.map(img => (
                <div key={img.id} className="preview-item">
                  <img src={img.preview} alt="Preview" />
                  <button 
                    className="remove-image" 
                    onClick={() => removeImage(img.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button 
            className="btn-secondary" 
            onClick={handleReset}
            disabled={loading}
          >
            Reset Form
          </button>
          <button 
            className="btn-primary" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="success-dialog">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>Ticket Created Successfully!</h2>
            <p className="ticket-id">Ticket #{ticketId}</p>
            <p>Your ticket has been submitted. Our support team will respond shortly.</p>
            
            <div className="dialog-actions">
              <button 
                className="btn-secondary"
                onClick={() => {
                  setShowSuccess(false);
                  navigate('/help');
                }}
              >
                Done
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setShowSuccess(false);
                  navigate('/help/my-tickets');
                }}
              >
                View My Tickets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaiseTicket;
