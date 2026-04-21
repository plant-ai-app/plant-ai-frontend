import React from 'react';
import styles from './DateTimeSelector.module.css';
import { BsCalendarEvent, BsClock } from 'react-icons/bs';

const DateTimeSelector = ({ date, time, onDateChange, onTimeChange }) => {
    return (
        <div className={styles.dateTimeRow}>
            <div className={styles.dateTimeBox}>
                <span className={styles.dtLabel}>Próxima data</span>
                <div className={styles.dtInputWrapper}>
                    <BsCalendarEvent className={styles.dtIcon} />
                    <div className={styles.dtInputContainer}>
                        <input 
                            type="date" 
                            className={styles.dtInput} 
                            value={date}
                            onChange={(e) => onDateChange(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
            
            <div className={styles.dateTimeBox}>
                <span className={styles.dtLabel}>Horário</span>
                <div className={styles.dtInputWrapper}>
                    <BsClock className={styles.dtIcon} />
                    <div className={styles.dtInputContainer}>
                        <input 
                            type="time" 
                            className={styles.dtInput} 
                            value={time}
                            onChange={(e) => onTimeChange(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateTimeSelector;
