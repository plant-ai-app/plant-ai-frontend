import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.title}>Cuidados Agendados</h1>
            <div className={styles.actions}>
            </div>
        </div>
    );
};

export default Header;
