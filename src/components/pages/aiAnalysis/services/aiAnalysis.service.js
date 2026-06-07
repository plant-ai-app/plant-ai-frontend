import api from '../../../../services/api';

export const fetchAiAnalysis = async (scientificName) => {
    const response = await api.get(`/ai-plant/${encodeURIComponent(scientificName)}`);
    return response.data.data;
};
;
