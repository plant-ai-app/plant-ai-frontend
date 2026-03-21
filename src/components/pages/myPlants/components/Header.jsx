import React from 'react';
import styles from './Header.module.css';
import { BsBellFill } from 'react-icons/bs';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.title}>Minhas Plantas</h1>
            <button className={styles.iconButton} aria-label="Notificações">
                <BsBellFill />
            </button>
        </div>
    );
};

export default Header;
