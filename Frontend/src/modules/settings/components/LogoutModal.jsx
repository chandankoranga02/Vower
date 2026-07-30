import React from 'react';
import { X } from 'lucide-react';

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Logout</h3>
          <button className="modal__close" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <div className="modal__content">
          <p style={{ color: '#374151', fontSize: '15px' }}>
            Are you sure you want to logout? You will need to sign in again to access your account.
          </p>
        </div>

        <div className="modal__actions">
          <button className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn--danger" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
