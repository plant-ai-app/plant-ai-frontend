import api from "./api";

export const getPlants = async () => {
    const response = await api.get("/plants/user");
    return response.data.plantas;
}

export const getPlantById = async (id) => {
    const response = await api.get(`/plant/${id}`);
    return response.data.planta;
}

export const getPlantByName = async (name) => {
    const response = await api.get(`/plants/name/${name}`);
    return response.data;
}

export const createPlant = async (plant) => {
    const response = await api.post("/plants", plant);
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

export const deleteManyPlants = async (ids) => {
    const response = await api.delete('/plants', { data: { ids } });
    return response.data;
}