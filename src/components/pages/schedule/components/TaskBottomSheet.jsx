import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TaskBottomSheet.module.css';
import { useCare } from '../../../../hooks/useCare';
import Message from '../../../layouts/message/Message';
import Loading from '../../../layouts/loading/Loading';
import TaskActionModal from './modal/TaskActionModal.jsx';

const TaskBottomSheet = ({ isOpen, onClose, task, onSuccess }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const { deleteCare, loading } = useCare();
    
    if (!isOpen && !message) return null;

    const plantId = task?.plantId || task?.id;
    const careId = task?.careId;

    const handleNavigateEdit = () => {
        onClose();
        if (plantId && careId) {
            navigate(`/plant/${plantId}/care/edit/${careId}`);
        }
    };

    const handleDelete = async () => {
        if (!careId) return;
        setMessage("");
        setType("");
        try {
            const data = await deleteCare(careId);
            setMessage(data.message || "Cuidado deletado com sucesso!");
            setType("success");
            
            setTimeout(() => {
                setShowDeleteModal(false);
                if (onSuccess) onSuccess();
                onClose();
            }, 1000);

        } catch (error) {
            setMessage(error.response?.data?.message || "Erro ao deletar cuidado");
            setType("error");
            setShowDeleteModal(false);
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };

    return (
        <>
        {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
            
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.handle} />
            
                <button className={`${styles.option} ${styles.edit}`} onClick={() => setIsSkipModalOpen(true)}> 
                    <span className={styles.optionText}>Pular cuidado</span>
                </button>

                <button className={`${styles.option} ${styles.edit}`} onClick={handleNavigateEdit}>
                    <span className={styles.optionText}>Editar cuidado</span>
                </button>
                
                <button className={`${styles.option} ${styles.delete}`} onClick={() => setShowDeleteModal(true)}>
                    <span className={styles.optionText}>Deletar cuidado</span>
                </button>
                
            </div>
        </div>
        )}

        <TaskActionModal 
            isOpen={isSkipModalOpen}
            onClose={() => {
                setIsSkipModalOpen(false);
                onClose();
            }}
            task={task}
            onSuccess={onSuccess}
            actionType="pular"
        />

{/* Modal de Confirmação de Deleção */}
{showDeleteModal && (
    <div className={styles.modalOverlay} onClick={(e) => { e.stopPropagation(); setShowDeleteModal(false); }}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Excluir Cuidado?</h3>
            <p className={styles.modalText}>
                Deseja excluir este cuidado? Esta ação apagará permanentemente todos os dados e agendamentos relacionados a este cuidado.
            </p>
            <div className={styles.modalActions}>
                <button className={styles.cancelButton} onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                <button className={styles.confirmButton} onClick={handleDelete}>Sim, excluir</button>
            </div>
        </div>
    </div>
)}

{loading && <Loading />}
{message && <Message msg={message} type={type} />}

</>
    );
};

export default TaskBottomSheet;
