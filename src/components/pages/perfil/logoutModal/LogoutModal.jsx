//react
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import styles from './LogoutModal.module.css';
//icons
import { BsBoxArrowRight } from 'react-icons/bs';
//contexts
import { AuthContext } from '../../../../contexts/AuthContext';

const LogoutModal = ({ isOpen, onClose }) => {
    const { logout } = useContext(AuthContext);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target.className === styles.modalOverlay) {
            onClose();
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles.modalOverlay} onClick={handleBackdropClick}>
            <div className={styles.modalContent}>
                <div className={styles.warningIconContainer}>
                    <BsBoxArrowRight className={styles.warningIcon} />
                </div>

                <h2 className={styles.modalTitle}>Sair</h2>
                <p className={styles.modalDescription}>
                    Tem certeza que deseja sair da sua conta?
                </p>

                <button className={styles.logoutButton} onClick={handleLogout}>
                    Sair
                </button>

                <button className={styles.cancelButton} onClick={onClose}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default LogoutModal;
