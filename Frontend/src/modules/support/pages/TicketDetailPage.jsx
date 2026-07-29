import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TicketDetailPage.css';

const MOCK_TICKET = {
    id: 'TKT-45821',
    status: 'In Progress',
    title: 'Charging station offline',
    issueType: 'Charging Station Issue',
    category: 'Charger Offline',
    station: 'Main Street Charging Hub',
    connector: 'CCS2',
    vehicle: 'Tesla Model 3',
    incidentDate: '2025-01-15 14:30',
    createdDate: '2025-01-15 15:45',
    description: 'The charging station at Main Street was completely offline when I arrived. The screen was blank and no lights were on. I tried scanning the QR code but nothing happened. This is very inconvenient as I had specifically reserved this slot.',
    images: ['https://via.placeholder.com/300x200?text=Station+Image+1', 'https://via.placeholder.com/300x200?text=Station+Image+2'],
    timeline: [
        { status: 'Submitted', date: '2025-01-15 15:45', completed: true },
        { status: 'Assigned to Support', date: '2025-01-15 17:20', completed: true },
        { status: 'Under Review', date: '2025-01-16 09:15', completed: true },
        { status: 'Engineer Reviewing', date: '2025-01-16 14:00', completed: false },
        { status: 'Resolved', date: null, completed: false },
        { status: 'Closed', date: null, completed: false }
    ],
    supportRemarks: 'Our technical team has identified the issue. The charger has been restarted remotely. Please try again and let us know if you face any issues.'
};

const STATUS_COLORS = {
    'Pending': '#f59e0b',
    'In Progress': '#3b82f6',
    'Resolved': '#22c55e',
    'Closed': '#6b7280',
    'Rejected': '#ef4444'
};

const TicketDetailPage = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="ticket-detail-page">
            <header className="ticket-detail-header">
                <button className="ticket-detail-header__back" onClick={handleBack} aria-label="Go back">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <h1 className="ticket-detail-header__title">Ticket Details</h1>
            </header>

            <main className="ticket-detail-content">
                {/* Status Header */}
                <div className="status-header">
                    <span className="status-id">{MOCK_TICKET.id}</span>
                    <span 
                        className="status-badge"
                        style={{ 
                            background: `${STATUS_COLORS[MOCK_TICKET.status]}20`,
                            color: STATUS_COLORS[MOCK_TICKET.status]
                        }}
                    >
                        {MOCK_TICKET.status}
                    </span>
                </div>

                {/* Issue Info Card */}
                <div className="info-card">
                    <h2 className="info-card__title">{MOCK_TICKET.title}</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Issue Type</span>
                            <span className="info-value">{MOCK_TICKET.issueType}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Category</span>
                            <span className="info-value">{MOCK_TICKET.category}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Station</span>
                            <span className="info-value">{MOCK_TICKET.station}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Connector</span>
                            <span className="info-value">{MOCK_TICKET.connector}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Vehicle</span>
                            <span className="info-value">{MOCK_TICKET.vehicle}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Incident Date</span>
                            <span className="info-value">{MOCK_TICKET.incidentDate}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="description-card">
                    <h3 className="description-title">Description</h3>
                    <p className="description-text">{MOCK_TICKET.description}</p>
                </div>

                {/* Images */}
                {MOCK_TICKET.images.length > 0 && (
                    <div className="images-section">
                        <h3 className="section-title">Uploaded Images</h3>
                        <div className="images-grid">
                            {MOCK_TICKET.images.map((img, index) => (
                                <img key={index} src={img} alt={`Evidence ${index + 1}`} className="evidence-image" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Timeline */}
                <div className="timeline-section">
                    <h3 className="section-title">Status Timeline</h3>
                    <div className="timeline">
                        {MOCK_TICKET.timeline.map((item, index) => (
                            <div key={index} className={`timeline-item ${item.completed ? 'timeline-item--completed' : ''}`}>
                                <div className="timeline-marker">
                                    {item.completed && (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                    )}
                                </div>
                                <div className="timeline-content">
                                    <span className="timeline-status">{item.status}</span>
                                    {item.date && <span className="timeline-date">{item.date}</span>}
                                </div>
                                {index < MOCK_TICKET.timeline.length - 1 && (
                                    <div className="timeline-line"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Remarks */}
                <div className="remarks-card">
                    <h3 className="remarks-title">Support Team Remarks</h3>
                    <p className="remarks-text">{MOCK_TICKET.supportRemarks}</p>
                </div>
            </main>
        </div>
    );
};

export default TicketDetailPage;
