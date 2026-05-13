import { useState, useEffect, useMemo } from 'react';
import { useCare } from '../../../../hooks/useCare';
import { getIconForCareType } from '../../schedule/Schedule';

export const mapCuidadoToTask = (cuidado, plant) => {
    const styleData = getIconForCareType(cuidado.tipo?.nome);

    let plantImage = plant?.foto_url || plant?.imagem || plant?.foto || plant?.image || '';
    if (plantImage && !plantImage.startsWith('http')) {
        const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:3000';
        plantImage = `${baseUrl}${plantImage.startsWith('/') ? '' : '/'}${plantImage}`;
    }

    const rawName = plant?.nome_popular || plant?.apelido || `Planta ${cuidado.planta_id || ''}`;
    const singleName = rawName.split(',')[0].trim();

    return {
        id: cuidado.planta_id || cuidado.id,
        careId: cuidado.id,
        plantId: cuidado.planta_id,
        name: singleName,
        nickname: plant?.apelido,
        location: plant?.local?.nome,
        image: plantImage,
        quantidade_instrucao: cuidado.quantidade_instrucao || 'Cuidado',
        status: cuidado.horario_preferencial || '00:00',
        statusType: 'normal',
        icon: styleData.icon,
        iconColor: styleData.color,
        actionStyle: 'check',
        ativo: cuidado.ativo,
        tipoNome: cuidado.tipo?.nome || 'Outros',
        data_prevista: cuidado.proxima_data
    };
};

export const useCareTab = (plant) => {
    const { getCaresByPlantId } = useCare();
    const [cares, setCares] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCares = async () => {
        try {
            setLoading(true);
            const response = await getCaresByPlantId(plant?.id);
            if (response && response.cuidados) {
                setCares(response.cuidados);
            } else if (Array.isArray(response)) {
                setCares(response);
            }
        } catch (error) {
            console.error("Erro ao buscar cuidados:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (plant?.id) {
            fetchCares();
        }
    }, [plant?.id]);

    const isSameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    const { overdueTasks, todayTasks, futureTasks } = useMemo(() => {
        if (!cares || cares.length === 0) return { overdueTasks: [], todayTasks: [], futureTasks: [] };

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const overdue = [];
        const todayList = [];
        const future = [];

        cares.forEach((cuidado) => {
            if (!cuidado.ativo || !cuidado.proxima_data) return;
            const taskDate = new Date(cuidado.proxima_data);
            if (isNaN(taskDate.getTime())) return;

            const task = mapCuidadoToTask(cuidado, plant);

            if (taskDate < today) {
                overdue.push(task);
            } else if (isSameDay(taskDate, now)) {
                todayList.push(task);
            } else {
                future.push(task);
            }
        });

        const sortByDateAndStatus = (a, b) => {
            const dateA = new Date(a.data_prevista);
            const dateB = new Date(b.data_prevista);
            if (dateA.getTime() !== dateB.getTime()) {
                return dateA - dateB;
            }
            return (a.status || '').localeCompare(b.status || '');
        };

        overdue.sort(sortByDateAndStatus);
        todayList.sort(sortByDateAndStatus);
        future.sort(sortByDateAndStatus);

        return { overdueTasks: overdue, todayTasks: todayList, futureTasks: future };
    }, [cares, plant]);

    return {
        overdueTasks,
        todayTasks,
        futureTasks,
        loading,
        fetchCares
    };
};
