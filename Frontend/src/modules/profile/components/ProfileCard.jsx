import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({
    name = 'Rahul Sharma',
    avatarUrl = 'https://api.dicebear.com/9.x/initials/svg?seed=RS&backgroundColor=111111&textColor=ffffff'
}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const navigate = useNavigate();
    
    return (
        <section className="profile-card">
            {/* Avatar */}
            <div className="profile-card__avatar-wrap">
                <img
                    src={avatarUrl}
                    alt={name}
                    className={`profile-card__avatar ${imgLoaded ? 'profile-card__avatar--loaded' : ''}`}
                    onLoad={() => setImgLoaded(true)}
                    draggable={false}
                />
            </div>

            {/* Info */}
            <h2 className="profile-card__name">{name}</h2>

            {/* Edit button */}
            <button
                className="profile-card__edit-btn"
                onClick={() => navigate('/profile/edit')}
            >
                Edit Profile
            </button>
        </section>
    );
};

export default ProfileCard;
