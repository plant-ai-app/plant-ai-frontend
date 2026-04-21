import { useState } from "react";
import { 
    getCareById as getCareByIdService,
    getCaresByPlantId as getCaresByPlantIdService,
    createCare as createCareService,
    updateCare as updateCareService,
    deleteCare as deleteCareService
} from "../services/care.service";

export const useCare = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCareById = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCareByIdService(id);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao buscar cuidado por ID');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getCaresByPlantId = async (plantId) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCaresByPlantIdService(plantId);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao buscar cuidados da planta');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createCare = async (careData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await createCareService(careData);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar cuidado');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateCare = async (id, careData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await updateCareService(id, careData);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao atualizar cuidado');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteCare = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const data = await deleteCareService(id);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao deletar cuidado');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        getCareById,
        getCaresByPlantId,
        createCare,
        updateCare,
        deleteCare,
        loading,
        error
    };
};
