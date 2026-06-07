import React from 'react';
import { BarChart2, Gauge, PawPrint } from 'lucide-react';
import styles from './BadgeRow.module.css';

const BadgeRow = ({ difficulty, growth, toxicity }) => {
    const mapDifficulty = (level) => {
        const map = { 'easy': 'Fácil', 'medium': 'Média', 'hard': 'Difícil' };
        return map[level?.toLowerCase()] || level;
    };

    const mapSpeed = (speed) => {
        const map = { 'slow': 'Lento', 'moderate': 'Moderado', 'fast': 'Rápido' };
        return map[speed?.toLowerCase()] || speed;
    };

    const mapPets = (isToxic) => {
        return isToxic ? 'Tóxica' : 'Segura';
    };

    return (
        <div className={styles.badgesRow}>
            <div className={styles.circleBadge}>
                <div className={`${styles.circleIcon} ${styles.diffIcon}`}>
                    <BarChart2 size={16} />
                </div>
                <span className={styles.badgeLabel}>Dificuldade</span>
                <span className={styles.badgeValue}>{mapDifficulty(difficulty?.level)}</span>
            </div>
            <div className={styles.circleBadge}>
                <div className={`${styles.circleIcon} ${styles.speedIcon}`}>
                    <Gauge size={16} />
                </div>
                <span className={styles.badgeLabel}>Crescimento</span>
                <span className={styles.badgeValue}>{mapSpeed(growth?.speed)}</span>
            </div>
            <div className={styles.circleBadge}>
                <div className={`${styles.circleIcon} ${styles.petsIcon}`}>
                    <PawPrint size={16} />
                </div>
                <span className={styles.badgeLabel}>Pets</span>
                <span className={styles.badgeValue}>{mapPets(toxicity?.is_toxic)}</span>
            </div>
        </div>
    );
};

export default BadgeRow;
