import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  Trash2,
  Check,
  X,
  Loader2,
} from "lucide-react";
import "./EditProfilePage.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [countryCode] = useState("+91");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://api.dicebear.com/9.x/initials/svg?backgroundColor=111111&textColor=ffffff",
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  // ---- Fetch user data on mount ----
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profile`, {
          credentials: "include",
        });

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const json = await res.json();
        const userData = json.data?.data ?? null;

        if (userData) {
          setForm({
            fullName: userData.fullName || "",
            email: userData.email || "",
            phone: userData.phone || "",
            dob: userData.dob || "",
          });

          // Update avatar URL with user's initials or photo
          if (userData.photo) {
            setAvatarUrl(userData.photo);
          } else if (userData.fullName) {
            const initials = userData.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            setAvatarUrl(
              `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=111111&textColor=ffffff`,
            );
          }
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ---- Validation ----
  const validate = useCallback(() => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Name cannot be empty";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Invalid email address";
    }
    if (!form.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (form.phone.replace(/\D/g, "").length < 10) {
      e.phone = "Phone number too short";
    }
    return e;
  }, [form]);

  // ---- Handlers ----
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on edit
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Only images
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    // Max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5 MB.");
      return;
    }

    setSelectedFile(file);

    const preview = URL.createObjectURL(file);
    setAvatarUrl(preview);
  };

  const uploadPhoto = async () => {
  if (!selectedFile) return null;

  const formData = new FormData();
  formData.append("photo", selectedFile);

  const res = await fetch(`${BASE_URL}/profile/photo`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Photo upload failed");
  }

  return json.data.photo;
};

const handleSave = async () => {
  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    setSaving(true);

    // 1. Upload photo if user selected one
    if (selectedFile) {
      await uploadPhoto();
    }

    // 2. Update profile
    const res = await fetch(`${BASE_URL}/profile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        dob: form.dob,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Profile update failed");
    }

    setSaved(true);
    setShowToast(true);

    setTimeout(() => {
      navigate("/profile");
    }, 1500);

  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setSaving(false);
  }
};

  const handleCancel = () => {
    navigate(-1);
  };

  const disabled = saving || saved;

  return (
    <div className="edit-profile">
      {/* Header */}
      <header className="edit-header">
        <button
          className="edit-header__back"
          onClick={handleCancel}
          aria-label="Go back"
          disabled={disabled}
        >
          <ArrowLeft size={22} strokeWidth={2.2} />
        </button>
        <h1 className="edit-header__title">Edit Profile</h1>
      </header>

      {/* Avatar Section */}
      <section className="edit-avatar">
        <div
          className="edit-avatar__wrap"
          onClick={() => !disabled && fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Change profile picture"
        >
          <img
            src={avatarUrl}
            alt="Profile"
            className={`edit-avatar__img `}
            draggable={false}
          />
          <span className="edit-avatar__camera">
            <Camera size={15} strokeWidth={2.4} />
          </span>
        </div>
        <h2 className="edit-avatar__name">{form.fullName || "Your Name"}</h2>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />
      </section>

      {/* Form */}
      <div className="edit-form">
        {/* Full Name */}
        <div className="edit-field">
          <label className="edit-field__label" htmlFor="edit-name">
            Full Name
          </label>
          <div className="edit-field__input-wrap">
            <input
              id="edit-name"
              type="text"
              className={`edit-field__input ${errors.fullName ? "edit-field__input--error" : ""}`}
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              disabled={disabled || loading}
              autoComplete="name"
            />
          </div>
          {errors.fullName && (
            <span className="edit-field__error">
              <X size={12} /> {errors.fullName}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="edit-field">
          <label className="edit-field__label" htmlFor="edit-email">
            Email Address
          </label>
          <div className="edit-field__input-wrap">
            <input
              id="edit-email"
              type="email"
              className={`edit-field__input ${errors.email ? "edit-field__input--error" : ""}`}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="example@email.com"
              disabled={disabled}
              autoComplete="email"
              inputMode="email"
            />
          </div>
          {errors.email && (
            <span className="edit-field__error">
              <X size={12} /> {errors.email}
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div className="edit-field">
          <label className="edit-field__label" htmlFor="edit-phone">
            Phone Number
          </label>
          <div className="edit-field__phone-row">
            <button className="edit-field__country-btn" disabled={disabled}>
              🇮🇳 {countryCode}
            </button>
            <div className="edit-field__input-wrap edit-field__phone-input">
              <input
                id="edit-phone"
                type="tel"
                className={`edit-field__input ${errors.phone ? "edit-field__input--error" : ""}`}
                value={form.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value.replace(/\D/g, ""))
                }
                placeholder="9876543210"
                disabled={disabled}
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
              />
            </div>
          </div>
          {errors.phone && (
            <span className="edit-field__error">
              <X size={12} /> {errors.phone}
            </span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="edit-field">
          <label className="edit-field__label" htmlFor="edit-dob">
            Date of Birth
          </label>
          <div className="edit-field__input-wrap">
            <input
              id="edit-dob"
              type="date"
              className="edit-field__input edit-field__date-input"
              value={form.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      {/* Save / Cancel Buttons */}
      <div className="edit-footer">
        <button
          className="edit-footer__save"
          onClick={handleSave}
          disabled={disabled}
        >
          {saving ? (
            <>
              <span className="edit-footer__save-spinner" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Check size={20} className="edit-footer__save-check" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>
        <button
          className="edit-footer__cancel"
          onClick={handleCancel}
          disabled={disabled}
        >
          Cancel
        </button>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="edit-toast">
          <Check size={16} className="edit-toast__icon" />
          Profile Updated Successfully
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;
