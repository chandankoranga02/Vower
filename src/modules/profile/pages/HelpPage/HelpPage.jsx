import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, HelpCircle, MessageSquare, FileText, BookOpen, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import './HelpPage.css';

const HelpPage = () => {
  const navigate = useNavigate();
  
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I reserve a charging station?",
      answer: "Go to the Stations tab, select your preferred station, choose a time slot, and click 'Reserve'. You'll receive a confirmation with all details."
    },
    {
      id: 2,
      question: "How do I cancel a reservation?",
      answer: "Navigate to 'My Reservations', select the reservation you want to cancel, and click 'Cancel Reservation'. Cancellations are free up to 1 hour before the scheduled time."
    },
    {
      id: 3,
      question: "How do I pay for charging?",
      answer: "Payment is automatic after your charging session ends. You can view and manage your payment methods in Settings > Payment Methods."
    },
    {
      id: 4,
      question: "Why did my charging session stop?",
      answer: "Sessions may stop due to full battery, connection issues, or manual stop. Check your vehicle's battery level and ensure the connector is properly seated."
    },
    {
      id: 5,
      question: "How do I add another vehicle?",
      answer: "Go to Profile > My Vehicle, then click the '+' button. Fill in your vehicle details including make, model, year, and connector type."
    },
    {
      id: 6,
      question: "How do refunds work?",
      answer: "Refunds for overcharges or billing errors are processed within 5-7 business days. Contact support through the ticket system for refund requests."
    },
    {
      id: 7,
      question: "Why can't I find nearby charging stations?",
      answer: "Ensure location permissions are enabled. Go to Settings > Location Permissions and select 'While Using App' or 'Always Allow'."
    }
  ];

  const menuItems = [
    {
      id: 'faq',
      icon: <BookOpen size={20} />,
      label: 'Frequently Asked Questions',
      action: () => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'contact',
      icon: <Phone size={20} />,
      label: 'Contact Support',
      action: () => navigate('/help/contact')
    },
    {
      id: 'charging-guide',
      icon: <FileText size={20} />,
      label: 'Charging Guide',
      action: () => navigate('/help/charging-guide')
    },
    {
      id: 'reservation-help',
      icon: <Clock size={20} />,
      label: 'Reservation Help',
      action: () => navigate('/help/reservation-help')
    },
    {
      id: 'payment-help',
      icon: <MessageSquare size={20} />,
      label: 'Payment Help',
      action: () => navigate('/help/payment-help')
    },
    {
      id: 'raise-ticket',
      icon: <FileText size={20} />,
      label: 'Raise a New Ticket',
      action: () => navigate('/help/raise-ticket'),
      highlight: true
    },
    {
      id: 'my-tickets',
      icon: <MessageSquare size={20} />,
      label: 'My Tickets',
      action: () => navigate('/help/my-tickets')
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="help-page">
      {/* Header */}
      <div className="help-header">
        <button className="back-button" onClick={() => navigate('/profile')}>
          <ChevronLeft size={24} />
        </button>
        <h1>Help Center</h1>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="help-content">
        {/* FAQ Section */}
        <section id="faq-section" className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`faq-card ${expandedFaq === faq.id ? 'expanded' : ''}`}
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="faq-question">
                  <span>{faq.question}</span>
                  <ChevronLeft 
                    size={20} 
                    className={`faq-icon ${expandedFaq === faq.id ? 'rotated' : ''}`} 
                  />
                </div>
                {expandedFaq === faq.id && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Help Menu */}
        <section className="help-menu-section">
          <h2>Support Options</h2>
          <div className="help-menu-list">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className={`help-menu-item ${item.highlight ? 'highlight' : ''}`}
                onClick={item.action}
              >
                <div className="help-menu-icon">{item.icon}</div>
                <span className="help-menu-label">{item.label}</span>
                <ChevronLeft size={20} className="help-menu-arrow" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
