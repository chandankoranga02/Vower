import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, BatteryCharging, Zap, DollarSign, Download, Share2, Navigation, ExternalLink, Star } from 'lucide-react';
import '../styles/ChargingHistoryPage.css';

const ChargingHistoryPage = () => {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState(null);

  // Mock Data
  const chargingSessions = [
    {
      id: 'CHG-001',
      stationName: 'EV Hub Downtown',
      address: '123 Main St, City Center',
      date: '2023-11-22',
      time: '10:30 - 12:15',
      duration: '1h 45m',
      energy: '45.5 kWh',
      cost: '$18.20',
      connector: 'CCS2',
      status: 'completed'
    },
    {
      id: 'CHG-002',
      stationName: 'Green Park Station',
      address: '45 Park Avenue',
      date: '2023-11-18',
      time: '14:00 - 15:30',
      duration: '1h 30m',
      energy: '38.2 kWh',
      cost: '$15.28',
      connector: 'Type 2',
      status: 'completed'
    },
    {
      id: 'CHG-003',
      stationName: 'Mall Charging Point',
      address: '88 Shopping Blvd',
      date: '2023-11-15',
      time: '18:45 - 20:00',
      duration: '1h 15m',
      energy: '32.0 kWh',
      cost: '$12.80',
      connector: 'CCS2',
      status: 'completed'
    }
  ];

  const handleViewDetails = (session) => {
    setSelectedSession(session);
  };

  const closeModal = () => {
    setSelectedSession(null);
  };

  return (
    <div className="charging-history-page-container">
      {/* Header */}
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={24} />
        </button>
        <h1>Charging History</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Summary Cards */}
      <div className="summary-section">
        <div className="summary-card">
          <Zap size={24} className="text-green-500" />
          <div>
            <p className="summary-label">Total Energy</p>
            <p className="summary-value">115.7 kWh</p>
          </div>
        </div>
        <div className="summary-card">
          <DollarSign size={24} className="text-blue-500" />
          <div>
            <p className="summary-label">Total Spent</p>
            <p className="summary-value">$46.28</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="history-list">
        {chargingSessions.length === 0 ? (
          <div className="empty-state">
            <BatteryCharging size={48} className="text-gray-300 mb-4" />
            <p>No charging history found</p>
            <button 
              onClick={() => navigate('/stations')} 
              className="primary-btn mt-4"
            >
              Find a Station
            </button>
          </div>
        ) : (
          chargingSessions.map((session) => (
            <div key={session.id} className="history-card" onClick={() => handleViewDetails(session)}>
              <div className="card-header">
                <div>
                  <h3>{session.stationName}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    {session.address}
                  </div>
                </div>
                <span className="status-badge bg-green-100 text-green-700">
                  Completed
                </span>
              </div>

              <div className="card-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <Clock size={16} className="text-gray-400" />
                    <span>{session.date}</span>
                  </div>
                  <div className="detail-item">
                    <BatteryCharging size={16} className="text-gray-400" />
                    <span>{session.energy}</span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-item">
                    <Zap size={16} className="text-gray-400" />
                    <span>{session.connector}</span>
                  </div>
                  <div className="detail-item font-semibold">
                    <span>{session.cost}</span>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <button 
                  onClick={(e) => { e.stopPropagation(); alert('Downloading Invoice...'); }}
                  className="icon-btn"
                  title="Download Invoice"
                >
                  <Download size={20} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); alert('Sharing Receipt...'); }}
                  className="icon-btn"
                  title="Share Receipt"
                >
                  <Share2 size={20} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); alert(`Navigating to ${session.stationName}`); }}
                  className="icon-btn"
                  title="Navigate"
                >
                  <Navigation size={20} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate('/stations'); }}
                  className="icon-btn"
                  title="Book Again"
                >
                  <Zap size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedSession && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Charging Session Details</h2>
              <button onClick={closeModal} className="close-btn">✕</button>
            </div>

            <div className="modal-body">
              <div className="station-info">
                <h3>{selectedSession.stationName}</h3>
                <p className="text-gray-500 flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {selectedSession.address}
                </p>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <label>Date & Time</label>
                  <p>{selectedSession.date}, {selectedSession.time}</p>
                </div>
                <div className="info-item">
                  <label>Duration</label>
                  <p>{selectedSession.duration}</p>
                </div>
                <div className="info-item">
                  <label>Energy Delivered</label>
                  <p>{selectedSession.energy}</p>
                </div>
                <div className="info-item">
                  <label>Connector Type</label>
                  <p>{selectedSession.connector}</p>
                </div>
                <div className="info-item full-width">
                  <label>Total Cost</label>
                  <p className="text-xl font-bold text-green-600">{selectedSession.cost}</p>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  onClick={() => alert('Downloading Invoice...')}
                  className="secondary-btn flex-1"
                >
                  <Download size={16} className="mr-2" /> Invoice
                </button>
                <button 
                  onClick={() => alert('Sharing Receipt...')}
                  className="secondary-btn flex-1"
                >
                  <Share2 size={16} className="mr-2" /> Share
                </button>
              </div>

              <div className="modal-footer-actions">
                <button 
                  onClick={() => { navigate('/stations'); closeModal(); }}
                  className="primary-btn w-full mb-3"
                >
                  <Zap size={16} className="mr-2" /> Book Again
                </button>
                <button 
                  onClick={() => { alert(`Navigating to ${selectedSession.stationName}`); closeModal(); }}
                  className="secondary-btn w-full"
                >
                  <ExternalLink size={16} className="mr-2" /> View Station
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChargingHistoryPage;
