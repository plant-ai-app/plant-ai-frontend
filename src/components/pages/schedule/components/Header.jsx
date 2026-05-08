import styles from './Header.module.css';
import { BsCalendar3 } from 'react-icons/bs';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.title}>Cuidados Agendados</h1>
            <div className={styles.actions}>
                <button className={styles.iconButton} aria-label="Calendário">
                    <BsCalendar3 />
                </button>
            </div>
        </div>
    );
};

export default Header;
