import { Edit2, MapPin } from 'lucide-react';
import styles from './PlantProfile.module.css';

const PlantProfile = ({ plant, onEditImage }) => {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.imageWrapper}>
                <img 
                    src={plant.foto_url || '/placeholder-plant.jpg'} 
                    alt={plant.apelido || plant.nome_cientifico} 
                    className={styles.image}
                />
                <button 
                    type="button" 
                    className={styles.editImageBtn} 
                    onClick={onEditImage}
                >
                    <Edit2 size={14} color="#555" />
                </button>
            </div>
            
            <h2 className={styles.nickname}>{plant.apelido || 'Planta sem apelido'}</h2>
            <p className={styles.species}>{plant.nome_cientifico || 'Espécie desconhecida'}</p>
            
            <div className={styles.locationPill}>
                <MapPin size={12} className={styles.locationIcon} />
                <span>{plant.local?.nome || 'Sem local'}</span>
            </div>
        </div>
    );
};

export default PlantProfile;
