import { useState, useCallback } from "react";

import {
    getLocais as getLocaisService
} from "../services/local.service.js";


export const useLocal = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getLocal = useCallback(async () =>{
        try {
            setLoading(true);
            setError(null);
            
            const data = await getLocaisService();  
            return data;
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao buscar locais');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    return {getLocal, loading, error};
}