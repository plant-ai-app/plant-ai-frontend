
//styles
import styles from "./Schedule.module.css";

//components
import Container from "../../common/container/Container.jsx";
import Header from "./components/Header.jsx";
import DateSelector from "./components/DateSelector.jsx";
import TaskList from "./components/TaskList.jsx";
import AddButton from "./components/AddButton.jsx";

//icons
import { Droplet, Scissors, FlaskConical, Sun } from 'lucide-react';

const mockTaskGroups = [
    {
        group: 'Overdue',
        title: 'Atrasado',
        count: 2,
        type: 'overdue',
        tasks: [
            {
                id: 1,
                name: 'Monstera Deliciosa',
                image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&w=150&q=80',
                action: 'Necessita de rega',
                status: '2 dias atrás',
                statusType: 'error',
                icon: <Droplet size={14} />,
                iconColor: '#ed5555', // red
                actionStyle: 'check'
            },
            {
                id: 2,
                name: 'Fiddle Leaf Fig',
                image: 'https://images.unsplash.com/photo-1597055936561-12fec34d9302?auto=format&fit=crop&w=150&q=80',
                action: 'Necessita de poda',
                status: 'Ontem',
                statusType: 'error',
                icon: <Scissors size={14} />,
                iconColor: '#f5a623', // orange
                actionStyle: 'check'
            }
        ]
    },
    {
        group: 'Today',
        title: 'Hoje',
        count: 3,
        type: 'today',
        tasks: [
            {
                id: 3,
                name: 'Snake Plant',
                image: 'https://images.unsplash.com/photo-1593482892290-f56b509fd75c?auto=format&fit=crop&w=150&q=80',
                action: 'Rega Semanal',
                status: '10:00',
                statusType: 'normal',
                icon: <Droplet size={14} />,
                iconColor: '#4a90e2', // blue
                actionStyle: 'check'
            },
            {
                id: 4,
                name: 'Golden Pothos',
                image: 'https://images.unsplash.com/photo-1620127816040-5e3e3b3a6ff6?auto=format&fit=crop&w=150&q=80',
                action: 'Fertilização',
                status: '14:00',
                statusType: 'normal',
                icon: <FlaskConical size={14} />,
                iconColor: '#9013fe', // purple
                actionStyle: 'check'
            }
        ]
    },
    {
        group: 'Tomorrow',
        title: 'Amanhã',
        type: 'tomorrow',
        tasks: [
            {
                id: 5,
                name: 'Aloe Vera',
                image: 'https://images.unsplash.com/photo-1596547609652-9cb5d8d73bba?auto=format&fit=crop&w=150&q=80',
                action: 'Girar o vaso',
                status: '09:00',
                statusType: 'normal',
                icon: <Sun size={14} />,
                iconColor: '#9b9b9b', // gray
                actionStyle: 'time'
            }
        ]
    }
];

const Schedule = () => {
    return (
        <Container padding={'0'}>
            <div className={styles.scrollArea}>
                <Header />
                <DateSelector />
                
                <div className={styles.tasksContainer}>
                    {mockTaskGroups.map((group, index) => (
                        <TaskList
                            key={index}
                            title={group.title}
                            count={group.count}
                            type={group.type}
                            tasks={group.tasks}
                        />
                    ))}
                </div>
            </div>
            <AddButton onClick={() => alert("Adicionar nova tarefa")} />
        </Container>
    );
};

export default Schedule;