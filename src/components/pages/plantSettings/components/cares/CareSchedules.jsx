import CareScheduleCard from './components/CareScheduleCard';
import styles from './CareSchedules.module.css';

const CareSchedules = ({ cares, plantId, plantPhoto }) => {
    return (
        <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Cuidados Agendados</h3>

            <div className={styles.list}>
                {cares.length > 0 ? (
                    cares.map(care => (
                        <CareScheduleCard
                            key={care.id}
                            care={care}
                            plantId={plantId}
                            plantPhoto={plantPhoto}
                        />
                    ))
                ) : (
                    <p className={styles.emptyText}>Nenhum cuidado configurado.</p>
                )}
            </div>
        </section>
    );
};

export default CareSchedules;
