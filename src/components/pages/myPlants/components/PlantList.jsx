import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard.jsx';
import styles from './PlantList.module.css';
import { getPlants } from '../../../../services/plant.service.js';

const PlantList = ({ filterCategory, searchQuery }) => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                setLoading(true);
                const data = await getPlants();
                setPlants(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Erro ao buscar plantas:', err);
                setError('Não foi possível carregar as plantas.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlants();
    }, []);

    const displayedPlants = plants.filter(p => {
        const matchesCategory = filterCategory && filterCategory !== 'Todas'
            ? p.local?.nome === filterCategory
            : true;
        const matchesSearch = searchQuery
            ? (p.nome_cientifico || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
              (p.nome_popular || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
              (p.apelido || '').toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className={styles.listContainer}>
                <p className={styles.statusText}>Carregando plantas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.listContainer}>
                <p className={styles.statusText}>{error}</p>
            </div>
        );
    }

    if (displayedPlants.length === 0) {
        return (
            <div className={styles.listContainer}>
                <p className={styles.statusText}>Nenhuma planta encontrada.</p>
            </div>
        );
    }

    return (
        <div className={styles.listContainer}>
            {displayedPlants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
            ))}

            <div className={styles.bottomSpacer}></div>
        </div>
    );
};

export default PlantList;
