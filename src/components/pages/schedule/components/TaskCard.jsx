import React, { useState } from 'react';
import styles from './TaskCard.module.css';
import { BsThreeDotsVertical, BsCheck2, BsClock } from 'react-icons/bs';
import TaskBottomSheet from './TaskBottomSheet.jsx';

const TaskCard = ({ task }) => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <>
            <div className={styles.card}>
            <div className={styles.imageWrapper}>
                {task.image ? (
                    <img src={task.image} alt={task.name} className={styles.image} />
                ) : (
                    <div className={styles.imagePlaceholder}></div>
                )}
                <div className={styles.iconBadge} style={{ backgroundColor: task.iconColor }}>
                    {task.icon}
                </div>
            </div>
            
            <div className={styles.info}>
                <div className={styles.infoHeader}>
                    <h3 className={styles.name}>{task.name}</h3>
                    <span className={`${styles.status} ${styles[task.statusType]}`}>
                        {task.status}
                    </span>
                </div>
                <p className={styles.action}>{task.action}</p>
            </div>
            
            <div className={styles.actions}>
                <button className={`${styles.actionBtn} ${task.actionStyle === 'check' ? styles.checkBtn : styles.timeBtn}`}>
                    {task.actionStyle === 'check' ? (
                        <BsCheck2 className={styles.checkIcon} />
                    ) : (
                        <BsClock className={styles.timeIcon} />
                    )}
                </button>
                <button className={styles.moreBtn} onClick={() => setIsSheetOpen(true)}>
                    <BsThreeDotsVertical />
                </button>
            </div>
            </div>
            <TaskBottomSheet 
                isOpen={isSheetOpen} 
                onClose={() => setIsSheetOpen(false)} 
                plantId={task.id}
            />
        </>
    );
};

export default TaskCard;
