import styles from './Header.module.css';
import { FiBell } from 'react-icons/fi';
import { PiPlantFill } from "react-icons/pi";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>
                    Good Morning <PiPlantFill className={styles.plantIcon} />
                </h1>
                <p className={styles.subtitle}>You have 3 plants to care for</p>
            </div>
            <button className={styles.bellButton} aria-label="Notifications">
                <FiBell className={styles.bellIcon} />
            </button>
        </header>
    );
};

export default Header;
