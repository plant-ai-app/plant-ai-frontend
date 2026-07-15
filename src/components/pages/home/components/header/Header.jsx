import styles from './Header.module.css';
// import { FiBell } from 'react-icons/fi';
import { PiPlantFill } from "react-icons/pi";

const Header = ({ count = 0 }) => {
    return (
        <header className={styles.header}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>
                    Bom dia <PiPlantFill className={styles.plantIcon} />
                </h1>
                <p className={styles.subtitle}>
                    {count > 0 ? `Você tem ${count} ${count === 1 ? 'cuidado' : 'cuidados'} para hoje` : 'Nenhum cuidado para hoje'}
                </p>
            </div>
            {/* <button className={styles.bellButton} aria-label="Notificações">
                <FiBell className={styles.bellIcon} />
            </button> */}
        </header>
    );
};

export default Header;
