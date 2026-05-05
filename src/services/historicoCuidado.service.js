import api from "./api";

export const createHistoricoCuidado = async (data) => {
    const response = await api.post("/historico-cuidado", data);
    return response.data;
}

export const getAllHistoricoCuidado = async () => {
    const response = await api.get("/historico-cuidado");
    return response.data;
}
