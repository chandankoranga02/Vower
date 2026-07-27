import React from 'react';
import { Home, MapPin, CalendarCheck, Bell, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'map', icon: MapPin, label: 'Map', path: '/map' },
    { id: 'reservations', icon: CalendarCheck, label: '', path: '/ai' },
    { id: 'notifications', icon: Bell, label: 'Updates', path: '/updates' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
];

const Footer = ({ onTabChange }) => {
    // Hooks to handle dynamic routing and current URL state
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleNavigation = (id, path) => {
        if (onTabChange) onTabChange(id);
        navigate(path); // Executes the actual page change
    };

    return (
        <nav className="bottom-nav md:!hidden" aria-label="Main navigation">
            {navItems.map((item) => {
                const Icon = item.icon;
                
                // Dynamically checks if the current browser URL matches the item's path
                const isActive = location.pathname === item.path;
                const isAI = item.id === 'reservations';

                return (
                    <button
                        key={item.id}
                        className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
                        onClick={() => handleNavigation(item.id, item.path)}
                        aria-label={item.label}
                        aria-current={isActive ? 'page' : undefined}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        <span 
                            className="bottom-nav__icon-wrap"
                            style={isAI ? {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '9999px',
                                backgroundColor: '#2563eb',
                                color: '#ffffff',
                                background: "linear-gradient(180deg,#4F8EF7,#2563EB)",
                                border: "3px solid #111",
                                boxShadow: "0 6px 18px rgba(37,99,235,.45)",
                                transform: "translateY(-14px)",
                                marginBottom: '4px',
                                padding:'10px'
                            } : {}}
                        >
                            <Icon
                                size={isAI ? 24 : 22}
                                strokeWidth={isActive ? 2.4 : 1.8}
                                fill={isAI ? '#ffffff' : (isActive ? 'currentColor' : 'none')}
                            />
                        </span>
                        <span 
                            className="bottom-nav__label" 
                            style={isAI ? { marginTop: '6px' } : {}}
                        >
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};

export default Footer;
