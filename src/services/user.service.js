import api from "./api.js";

export const registerUser = async (userData) => {
    const response = await api.post("/usuario", userData)
    return response.data;
}

export const updateUser = async (userData) => {
    const response = await api.patch("/usuario", userData)
    console.log(response.data)
    return response.data;
}

export const getUser = async () => {
    const response = await api.get(`/usuario/me`)
    return response.data;
}
