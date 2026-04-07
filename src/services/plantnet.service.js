import api from "./api";

export const identifyPlant = async (image) => {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await api.post("/plantnet/identify", formData);
        return response.data;
    } catch (error) {
        console.error("Error identifying plant:", error);
        throw error;
    }
};

