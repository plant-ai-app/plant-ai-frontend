import { useEffect, useState } from 'react';
import { useHistoricoCuidado } from '../../../../hooks/useHistoricoCuidado';
import { usePlant } from '../../../../hooks/usePlant';

export const usePlantPage = (id) => {
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);
    const { fetchHistoricoCuidado } = useHistoricoCuidado();
    const { getPlantById } = usePlant();

    useEffect(() => {
        const fetchPlantData = async () => {
            try {
                setLoading(true);
                const [plantData, historyData] = await Promise.all([
                    getPlantById(id),
                    fetchHistoricoCuidado()
                ]);
                
                setPlant(plantData);
                
                // Extrair registros do histórico (lidando com diferentes formatos de resposta)
                const allHistory = Array.isArray(historyData) ? historyData : 
                                  historyData?.registros || historyData?.historico || [];
                
                // Filtrar histórico para esta planta específica
                const plantHistory = allHistory.filter(item => String(item.planta_id) === String(id));
                
                // Ordenar por data (mais recente primeiro)
                plantHistory.sort((a, b) => new Date(b.data_realizacao) - new Date(a.data_realizacao));
                
                setHistory(plantHistory);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPlantData();
    }, [id]);

    return { plant, history, loading };
};
