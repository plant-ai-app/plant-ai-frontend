import { useState, useEffect } from 'react';
import { fetchAiAnalysis } from '../services/aiAnalysis.service';

export const useAiAnalysis = (scientificName) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!scientificName) {
            setLoading(false);
            return;
        }

        const getAnalysis = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await fetchAiAnalysis(scientificName);
                setData(result);
            } catch (err) {
                console.error('Erro ao buscar análise da IA:', err);
                setError(err.response?.data?.message || err.message || 'Erro ao carregar análise da IA');
            } finally {
                setLoading(false);
            }
        };

        getAnalysis();
    }, [scientificName]);

    return { data, loading, error };
};
