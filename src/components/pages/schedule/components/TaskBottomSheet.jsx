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
                <button className={styles.option} onClick={handleNavigate}>
                    <span className={styles.optionText}>Configurações da planta</span>
                </button>
                
                <button className={styles.cancelOption} onClick={onClose}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default TaskBottomSheet;
