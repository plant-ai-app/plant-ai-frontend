import { useState, useEffect } from 'react';
import styles from './PlantSelectionModal.module.css';
import { BsSearch, BsX, BsCheckCircleFill } from 'react-icons/bs';
import { getPlants } from '../../../../services/plant.service';

const PlantSelectionModal = ({ isOpen, onClose, selectedPlantIds, onConfirm }) => {
    const [plants, setPlants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tempSelected, setTempSelected] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchPlants();
            setTempSelected(selectedPlantIds || []);
        }
    }, [isOpen, selectedPlantIds]);

    const fetchPlants = async () => {
        try {
            setLoading(true);
            const response = await getPlants();
            setPlants(response || []);
        } catch (error) {
            console.error("Erro ao carregar plantas:", error);
        } finally {
            setLoading(false);
        }
    };

    const togglePlant = (id) => {
        setTempSelected(prev => 
            prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
        );
    };

    const filteredPlants = plants.filter(plant => 
        (plant.apelido || plant.nome_popular || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.handle} />
                    <div className={styles.headerTop}>
                        <h2 className={styles.title}>Selecione as plantas</h2>
                        <button className={styles.closeBtn} onClick={onClose}><BsX /></button>
                    </div>
                    <div className={styles.searchWrapper}>
                        <BsSearch className={styles.searchIcon} />
                        <input 
                            type="text" 
                            className={styles.searchInput} 
                            placeholder="Pesquise por nome ou apelido..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.content}>
                    {loading ? (
                        <p className={styles.loading}>Loading plants...</p>
                    ) : (
                        <div className={styles.grid}>
                            {filteredPlants.map(plant => (
                                <div 
                                    key={plant.id} 
                                    className={`${styles.plantCard} ${tempSelected.includes(plant.id) ? styles.selected : ''}`}
                                    onClick={() => togglePlant(plant.id)}
                                >
                                    <div className={styles.imageContainer}>
                                        <img src={plant.foto_url} alt={plant.apelido} className={styles.plantImage} />
                                        {tempSelected.includes(plant.id) && (
                                            <div className={styles.checkBadge}>
                                                <BsCheckCircleFill />
                                            </div>
                                        )}
                                    </div>
                                    <h4 className={styles.plantName}>{plant.apelido || plant.nome_popular}</h4>
                                    <p className={styles.plantLocation}>{plant.local?.nome}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <button 
                        className={styles.confirmBtn} 
                        onClick={() => onConfirm(tempSelected)}
                    >
                        Confirm Selection {tempSelected.length > 0 && <span>({tempSelected.length})</span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlantSelectionModal;
