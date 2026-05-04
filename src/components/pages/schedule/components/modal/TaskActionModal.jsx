import React, { useState } from 'react';
import styles from './TaskActionModal.module.css';
import { BsX, BsCalendarCheck, BsFlower1, BsInfoCircle } from 'react-icons/bs';
import { useHistoricoCuidado } from '../../../../../hooks/useHistoricoCuidado';

const TaskActionModal = ({ isOpen, onClose, task, onSuccess, actionType = 'concluir' }) => {
    const [observacoes, setObservacoes] = useState('');
    const { createHistoricoCuidado, loading } = useHistoricoCuidado();

    if (!isOpen || !task) return null;

    const isSkip = actionType === 'pular';
    
    const config = {
        title: isSkip ? 'Pular cuidado' : 'Concluir cuidado',
        confirmText: isSkip ? (loading ? 'Pulando...' : 'Pular') : (loading ? 'Confirmando...' : 'Confirmar'),
        status: isSkip ? 'PULADO' : 'CONCLUIDO',
        placeholder: isSkip ? 'Por que você está pulando este cuidado?' : 'Como estava a planta hoje?',
        buttonClass: isSkip ? `${styles.confirmButton} ${styles.skipButton}` : styles.confirmButton
    };

    const handleConfirm = async () => {
        try {
            await createHistoricoCuidado({
                cuidado_id: task.careId,
                data_prevista: task.data_prevista,
                status: config.status,
                observacoes: observacoes
            });
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error(`Erro ao ${isSkip ? 'pular' : 'concluir'} cuidado:`, error);
            alert(`Não foi possível ${isSkip ? 'pular' : 'concluir'} o cuidado.`);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>{config.title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <BsX size={28} />
                    </button>
                </div>
                
                <div className={styles.content}>
                    <div className={styles.plantInfo}>
                        <div className={styles.plantIcon} style={{ backgroundColor: task.iconColor || '#00b386' }}>
                            {task.icon || <BsFlower1 />}
                        </div>
                        <div className={styles.plantText}>
                            <h3>{task.name}</h3>
                            <p>{task.status}</p>
                        </div>
                    </div>

                    <div className={styles.dateInfo}>
                        <BsCalendarCheck className={styles.infoIcon} />
                        <span>Data prevista: <strong>{task.data_prevista ? new Date(task.data_prevista).toLocaleDateString() : 'Não informada'}</strong></span>
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.labelWrapper}>
                            <BsInfoCircle size={14} />
                            <label htmlFor="observacoes">Observações</label>
                        </div>
                        <textarea 
                            id="observacoes"
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                            placeholder={config.placeholder}
                            rows={3}
                            className={styles.textarea}
                        />
                    </div>
                </div>

                <div className={styles.footer}>
                    <button 
                        className={config.buttonClass} 
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {config.confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskActionModal;
