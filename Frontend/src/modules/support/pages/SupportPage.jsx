import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, FileText, Phone, HelpCircle } from 'lucide-react';
import './SupportPage.css';

const SupportPage = () => {
    const navigate = useNavigate();

    const handleRaiseTicket = () => {
        navigate('/support/raise-ticket');
    };

    const handleMyTickets = () => {
        navigate('/support/my-tickets');
    };

    const handleContactSupport = () => {
        navigate('/support/contact');
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="support-page">
            <header className="support-header">
                <button
                    className="support-header__back"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <h1 className="support-header__title">Help & Support</h1>
            </header>

            <main className="support-main">
                {/* Raise Ticket - Primary CTA */}
                <div className="support-card support-card--primary" onClick={handleRaiseTicket}>
                    <div className="support-card__icon-wrap support-card__icon-wrap--primary">
                        <Ticket size={28} strokeWidth={2} />
                    </div>
                    <div className="support-card__content">
                        <h2 className="support-card__title">Raise a Ticket</h2>
                        <p className="support-card__description">
                            Facing an issue while charging? Raise a support ticket and our team will assist you.
                        </p>
                    </div>
                    <div className="support-card__arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </div>
                </div>

                {/* My Tickets */}
                <div className="support-card" onClick={handleMyTickets}>
                    <div className="support-card__icon-wrap">
                        <FileText size={24} strokeWidth={2} />
                    </div>
                    <div className="support-card__content">
                        <h2 className="support-card__title">My Tickets</h2>
                        <p className="support-card__description">
                            View all your support tickets and track their status
                        </p>
                    </div>
                    <div className="support-card__arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </div>
                </div>

                {/* Contact Support */}
                <div className="support-card" onClick={handleContactSupport}>
                    <div className="support-card__icon-wrap">
                        <Phone size={24} strokeWidth={2} />
                    </div>
                    <div className="support-card__content">
                        <h2 className="support-card__title">Contact Support</h2>
                        <p className="support-card__description">
                            Get in touch with our support team via call, email or chat
                        </p>
                    </div>
                    <div className="support-card__arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </div>
                </div>

                {/* FAQs Section - Inline on Help Page */}
                <div className="support-faqs-section">
                    <div className="support-faqs-header">
                        <HelpCircle size={24} strokeWidth={2} />
                        <h2 className="support-faqs-title">Frequently Asked Questions</h2>
                    </div>
                    <p className="support-faqs-description">
                        Find answers to commonly asked questions about charging, payments, and more
                    </p>
                    <button 
                        className="support-faqs-button"
                        onClick={() => navigate('/support/faqs')}
                    >
                        View All FAQs
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SupportPage;
