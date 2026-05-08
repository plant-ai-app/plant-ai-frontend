//react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//styles and icons
import styles from './DueToday.module.css';
import { BiHistory, BiAlarm } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';

//components
import { getIconForCareType } from '../../../schedule/Schedule.jsx';
import TaskActionModal from '../../../schedule/components/modal/TaskActionModal.jsx';

const DueToday = ({ tasks = [], onRefresh }) => {
    const navigate = useNavigate();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [actionType, setActionType] = useState('concluir');

    const displayTasks = tasks.slice(0, 3); // max 3 to not overflow too much
    const mainTask = displayTasks[0];
    const secondaryTasks = displayTasks.slice(1);

    const getPlantImage = (plant) => {
        let plantImage = plant?.foto_url || plant?.imagem || plant?.foto || plant?.image || '';
        if (plantImage && !plantImage.startsWith('http')) {
            const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:3000';
            plantImage = `${baseUrl}${plantImage.startsWith('/') ? '' : '/'}${plantImage}`;
        }
        return plantImage;
    };

    const handleActionClick = (e, task, type) => {
        e.stopPropagation();
        
        const mappedTask = {
            careId: task.id,
            data_prevista: task.proxima_data,
            iconColor: getIconForCareType(task.tipo?.nome).color,
            icon: getIconForCareType(task.tipo?.nome).icon,
            name: task.planta?.apelido || task.planta?.nome_popular?.split(',')[0].trim() || 'Minha Planta',
            status: task.horario_preferencial || '00:00'
        };

        setSelectedTask(mappedTask);
        setActionType(type);
        setIsModalOpen(true);
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Para Hoje</h2>
                {tasks.length > 0 && <button className={styles.seeAllBtn} onClick={() => navigate('/schedule')} style={{ background: 'none', border: 'none', color: '#666', fontSize: '14px', cursor: 'pointer' }}>Ver tudo</button>}
            </div>

            {mainTask ? (
                <>
                    <div className={styles.mainCard} onClick={() => navigate('/schedule')}>
                        <div className={styles.imagePlaceholderBase} style={getPlantImage(mainTask.planta) ? { backgroundImage: `url(${getPlantImage(mainTask.planta)})`, backgroundSize: 'cover', backgroundPosition: 'center', border: 'none' } : {}}>
                            <div className={styles.chip} style={{ backgroundColor: getIconForCareType(mainTask.tipo?.nome).bgColor, color: getIconForCareType(mainTask.tipo?.nome).color }}>
                                {mainTask.tipo?.nome || 'Cuidado'}
                            </div>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.plantInfo}>
                                <div>
                                    <h3 className={styles.plantName}>{mainTask.planta?.apelido || mainTask.planta?.nome_popular?.split(',')[0].trim() || 'Minha Planta'}</h3>
                                    <p className={styles.plantDetails}>{mainTask.planta?.local?.nome || 'Sem local'} • {mainTask.quantidade_instrucao || 'Verificar'}</p>
                                </div>
                                <div className={styles.waterIconWrapper} style={{ backgroundColor: getIconForCareType(mainTask.tipo?.nome).bgColor, color: getIconForCareType(mainTask.tipo?.nome).color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {getIconForCareType(mainTask.tipo?.nome).icon}
                                </div>
                            </div>

                            <div className={styles.lastWatered}>
                                <BiHistory />
                                <span>{mainTask.proxima_data ? new Date(mainTask.proxima_data).toLocaleDateString() : 'Sem data'}</span>
                            </div>

                            <div className={styles.actions}>
                                <button className={styles.markDoneBtn} onClick={(e) => handleActionClick(e, mainTask, 'concluir')}>
                                    <FiCheck /> Concluir
                                </button>
                                <button className={styles.snoozeBtn} aria-label="Pular" onClick={(e) => handleActionClick(e, mainTask, 'pular')}>
                                    <BiAlarm />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.secondaryTasks}>
                        {secondaryTasks.map(task => (
                            <div key={task.id} className={styles.secondaryCard} onClick={() => navigate('/schedule')}>
                                <div className={styles.smallImagePlaceholder} style={getPlantImage(task.planta) ? { backgroundImage: `url(${getPlantImage(task.planta)})`, backgroundSize: 'cover', backgroundPosition: 'center', border: 'none' } : {}}></div>
                                <div className={styles.secondaryPlantInfo}>
                                <h3 className={styles.secondaryPlantName}>{task.planta?.apelido || task.planta?.nome_popular?.split(',')[0].trim() || 'Minha Planta'}</h3>
                                <p className={styles.secondaryPlantDetails}>{task.planta?.local?.nome || 'Sem local'} • {task.tipo?.nome || 'Cuidado'}</p>
                            </div>
                            <div className={styles.waterIconWrapper} style={{ backgroundColor: getIconForCareType(task.tipo?.nome).bgColor, color: getIconForCareType(task.tipo?.nome).color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {getIconForCareType(task.tipo?.nome).icon}
                            </div>
                        </div>
                    ))}
                    </div>
                </>
            ) : (
                <div className={styles.emptyState} style={{ width: '100%', padding: '24px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '16px', color: '#888' }}>
                    <p style={{ margin: 0 }}>Nenhum cuidado para hoje. Suas plantas estão ótimas!</p>
                </div>
            )}

            <TaskActionModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedTask(null);
                }}
                task={selectedTask}
                onSuccess={onRefresh}
                actionType={actionType}
            />
        </section>
    );
};

export default DueToday;
