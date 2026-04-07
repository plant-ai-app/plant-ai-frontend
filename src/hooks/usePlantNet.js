import { useState } from "react"
import {
    identifyPlant as identifyPlantService
} 
from "../services/plantnet.service";

export const usePlantNet = () => {
    const [plant, setPlant] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const identifyPlant = async (image) => {
        setLoading(true);
        setError(null);

        try {
            const data = await identifyPlantService(image);
            setPlant(data.plants);
            return data.plants;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { plant, loading, error, identifyPlant };
};