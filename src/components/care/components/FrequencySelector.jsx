import React from 'react';
import styles from './FrequencySelector.module.css';

const FrequencySelector = ({ frequency, onIncrease, onDecrease }) => {
    return (
        <div>
            <h4 className={styles.sectionTitle}>Frequência</h4>
            <div className={styles.frequencyContainer}>
                <div className={styles.frequencyInner}>
                    <span className={styles.freqText}>A cada</span>
                    <button type="button" className={styles.circleButton} onClick={onDecrease}>-</button>
                    <span className={styles.freqValue}>{frequency}</span>
                    <button type="button" className={styles.circleButton} onClick={onIncrease}>+</button>
                    <span className={styles.freqText}>Dias</span>
                </div>
            </div>
        </div>
    );
};

export default FrequencySelector;
