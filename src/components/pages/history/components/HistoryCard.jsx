import React from 'react';
import styles from './HistoryCard.module.css';
import { BsChevronRight } from 'react-icons/bs';
import { getIconForCareType } from '../../schedule/Schedule.jsx';

const HistoryCard = ({ item, onClick }) => {
    // Calculando status derivado se necessário
    const getCalculatedStatus = () => {
        if (item.status === 'PULADO') return 'PULADO';
        
        const datePrevista = new Date(item.data_prevista);
        const dateRealizacao = new Date(item.data_realizacao);
        
        if (dateRealizacao > datePrevista) return 'ATRASADO';
        if (dateRealizacao < datePrevista) return 'ADIANTADO';
        
        return 'CONCLUIDO';
    };

    const status = getCalculatedStatus();
    const styleData = getIconForCareType(item.tipo);

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    const getPlantImage = (plantImage) => {
        if (plantImage && !plantImage.startsWith('http')) {
            const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:3000';
            return `${baseUrl}${plantImage.startsWith('/') ? '' : '/'}${plantImage}`;
        }
        return plantImage;
    };

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imageWrapper}>
                {item.foto ? (
                    <img src={getPlantImage(item.foto)} alt={item.planta} className={styles.image} />
                ) : (
                    <div className={styles.imagePlaceholder}></div>
                )}
                <div className={styles.iconBadge} style={{ backgroundColor: styleData.bgColor }}>
                    <span style={{ color: styleData.color }}>{styleData.icon}</span>
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.infoHeader}>
                    <h3 className={styles.name}>{item.planta}</h3>
                    <span className={`${styles.statusBadge} ${styles[status.toLowerCase()]}`}>
                        {status}
                    </span>
                </div>
                <p className={styles.details}>
                    {item.tipo} • {formatTime(item.data_realizacao)}
                </p>
            </div>

            <div className={styles.arrow}>
                <BsChevronRight />
            </div>
        </div>
    );
};

export default HistoryCard;
