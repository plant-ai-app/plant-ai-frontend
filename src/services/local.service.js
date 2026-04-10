import api from "./api";

export const getLocais = async () => {
    const response = await api.get("/locais");
    return response.data;
}

export const getLocalById = async (id) => {
    const response = await api.get(`/locais/${id}`);
    return response.data;
}
