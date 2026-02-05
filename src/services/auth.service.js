import api from "./api.js";

export const login = async (email, senha) => {
    const response = await api.post("/usuario/login", { email, senha })

    return response.data;
}