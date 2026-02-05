import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './BackButton.module.css';

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <button className={styles.backButton} onClick={handleGoBack} aria-label="Voltar">
            <ArrowLeft className={styles.icon} />
        </button>
    );
};

export default BackButton;
