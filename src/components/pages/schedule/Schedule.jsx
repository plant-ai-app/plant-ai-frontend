//react
import React, { useState, useEffect, useMemo } from 'react';

//styles
import styles from "./Schedule.module.css";

//components
import Container from "../../common/container/Container.jsx";
import Header from "./components/Header.jsx";
import DateSelector from "./components/DateSelector.jsx";
import TaskList from "./components/TaskList.jsx";
import AddButton from "./components/AddButton.jsx";

//services
import { getAllCares } from "../../../services/care.service";

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
    const [allCares, setAllCares] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    const fetchSchedule = async () => {
        try {
            setLoading(true);
            const response = await getAllCares();
            if (response && response.cuidados) {
                setAllCares(response.cuidados);
            }
        } catch (error) {
            console.error("Erro ao carregar agenda:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    const isSameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    };

    const taskGroups = useMemo(() => {
        if (!allCares || allCares.length === 0) return [];

        const filteredTasks = [];

        allCares.forEach((cuidado) => {
            if (!cuidado.ativo || !cuidado.proxima_data) return;

            // Extrair YYYY-MM-DD para evitar problemas de timezone na conversão da data
            const dateString = typeof cuidado.proxima_data === 'string' ? cuidado.proxima_data.split('T')[0] : '';
            if (!dateString) return;

            const dateParts = dateString.split('-');
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1;
            const day = parseInt(dateParts[2], 10);
            
            const taskDate = new Date(year, month, day);

            if (isSameDay(taskDate, selectedDate)) {
                const styleData = getIconForCareType(cuidado.tipo?.nome);
                
                let plantImage = cuidado.planta?.foto_url || cuidado.planta?.imagem || cuidado.planta?.foto || cuidado.planta?.image || '';
                if (plantImage && !plantImage.startsWith('http')) {
                    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:3000';
                    plantImage = `${baseUrl}${plantImage.startsWith('/') ? '' : '/'}${plantImage}`;
                }

                const rawName = cuidado.planta?.nome_popular || cuidado.planta?.apelido || `Planta ${cuidado.planta_id || ''}`;
                const singleName = rawName.split(',')[0].trim();

                const task = {
                    id: cuidado.planta_id || cuidado.id,
                    careId: cuidado.id,
                    plantId: cuidado.planta_id,
                    name: singleName,
                    nickname: cuidado.planta?.apelido,
                    location: cuidado.planta?.local?.nome,
                    image: plantImage,
                    quantidade_instrucao: cuidado.quantidade_instrucao || 'Cuidado',
                    status: cuidado.horario_preferencial || '00:00',
                    statusType: 'normal',
                    icon: styleData.icon,
                    iconColor: styleData.color,
                    actionStyle: 'check',
                    ativo: cuidado.ativo,
                    tipoNome: cuidado.tipo?.nome || 'Outros'
                };

                filteredTasks.push(task);
            }
        });

        // Agrupar por tipoNome
        const grouped = filteredTasks.reduce((acc, task) => {
            if (!acc[task.tipoNome]) {
                acc[task.tipoNome] = [];
            }
            acc[task.tipoNome].push(task);
            return acc;
        }, {});

        // Criar array de grupos
        const groupsArray = Object.keys(grouped).map(key => {
            const tasks = grouped[key];
            // Ordenar tasks dentro do grupo por horario_preferencial
            tasks.sort((a, b) => a.status.localeCompare(b.status));
            return {
                group: key,
                title: key,
                count: tasks.length,
                type: 'normal',
                tasks: tasks
            };
        });

        // Ordenar grupos alfabeticamente
        groupsArray.sort((a, b) => a.title.localeCompare(b.title));

        return groupsArray;
    }, [allCares, selectedDate]);

    const tasksDates = useMemo(() => {
        if (!allCares || allCares.length === 0) return [];
        return allCares.filter(c => c.ativo && c.proxima_data).map(cuidado => {
            const dateString = typeof cuidado.proxima_data === 'string' ? cuidado.proxima_data.split('T')[0] : '';
            if(!dateString) return null;
            const dateParts = dateString.split('-');
            return new Date(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2], 10));
        }).filter(d => d !== null);
    }, [allCares]);

    return (
        <Container padding={'0'}>
            <div className={styles.scrollArea}>
                <Header />
                <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} tasksDates={tasksDates} />
                
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
                                onRefresh={fetchSchedule}
                            />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>Nenhuma tarefa agendada para esta data.</p>
                    )}
                </div>
            </div>
            <AddButton onClick={() => alert("Adicionar nova tarefa")} />
        </Container>
    );
};

export default Schedule;