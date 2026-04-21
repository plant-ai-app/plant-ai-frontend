import { useNavigate } from 'react-router-dom';
import styles from './TaskBottomSheet.module.css';


const TaskBottomSheet = ({ isOpen, onClose, plantId }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;

    const handleNavigate = () => {
        onClose();
        if (plantId) {
            navigate(`/plant/settings/${plantId}`);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.handle} />
                
                <button className={`${styles.option} ${styles.edit}`} onClick={() => {alert("Editar cuidado")}}>
                    <span className={styles.optionText}>Editar cuidado</span>
                </button>
                
                <button className={`${styles.option} ${styles.settings}`} onClick={handleNavigate}>
                    <span className={styles.optionText}>Configurações</span>
                </button>
                
                <button className={`${styles.option} ${styles.delete}`} onClick={() => {alert("Deletar cuidado")}}>
                    <span className={styles.optionText}>Deletar cuidado</span>
                </button>
            </div>
        </div>
    );
};

export default TaskBottomSheet;
