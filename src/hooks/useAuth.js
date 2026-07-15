import { useState } from "react";
import {
    forgotPassword as forgotPasswordUser,
    resetPassword as resetPasswordUser,
    changePassword as changePasswordUser,
    deleteAccount as deleteAccountUser,
    validateResetToken as validateResetTokenUser,
} from "../services/auth.service";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const forgotPassword = async (userData) => {
        try {
            setLoading(true)
            setError(null)

            const data = await forgotPasswordUser(userData)
            return data
        } catch (error) {
            setError(error.response?.data?.message || error.response?.data?.erro || 'Erro ao esquecer senha')
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
            setError(error.response?.data?.message || error.response?.data?.erro || 'Erro ao redefinir senha')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const changePassword = async (userData) => {
        try {
            setLoading(true)
            setError(null)

            const data = await changePasswordUser(userData)
            return data
        } catch (error) {
            setError(error.response?.data?.message || error.response?.data?.erro || 'Erro ao alterar senha')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const deleteAccount = async (userData) => {
        try {
            setLoading(true)
            setError(null)

            const data = await deleteAccountUser(userData)
            return data
        } catch (error) {
            setError(error.response?.data?.message || error.response?.data?.erro || 'Erro ao deletar conta')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const validateResetToken = async (token) => {
        try {
            setLoading(true)
            setError(null)

            const data = await validateResetTokenUser(token)
            return data
        } catch (error) {
            setError(error.response?.data?.message || error.response?.data?.error || 'Erro ao validar token')
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        forgotPassword,
        resetPassword,
        changePassword,
        deleteAccount,        
        validateResetToken,
    }
}