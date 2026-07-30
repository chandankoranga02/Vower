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
          src={
            user?.photo || "https://api.dicebear.com/9.x/initials/svg?seed=User"
          }
          alt={user?.fullName}
          className={`profile-card__avatar ${imgLoaded ? "profile-card__avatar--loaded" : ""}`}
          onLoad={() => setImgLoaded(true)}
          draggable={false}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col items-center mt-2">
        <h2 className="text-2xl font-semibold text-gray-900">
          {user?.fullName || "Loading..."}
        </h2>

        <p className="text-sm text-gray-500 mt-3 mb-5">
          @{user?.user_id || "Loading..."}
        </p>

        <button
          className="profile-card__edit-btn"
          onClick={() => navigate("/profile/edit")}
        >
          Edit Profile
        </button>
      </div>
    </section>
  );
};

export default ProfileCard;
