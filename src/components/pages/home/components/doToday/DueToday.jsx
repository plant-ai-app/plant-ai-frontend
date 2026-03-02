import styles from './DueToday.module.css';
import { BiHistory, BiAlarm } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';
import { MdWaterDrop } from 'react-icons/md';

const DueToday = () => {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Due Today</h2>
                <button className={styles.seeAllBtn}>See all</button>
            </div>

            <div className={styles.mainCard}>
                <div className={styles.imagePlaceholderBase}>
                    <div className={styles.chip}>Watering</div>
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.plantInfo}>
                        <div>
                            <h3 className={styles.plantName}>Fiddle Leaf Fig</h3>
                            <p className={styles.plantDetails}>Living Room • 500ml water</p>
                        </div>
                        <div className={styles.waterIconWrapper}>
                            <MdWaterDrop className={styles.waterIcon} />
                        </div>
                    </div>

                    <div className={styles.lastWatered}>
                        <BiHistory />
                        <span>Last watered 7 days ago</span>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.markDoneBtn}>
                            <FiCheck /> Mark Done
                        </button>
                        <button className={styles.snoozeBtn} aria-label="Snooze">
                            <BiAlarm />
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.secondaryCard}>
                <div className={styles.smallImagePlaceholder}></div>
                <div className={styles.secondaryPlantInfo}>
                    <h3 className={styles.secondaryPlantName}>Snake Plant</h3>
                    <p className={styles.secondaryPlantDetails}>Bedroom • Mist leaves</p>
                </div>
                <div className={styles.waterIconWrapper}>
                    <MdWaterDrop className={styles.waterIcon} />
                </div>
            </div>
        </section>
    );
};

export default DueToday;
