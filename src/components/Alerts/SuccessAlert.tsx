import React from 'react';
import './SuccessAlert.css';
import { SuccessAlertProps } from '../../types/util.types';

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, onClose }) => {
    return (
        <div className="success-alert-overlay" onClick={onClose}>
            <div className="success-alert" onClick={(e) => e.stopPropagation()}>
                <h2>{message}</h2>
                <hr />
                <button onClick={onClose}>Aceptar</button>
            </div>
        </div>
    );
};

export default SuccessAlert;
