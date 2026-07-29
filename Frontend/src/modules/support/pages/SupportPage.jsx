import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, FileText, Phone, MessageCircle, HelpCircle, Zap, CreditCard, MapPin, Car, User, Search } from 'lucide-react';
import './SupportPage.css';

const SupportPage = () => {
    const navigate = useNavigate();
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [faqSearch, setFaqSearch] = useState('');

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

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    // FAQ Data
    const faqCategories = [
        {
            title: 'Charging',
            icon: <Zap size={18} />,
            items: [
                { q: "Why won't my charging session start?", a: "Ensure the connector is fully inserted and the station is online. Try scanning the QR code again or using your RFID card." },
                { q: "Charging station unavailable.", a: "The station might be under maintenance or occupied. Check the real-time status on the map or try a nearby station." },
                { q: "Charging interrupted unexpectedly.", a: "This can happen due to grid fluctuations or connector issues. Please raise a ticket with the session ID for investigation." }
            ]
        },
        {
            title: 'Payments',
            icon: <CreditCard size={18} />,
            items: [
                { q: "What is the refund timeline?", a: "Refunds are typically processed within 5-7 business days depending on your bank." },
                { q: "My wallet balance didn't update.", a: "Wallet updates are usually instant. If delayed, check your transaction history or contact support with the payment ID." },
                { q: "Payment failed but money deducted.", a: "This is often a temporary hold by the bank. The amount will be reversed automatically within 24 hours." }
            ]
        },
        {
            title: 'Reservations',
            icon: <MapPin size={18} />,
            items: [
                { q: "How to cancel a reservation?", a: "Go to 'My Reservations', select the active booking, and tap 'Cancel'. Cancellation fees may apply if done late." },
                { q: "Reservation expired.", a: "Reservations are held for 15 minutes past the slot time. After that, the slot is released to other users." }
            ]
        },
        {
            title: 'Vehicles',
            icon: <Car size={18} />,
            items: [
                { q: "How to add a new vehicle?", a: "Go to Profile > My Vehicles > Add Vehicle. Enter your registration number and select the model." },
                { q: "Which connectors are compatible?", a: "Most EVs use Type 2 (AC) or CCS2 (DC). Check your vehicle manual or the 'Compatibility' section in the app." }
            ]
        },
        {
            title: 'Account',
            icon: <User size={18} />,
            items: [
                { q: "How to change my email?", a: "Visit Profile > Edit Profile. You will need to verify the new email via OTP." },
                { q: "Can I delete my account?", a: "Yes, go to Settings > Privacy > Delete Account. Note that this action is irreversible." }
            ]
        }
    ];

    const filteredFaqs = faqCategories.map(cat => ({
        ...cat,
        items: cat.items.filter(item => 
            item.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
            item.a.toLowerCase().includes(faqSearch.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0);

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

                {/* Contact Support Section */}
                <div className="support-section">
                    <h2 className="support-section__title">Contact Support</h2>
                    <div className="contact-grid">
                        <button className="contact-btn" onClick={() => window.location.href = 'tel:+1234567890'}>
                            <Phone size={20} />
                            <span>Call Support</span>
                        </button>
                        <button className="contact-btn" onClick={() => window.location.href = 'mailto:support@evcharge.com'}>
                            <MessageCircle size={20} />
                            <span>Email Support</span>
                        </button>
                        <button className="contact-btn" onClick={() => window.open('https://wa.me/1234567890', '_blank')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            <span>WhatsApp</span>
                        </button>
                        <button className="contact-btn disabled" disabled>
                            <HelpCircle size={20} />
                            <span>Live Chat <small>(Soon)</small></span>
                        </button>
                    </div>
                </div>

                {/* FAQs Section */}
                <div className="support-section faq-section">
                    <h2 className="support-section__title">Frequently Asked Questions</h2>
                    <div className="faq-search-wrapper">
                        <Search size={16} />
                        <input 
                            type="text" 
                            placeholder="Search questions..." 
                            value={faqSearch}
                            onChange={(e) => setFaqSearch(e.target.value)}
                        />
                    </div>

                    <div className="faq-list">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.flatMap((category, catIndex) => (
                                <div key={catIndex} className="faq-category-group">
                                    <div className="faq-category-title">
                                        {category.icon}
                                        <span>{category.title}</span>
                                    </div>
                                    {category.items.map((item, idx) => {
                                        const globalIndex = `${catIndex}-${idx}`;
                                        return (
                                            <div key={globalIndex} className={`faq-item ${expandedFaq === globalIndex ? 'active' : ''}`}>
                                                <button className="faq-question" onClick={() => toggleFaq(globalIndex)}>
                                                    <span>{item.q}</span>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`chevron ${expandedFaq === globalIndex ? 'rotate' : ''}`}>
                                                        <path d="M9 18l6-6-6-6"/>
                                                    </svg>
                                                </button>
                                                <div className="faq-answer">
                                                    <p>{item.a}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No questions found matching "{faqSearch}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SupportPage;
