//react
import React from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import styles from './LogoutModal.module.css';
//icons
import { BsBoxArrowRight } from 'react-icons/bs';
//hooks
import { useAuth } from '../../../../hooks/useAuth.js';

const LogoutModal = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target.className === styles.modalOverlay) {
            onClose();
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={styles.modalOverlay} onClick={handleBackdropClick}>
            <div className={styles.modalContent}>
                <div className={styles.warningIconContainer}>
                    <BsBoxArrowRight className={styles.warningIcon} />
                </div>

                <h2 className={styles.modalTitle}>Log Out</h2>
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
