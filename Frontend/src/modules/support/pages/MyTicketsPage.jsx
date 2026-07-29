import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import './MyTicketsPage.css';

const MOCK_TICKETS = [
    {
        id: 'TKT-45821',
        title: 'Charging station offline',
        station: 'Main Street Charging Hub',
        date: '2025-01-15',
        status: 'Pending',
        issueType: 'Charging Station Issue'
    },
    {
        id: 'TKT-43298',
        title: 'Payment double charged',
        station: 'Downtown EV Station',
        date: '2025-01-12',
        status: 'In Progress',
        issueType: 'Payment Issue'
    },
    {
        id: 'TKT-41567',
        title: 'Connector damaged',
        station: 'Mall Parking Charger',
        date: '2025-01-08',
        status: 'Resolved',
        issueType: 'Connector Damaged'
    },
    {
        id: 'TKT-39845',
        title: 'Reservation not working',
        station: 'Highway Rest Stop',
        date: '2025-01-05',
        status: 'Closed',
        issueType: 'Reservation Problem'
    },
    {
        id: 'TKT-38123',
        title: 'Slow charging speed',
        station: 'City Center Station',
        date: '2025-01-02',
        status: 'Rejected',
        issueType: 'Charging Speed Too Slow'
    }
];

const STATUS_COLORS = {
    'Pending': '#f59e0b',
    'In Progress': '#3b82f6',
    'Resolved': '#22c55e',
    'Closed': '#6b7280',
    'Rejected': '#ef4444'
};

const MyTicketsPage = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const handleBack = () => {
        navigate(-1);
    };

    const handleTicketClick = (ticketId) => {
        navigate(`/support/ticket/${ticketId}`);
    };

    const filteredTickets = MOCK_TICKETS.filter(ticket => {
        const matchesFilter = filter === 'All' || ticket.status === filter;
        const matchesSearch = ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             ticket.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    }).sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.date) - new Date(a.date);
        } else {
            return new Date(a.date) - new Date(b.date);
        }
    });

    return (
        <div className="my-tickets-page">
            <header className="my-tickets-header">
                <button className="my-tickets-header__back" onClick={handleBack} aria-label="Go back">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <h1 className="my-tickets-header__title">My Tickets</h1>
            </header>

            <div className="my-tickets-filters">
                {/* Search */}
                <div className="search-box">
                    <Search size={18} strokeWidth={2} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by Ticket ID or title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="filter-tabs">
                    {['All', 'Pending', 'In Progress', 'Resolved', 'Rejected', 'Closed'].map(status => (
                        <button
                            key={status}
                            className={`filter-tab ${filter === status ? 'filter-tab--active' : ''}`}
                            onClick={() => setFilter(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <div className="sort-options">
                    <Filter size={16} strokeWidth={2} />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            <main className="my-tickets-list">
                {filteredTickets.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d5d5d5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="12" y1="18" x2="12" y2="12"/>
                                <line x1="9" y1="15" x2="15" y2="15"/>
                            </svg>
                        </div>
                        <h3 className="empty-title">No tickets found</h3>
                        <p className="empty-message">
                            {searchQuery || filter !== 'All' 
                                ? 'Try adjusting your search or filters'
                                : 'You haven\'t raised any tickets yet'}
                        </p>
                        {!searchQuery && filter === 'All' && (
                            <button 
                                className="raise-ticket-btn"
                                onClick={() => navigate('/support/raise-ticket')}
                            >
                                Raise a Ticket
                            </button>
                        )}
                    </div>
                ) : (
                    filteredTickets.map(ticket => (
                        <div
                            key={ticket.id}
                            className="ticket-card"
                            onClick={() => handleTicketClick(ticket.id)}
                        >
                            <div className="ticket-card__header">
                                <span className="ticket-id">{ticket.id}</span>
                                <span 
                                    className="ticket-status"
                                    style={{ 
                                        background: `${STATUS_COLORS[ticket.status]}20`,
                                        color: STATUS_COLORS[ticket.status]
                                    }}
                                >
                                    {ticket.status}
                                </span>
                            </div>
                            <h3 className="ticket-title">{ticket.title}</h3>
                            <div className="ticket-meta">
                                <span className="ticket-station">{ticket.station}</span>
                                <span className="ticket-date">{new Date(ticket.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="ticket-card__arrow">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6"/>
                                </svg>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

export default MyTicketsPage;
