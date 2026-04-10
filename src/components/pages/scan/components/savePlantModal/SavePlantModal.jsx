import React from 'react';
import styles from './SavePlantModal.module.css';
import { FiX } from 'react-icons/fi';
import SavePlantForm from './SavePlantForm.jsx';

const SavePlantModal = ({ plant, imageSrc, onClose, onSave, isSaving }) => {

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.sheetHandle}></div>
                <button className={styles.closeButton} onClick={onClose} aria-label="Fechar">
                    <FiX />
                </button>
                <div className={styles.header}>
                    <h2>Salvar Planta</h2>
                    <p>Revise os dados antes de salvar no seu perfil</p>
                </div>
                
                <SavePlantForm 
                    plant={plant} 
                    imageSrc={imageSrc}
                    onSave={onSave} 
                    isSaving={isSaving} 
                />
            </div>
        </div>
    );
};

export default SavePlantModal;
