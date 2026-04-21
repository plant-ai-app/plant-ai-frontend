import { useState } from "react";
import {getCareTypes as getCareTypesService} from "../services/caretype.service.js";

export const useCareType = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCareTypes = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCareTypesService();
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao buscar tipos de cuidado');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        getCareTypes,
        loading,
        error
    };
}