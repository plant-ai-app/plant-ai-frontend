import { useState } from 'react';
import { createHistoricoCuidado as createHistoricoService, getAllHistoricoCuidado as getAllHistoricoService } from '../services/historicoCuidado.service';

export const useHistoricoCuidado = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createHistoricoCuidado = async (data) => {
        try {
            setLoading(true);
            setError(null);
            const response = await createHistoricoService(data);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Erro ao registrar histórico de cuidado');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchHistoricoCuidado = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllHistoricoService();
            return response;
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Erro ao carregar histórico de cuidados');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        createHistoricoCuidado,
        fetchHistoricoCuidado,
        loading,
        error
    };
};
