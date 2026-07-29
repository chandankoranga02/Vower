import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Search } from 'lucide-react';
import './FAQsPage.css';

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

const FAQsPage = () => {
    const navigate = useNavigate();
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [faqSearch, setFaqSearch] = useState('');

    const handleBack = () => {
        navigate(-1);
    };

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    const filteredFaqs = FAQS.map(category => ({
        ...category,
        questions: category.questions.filter(
            q => q.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
                 q.a.toLowerCase().includes(faqSearch.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <div className="faqs-page">
            <header className="faqs-header">
                <button className="faqs-header__back" onClick={handleBack} aria-label="Go back">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <h1 className="faqs-header__title">FAQs</h1>
            </header>

            <main className="faqs-main">
                {/* Search Bar */}
                <div className="faqs-search-container">
                    <Search size={20} strokeWidth={2} className="faqs-search-icon" />
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={faqSearch}
                        onChange={(e) => setFaqSearch(e.target.value)}
                        className="faqs-search"
                    />
                </div>

                {filteredFaqs.length === 0 ? (
                    <div className="no-results">
                        <HelpCircle size={48} strokeWidth={1.5} className="no-results-icon" />
                        <p>No FAQs found for "{faqSearch}"</p>
                        <p className="no-results-subtitle">Try searching with different keywords</p>
                    </div>
                ) : (
                    filteredFaqs.map((category, catIndex) => (
                        <div key={catIndex} className="faq-category">
                            <h3 className="category-title">{category.category}</h3>
                            {category.questions.map((faq, faqIndex) => {
                                const globalIndex = `${catIndex}-${faqIndex}`;
                                return (
                                    <div
                                        key={faqIndex}
                                        className={`faq-item ${expandedFaq === globalIndex ? 'faq-item--expanded' : ''}`}
                                        onClick={() => toggleFaq(globalIndex)}
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
                                                className={`faq-chevron ${expandedFaq === globalIndex ? 'faq-chevron--rotated' : ''}`}
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
            </main>
        </div>
    );
};

export default FAQsPage;
