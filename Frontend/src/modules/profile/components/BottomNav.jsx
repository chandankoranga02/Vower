import React from 'react';
import {
    Home,
    MapPin,
    CalendarCheck,
    Bell,
    User,
} from 'lucide-react';

const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'map', icon: MapPin, label: 'Map' },
    { id: 'reservations', icon: CalendarCheck, label: 'AI' },
    { id: 'notifications', icon: Bell, label: 'Updates' },
    { id: 'profile', icon: User, label: 'Profile' },
];

const BottomNav = ({ activeTab = 'profile', onTabChange }) => {
    return (
        <nav className="bottom-nav" aria-label="Main navigation">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
                        onClick={() => onTabChange?.(item.id)}
                        aria-label={item.label}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        <span className="bottom-nav__icon-wrap">
                            <Icon
                                size={22}
                                strokeWidth={isActive ? 2.4 : 1.8}
                                fill={isActive ? 'currentColor' : 'none'}
                            />
                        </span>
                        <span className="bottom-nav__label">{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNav;
