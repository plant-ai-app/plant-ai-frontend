import api from "./api.js";

export const registerUser = async (userData) => {
    const response = await api.post("/usuario", userData)

    return response.data;
}

export const loginUser = async (userData) => {
    const response = await api.post("/usuario/login", userData)

    return response.data;
}
