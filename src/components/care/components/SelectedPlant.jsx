import React from 'react';
import styles from './SelectedPlant.module.css';

const SelectedPlant = ({ plant }) => {
    if (!plant) return null;

    return (
        <div className={styles.plantCard}>
            <img
                src={plant.foto_url}
                alt={plant.apelido || 'Planta'}
                className={styles.plantImage}
            />
            <div className={styles.plantInfo}>
                <span className={styles.selectedText}>Planta Selecionada</span>
                <h3 className={styles.plantName}>{plant.apelido || 'Planta'}</h3>
            </div>
        </div>
    );
};

export default SelectedPlant;
