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
        if (itemId === 'settings') {
            navigate('/settings');
        } else if (itemId === 'help') {
            navigate('/support');
        } else {
            // Future: navigate to other sub-pages
            console.log('Menu item tapped:', itemId);
        }
    };

    const handleTabChange = (tabId) => {
        if (tabId === 'profile') return; // already here
        // Future: navigate to other tabs
        console.log('Tab changed:', tabId);
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
