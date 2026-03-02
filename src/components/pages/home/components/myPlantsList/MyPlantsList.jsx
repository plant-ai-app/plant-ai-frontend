import styles from './MyPlantsList.module.css';

const MyPlantsList = () => {
    const plants = [
        { id: 1, name: 'Monstera' },
        { id: 2, name: 'Aloe Vera', hasAction: true },
        { id: 3, name: 'Rubber Fig' },
        { id: 4, name: 'Snake' },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>My Plants</h2>
                <button className={styles.addBtn} aria-label="Add Plant">
                    +
                </button>
            </div>

            <div className={styles.listContainer}>
                {plants.map(plant => (
                    <div key={plant.id} className={styles.plantItem}>
                        <div className={styles.imagePlaceholder}>
                            {plant.hasAction && <div className={styles.actionDot}></div>}
                        </div>
                        <p className={styles.plantName}>{plant.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MyPlantsList;
