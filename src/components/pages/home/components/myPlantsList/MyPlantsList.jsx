import styles from './MyPlantsList.module.css';

import { useNavigate } from 'react-router-dom';

const MyPlantsList = ({ plants = [], dueTodayCares = [] }) => {
    const navigate = useNavigate();

    // Helper to check if a plant has pending cares today
    const hasAction = (plantId) => {
        return dueTodayCares.some(care => care.planta_id === plantId);
    };

    const getPlantImage = (plant) => {
        let plantImage = plant.foto_url || plant.imagem || plant.foto || plant.image || '';
        if (plantImage && !plantImage.startsWith('http')) {
            const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:3000';
            plantImage = `${baseUrl}${plantImage.startsWith('/') ? '' : '/'}${plantImage}`;
        }
        return plantImage;
    };
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Minhas Plantas</h2>
                <div className={styles.headerActions}>
                    {plants.length > 4 && (
                        <button className={styles.seeAllTextBtn} onClick={() => navigate('/my-plants')}>
                            Ver todas
                        </button>
                    )}
                    <button className={styles.addBtn} aria-label="Adicionar Planta" onClick={() => navigate('/history/select-plant')}>
                        +
                    </button>
                </div>
            </div>

            <div className={styles.listContainer}>
                {plants.length > 0 ? (
                    <>
                        {plants.slice(0, 4).map(plant => (
                            <div key={plant.id} className={styles.plantItem} onClick={() => navigate(`/plant/${plant.id}`)}>
                                <div className={styles.imagePlaceholder} style={getPlantImage(plant) ? { backgroundImage: `url(${getPlantImage(plant)})`, backgroundSize: 'cover', backgroundPosition: 'center', border: 'none' } : {}}>
                                    {hasAction(plant.id) && <div className={styles.actionDot}></div>}
                                </div>
                                <p className={styles.plantName}>{plant.apelido || plant.nome_popular?.split(',')[0].trim() || 'Minha Planta'}</p>
                            </div>
                        ))}
                        {plants.length > 4 && (
                            <div className={styles.plantItem} onClick={() => navigate('/my-plants')}>
                                <div className={styles.seeMorePlaceholder}>
                                    <span className={styles.plusSign}>+</span>
                                </div>
                                <p className={styles.plantName}>Ver todas</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <p>Nenhuma planta cadastrada.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyPlantsList;
