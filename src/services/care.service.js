import api from "./api";

export const getCareById = async (id) => {
    const response = await api.get(`/cuidados/${id}`);
    return response.data.cuidado;
}

export const getCaresByPlantId = async (plantId) => {
    const response = await api.get(`/cuidados/planta/${plantId}`);
    return response.data.cuidados;
}

export const createCare = async (care) => {
    const response = await api.post("/cuidados", care);
    return response.data;
}

export const updateCare = async (id, care) => {
    const response = await api.put(`/cuidados/${id}`, care);
    return response.data;
}

export const deleteCare = async (id) => {
    const response = await api.delete(`/cuidados/${id}`);
    return response.data;
}
