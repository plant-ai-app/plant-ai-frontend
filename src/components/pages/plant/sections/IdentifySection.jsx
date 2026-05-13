import { useNavigate } from 'react-router-dom';
import { Search, Camera } from 'lucide-react';
import styles from './IdentifySection.module.css';

const IdentifySection = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Identificar Planta</h3>
            <div className={styles.identifyCard}>
                <div className={styles.identifyHeader}>
                    <div className={styles.searchIconWrapper}>
                        <Search size={20} />
                    </div>
                    <div className={styles.identifyText}>
                        <p className={styles.identifyTitle}>Tire uma foto da sua planta</p>
                        <p className={styles.identifySubtitle}>Descubra a espécie em segundos</p>
                    </div>
                </div>
                <button onClick={() => navigate('/scan')} className={styles.identifyButton}>
                    <Camera size={18} />
                    <span>Identificar Planta</span>
                </button>
            </div>
        </div>
    );
};

export default IdentifySection;
