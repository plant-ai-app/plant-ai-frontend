import React from 'react';
import styles from './CareCard.module.css';
import { Droplets, Sprout, Thermometer, ShieldCheck } from 'lucide-react';

const CareCard = ({ title, type, date, status, note }) => {
    const getIcon = () => {
        switch (type.toLowerCase()) {
            case 'watering':
                return <Droplets className={styles.icon} />;
            case 'fertilizing':
                return <Sprout className={styles.icon} />;
            case 'temperature':
                return <Thermometer className={styles.icon} />;
            default:
                return <ShieldCheck className={styles.icon} />;
        }
    };

    return (
        <div className={styles.careCard}>
            <div className={styles.mainContent}>
                <div className={styles.iconWrapper}>
                    {getIcon()}
                </div>
                <div className={styles.info}>
                    <h4 className={styles.title}>{title}</h4>
                    <p className={styles.subtitle}>
                        {type} • {date}
                    </p>
                </div>
                {status && (
                    <div className={styles.statusBadge}>
                        {status}
                    </div>
                )}
            </div>
            {note && (
                <div className={styles.noteWrapper}>
                    <p className={styles.note}>"{note}"</p>
                </div>
            )}
        </div>
    );
};

export default CareCard;
