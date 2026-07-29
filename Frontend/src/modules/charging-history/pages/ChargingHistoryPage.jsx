import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, MapPin, Zap, Calendar, Clock, DollarSign, Car } from 'lucide-react';
import './ChargingHistoryPage.css';

const chargingSessions = [
    {
        id: 1,
        stationName: "GreenCharge Hub",
        location: "Downtown Plaza, Level 2",
        date: "2025-07-28",
        time: "14:30 - 16:45",
        duration: "2h 15m",
        energyDelivered: "45.5 kWh",
        cost: "$18.20",
        status: "completed",
        connector: "CCS2",
        speed: "Fast"
    },
    {
        id: 2,
        stationName: "EcoPark Station",
        location: "Westside Mall, Parking B1",
        date: "2025-07-25",
        time: "09:15 - 10:30",
        duration: "1h 15m",
        energyDelivered: "28.3 kWh",
        cost: "$11.32",
        status: "completed",
        connector: "Type 2",
        speed: "Slow"
    },
    {
        id: 3,
        stationName: "QuickCharge Express",
        location: "Highway Rest Stop, Mile 45",
        date: "2025-07-20",
        time: "18:00 - 18:35",
        duration: "35m",
        energyDelivered: "32.1 kWh",
        cost: "$16.05",
        status: "completed",
        connector: "CCS2",
        speed: "Ultra Fast"
    },
    {
        id: 4,
        stationName: "CityCenter Charging",
        location: "Main Street, Building A",
        date: "2025-07-15",
        time: "11:20 - 13:50",
        duration: "2h 30m",
        energyDelivered: "52.8 kWh",
        cost: "$21.12",
        status: "completed",
        connector: "CHAdeMO",
        speed: "Fast"
    }
];

export default function ChargingHistoryPage() {
    const navigate = useNavigate();
    const [selectedSession, setSelectedSession] = useState(null);

    const handleViewDetails = (session) => {
        setSelectedSession(session);
    };

    const handleBack = () => {
        if (selectedSession) {
            setSelectedSession(null);
        } else {
            navigate(-1);
        }
    };

    const handleDownloadInvoice = (session) => {
        alert(`Downloading invoice for session #${session.id}\nStation: ${session.stationName}\nAmount: ${session.cost}`);
    };

    const handleShareReceipt = (session) => {
        alert(`Sharing receipt for session #${session.id}\nThis would open share dialog`);
    };

    const handleBookAgain = (session) => {
        alert(`Booking again at ${session.stationName}`);
        navigate('/stations'); // Navigate to stations page
    };

    const handleNavigate = (session) => {
        alert(`Opening navigation to ${session.stationName}\n${session.location}`);
    };

    const handleViewStation = (session) => {
        alert(`Viewing details for ${session.stationName}`);
        navigate(`/stations/${session.id}`);
    };

    if (selectedSession) {
        return (
            <div className="charging-history-detail">
                <div className="detail-header">
                    <button className="back-btn" onClick={handleBack}>
                        <ArrowLeft size={24} />
                    </button>
                    <h2>Session Details</h2>
                </div>
                
                <div className="detail-card">
                    <div className="station-info">
                        <Zap className="station-icon" size={32} />
                        <div>
                            <h3>{selectedSession.stationName}</h3>
                            <p className="location"><MapPin size={14} /> {selectedSession.location}</p>
                        </div>
                    </div>
                    
                    <div className="detail-grid">
                        <div className="detail-item">
                            <Calendar size={18} />
                            <span>Date</span>
                            <strong>{selectedSession.date}</strong>
                        </div>
                        <div className="detail-item">
                            <Clock size={18} />
                            <span>Time</span>
                            <strong>{selectedSession.time}</strong>
                        </div>
                        <div className="detail-item">
                            <Clock size={18} />
                            <span>Duration</span>
                            <strong>{selectedSession.duration}</strong>
                        </div>
                        <div className="detail-item">
                            <Zap size={18} />
                            <span>Energy</span>
                            <strong>{selectedSession.energyDelivered}</strong>
                        </div>
                        <div className="detail-item">
                            <Car size={18} />
                            <span>Connector</span>
                            <strong>{selectedSession.connector}</strong>
                        </div>
                        <div className="detail-item">
                            <Zap size={18} />
                            <span>Speed</span>
                            <strong>{selectedSession.speed}</strong>
                        </div>
                    </div>
                    
                    <div className="total-cost">
                        <DollarSign size={24} />
                        <span>Total Paid</span>
                        <strong className="amount">{selectedSession.cost}</strong>
                    </div>
                    
                    <div className="action-buttons">
                        <button className="action-btn primary" onClick={() => handleDownloadInvoice(selectedSession)}>
                            <Download size={18} />
                            Download Invoice
                        </button>
                        <button className="action-btn secondary" onClick={() => handleShareReceipt(selectedSession)}>
                            <Share2 size={18} />
                            Share Receipt
                        </button>
                        <button className="action-btn primary" onClick={() => handleBookAgain(selectedSession)}>
                            <Zap size={18} />
                            Book Again
                        </button>
                        <button className="action-btn secondary" onClick={() => handleNavigate(selectedSession)}>
                            <MapPin size={18} />
                            Navigate
                        </button>
                        <button className="action-btn secondary" onClick={() => handleViewStation(selectedSession)}>
                            <Car size={18} />
                            View Station
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="charging-history-page">
            <div className="page-header">
                <button className="back-btn" onClick={handleBack}>
                    <ArrowLeft size={24} />
                </button>
                <h2>Charging History</h2>
            </div>
            
            <div className="sessions-list">
                {chargingSessions.map((session) => (
                    <div key={session.id} className="session-card" onClick={() => handleViewDetails(session)}>
                        <div className="session-header">
                            <div className="station-name">
                                <Zap size={20} className="zap-icon" />
                                <h3>{session.stationName}</h3>
                            </div>
                            <span className={`status-badge ${session.status}`}>{session.status}</span>
                        </div>
                        
                        <div className="session-location">
                            <MapPin size={14} />
                            <span>{session.location}</span>
                        </div>
                        
                        <div className="session-details">
                            <div className="detail-row">
                                <Calendar size={14} />
                                <span>{session.date}</span>
                            </div>
                            <div className="detail-row">
                                <Clock size={14} />
                                <span>{session.time}</span>
                            </div>
                            <div className="detail-row">
                                <Zap size={14} />
                                <span>{session.energyDelivered}</span>
                            </div>
                        </div>
                        
                        <div className="session-footer">
                            <span className="cost">{session.cost}</span>
                            <button className="view-details-btn" onClick={(e) => { e.stopPropagation(); handleViewDetails(session); }}>
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
