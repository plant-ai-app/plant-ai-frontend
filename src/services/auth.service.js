import api from "./api.js";

export const login = async (email, senha) => {
    const response = await api.post("/usuario/login", { email, senha })

    return response.data;
}

export const forgotPassword = async (email) => {
    const response = await api.post("/usuario/forgot", { email })
    console.log(response.data)
    return response.data;
}
