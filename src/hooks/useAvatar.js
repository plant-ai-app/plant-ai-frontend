import { useState } from "react";
import { getAvatar as getAvatarService } from "../services/avatar.service";

export const useAvatar = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAvatar = async () =>{
        try {
            setLoading(true);
            setError(null);
            
            const data = await getAvatarService();  
            return data;
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao buscar avatar');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {getAvatar, loading, error};
}