import React, { useState, useMemo } from 'react';
import styles from './DateSelector.module.css';
import { BsChevronDown, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const DateSelector = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weekOffset, setWeekOffset] = useState(0);
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);

    const generateWeekDays = () => {
        const dates = [];
        const baseDate = new Date();
        baseDate.setDate(baseDate.getDate() + weekOffset * 7);
        
        // Find Monday of the current base week
        const day = baseDate.getDay();
        const diff = baseDate.getDate() - day + (day === 0 ? -6 : 1); 
        const startOfWeek = new Date(baseDate.setDate(diff));

        // Generate 7 days
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const days = useMemo(() => generateWeekDays(), [weekOffset]);

    const handlePrevWeek = () => setWeekOffset(prev => prev - 1);
    const handleNextWeek = () => setWeekOffset(prev => prev + 1);

    const isSameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    };

    // Format the month and year header (e.g. "October 2023")
    const getCurrentMonthYear = () => {
        if (days.length === 0) return '';
        // Use the middle of the week to determine the displayed month
        const midWeek = days[3]; 
        return midWeek.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    };

    const handleMonthSelect = (monthIndex) => {
        const currentDisplayedYear = days[3].getFullYear();
        
        // Use today's day of month, accounting for shorter months
        const todayDate = new Date().getDate();
        const daysInTargetMonth = new Date(currentDisplayedYear, monthIndex + 1, 0).getDate();
        const targetDayOfMonth = Math.min(todayDate, daysInTargetMonth);
        
        const targetDate = new Date(currentDisplayedYear, monthIndex, targetDayOfMonth);
        
        // Find Monday of new target date
        const targetDay = targetDate.getDay();
        const targetDiff = targetDate.getDate() - targetDay + (targetDay === 0 ? -6 : 1);
        const targetMonday = new Date(targetDate.setDate(targetDiff)).setHours(0,0,0,0);

        // Find Monday of actual current date (weekOffset 0)
        const baseDate = new Date();
        const baseDay = baseDate.getDay();
        const baseDiff = baseDate.getDate() - baseDay + (baseDay === 0 ? -6 : 1);
        const baseMonday = new Date(baseDate.setDate(baseDiff)).setHours(0,0,0,0);

        // diff in weeks
        const diffTime = targetMonday - baseMonday;
        const targetOffset = Math.round(diffTime / (7 * 24 * 60 * 60 * 1000));

        setWeekOffset(targetOffset);
        setSelectedDate(new Date(currentDisplayedYear, monthIndex, targetDayOfMonth));
        setIsMonthModalOpen(false);
    };

    const monthsList = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => {
            return new Date(2023, i, 1).toLocaleString('pt-BR', { month: 'short' });
        });
    }, []);

    // Mock logic for indicating dates with tasks
    const hasTask = (date) => {
        // Just mock some random dates with tasks
        return date.getDate() % 2 !== 0; 
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.monthSelector} onClick={() => setIsMonthModalOpen(true)}>
                    <h2>{getCurrentMonthYear()}</h2>
                    <BsChevronDown className={styles.dropdownIcon} />
                </div>
                <div className={styles.arrows}>
                    <BsChevronLeft className={styles.arrowIcon} onClick={handlePrevWeek} />
                    <BsChevronRight className={styles.arrowIcon} onClick={handleNextWeek} />
                </div>
            </div>
            
            <div className={styles.daysList}>
                {days.map((date, index) => {
                    const isActive = isSameDay(date, selectedDate);
                    const dayHasTask = hasTask(date);
                    
                    return (
                        <div key={index} className={styles.dayCol}>
                            <span className={styles.dayName}>
                                {date.toLocaleString('pt-BR', { weekday: 'short' }).slice(0, 3)}
                            </span>
                            <div 
                                className={`${styles.dayCircle} ${isActive ? styles.active : ''}`}
                                onClick={() => setSelectedDate(date)}
                            >
                                <span className={`${styles.dayDate} ${isActive ? styles.activeText : ''}`}>
                                    {date.getDate()}
                                </span>
                                {(isActive || dayHasTask) && (
                                    <span className={`${styles.dot} ${isActive ? styles.activeDot : ''}`}></span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {isMonthModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsMonthModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Selecionar Mês</h3>
                            <button className={styles.closeModalBtn} onClick={() => setIsMonthModalOpen(false)}>×</button>
                        </div>
                        <div className={styles.monthsGrid}>
                            {monthsList.map((monthName, index) => {
                                const isCurrentDisplayedMonth = days[3] && days[3].getMonth() === index;
                                return (
                                    <button 
                                        key={index} 
                                        className={`${styles.monthBtn} ${isCurrentDisplayedMonth ? styles.activeMonthBtn : ''}`}
                                        onClick={() => handleMonthSelect(index)}
                                    >
                                        {monthName}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateSelector;
