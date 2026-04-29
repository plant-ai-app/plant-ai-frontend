import { useNavigate } from 'react-router-dom';
import styles from './TaskBottomSheet.module.css';
import { useCare } from '../../../../hooks/useCare';

const TaskBottomSheet = ({ isOpen, onClose, plantId, careId, ativo, onSuccess }) => {
    const navigate = useNavigate();
    const { updateCare } = useCare();
    
    if (!isOpen) return null;

    const handleNavigateSettings = () => {
        onClose();
        if (plantId) {
            navigate(`/plant/settings/${plantId}`);
        }
    };

    const handleNavigateEdit = () => {
        onClose();
        if (plantId && careId) {
            navigate(`/plant/${plantId}/care/edit/${careId}`);
        }
    };

    const handleToggleStatus = async () => {
        if (!careId) return;
        try {
            await updateCare(careId, { ativo: !ativo });
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error("Erro ao alterar status:", error);
            alert("Não foi possível alterar o status do cuidado.");
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.handle} />
                
                {/* <button className={`${styles.option} ${styles.edit}`} onClick={handleToggleStatus}>
                    <span className={styles.optionText}>{ativo ? 'Pausar cuidado' : 'Retomar cuidado'}</span>
                </button> */}

                <button className={`${styles.option} ${styles.edit}`} onClick={() => {alert("pular cuidado")}}> 
                    <span className={styles.optionText}>Pular cuidado</span>
                </button>

                <button className={`${styles.option} ${styles.edit}`} onClick={handleNavigateEdit}>
                    <span className={styles.optionText}>Editar cuidado</span>
                </button>

                {/* <button className={`${styles.option} ${styles.settings}`} onClick={handleNavigateSettings}>
                    <span className={styles.optionText}>Configurações</span>
                </button> */}
                
                <button className={`${styles.option} ${styles.delete}`} onClick={() => {alert("Deletar cuidado")}}>
                    <span className={styles.optionText}>Deletar cuidado</span>
                </button>
            </div>
        </div>
    );
};

export default TaskBottomSheet;
