import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProfileCard = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profile`, {
          credentials: "include",
        });

        if (!res.ok) return;

        const json = await res.json();
        // Backend shape: { success, message, data: { data: { fullName, email, user_id, photo, phone }, msg, code } }
        setUser(json.data?.data ?? null);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="profile-card">
      {/* Avatar */}
      <div className="profile-card__avatar-wrap">
        <img
          src={user?.photo || "https://api.dicebear.com/9.x/initials/svg?seed=User"}
          alt={user?.fullName}
          className={`profile-card__avatar ${imgLoaded ? "profile-card__avatar--loaded" : ""}`}
          onLoad={() => setImgLoaded(true)}
          draggable={false}
        />
        <button
          className="profile-card__camera"
          aria-label="Change profile picture"
        >
          <Camera size={14} strokeWidth={2.4} />
        </button>
      </div>

      {/* Info */}
      <h2 className="profile-card__name">{user?.fullName || "Loading..."}</h2>
      <p className="profile-card__username">@{user?.user_id || ""}</p>

      {/* Edit button */}
      <button
        className="profile-card__edit-btn"
        onClick={() => navigate("/profile/edit")}
      >
        Edit Profile
      </button>
    </section>
  );
};

export default ProfileCard;

