import api from "./api";

export const createHistoricoCuidado = async (data) => {
    const response = await api.post("/historico-cuidado", data);
    return response.data;
}
