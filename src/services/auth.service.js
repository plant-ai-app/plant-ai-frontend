import api from "./api.js";

export const login = async (userData) => {
    const response = await api.post("/usuario/login", userData)
    return response.data;
}

export const forgotPassword = async (userData) => {
    const response = await api.post("/password/forgot", userData)
    return response.data;
}

export const resetPassword = async (userData) => {
    const response = await api.post("/password/reset", userData)
    return response.data;
}

export const changePassword = async (userData) => {
    const response = await api.patch("/usuario/senha", userData)
    return response.data;
}

export const deleteAccount = async (userData) => {
    const response = await api.delete("/usuario", {
        data: {
            senha: userData.senha
        }
    })
    return response.data;
}
