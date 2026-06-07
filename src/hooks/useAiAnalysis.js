import { useState, useEffect } from 'react';
import { fetchAiAnalysis } from '../services/aiAnalysis.service';

export const useAiAnalysis = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAiAnalysis = async (scientificName) => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await fetchAiAnalysis(scientificName);
            return data;
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao buscar análise');
            throw error;
        } finally {
            setLoading(false);
        }
   
    }
    
    return { loading, error, getAiAnalysis };
};
