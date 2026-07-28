import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Search, Filter } from 'lucide-react';
import './MyTickets.css';

const MyTickets = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  // Sample ticket data
  const tickets = [
    {
      id: 'EV-20453',
      title: 'Charging Session Stopped Early',
      description: 'My charging session stopped unexpectedly after 15 minutes...',
      category: 'Charging Issue',
      createdDate: '2025-01-15',
      lastUpdated: '2025-01-16',
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: 'EV-20421',
      title: 'Payment Overcharged',
      description: 'I was charged twice for the same charging session...',
      category: 'Payment Issue',
      createdDate: '2025-01-10',
      lastUpdated: '2025-01-12',
      priority: 'Medium',
      status: 'Resolved'
    },
    {
      id: 'EV-20398',
      title: 'Unable to Reserve Station',
      description: 'The reservation system shows error when I try to book...',
      category: 'Reservation Issue',
      createdDate: '2025-01-05',
      lastUpdated: '2025-01-06',
      priority: 'Low',
      status: 'Closed'
    },
    {
      id: 'EV-20367',
      title: 'Station Location Incorrect',
      description: 'The GPS location shown in app is different from actual...',
      category: 'Charging Station Issue',
      createdDate: '2024-12-28',
      lastUpdated: '2025-01-02',
      priority: 'Medium',
      status: 'Pending'
    }
  ];

  const tabs = ['All', 'Open', 'Pending', 'In Progress', 'Resolved', 'Closed'];

  const filterTickets = (tickets, tab) => {
    if (tab === 'All') return tickets;
    if (tab === 'Open') return tickets.filter(t => t.status === 'In Progress' || t.status === 'Pending');
    return tickets.filter(t => t.status === tab);
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

  const getPriorityClass = (priority) => {
    const classes = {
      'High': 'priority-high',
      'Medium': 'priority-medium',
      'Low': 'priority-low'
    };
    return classes[priority] || '';
  };

  const filteredTickets = filterTickets(tickets, activeTab);

  return (
    <div className="my-tickets-page">
      {/* Header */}
      <div className="tickets-header">
        <button className="back-button" onClick={() => navigate('/help')}>
          <ChevronLeft size={24} />
        </button>
        <h1>My Tickets</h1>
        <button className="new-ticket-btn" onClick={() => navigate('/help/raise-ticket')}>
          <Plus size={20} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <Search size={20} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search tickets..." 
          className="search-input"
        />
        <button className="filter-btn">
          <Filter size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="tickets-list">
        {filteredTickets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Search size={64} />
            </div>
            <h3>No Tickets Found</h3>
            <p>There are no tickets matching your current filter.</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/help/raise-ticket')}
            >
              Raise Your First Ticket
            </button>
          </div>
        ) : (
          filteredTickets.map(ticket => (
            <div 
              key={ticket.id} 
              className="ticket-card"
              onClick={() => navigate(`/help/ticket/${ticket.id}`)}
            >
              <div className="ticket-header-row">
                <span className="ticket-id">{ticket.id}</span>
                <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
              
              <h3 className="ticket-title">{ticket.title}</h3>
              <p className="ticket-description">{ticket.description}</p>
              
              <div className="ticket-meta">
                <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
                  {ticket.priority} Priority
                </span>
                <span className="ticket-category">{ticket.category}</span>
              </div>
              
              <div className="ticket-dates">
                <span>Created: {new Date(ticket.createdDate).toLocaleDateString()}</span>
                <span>Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}</span>
              </div>
              
              <div className="ticket-arrow">
                <ChevronLeft size={20} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTickets;
