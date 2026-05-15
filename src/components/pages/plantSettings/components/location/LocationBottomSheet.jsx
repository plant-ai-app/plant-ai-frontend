import { useState, useEffect } from 'react';
import { 
    FiMoon, 
    FiTv, 
    FiCoffee, 
    FiDroplet, 
    FiBriefcase, 
    FiSun, 
    FiSunrise, 
    FiMap, 
    FiMinus
} from 'react-icons/fi';
import { useLocal } from '../../../../../hooks/useLocal.js';
import styles from './LocationBottomSheet.module.css';

const VISUAL_STYLES = [
    { icon: FiMoon, bg: '#E0F2FE', color: '#0EA5E9' },
    { icon: FiTv, bg: '#FFEDD5', color: '#F97316' },
    { icon: FiCoffee, bg: '#FEE2E2', color: '#EF4444' },
    { icon: FiDroplet, bg: '#F0FDFA', color: '#14B8A6' },
    { icon: FiBriefcase, bg: '#F3E8FF', color: '#A855F7' },
    { icon: FiSun, bg: '#F0FDF4', color: '#22C55E' },
    { icon: FiSunrise, bg: '#FEF9C3', color: '#EAB308' },
    { icon: FiMap, bg: '#ECFCCB', color: '#84CC16' },
    { icon: FiMinus, bg: '#F3F4F6', color: '#6B7280' }
];

const LocationBottomSheet = ({ isOpen, onClose, onConfirm, currentLocalId }) => {
    const { getLocal } = useLocal();
    const [locais, setLocais] = useState([]);
    const [selectedLocalId, setSelectedLocalId] = useState(currentLocalId);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const fetchLocais = async () => {
                try {
                    setLoading(true);
                    const response = await getLocal();
                    const locaisData = Array.isArray(response) ? response : response.locais || [];
                    setLocais(locaisData);
                } catch (error) {
                    console.error('Erro ao buscar locais:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchLocais();
            setSelectedLocalId(currentLocalId);
        }
    }, [isOpen, currentLocalId, getLocal]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        const selectedLocal = locais.find(l => l.id === selectedLocalId);
        onConfirm(selectedLocalId, selectedLocal?.nome);
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.sheet} onClick={e => e.stopPropagation()}>
                <div className={styles.handle} onClick={onClose} />
                <div className={styles.content}>
                    <h3 className={styles.title}>Em qual local ela está?</h3>
                    
                    {loading ? (
                        <div className={styles.loading}>Carregando locais...</div>
                    ) : (
                        <div className={styles.grid}>
                            {locais.map((local, index) => {
                                const styleConfig = VISUAL_STYLES[index % VISUAL_STYLES.length];
                                const Icon = styleConfig.icon;
                                const isActive = selectedLocalId === local.id;

                                return (
                                    <div
                                        key={local.id}
                                        className={`${styles.locationCard} ${isActive ? styles.activeCard : ''}`}
                                        onClick={() => setSelectedLocalId(local.id)}
                                    >
                                        <div
                                            className={styles.iconWrapper}
                                            style={{ backgroundColor: styleConfig.bg, color: styleConfig.color }}
                                        >
                                            <Icon />
                                        </div>
                                        <span className={styles.locationName}>{local.nome}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <button 
                        className={styles.confirmButton} 
                        onClick={handleConfirm}
                        disabled={!selectedLocalId}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationBottomSheet;
