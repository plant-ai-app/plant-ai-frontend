import React from 'react';
import styles from './TaskList.module.css';
import TaskCard from './TaskCard.jsx';
import { BsExclamationTriangleFill, BsChevronDown, BsChevronUp } from 'react-icons/bs';

const TaskList = ({ title, count, type, tasks, onRefresh, collapsible = false, isExpanded = true, onToggle }) => {
    return (
        <div className={styles.section}>
            <div 
                className={`${styles.header} ${collapsible ? styles.clickableHeader : ''}`}
                onClick={collapsible ? onToggle : undefined}
            >
                <div className={styles.titleArea}>
                    {type === 'overdue' && <BsExclamationTriangleFill className={styles.warningIcon} />}
                    <h2 className={`${styles.title} ${type === 'overdue' ? styles.warningTitle : ''}`}>
                        {title}
                    </h2>
                </div>
                
                <div className={styles.rightHeader}>
                    {count && (
                        <span className={`${styles.badge} ${type === 'overdue' ? styles.warningBadge : styles.normalBadge}`}>
                            {count} tarefas
                        </span>
                    )}
                    {collapsible && (
                        <button className={styles.toggleBtn}>
                            {isExpanded ? <BsChevronUp /> : <BsChevronDown />}
                        </button>
                    )}
                </div>
            </div>
            
            {(!collapsible || isExpanded) && (
                <div className={styles.list}>
                    {tasks.map((task, index) => (
                        <TaskCard key={index} task={task} onRefresh={onRefresh} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
