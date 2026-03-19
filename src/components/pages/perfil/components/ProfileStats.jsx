import React from 'react';
import styles from './ProfileStats.module.css';
import { PiPlant } from 'react-icons/pi';
import { BsDroplet } from 'react-icons/bs';
import { BiTrendingUp } from 'react-icons/bi';

const ProfileStats = () => {
    return (
        <div className={styles.statsContainer}>
            <div className={styles.statCard}>
                <PiPlant className={styles.statIcon} />
                <span className={styles.statValue}>24</span>
                <span className={styles.statLabel}>Plantas</span>
            </div>
            
            <div className={styles.statCard}>
                <BsDroplet className={styles.statIcon} />
                <span className={styles.statValue}>128</span>
                <span className={styles.statLabel}>Ações</span>
            </div>
            
            <div className={styles.statCard}>
                <BiTrendingUp className={styles.statIcon} />
                <span className={styles.statValue}>45</span>
                <span className={styles.statLabel}>Crescimento</span>
            </div>
        </div>
    );
};

export default ProfileStats;
