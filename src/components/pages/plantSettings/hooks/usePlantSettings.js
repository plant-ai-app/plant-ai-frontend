import { useEffect, useState } from 'react';
import { usePlant } from '../../../../hooks/usePlant';
import { useCare } from '../../../../hooks/useCare';

export const usePlantSettings = (id) => {
    const [plant, setPlant] = useState(null);
    const [cares, setCares] = useState([]);
    const [loading, setLoading] = useState(true);

    const { getPlantById, updatePlant, deletePlant } = usePlant();
    const { getCaresByPlantId } = useCare();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [plantData, caresData] = await Promise.all([
                    getPlantById(id),
                    getCaresByPlantId(id).catch(() => [])
                ]);

                setPlant(plantData);

                const caresList = caresData?.cuidados || caresData || [];
                setCares(Array.isArray(caresList) ? caresList : []);

            } catch (error) {
                console.error("Erro ao buscar dados das configurações:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchAllData();
    }, [id]);

    const handleUpdatePlant = async (data) => {
        await updatePlant(id, data);
        const refreshed = await getPlantById(id);
        setPlant(refreshed);
        return refreshed;
    };

    return {
        plant,
        cares,
        loading,
        updatePlant: handleUpdatePlant,
        deletePlant
    };
};
