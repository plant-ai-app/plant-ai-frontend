//react
import React, { useState, useEffect } from 'react';

//styles
import styles from "./Schedule.module.css";

//components
import Container from "../../common/container/Container.jsx";
import Header from "./components/Header.jsx";
import DateSelector from "./components/DateSelector.jsx";
import TaskList from "./components/TaskList.jsx";
import AddButton from "./components/AddButton.jsx";

//services
import { getPlants } from "../../../services/plant.service";
import { getCaresByPlantId } from "../../../services/care.service";

//icons
import { BsSave, BsDroplet, BsLightningCharge, BsScissors, BsSun, BsWind, BsBug, BsStars, BsArrowRepeat } from 'react-icons/bs';

const getIconForCareType = (name) => {
    switch (name) {
        case 'Exposição Solar': return { icon: <BsSun />, color: '#ffcc00', bgColor: '#ffffe6' };
        case 'Adubação': return { icon: <BsLightningCharge />, color: '#88cc00', bgColor: '#f2ffe6' };
        case 'Poda': return { icon: <BsScissors />, color: '#ff4d4d', bgColor: '#ffe6e6' };
        case 'Controle de Pragas': return { icon: <BsBug />, color: '#a64dff', bgColor: '#f2e6ff' };
        case 'Limpeza das Folhas': return { icon: <BsStars />, color: '#0088ff', bgColor: '#e6f4ff' };
        case 'Rega': return { icon: <BsDroplet />, color: '#00b386', bgColor: '#e6fff7' };
        case 'Troca de Vaso': return { icon: <BsArrowRepeat />, color: '#ff8800', bgColor: '#ffeee0' };
        default: return { icon: <BsSun />, color: '#808080', bgColor: '#f2f2f2' };
    }
};

const Schedule = () => {
    const [taskGroups, setTaskGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                // 1. Obter todas as plantas do usuário
                const plantas = await getPlants();
                
                // 2. Para cada planta, buscar seus cuidados
                let allCares = [];
                for (const plant of plantas) {
                    try {
                        const response = await getCaresByPlantId(plant.id);
                        if (response && response.cuidados) {
                            // Adicionar informações da planta em cada cuidado
                            const cuidadosComPlanta = response.cuidados.map(c => ({
                                ...c,
                                plantaInfo: plant
                            }));
                            allCares = [...allCares, ...cuidadosComPlanta];
                        }
                    } catch (err) {
                        console.error(`Erro ao buscar cuidados para planta ${plant.id}:`, err);
                    }
                }

                // 3. Organizar os cuidados por data
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);

                const overdueTasks = [];
                const todayTasks = [];
                const tomorrowTasks = [];

                allCares.forEach((cuidado) => {
                    const styleData = getIconForCareType(cuidado.tipo?.nome);
                    
                    const taskDate = new Date(cuidado.proxima_data);
                    taskDate.setHours(0, 0, 0, 0);

                    // A imagem pode vir de campos diferentes dependendo do schema
                    const plantImage = cuidado.plantaInfo?.imagem || cuidado.plantaInfo?.foto || cuidado.plantaInfo?.image || '';

                    const task = {
                        id: cuidado.planta_id, // Usado para abrir o TaskBottomSheet
                        name: cuidado.plantaInfo?.nome || `Planta ${cuidado.planta_id}`,
                        image: plantImage,
                        action: cuidado.tipo?.nome || 'Cuidado',
                        status: cuidado.horario_preferencial || '00:00',
                        statusType: 'normal',
                        icon: styleData.icon,
                        iconColor: styleData.color,
                        actionStyle: 'check'
                    };

                    if (taskDate < today) {
                        task.statusType = 'error';
                        const diffTime = Math.abs(today - taskDate);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        task.status = `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
                        overdueTasks.push(task);
                    } else if (taskDate.getTime() === today.getTime()) {
                        todayTasks.push(task);
                    } else if (taskDate.getTime() === tomorrow.getTime()) {
                        task.actionStyle = 'time';
                        tomorrowTasks.push(task);
                    }
                });

                const groups = [];
                if (overdueTasks.length > 0) {
                    groups.push({
                        group: 'Overdue',
                        title: 'Atrasado',
                        count: overdueTasks.length,
                        type: 'overdue',
                        tasks: overdueTasks
                    });
                }
                if (todayTasks.length > 0) {
                    groups.push({
                        group: 'Today',
                        title: 'Hoje',
                        count: todayTasks.length,
                        type: 'today',
                        tasks: todayTasks
                    });
                }
                if (tomorrowTasks.length > 0) {
                    groups.push({
                        group: 'Tomorrow',
                        title: 'Amanhã',
                        type: 'tomorrow',
                        tasks: tomorrowTasks
                    });
                }

                setTaskGroups(groups);
            } catch (error) {
                console.error("Erro ao carregar agenda:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    return (
        <Container padding={'0'}>
            <div className={styles.scrollArea}>
                <Header />
                <DateSelector />
                
                <div className={styles.tasksContainer}>
                    {loading ? (
                        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>Carregando tarefas...</p>
                    ) : taskGroups.length > 0 ? (
                        taskGroups.map((group, index) => (
                            <TaskList
                                key={index}
                                title={group.title}
                                count={group.count}
                                type={group.type}
                                tasks={group.tasks}
                            />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>Nenhuma tarefa agendada.</p>
                    )}
                </div>
            </div>
            <AddButton onClick={() => alert("Adicionar nova tarefa")} />
        </Container>
    );
};

export default Schedule;