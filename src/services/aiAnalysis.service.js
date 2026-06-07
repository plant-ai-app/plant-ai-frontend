import api from "./api.js";

export const fetchAiAnalysis = async (scientificName) => {
    const response = await api.get(`/ai-plant/${scientificName}`);
    return response.data;
}
