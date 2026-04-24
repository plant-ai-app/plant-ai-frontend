import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard.jsx';
import styles from './PlantList.module.css';
import { usePlant } from '../../../../hooks/usePlant.js';
import Message from '../../../layouts/message/Message.jsx';

const PlantList = ({ filterCategory, searchQuery }) => {
    const [plants, setPlants] = useState([]);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const { getPlants, loading, error } = usePlant();
    // const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const data = await getPlants();
                setPlants(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Erro ao buscar plantas:', err);
            } /*finally {
                setInitialLoading(false);
            }*/
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

    const handlePlantDeleted = (deletedPlantId, msg, msgType) => {
        setPlants(prevPlants => prevPlants.filter(p => p.id !== deletedPlantId && p._id !== deletedPlantId));
        setMessage(msg);
        setType(msgType);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const renderContent = () => {
        if (loading) {
            return <p className={styles.statusText}>Carregando plantas...</p>;
        }
        if (error) {
            return <p className={styles.statusText}>{error}</p>;
        }
        if (displayedPlants.length === 0) {
            return <p className={styles.statusText}>Nenhuma planta encontrada.</p>;
        }
        return (
            <>
                {displayedPlants.map(plant => (
                    <PlantCard 
                        key={plant.id || plant._id} 
                        plant={plant} 
                        onDeleteSuccess={handlePlantDeleted} 
                    />
                ))}
                <div className={styles.bottomSpacer}></div>
            </>
        );
    };

    return (
        <div className={styles.listContainer}>
            {message && <Message msg={message} type={type} />}
            {renderContent()}
        </div>
    );
};

export default PlantList;
