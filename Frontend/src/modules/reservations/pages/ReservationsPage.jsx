import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Zap, Car, DollarSign, XCircle, CheckCircle, Navigation, Star } from 'lucide-react';
import './ReservationsPage.css';

const reservations = [
    {
        id: 1,
        stationName: "GreenCharge Hub",
        location: "Downtown Plaza, Level 2",
        date: "2025-07-30",
        time: "10:00 AM - 12:00 PM",
        connector: "CCS2",
        status: "upcoming",
        cost: "$15.00"
    },
    {
        id: 2,
        stationName: "EcoPark Station",
        location: "Westside Mall, Parking B1",
        date: "2025-07-28",
        time: "14:00 PM - 16:00 PM",
        connector: "Type 2",
        status: "completed",
        cost: "$12.50"
    },
    {
        id: 3,
        stationName: "QuickCharge Express",
        location: "Highway Rest Stop, Mile 45",
        date: "2025-07-25",
        time: "09:00 AM - 11:00 AM",
        connector: "CCS2",
        status: "cancelled",
        cost: "$0.00"
    }
];

export default function ReservationsPage() {
    const navigate = useNavigate();
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const handleViewDetails = (reservation) => {
        setSelectedReservation(reservation);
    };

    const handleBack = () => {
        if (selectedReservation) {
            setSelectedReservation(null);
        } else {
            navigate(-1);
        }
    };

    const handleCancelReservation = () => {
        setShowCancelDialog(true);
    };

    const confirmCancel = () => {
        alert(`Reservation #${selectedReservation.id} cancelled successfully`);
        setShowCancelDialog(false);
        setSelectedReservation(null);
    };

    const cancelCancel = () => {
        setShowCancelDialog(false);
    };

    const handleNavigate = (reservation) => {
        alert(`Opening navigation to ${reservation.stationName}\n${reservation.location}`);
    };

    const handleBookAgain = (reservation) => {
        alert(`Booking again at ${reservation.stationName}`);
        navigate('/stations');
    };

    const handleDownloadInvoice = (reservation) => {
        alert(`Downloading invoice for reservation #${reservation.id}\nAmount: ${reservation.cost}`);
    };

    const handleViewStation = (reservation) => {
        alert(`Viewing details for ${reservation.stationName}`);
        navigate(`/stations/${reservation.id}`);
    };

    const handleRateStation = (reservation) => {
        alert(`Rating ${reservation.stationName}\nThis would open rating dialog`);
    };

    // Cancel Dialog
    if (showCancelDialog && selectedReservation) {
        return (
            <div className="reservations-page">
                <div className="dialog-overlay">
                    <div className="cancel-dialog">
                        <div className="dialog-icon error">
                            <XCircle size={48} />
                        </div>
                        <h2>Cancel Reservation?</h2>
                        <p>Are you sure you want to cancel your reservation at {selectedReservation.stationName}?</p>
                        <div className="dialog-actions">
                            <button className="dialog-btn secondary" onClick={cancelCancel}>
                                Keep Reservation
                            </button>
                            <button className="dialog-btn primary" onClick={confirmCancel}>
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Detail View
    if (selectedReservation) {
        return (
            <div className="reservations-detail">
                <div className="detail-header">
                    <button className="back-btn" onClick={handleBack}>
                        <ArrowLeft size={24} />
                    </button>
                    <h2>Reservation Details</h2>
                </div>
                
                <div className="detail-card">
                    <div className="station-info">
                        <Zap className="station-icon" size={32} />
                        <div>
                            <h3>{selectedReservation.stationName}</h3>
                            <p className="location"><MapPin size={14} /> {selectedReservation.location}</p>
                        </div>
                    </div>
                    
                    <div className={`status-banner ${selectedReservation.status}`}>
                        {selectedReservation.status === 'upcoming' && <Clock size={20} />}
                        {selectedReservation.status === 'completed' && <CheckCircle size={20} />}
                        {selectedReservation.status === 'cancelled' && <XCircle size={20} />}
                        <span className="status-text">{selectedReservation.status.toUpperCase()}</span>
                    </div>
                    
                    <div className="detail-grid">
                        <div className="detail-item">
                            <Calendar size={18} />
                            <span>Date</span>
                            <strong>{selectedReservation.date}</strong>
                        </div>
                        <div className="detail-item">
                            <Clock size={18} />
                            <span>Time Slot</span>
                            <strong>{selectedReservation.time}</strong>
                        </div>
                        <div className="detail-item">
                            <Car size={18} />
                            <span>Connector</span>
                            <strong>{selectedReservation.connector}</strong>
                        </div>
                        <div className="detail-item">
                            <DollarSign size={18} />
                            <span>Total Cost</span>
                            <strong>{selectedReservation.cost}</strong>
                        </div>
                    </div>
                    
                    {selectedReservation.status === 'upcoming' && (
                        <div className="action-buttons">
                            <button className="action-btn primary" onClick={() => handleNavigate(selectedReservation)}>
                                <Navigation size={18} />
                                Navigate to Station
                            </button>
                            <button className="action-btn danger" onClick={handleCancelReservation}>
                                <XCircle size={18} />
                                Cancel Reservation
                            </button>
                            <button className="action-btn secondary" onClick={() => handleBookAgain(selectedReservation)}>
                                <Zap size={18} />
                                Book Again
                            </button>
                        </div>
                    )}
                    
                    {selectedReservation.status === 'completed' && (
                        <div className="action-buttons">
                            <button className="action-btn primary" onClick={() => handleDownloadInvoice(selectedReservation)}>
                                <DollarSign size={18} />
                                Download Invoice
                            </button>
                            <button className="action-btn secondary" onClick={() => handleRateStation(selectedReservation)}>
                                <Star size={18} />
                                Rate Station
                            </button>
                            <button className="action-btn secondary" onClick={() => handleBookAgain(selectedReservation)}>
                                <Zap size={18} />
                                Book Again
                            </button>
                            <button className="action-btn secondary" onClick={() => handleViewStation(selectedReservation)}>
                                <MapPin size={18} />
                                View Station
                            </button>
                        </div>
                    )}
                    
                    {selectedReservation.status === 'cancelled' && (
                        <div className="action-buttons">
                            <button className="action-btn primary" onClick={() => handleBookAgain(selectedReservation)}>
                                <Zap size={18} />
                                Book New Reservation
                            </button>
                            <button className="action-btn secondary" onClick={() => handleViewStation(selectedReservation)}>
                                <MapPin size={18} />
                                View Station
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // List View
    return (
        <div className="reservations-page">
            <div className="page-header">
                <button className="back-btn" onClick={handleBack}>
                    <ArrowLeft size={24} />
                </button>
                <h2>My Reservations</h2>
            </div>
            
            <div className="reservations-list">
                {reservations.map((reservation) => (
                    <div key={reservation.id} className="reservation-card" onClick={() => handleViewDetails(reservation)}>
                        <div className="card-header">
                            <div className="station-name">
                                <Zap size={20} className="zap-icon" />
                                <h3>{reservation.stationName}</h3>
                            </div>
                            <span className={`status-badge ${reservation.status}`}>{reservation.status}</span>
                        </div>
                        
                        <div className="card-location">
                            <MapPin size={14} />
                            <span>{reservation.location}</span>
                        </div>
                        
                        <div className="card-details">
                            <div className="detail-row">
                                <Calendar size={14} />
                                <span>{reservation.date}</span>
                            </div>
                            <div className="detail-row">
                                <Clock size={14} />
                                <span>{reservation.time}</span>
                            </div>
                            <div className="detail-row">
                                <Car size={14} />
                                <span>{reservation.connector}</span>
                            </div>
                        </div>
                        
                        <div className="card-footer">
                            <span className="cost">{reservation.cost}</span>
                            <button className="view-btn" onClick={(e) => { e.stopPropagation(); handleViewDetails(reservation); }}>
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
