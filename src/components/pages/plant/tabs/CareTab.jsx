import { useState } from 'react';
import TaskCard from '../../schedule/components/TaskCard';
import TaskList from '../../schedule/components/TaskList';
import { useCareTab } from '../hooks/useCareTab';
import styles from './CareTab.module.css';

const CareTab = ({ plant }) => {
    const { overdueTasks, todayTasks, futureTasks, loading, fetchCares } = useCareTab(plant);
    const [overdueExpanded, setOverdueExpanded] = useState(true);

    if (loading) {
        return <div className={styles.loadingContainer}>Carregando tarefas...</div>;
    }

    return (
        <div className={styles.tabContent}>
            {overdueTasks.length > 0 && (
                <TaskList
                    title="Atrasadas"
                    count={overdueTasks.length}
                    type="overdue"
                    tasks={overdueTasks}
                    onRefresh={fetchCares}
                    collapsible={true}
                    isExpanded={overdueExpanded}
                    onToggle={() => setOverdueExpanded(!overdueExpanded)}
                />
            )}

            {todayTasks.length > 0 && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Para Fazer Hoje</h3>
                    <div className={styles.taskList}>
                        {todayTasks.map((task, index) => (
                            <TaskCard key={`today-${task.careId || index}`} task={task} onRefresh={fetchCares} />
                        ))}
                    </div>
                </div>
            )}

            {todayTasks.length === 0 && futureTasks.length > 0 && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Futuras</h3>
                    <div className={styles.taskList}>
                        {futureTasks.map((task, index) => (
                            <TaskCard key={`future-${task.careId || index}`} task={task} onRefresh={fetchCares} />
                        ))}
                    </div>
                </div>
            )}

            {overdueTasks.length === 0 && todayTasks.length === 0 && futureTasks.length === 0 && (
                <div className={styles.placeholderCard}>
                    <p>Nenhuma tarefa agendada para esta planta.</p>
                </div>
            )}
        </div>
    );
};

export default CareTab;
