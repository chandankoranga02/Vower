import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, Mail, MessageCircle, Clock, Copy, Check, BookOpen, FileText } from 'lucide-react';
import './ContactSupport.css';

const ContactSupport = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const supportInfo = {
    phone: '+1 (800) 123-4567',
    email: 'support@evcharge.com',
    whatsapp: '+1 (800) 987-6543',
    hours: '24/7 Available'
  };

  const handleCall = () => {
    // Simulate call action
    alert(`Calling ${supportInfo.phone}...`);
  };

  const handleEmail = () => {
    // Simulate email action
    window.location.href = `mailto:${supportInfo.email}`;
  };

  const handleWhatsApp = () => {
    // Simulate WhatsApp action
    alert(`Opening WhatsApp chat with ${supportInfo.whatsapp}...`);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="contact-support-page">
      {/* Header */}
      <div className="contact-header">
        <button className="back-button" onClick={() => navigate('/help')}>
          <ChevronLeft size={24} />
        </button>
        <h1>Contact Support</h1>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="contact-content">
        {/* Support Info Cards */}
        <div className="support-cards">
          {/* Phone */}
          <div className="support-card">
            <div className="support-icon phone">
              <Phone size={24} />
            </div>
            <div className="support-info">
              <h3>Phone Support</h3>
              <p>{supportInfo.phone}</p>
              <span className="support-hours">
                <Clock size={12} />
                {supportInfo.hours}
              </span>
            </div>
            <button className="action-button" onClick={handleCall}>
              Call
            </button>
          </div>

          {/* Email */}
          <div className="support-card">
            <div className="support-icon email">
              <Mail size={24} />
            </div>
            <div className="support-info">
              <h3>Email Support</h3>
              <p>{supportInfo.email}</p>
              <span className="support-hours">
                <Clock size={12} />
                Response within 24 hours
              </span>
            </div>
            <div className="action-buttons">
              <button className="action-button secondary" onClick={handleEmail}>
                Email
              </button>
              <button className="action-button icon" onClick={handleCopyEmail}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="support-card">
            <div className="support-icon whatsapp">
              <MessageCircle size={24} />
            </div>
            <div className="support-info">
              <h3>WhatsApp Support</h3>
              <p>{supportInfo.whatsapp}</p>
              <span className="support-hours">
                <Clock size={12} />
                {supportInfo.hours}
              </span>
            </div>
            <button className="action-button" onClick={handleWhatsApp}>
              WhatsApp
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <h3>Support Information</h3>
          <div className="info-item">
            <strong>Average Response Time:</strong>
            <span>Phone: &lt; 2 minutes | Email: &lt; 24 hours | WhatsApp: &lt; 5 minutes</span>
          </div>
          <div className="info-item">
            <strong>Languages Supported:</strong>
            <span>English, Spanish, French, German, Chinese</span>
          </div>
          <div className="info-item">
            <strong>Emergency Support:</strong>
            <span>Available 24/7 for charging emergencies</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-grid">
            <button 
              className="quick-action-btn"
              onClick={() => navigate('/help/raise-ticket')}
            >
              <MessageCircle size={20} />
              <span>Raise Ticket</span>
            </button>
            <button 
              className="quick-action-btn"
              onClick={() => navigate('/help/my-tickets')}
            >
              <Clock size={20} />
              <span>My Tickets</span>
            </button>
            <button 
              className="quick-action-btn"
              onClick={() => navigate('/help/faq')}
            >
              <BookOpen size={20} />
              <span>FAQs</span>
            </button>
            <button 
              className="quick-action-btn"
              onClick={() => navigate('/help/charging-guide')}
            >
              <FileText size={20} />
              <span>Guides</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
