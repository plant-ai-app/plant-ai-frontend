import { useNavigate } from 'react-router-dom';
import BackButton from '../../../common/backButton/BackButton';
import { Hexagon, Clock } from 'lucide-react';
import styles from './PlantHeader.module.css';

const PlantHeader = ({ plant, plantId }) => {
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate(`/plant/settings/${plantId}`);
    };

    return (
        <div className={styles.header}>
            <img 
                src={plant.foto_url || '/placeholder-plant.jpg'} 
                alt={plant.nome_cientifico} 
                className={styles.headerImage} 
            />
            <div className={styles.headerOverlay}>
                <div className={styles.topActions}>
                    <BackButton 
                        width="40px"
                        height="40px"
                        borderRadius="50%"
                        backgroundColor="rgba(255, 255, 255, 0.2)"
                        color="#fbfbfb"
                    />
                    <button className={styles.iconButton} onClick={handleSettingsClick} aria-label="Settings">
                        <Hexagon size={24} color="white" />
                    </button>
                </div>
                <div className={styles.headerInfo}>
                    <h1 className={styles.nickname}>{plant.apelido || 'Planta sem apelido'}</h1>
                    <div className={styles.dateInfo}>
                        <Clock size={16} />
                        <span>{new Date(plant.criado_em).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlantHeader;
