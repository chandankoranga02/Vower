import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MessageSquare, Clock, HelpCircle } from 'lucide-react';
import './ContactSupportPage.css';

const FAQS = [
    {
        category: 'Charging',
        questions: [
            { q: 'Why won\'t my charging session start?', a: 'Ensure your vehicle is properly connected, the station is online, and you have sufficient balance. Try restarting the session or contact support if the issue persists.' },
            { q: 'Charging station unavailable.', a: 'The station may be under maintenance, occupied, or offline. Check the station status in the app or try a nearby station.' },
            { q: 'Payment failed during charging.', a: 'Verify your payment method is valid and has sufficient funds. If the issue continues, try an alternative payment method or contact support.' }
        ]
    },
    {
        category: 'Payments',
        questions: [
            { q: 'What is the refund timeline?', a: 'Refunds are typically processed within 5-7 business days. You will receive a confirmation email once processed.' },
            { q: 'My wallet balance not updated.', a: 'Wallet updates may take a few minutes. If not reflected after 15 minutes, please contact support with transaction details.' },
            { q: 'I was charged twice.', a: 'Duplicate charges are automatically refunded. If not received within 48 hours, raise a ticket with transaction IDs.' }
        ]
    },
    {
        category: 'Reservations',
        questions: [
            { q: 'How to cancel reservation?', a: 'Go to My Reservations, select the reservation, and tap Cancel. Cancellations are free up to 15 minutes before the slot.' },
            { q: 'My reservation expired.', a: 'Reservations are held for 15 minutes after the scheduled time. After that, the slot is released to other users.' }
        ]
    },
    {
        category: 'Vehicles',
        questions: [
            { q: 'How to add a vehicle?', a: 'Go to Profile > My Vehicle > Add Vehicle. Enter your vehicle details including make, model, and connector type.' },
            { q: 'Which connectors are compatible?', a: 'We support CCS2, Type 2, CHAdeMO, GB/T, and AC Socket. Check your vehicle manual for compatible connector types.' }
        ]
    },
    {
        category: 'Account',
        questions: [
            { q: 'How to change email?', a: 'Go to Profile > Edit Profile > Email. Enter new email and verify via OTP sent to both old and new addresses.' },
            { q: 'How to delete account?', a: 'Go to Profile > Settings > Delete Account. Note: This action is irreversible and all data will be permanently deleted.' }
        ]
    }
];

const ContactSupportPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Store the question string instead of an index for reliability
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [faqSearch, setFaqSearch] = useState('');

    const handleBack = () => {
        navigate(-1);
    };

    // React Router friendly path check
    const isFAQsPage = location.pathname === '/support/faqs';

    const handleCall = () => {
        window.location.href = 'tel:+18001234567';
    };

    const handleEmail = () => {
        window.location.href = 'mailto:support@vower.com';
    };

    const handleWhatsApp = () => {
        window.open('https://wa.me/18001234567', '_blank');
    };

    const toggleFaq = (questionText) => {
        setExpandedFaq(expandedFaq === questionText ? null : questionText);
    };

    const filteredFaqs = FAQS.map(category => ({
        ...category,
        questions: category.questions.filter(
            q => q.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
                 q.a.toLowerCase().includes(faqSearch.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <div className="contact-support-page">
            <header className="contact-support-header">
                <button className="contact-support-header__back" onClick={handleBack} aria-label="Go back">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <h1 className="contact-support-header__title">{isFAQsPage ? 'FAQs' : 'Contact Support'}</h1>
            </header>

            <main className="contact-support-main">
                {/* Contact Options - Only show on Contact Support page */}
                {!isFAQsPage && (
                    <section className="contact-section">
                        <h2 className="section-title">Get in Touch</h2>
                        
                        <div className="contact-options">
                            <button className="contact-option" onClick={handleCall}>
                                <div className="contact-option__icon contact-option__icon--call">
                                    <Phone size={24} strokeWidth={2} />
                                </div>
                                <div className="contact-option__content">
                                    <span className="contact-option__title">Call Support</span>
                                    <span className="contact-option__subtitle">+1 (800) 123-4567</span>
                                </div>
                            </button>

                            <button className="contact-option" onClick={handleEmail}>
                                <div className="contact-option__icon contact-option__icon--email">
                                    <Mail size={24} strokeWidth={2} />
                                </div>
                                <div className="contact-option__content">
                                    <span className="contact-option__title">Email Support</span>
                                    <span className="contact-option__subtitle">support@vower.com</span>
                                </div>
                            </button>

                            <button className="contact-option" onClick={handleWhatsApp}>
                                <div className="contact-option__icon contact-option__icon--whatsapp">
                                    <MessageSquare size={24} strokeWidth={2} />
                                </div>
                                <div className="contact-option__content">
                                    <span className="contact-option__title">WhatsApp Support</span>
                                    <span className="contact-option__subtitle">Chat with us</span>
                                </div>
                            </button>

                            <div className="contact-option contact-option--disabled">
                                <div className="contact-option__icon contact-option__icon--chat">
                                    <MessageSquare size={24} strokeWidth={2} />
                                </div>
                                <div className="contact-option__content">
                                    <span className="contact-option__title">Live Chat</span>
                                    <span className="contact-option__subtitle">Coming Soon</span>
                                </div>
                                <span className="coming-soon-badge">Soon</span>
                            </div>
                        </div>
                    </section>
                )}

                {/* Support Hours */}
                {!isFAQsPage && (
                    <section className="hours-section">
                        <div className="hours-card">
                            <Clock size={20} strokeWidth={2} className="hours-icon" />
                            <div className="hours-content">
                                <h3 className="hours-title">Support Hours</h3>
                                <p className="hours-text">Monday - Sunday: 24/7</p>
                                <p className="hours-emergency">Emergency charging helpline always available</p>
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQs */}
                <section className="faqs-section">
                    <div className="faqs-header">
                        <HelpCircle size={20} strokeWidth={2} />
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </div>

                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={faqSearch}
                        onChange={(e) => setFaqSearch(e.target.value)}
                        className="faq-search"
                    />

                    {filteredFaqs.length === 0 ? (
                        <div className="no-results">
                            <p>No FAQs found for "{faqSearch}"</p>
                        </div>
                    ) : (
                        filteredFaqs.map((category, catIndex) => (
                            <div key={catIndex} className="faq-category">
                                <h3 className="category-title">{category.category}</h3>
                                {category.questions.map((faq, faqIndex) => {
                                    const isExpanded = expandedFaq === faq.q;
                                    return (
                                        <div
                                            key={faqIndex}
                                            className={`faq-item ${isExpanded ? 'faq-item--expanded' : ''}`}
                                            onClick={() => toggleFaq(faq.q)}
                                        >
                                            <div className="faq-question">
                                                <span>{faq.q}</span>
                                                <svg 
                                                    width="20" 
                                                    height="20" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round"
                                                    className={`faq-chevron ${isExpanded ? 'faq-chevron--rotated' : ''}`}
                                                >
                                                    <path d="M6 9l6 6 6-6"/>
                                                </svg>
                                            </div>
                                            <div className="faq-answer">
                                                {faq.a}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </section>
            </main>
        </div>
    );
};

export default ContactSupportPage;