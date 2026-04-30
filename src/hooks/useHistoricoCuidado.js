import { useState } from 'react';
import { createHistoricoCuidado as createHistoricoService } from '../services/historicoCuidado.service';

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

    return {
        createHistoricoCuidado,
        loading,
        error
    };
};
