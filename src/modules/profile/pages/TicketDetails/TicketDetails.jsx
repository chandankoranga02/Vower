import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Send, Paperclip, Image as ImageIcon, X, Star, 
  CheckCircle, Clock, User, MessageSquare 
} from 'lucide-react';
import './TicketDetails.css';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'My charging session stopped unexpectedly after 15 minutes. I was at Station #42 and my vehicle only charged to 40%.',
      timestamp: '2025-01-15 10:30 AM',
      images: []
    },
    {
      id: 2,
      sender: 'support',
      text: 'Thank you for contacting us. We apologize for the inconvenience. Can you please provide your vehicle model and the connector type you used?',
      timestamp: '2025-01-15 11:15 AM',
      images: []
    },
    {
      id: 3,
      sender: 'user',
      text: 'I was using a Tesla Model 3 with CCS2 connector.',
      timestamp: '2025-01-15 11:20 AM',
      images: []
    },
    {
      id: 4,
      sender: 'support',
      text: 'Thank you for the information. Our technical team is investigating this issue. We will update you within 24 hours.',
      timestamp: '2025-01-15 02:45 PM',
      images: []
    }
  ]);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const ticket = {
    id: ticketId || 'EV-20453',
    status: 'In Progress',
    priority: 'High',
    issueType: 'Charging Issue',
    category: 'Session Stopped Early',
    incidentDate: '2025-01-15',
    createdDate: '2025-01-15',
    description: 'My charging session stopped unexpectedly after 15 minutes. I was at Station #42 and my vehicle only charged to 40%. This has never happened before and I urgently need my vehicle charged for a long trip tomorrow.',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150']
  };

  const timeline = [
    { status: 'Ticket Created', date: '2025-01-15', time: '10:30 AM', note: 'Ticket submitted by user' },
    { status: 'Assigned to Support', date: '2025-01-15', time: '10:45 AM', note: 'Assigned to John D.' },
    { status: 'Under Investigation', date: '2025-01-15', time: '11:00 AM', note: 'Technical team reviewing' },
    { status: 'Waiting for User Response', date: '2025-01-15', time: '11:15 AM', note: 'Additional info requested' },
    { status: 'In Progress', date: '2025-01-15', time: '02:45 PM', note: 'Investigation ongoing' }
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleString(),
      images: []
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleRating = (stars) => {
    setRating(stars);
    alert(`Thank you for rating ${stars} stars!`);
    setShowRating(false);
  };

  const getStatusClass = (status) => {
    const classes = {
      'Open': 'status-open',
      'Pending': 'status-pending',
      'In Progress': 'status-progress',
      'Resolved': 'status-resolved',
      'Closed': 'status-closed'
    };
    return classes[status] || '';
  };

  return (
    <div className="ticket-details-page">
      {/* Header */}
      <div className="details-header">
        <button className="back-button" onClick={() => navigate('/help/my-tickets')}>
          <ChevronLeft size={24} />
        </button>
        <h1>Ticket Details</h1>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="details-content">
        {/* Ticket Info */}
        <div className="ticket-info-card">
          <div className="info-header">
            <span className="ticket-id-display">{ticket.id}</span>
            <span className={`status-badge ${getStatusClass(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>
          
          <div className="info-grid">
            <div className="info-item">
              <label>Priority</label>
              <span className={`priority-badge priority-${ticket.priority.toLowerCase()}`}>
                {ticket.priority}
              </span>
            </div>
            <div className="info-item">
              <label>Issue Type</label>
              <span>{ticket.issueType}</span>
            </div>
            <div className="info-item">
              <label>Category</label>
              <span>{ticket.category}</span>
            </div>
            <div className="info-item">
              <label>Incident Date</label>
              <span>{new Date(ticket.incidentDate).toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <label>Created Date</label>
              <span>{new Date(ticket.createdDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="description-section">
            <label>Description</label>
            <p>{ticket.description}</p>
          </div>
          
          {ticket.images.length > 0 && (
            <div className="uploaded-images">
              <label>Uploaded Images</label>
              <div className="images-grid">
                {ticket.images.map((img, idx) => (
                  <div key={idx} className="image-item">
                    <img src={img} alt={`Upload ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="timeline-card">
          <h3>Status Timeline</h3>
          <div className="timeline">
            {timeline.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot">
                  <CheckCircle size={16} />
                </div>
                <div className="timeline-content">
                  <div className="timeline-status">{item.status}</div>
                  <div className="timeline-date">{item.date} at {item.time}</div>
                  <div className="timeline-note">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className="conversation-card">
          <h3>Support Conversation</h3>
          <div className="messages-container">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'user' ? (
                    <User size={20} />
                  ) : (
                    <MessageSquare size={20} />
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                  <div className="message-timestamp">{msg.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="message-input-area">
            <button className="attach-btn">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="actions-section">
          {ticket.status === 'In Progress' || ticket.status === 'Pending' ? (
            <>
              <button className="action-btn secondary">Close Ticket</button>
              <button className="action-btn primary">Add More Information</button>
            </>
          ) : ticket.status === 'Resolved' ? (
            <>
              {!showRating ? (
                <>
                  <button className="action-btn secondary" onClick={() => setShowRating(true)}>
                    Rate Support
                  </button>
                  <button className="action-btn primary">Reopen Ticket</button>
                </>
              ) : (
                <div className="rating-container">
                  <p>Rate your support experience:</p>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        className={`star-btn ${rating >= star ? 'active' : ''}`}
                        onClick={() => handleRating(star)}
                      >
                        <Star size={32} fill={rating >= star ? '#000000' : 'none'} />
                      </button>
                    ))}
                  </div>
                  <button className="cancel-rating" onClick={() => setShowRating(false)}>
                    <X size={20} />
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
