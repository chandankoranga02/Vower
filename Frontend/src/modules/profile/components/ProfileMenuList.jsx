import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Settings,
    CalendarDays,
    Car,
    Zap,
    HelpCircle,
    ShieldCheck,
    ChevronRight,
} from 'lucide-react';

const menuItems = [
    { id: 'settings', icon: Settings, label: 'Settings', route: '/profile/settings' },
    { id: 'reservations', icon: CalendarDays, label: 'My Reservations', route: '/profile/settings/reservations' },
    { id: 'vehicle', icon: Car, label: 'My Vehicle', route: null }, // Non-clickable as requested
    { id: 'history', icon: Zap, label: 'Charging History', route: '/profile/settings/charging-history' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', route: '/support' },
    { id: 'privacy', icon: ShieldCheck, label: 'Privacy Policy', route: '/profile/privacy' },
];

const ProfileMenuList = ({ onItemClick }) => {
    const navigate = useNavigate();

    const handleRipple = useCallback((e) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }, []);

    const handleClick = (item) => {
        // Don't navigate if route is null (for non-clickable items like My Vehicle)
        if (!item.route) return;
        
        handleRipple({ currentTarget: document.activeElement, clientX: 0, clientY: 0 });
        navigate(item.route);
    };

    return (
        <nav className="profile-menu">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isDisabled = !item.route;
                return (
                    <div
                        key={item.id}
                        className={`profile-menu__item ${isDisabled ? 'profile-menu__item--disabled' : ''}`}
                        role={isDisabled ? 'presentation' : 'button'}
                        tabIndex={isDisabled ? -1 : 0}
                        onClick={() => !isDisabled && handleClick(item)}
                        onKeyDown={(e) => {
                            if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                handleClick(item);
                            }
                        }}
                    >
                        <div className="profile-menu__icon">
                            <Icon size={20} strokeWidth={1.8} />
                        </div>
                        <span className="profile-menu__label">{item.label}</span>
                        {!isDisabled && <ChevronRight size={18} strokeWidth={2} className="profile-menu__chevron" />}
                    </div>
                );
            })}
        </nav>
    );
};

export default ProfileMenuList;
