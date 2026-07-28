import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin, Clock, ChevronRight, X, Download, Navigation, Star, AlertCircle } from 'lucide-react';
import './ReservationsPage.css';

const ReservationsPage = () => {
    const navigate = useNavigate();
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleBack = () => navigate(-1);

    const reservations = [
        {
            id: 1,
            stationName: 'Downtown Charging Hub',
            address: '123 Main Street, City Center',
            date: '2025-07-30',
            time: '14:00 - 16:00',
            connector: 'CCS2',
            status: 'upcoming',
            price: '$12.50'
        },
        {
            id: 2,
            stationName: 'Mall Parking Level 2',
            address: '456 Shopping Ave, Westside',
            date: '2025-08-02',
            time: '10:00 - 12:00',
            connector: 'Type 2',
            status: 'upcoming',
            price: '$8.00'
        },
        {
            id: 3,
            stationName: 'Highway Rest Stop',
            address: 'I-95 North, Mile Marker 42',
            date: '2025-07-15',
            time: '09:00 - 11:00',
            connector: 'CHAdeMO',
            status: 'completed',
            price: '$15.75'
        }
    ];

    const handleCancelReservation = (reservation) => {
        setSelectedReservation(reservation);
        setShowCancelDialog(true);
    };

    const confirmCancel = async () => {
        setIsCancelling(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsCancelling(false);
        setShowCancelDialog(false);
        setSuccessMessage('Reservation cancelled successfully');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleNavigate = (station) => {
        // Simulate navigation
        setSuccessMessage(`Navigating to ${station}...`);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleBookAgain = (stationId) => {
        navigate(`/stations?bookAgain=${stationId}`);
    };

    const handleDownloadInvoice = (reservation) => {
        setSuccessMessage('Invoice downloaded');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleViewDetails = (reservation) => {
        navigate(`/reservations/${reservation.id}`);
    };

    const handleRateStation = (reservation) => {
        navigate(`/rate-station/${reservation.id}`);
    };

    if (showSuccess) {
        return (
            <div className="reservations-page">
                <div className="success-toast-inline">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{successMessage}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="reservations-page">
            <div className="reservations-header">
                <button className="reservations-back" onClick={handleBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h1 className="reservations-title">My Reservations</h1>
            </div>

            <div className="reservations-content">
                {reservations.length === 0 ? (
                    <div className="empty-state">
                        <CalendarDays size={64} strokeWidth={1} />
                        <h3>No Reservations Yet</h3>
                        <p>Book your first charging session</p>
                        <button className="btn-primary" onClick={() => navigate('/stations')}>
                            Find Stations
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="reservations-section">
                            <h3 className="section-title">Upcoming</h3>
                            {reservations.filter(r => r.status === 'upcoming').map((reservation) => (
                                <ReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                    onCancel={handleCancelReservation}
                                    onNavigate={handleNavigate}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>

                        <div className="reservations-section">
                            <h3 className="section-title">Past</h3>
                            {reservations.filter(r => r.status === 'completed').map((reservation) => (
                                <ReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                    onNavigate={handleNavigate}
                                    onBookAgain={handleBookAgain}
                                    onDownloadInvoice={handleDownloadInvoice}
                                    onRateStation={handleRateStation}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Cancel Dialog */}
            {showCancelDialog && selectedReservation && (
                <div className="dialog-overlay" onClick={() => setShowCancelDialog(false)}>
                    <div className="dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="dialog__header">
                            <h3 className="dialog__title">Cancel Reservation</h3>
                            <button className="dialog__close" onClick={() => setShowCancelDialog(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="dialog__content">
                            <AlertCircle size={48} className="warning-icon" />
                            <p>Are you sure you want to cancel your reservation at <strong>{selectedReservation.stationName}</strong>?</p>
                            <p className="cancellation-policy">Cancellation fee may apply if cancelled within 2 hours of reservation time.</p>
                        </div>
                        <div className="dialog__actions">
                            <button className="dialog__btn dialog__btn--secondary" onClick={() => setShowCancelDialog(false)}>
                                Keep Reservation
                            </button>
                            <button 
                                className="dialog__btn dialog__btn--danger" 
                                onClick={confirmCancel}
                                disabled={isCancelling}
                            >
                                {isCancelling ? 'Cancelling...' : 'Cancel Reservation'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ReservationCard = ({ reservation, onCancel, onNavigate, onBookAgain, onDownloadInvoice, onRateStation, onViewDetails }) => {
    const isUpcoming = reservation.status === 'upcoming';

    return (
        <div className={`reservation-card ${reservation.status}`}>
            <div className="reservation-card__header">
                <div className="reservation-card__info">
                    <h4 className="reservation-card__title">{reservation.stationName}</h4>
                    <div className="reservation-card__meta">
                        <MapPin size={14} />
                        <span>{reservation.address}</span>
                    </div>
                </div>
                <span className={`status-badge ${reservation.status}`}>
                    {reservation.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </span>
            </div>

            <div className="reservation-card__details">
                <div className="detail-row">
                    <Clock size={16} />
                    <span>{reservation.date} • {reservation.time}</span>
                </div>
                <div className="detail-row">
                    <span className="connector-tag">{reservation.connector}</span>
                    <span className="price-tag">{reservation.price}</span>
                </div>
            </div>

            <div className="reservation-card__actions">
                {isUpcoming ? (
                    <>
                        <button className="action-btn secondary" onClick={() => onNavigate(reservation.stationName)}>
                            <Navigation size={16} />
                            Navigate
                        </button>
                        <button className="action-btn secondary" onClick={() => onViewDetails(reservation)}>
                            View Details
                        </button>
                        <button className="action-btn danger" onClick={() => onCancel(reservation)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button className="action-btn secondary" onClick={() => onNavigate(reservation.stationName)}>
                            <Navigation size={16} />
                            Navigate
                        </button>
                        <button className="action-btn secondary" onClick={() => onBookAgain(reservation.id)}>
                            Book Again
                        </button>
                        <button className="action-btn secondary" onClick={() => onDownloadInvoice(reservation)}>
                            <Download size={16} />
                            Invoice
                        </button>
                        <button className="action-btn primary" onClick={() => onRateStation(reservation)}>
                            <Star size={16} />
                            Rate
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ReservationsPage;
