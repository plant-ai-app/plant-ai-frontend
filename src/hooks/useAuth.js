import { useState } from "react";
import {login as loginUser, forgotPassword as forgotPasswordUser, resetPassword as resetPasswordUser} from "../services/auth.service";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const login = async (userData) => {
        try {
            setLoading(true)
            setError(null)

            const data = await loginUser(userData)
            return data
        } catch (error) {
            setError(error.response.data.erro || 'Erro ao logar usuário')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const forgotPassword = async (userData) => {
        try {
            setLoading(true)
            setError(null)

            const data = await forgotPasswordUser(userData)
            return data
        } catch (error) {
            setError(error.response.data.erro || 'Erro ao esquecer senha')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const resetPassword = async (userData) => {
        try {
            setLoading(true)
            setError(null)

            const data = await resetPasswordUser(userData)
            return data
        } catch (error) {
            setError(error.response.data.erro || 'Erro ao redefinir senha')
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {login, loading, error, forgotPassword, resetPassword}
}