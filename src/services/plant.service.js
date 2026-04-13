import api from "./api";

export const getPlants = async () => {
    const response = await api.get("/plants/user");
    return response.data.plantas;
}

export const getPlantById = async (id) => {
    const response = await api.get(`/plants/${id}`);
    return response.data;
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
    const response = await api.put(`/plants/${id}`, plant);
    return response.data;
}

export const deletePlant = async (id) => {
    const response = await api.delete(`/plants/${id}`);
    return response.data;
}