import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PlantCard.module.css';
import { BsThreeDotsVertical, BsGeoAltFill } from 'react-icons/bs';

const PlantCard = ({ plant }) => {
    const [showAllNames, setShowAllNames] = useState(false);
    const navigate = useNavigate();

    const commonNames = typeof plant.nome_popular === 'string' 
        ? plant.nome_popular.split(',').map(name => name.trim()) 
        : (plant.commonNames || []);
    
    const hasNames = commonNames.length > 0;
    const namesToShow = commonNames.slice(0, 2);
    const hasMore = commonNames.length > 2;

    const handleCardClick = () => {
        const plantId = plant.id || plant._id;
        if (plantId) {
            navigate(`/plant/${plantId}`);
        }
    };

    return (
        <div className={styles.plantCard} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className={styles.cardImageContainer}>
                {plant.foto_url && (
                    <img src={plant.foto_url} alt={plant.nome_cientifico} className={styles.cardImage} />
                )}
            </div>

            <div className={styles.cardInfo}>
                <div className={styles.headerRow}>
                    <div>
                        <h3 className={styles.scientificName}>{plant.nome_cientifico}</h3>
                        <p className={styles.familyName}>{plant.family}</p>
                    </div>
                    <button className={styles.moreButton} aria-label="Mais opções">
                        <BsThreeDotsVertical />
                    </button>
                </div>

                {plant.apelido && (
                    <p className={styles.nickname}>"{plant.apelido}"</p>
                )}

                <div className={styles.commonNamesContainer}>
                    {hasNames ? (
                        <>
                            {namesToShow.map((name, i) => (
                                <span key={i} className={styles.commonNames}>{name}</span>
                            ))}
                            {hasMore && (
                                <span
                                    className={`${styles.commonNames} ${styles.moreDots}`}
                                    onClick={() => setShowAllNames(!showAllNames)}
                                >
                                    ...
                                </span>
                            )}
                            {showAllNames && hasMore && (
                                <>
                                    <div className={styles.namesBackdrop} onClick={() => setShowAllNames(false)} />
                                    <div className={styles.namesPopover}>
                                        {commonNames.map((n, idx) => (
                                            <span key={`f-${idx}`} className={styles.commonNames}>{n}</span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <span className={styles.commonNames}>Nomes não disponíveis</span>
                    )}
                </div>

                {plant.local?.nome && (
                    <div className={styles.locationRow}>
                        <BsGeoAltFill className={styles.locationIcon} />
                        <span className={styles.locationText}>{plant.local.nome}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlantCard;
