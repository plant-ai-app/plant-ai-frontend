import styles from './BottomNav.module.css';
import { BiHomeAlt, BiCalendar } from 'react-icons/bi';
import { PiPlant } from 'react-icons/pi';
import { BsPerson } from 'react-icons/bs';
import { RiFocus3Line } from 'react-icons/ri';

const BottomNav = () => {
    return (
        <nav className={styles.navContainer}>
            <div className={styles.navBar}>
                <button className={`${styles.navItem} ${styles.active}`}>
                    <BiHomeAlt className={styles.icon} />
                    <span>Home</span>
                </button>
                <button className={styles.navItem}>
                    <PiPlant className={styles.icon} />
                    <span>My Plants</span>
                </button>

                <div className={styles.centerButtonWrapper}>
                    <button className={styles.centerButton} aria-label="Identify Plant">
                        <RiFocus3Line className={styles.centerIcon} />
                    </button>
                    <span className={styles.centerLabel}>Identify</span>
                </div>

                <button className={styles.navItem}>
                    <BiCalendar className={styles.icon} />
                    <span>Schedule</span>
                </button>
                <button className={styles.navItem}>
                    <BsPerson className={styles.icon} />
                    <span>Profile</span>
                </button>
            </div>
        </nav>
    );
};

export default BottomNav;
