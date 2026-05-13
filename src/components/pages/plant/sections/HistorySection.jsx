import { useNavigate } from 'react-router-dom';
import HistoryCard from '../../history/components/HistoryCard';
import styles from './HistorySection.module.css';

const HistorySection = ({ history, plantId }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Cuidados anteriores</h3>
            <div className={styles.careList}>
                {history.length === 0 ? (
                    <p className={styles.emptyHistory}>Nenhum cuidado registrado.</p>
                ) : (
                    history.slice(0, 4).map(item => (
                        <HistoryCard key={item.id} item={item} />
                    ))
                )}
            </div>
            {history.length > 4 && (
                <div className={styles.seeMoreWrapper}>
                    <button 
                        className={styles.seeMoreButton} 
                        onClick={() => navigate('/history', { state: { plantId } })}
                    >
                        Ver todo o histórico
                    </button>
                </div>
            )}
        </div>
    );
};

export default HistorySection;
