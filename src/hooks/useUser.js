import {useState} from "react";
import { 
    registerUser,
    updateUser as updateUserService,
    getUser as getUserService 
} from "../services/user.service";

export const useUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createUser = async (userData) =>{
        try {
            setLoading(true)
            setError(null)

            const data = await registerUser(userData)
            return data
        } catch (error) {
            setError(error.response.data.message || 'Erro ao criar usuário')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateUser = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await updateUserService(userData);
            return data;
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao atualizar usuário');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getUser = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await getUserService();
            return data;
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao buscar usuário');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {createUser, updateUser, getUser, loading, error}
};