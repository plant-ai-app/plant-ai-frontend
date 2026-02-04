import {useState} from "react";
import { registerUser } from "../services/user.service";

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
            setError(error.response.data.erro || 'Erro ao criar usuário')
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {createUser, loading, error}
};