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
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'reservations', icon: CalendarDays, label: 'My Reservations' },
    { id: 'vehicle', icon: Car, label: 'My Vehicle' },
    { id: 'history', icon: Zap, label: 'Charging History' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support' },
    { id: 'privacy', icon: ShieldCheck, label: 'Privacy Policy' },
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

    return (
        <nav className="profile-menu">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                    <div
                        key={item.id}
                        className="profile-menu__item"
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                            handleRipple(e);
                            if (item.id === 'help') {

                                window.location.href = '/support';

                                navigate('/support');

                            } else {
                                onItemClick?.(item.id);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                if (item.id === 'help') {
                                    window.location.href = '/support';
                                } else {
                                    onItemClick?.(item.id);
                                }
                            }
                        }}
                    >
                        <div className="profile-menu__icon">
                            <Icon size={20} strokeWidth={1.8} />
                        </div>
                        <span className="profile-menu__label">{item.label}</span>
                        <ChevronRight size={18} strokeWidth={2} className="profile-menu__chevron" />
                    </div>
                );
            })}
        </nav>
    );
};

export default ProfileMenuList;
