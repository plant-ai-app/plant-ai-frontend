import React from 'react';
import styles from './StatusToggle.module.css';

const StatusToggle = ({ isActive, onToggle }) => {
    return (
        <div className={styles.statusBox}>
            <div className={styles.statusInfo}>
                <h4 className={styles.statusTitle}>Status / Lembrete</h4>
                <span className={styles.statusSubtitle}>Ativar notificações</span>
            </div>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => onToggle(e.target.checked)}
                />
                <span className={styles.slider}></span>
            </label>
        </div>
    );
};

export default StatusToggle;
