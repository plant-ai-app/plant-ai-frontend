import api from "./api";

export const getPlants = async () => {
    const response = await api.get("/plant");
    return response.data;
}

export const getPlantById = async (id) => {
    const response = await api.get(`/plant/${id}`);
    return response.data;
}

export const getPlantByName = async (name) => {
    const response = await api.get(`/plant/name/${name}`);
    return response.data;
}

export const createPlant = async (plant) => {
    const response = await api.post("/plant", plant);
    return response.data;
}

export const updatePlant = async (id, plant) => {
    const response = await api.put(`/plant/${id}`, plant);
    return response.data;
}

export const deletePlant = async (id) => {
    const response = await api.delete(`/plant/${id}`);
    return response.data;
}