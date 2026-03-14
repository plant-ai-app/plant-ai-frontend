import { useState } from "react";
import {
    login as loginUser,
    forgotPassword as forgotPasswordUser,
    resetPassword as resetPasswordUser,
    changePassword as changePasswordUser,
    deleteAccount as deleteAccountUser,
} from "../services/auth.service";

export const useAuth = () => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (userData) => {
        try {
            setLoading(true)
            setError(null)

            const data = await loginUser(userData)
            const token = data.usuario.token

            localStorage.setItem("token", token)
            setToken(token)

            return data
        } catch (error) {
            setError(error.response?.data?.erro || 'Erro ao logar usuário')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    const isAuthenticated = () => {
        return !!token
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

    const changePassword = async (userData) => {
        try {
            setLoading(true)
            setError(null)

            const data = await changePasswordUser(userData)
            return data
        } catch (error) {
            setError(error.response.data.erro || 'Erro ao alterar senha')
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
            setError(error.response.data.erro || 'Erro ao deletar conta')
            throw error
        } finally {
            setLoading(false)
        }
    }


    return {
        login,
        loading,
        error,
        forgotPassword,
        resetPassword,
        changePassword,
        deleteAccount,
        isAuthenticated,
        logout
    }
}