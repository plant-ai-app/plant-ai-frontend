import api from "./api.js";

export const getCareTypes = async () => {
    const response = await api.get("/cuidados/tipos");
    return response.data;
}

