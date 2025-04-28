import React from 'react';
import './ConfirmAlert.css';
import { ConfirmAlertProps } from '../../types/util.types';

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirm-alert-overlay" onClick={onCancel}>
            <div className="confirm-alert" onClick={(e) => e.stopPropagation()}>
                <h2>{message}</h2>
                <hr />
                <div className="confirm-buttons">
                    <button onClick={onConfirm} className="yes-btn">Sí</button>
                    <button onClick={onCancel} className="no-btn">No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmAlert;
