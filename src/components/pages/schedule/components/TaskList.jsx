import React from 'react';
import styles from './TaskList.module.css';
import TaskCard from './TaskCard.jsx';
import { BsExclamationTriangleFill } from 'react-icons/bs';

const TaskList = ({ title, count, type, tasks }) => {
    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleArea}>
                    {type === 'overdue' && <BsExclamationTriangleFill className={styles.warningIcon} />}
                    <h2 className={`${styles.title} ${type === 'overdue' ? styles.warningTitle : ''}`}>
                        {title}
                    </h2>
                </div>
                {count && (
                    <span className={`${styles.badge} ${type === 'overdue' ? styles.warningBadge : styles.normalBadge}`}>
                        {count} tarefas
                    </span>
                )}
            </div>
            
            <div className={styles.list}>
                {tasks.map((task, index) => (
                    <TaskCard key={index} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
