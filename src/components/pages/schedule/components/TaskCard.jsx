import React, { useState } from 'react';
import styles from './TaskCard.module.css';
import { BsThreeDots, BsCheck2, BsClock, BsGeoAlt } from 'react-icons/bs';
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
                    <p className={styles.action}>{task.quantidade_instrucao}</p>
                    {task.location && (
                        <div className={styles.details}>
                            <span className={styles.detailItem} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <BsGeoAlt size={10} color="#00b386" /> {task.location}
                            </span>
                        </div>
                    )}
                </div>

                <div className={styles.buttonWrapper}>
                    <button className={styles.moreBtn} onClick={() => setIsSheetOpen(true)}>
                        <BsThreeDots />
                    </button>
                    <div className={styles.actions}>
                        <button className={`${styles.actionBtn} ${task.actionStyle === 'check' ? styles.checkBtn : styles.timeBtn}`}>
                            {task.actionStyle === 'check' ? (
                                <BsCheck2 className={styles.checkIcon} />
                            ) : (
                                <BsClock className={styles.timeIcon} />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <TaskBottomSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                plantId={task.plantId || task.id}
                careId={task.careId}
                ativo={task.ativo}
            />
        </>
    );
};

export default TaskCard;
