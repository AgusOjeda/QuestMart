//Tipos de datos utiles

export interface SuccessAlertProps {
    message: string;
    onClose: () => void;
}

export interface ConfirmAlertProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}