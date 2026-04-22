import api from "./api";

export const getCareById = async (id) => {
    const response = await api.get(`/cuidado/${id}`);
    return response.data;
}

export const getAllCares = async () => {
    const response = await api.get(`/cuidado`);
    return response.data;
}

export const getCaresByPlantId = async (plantId) => {
    const response = await api.get(`/cuidado/planta/${plantId}`);
    return response.data;
}

export const createCare = async (care) => {
    const response = await api.post("/cuidado", care);
    return response.data;
}

export const updateCare = async (id, care) => {
    const response = await api.put(`/cuidado/${id}`, care);
    return response.data;
}

export const deleteCare = async (id) => {
    const response = await api.delete(`/cuidado/${id}`);
    return response.data;
}
