import styles from './Upcoming.module.css';
import { useNavigate } from 'react-router-dom';
import { getIconForCareType } from '../../../schedule/Schedule.jsx';

const formatRelativeTime = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays === 1) return 'AMANHÃ';
    if (diffDays > 1) return `EM ${diffDays} DIAS`;
    return 'EM BREVE';
};

const Upcoming = ({ tasks = [] }) => {
    const navigate = useNavigate();

    // Show only next 5 tasks
    const displayTasks = tasks.slice(0, 5);

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Próximos</h2>
                {tasks.length > 0 && (
                    <button className={styles.seeAllBtn} onClick={() => navigate('/schedule')}>
                        Ver tudo
                    </button>
                )}
            </div>
            
            <div className={styles.cardsContainer}>
                {displayTasks.length > 0 ? (
                    displayTasks.map((task) => {
                        const careStyle = getIconForCareType(task.tipo?.nome);
                        const plantName = task.planta?.apelido || task.planta?.nome_popular?.split(',')[0].trim() || 'Minha Planta';
                        
                        return (
                            <div key={task.id} className={styles.card} onClick={() => navigate('/schedule')}>
                                <div className={styles.iconWrapper} style={{ backgroundColor: careStyle.bgColor, color: careStyle.color }}>
                                    {careStyle.icon}
                                </div>
                                <p className={styles.timeTag}>
                                    {formatRelativeTime(task.proxima_data)}
                                </p>
                                <h3 className={styles.taskName}>
                                    {task.tipo?.nome || 'Cuidado'}
                                </h3>
                                <p className={styles.plantName}>
                                    {plantName}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <div className={styles.emptyState}>
                        <p>Nenhum cuidado próximo agendado.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Upcoming;

