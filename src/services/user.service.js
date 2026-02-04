import api from "./api";

export const registerUser = async (userData) => {
    const response = await api.post("/usuario", userData)

    return response.data;
}