import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceholderPage.css';

const PlaceholderPage = ({ title, icon }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="placeholder-page">
            <div className="placeholder-header">
                <button className="placeholder-header__back" onClick={handleBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h1 className="placeholder-header__title">{title}</h1>
            </div>
            
            <div className="placeholder-content">
                <div className="placeholder-icon">
                    {icon}
                </div>
                <h2 className="placeholder-title">{title}</h2>
                <p className="placeholder-text">This page is under development</p>
            </div>
        </div>
    );
};

export default PlaceholderPage;
