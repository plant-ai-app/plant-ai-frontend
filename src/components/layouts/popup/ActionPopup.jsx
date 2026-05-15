import styles from './ActionPopup.module.css';
import { IoClose } from 'react-icons/io5';

const ActionPopup = ({
    isOpen,
    onClose,
    title,
    description,
    onConfirm,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    confirmColor = '#D32F2F' // default red for destructive
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                
                <h3 className={styles.title}>{title}</h3>
                
                {description && <p className={styles.description}>{description}</p>}
                
                <div className={styles.buttonContainer}>
                    {cancelText && (
                        <button className={styles.cancelButton} onClick={onClose}>
                            {cancelText}
                        </button>
                    )}
                    <button 
                        className={styles.confirmButton} 
                        onClick={onConfirm}
                        style={{ backgroundColor: confirmColor }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionPopup;
