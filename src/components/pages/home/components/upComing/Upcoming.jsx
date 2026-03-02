import styles from './Upcoming.module.css';
import { FiScissors } from 'react-icons/fi';
import { GiFertilizerBag } from 'react-icons/gi';

const Upcoming = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Upcoming</h2>
            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <div className={styles.iconWrapper}>
                        <FiScissors className={styles.icon} />
                    </div>
                    <p className={styles.timeTag}>TOMORROW</p>
                    <h3 className={styles.taskName}>Pruning</h3>
                    <p className={styles.plantName}>Monstera Deliciosa</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.iconWrapperSecondary}>
                        <GiFertilizerBag className={styles.icon} />
                    </div>
                    <p className={styles.timeTag}>IN 2 DAYS</p>
                    <h3 className={styles.taskName}>Fertilizing</h3>
                    <p className={styles.plantName}>Peace Lily</p>
                </div>
            </div>
        </section>
    );
};

export default Upcoming;
