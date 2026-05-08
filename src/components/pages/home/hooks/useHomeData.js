import { useState, useEffect, useMemo } from 'react';
import { getAllCares } from '../../../../services/care.service';
import { getPlants } from '../../../../services/plant.service';

export const useHomeData = () => {
    const [cares, setCares] = useState([]);
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [caresData, plantsData] = await Promise.all([
                getAllCares(),
                getPlants()
            ]);

            setCares(caresData.cuidados || []);
            setPlants(plantsData || []);
        } catch (err) {
            console.error("Erro ao carregar dados da Home:", err);
            setError("Não foi possível carregar os dados.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const today = useMemo(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }, []);

    const dueTodayCares = useMemo(() => {
        return cares.filter(cuidado => {
            if (!cuidado.ativo || !cuidado.proxima_data) return false;
            const taskDate = new Date(cuidado.proxima_data);
            const taskDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
            return taskDay.getTime() <= today.getTime(); // includes overdue and due today
        }).sort((a, b) => new Date(a.proxima_data) - new Date(b.proxima_data));
    }, [cares, today]);

    const upcomingCares = useMemo(() => {
        return cares.filter(cuidado => {
            if (!cuidado.ativo || !cuidado.proxima_data) return false;
            const taskDate = new Date(cuidado.proxima_data);
            const taskDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
            return taskDay.getTime() > today.getTime();
        }).sort((a, b) => new Date(a.proxima_data) - new Date(b.proxima_data));
    }, [cares, today]);

    return {
        plants,
        dueTodayCares,
        upcomingCares,
        loading,
        error,
        refresh: fetchData
    };
};
