import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

import ProfileHeader from './components/ProfileHeader';
import ProfileCard from './components/ProfileCard';
import ProfileMenuList from './components/ProfileMenuList';
import BottomNav from './components/BottomNav';

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleMenuItemClick = (itemId) => {
        const routes = {
            'settings': '/settings',
            'reservations': '/reservations',
            'vehicle': '/vehicle',
            'history': '/history',
            'help': '/help',
            'privacy': '/privacy',
        };

        if (routes[itemId]) {
            navigate(routes[itemId]);
        }
    };

    const handleTabChange = (tabId) => {
        if (tabId === 'profile') return;
        
        const tabRoutes = {
            'home': '/home',
            'stations': '/stations',
            'profile': '/profile',
        };

        if (tabRoutes[tabId]) {
            navigate(tabRoutes[tabId]);
        }
    };

    return (
        <div className="profile-page">
            <ProfileHeader onBack={handleBack} />
            <ProfileCard />
            <div className="profile-divider" />
            <ProfileMenuList onItemClick={handleMenuItemClick} />
            <BottomNav activeTab="profile" onTabChange={handleTabChange} />
        </div>
    );
};

export default ProfilePage;
