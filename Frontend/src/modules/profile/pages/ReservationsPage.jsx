import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, BatteryCharging, AlertCircle, Download, Share2, Navigation } from 'lucide-react';
import '../styles/ReservationsPage.css';

const ReservationsPage = () => {
  const navigate = useNavigate();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Mock Data
  const reservations = [
    {
      id: 'RES-001',
      stationName: 'EV Hub Downtown',
      address: '123 Main St, City Center',
      date: '2023-11-25',
      time: '14:00 - 16:00',
      status: 'upcoming',
      connector: 'CCS2',
      cost: '$12.50'
    },
    {
      id: 'RES-002',
      stationName: 'Green Park Station',
      address: '45 Park Avenue',
      date: '2023-11-20',
      time: '09:00 - 11:00',
      status: 'completed',
      connector: 'Type 2',
      cost: '$8.75'
    },
    {
      id: 'RES-003',
      stationName: 'Mall Charging Point',
      address: '88 Shopping Blvd',
      date: '2023-11-18',
      time: '18:00 - 20:00',
      status: 'cancelled',
      connector: 'CCS2',
      cost: '$0.00'
    }
  ];

  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setTimeout(() => {
      setShowCancelDialog(false);
      setSelectedReservation(null);
      alert('Reservation cancelled successfully!');
    }, 500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="reservations-page-container">
      {/* Header */}
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={24} />
        </button>
        <h1>My Reservations</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Content */}
      <div className="reservations-list">
        {reservations.length === 0 ? (
          <div className="empty-state">
            <BatteryCharging size={48} className="text-gray-300 mb-4" />
            <p>No reservations found</p>
            <button 
              onClick={() => navigate('/stations')} 
              className="primary-btn mt-4"
            >
              Find a Station
            </button>
          </div>
        ) : (
          reservations.map((res) => (
            <div key={res.id} className="reservation-card">
              <div className="card-header">
                <div>
                  <h3>{res.stationName}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    {res.address}
                  </div>
                </div>
                <span className={`status-badge ${getStatusColor(res.status)}`}>
                  {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                </span>
              </div>

              <div className="card-details">
                <div className="detail-item">
                  <Clock size={16} className="text-gray-400" />
                  <span>{res.date}, {res.time}</span>
                </div>
                <div className="detail-item">
                  <BatteryCharging size={16} className="text-gray-400" />
                  <span>{res.connector}</span>
                </div>
                <div className="detail-item font-semibold">
                  <span>Total: {res.cost}</span>
                </div>
              </div>

              <div className="card-actions">
                {res.status === 'upcoming' && (
                  <>
                    <button 
                      onClick={() => handleCancelClick(res)}
                      className="secondary-btn flex-1 mr-2"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => alert(`Navigating to ${res.stationName}`)}
                      className="primary-btn flex-1"
                    >
                      <Navigation size={16} className="mr-1" /> Navigate
                    </button>
                  </>
                )}
                {res.status === 'completed' && (
                  <>
                    <button 
                      onClick={() => alert('Downloading Invoice...')}
                      className="secondary-btn flex-1 mr-2"
                    >
                      <Download size={16} className="mr-1" /> Invoice
                    </button>
                    <button 
                      onClick={() => alert('Sharing Receipt...')}
                      className="primary-btn flex-1"
                    >
                      <Share2 size={16} className="mr-1" /> Share
                    </button>
                  </>
                )}
                {res.status === 'cancelled' && (
                  <button 
                    onClick={() => navigate('/stations')}
                    className="primary-btn w-full"
                  >
                    Book Again
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cancel Dialog */}
      {showCancelDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon bg-red-100 text-red-600 rounded-full p-3 mb-4 mx-auto">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">Cancel Reservation?</h2>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to cancel your reservation at {selectedReservation?.stationName}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCancelDialog(false)}
                className="secondary-btn flex-1"
              >
                Keep It
              </button>
              <button 
                onClick={confirmCancel}
                className="danger-btn flex-1"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;
