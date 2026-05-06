import { useState } from "react";
import { 
    getPlants as getPlantsService,
    getPlantById as getPlantByIdService,
    getPlantByName as getPlantByNameService,
    createPlant as createPlantService,
    updatePlant as updatePlantService,
    deletePlant as deletePlantService,
    deleteManyPlants as deleteManyPlantsService
} from "../services/plant.service";

export const usePlant = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPlants = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPlantsService();
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao buscar plantas');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getPlantById = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPlantByIdService(id);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao buscar planta por ID');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getPlantByName = async (name) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPlantByNameService(name);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao buscar planta por nome');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createPlant = async (plantData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await createPlantService(plantData);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar planta');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updatePlant = async (id, plantData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await updatePlantService(id, plantData);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao atualizar planta');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deletePlant = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const data = await deletePlantService(id);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao deletar planta');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteManyPlants = async (ids) => {
        try {
            setLoading(true);
            setError(null);
            const data = await deleteManyPlantsService(ids);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao deletar plantas em massa');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        getPlants,
        getPlantById,
        getPlantByName,
        createPlant,
        updatePlant,
        deletePlant,
        deleteManyPlants,
        loading,
        error
    };
};
