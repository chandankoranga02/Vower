import React from 'react';

const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`toast toast--${type}`}>
      {message}
    </div>
  );
};

export default Toast;
