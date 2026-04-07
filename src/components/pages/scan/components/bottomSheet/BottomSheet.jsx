import React, { useState } from 'react';
import styles from './BottomSheet.module.css';

const PlantCard = ({ p, setSelectedPlantForModal, confirmPlant }) => {
    const [showAllNames, setShowAllNames] = useState(false);
    
    const originalNames = p.commonNames || [];
    const hasNames = originalNames.length > 0;
    const namesToShow = originalNames.slice(0, 2);
    const hasMore = originalNames.length > 2;

    return (
        <div className={styles.plantCard}>
            <div className={styles.cardImageContainer}>
                {p.images && p.images.length > 0 && (
                    <img src={p.images[0].url} alt={p.name} className={styles.cardImage} />
                )}
                <button 
                    className={styles.plusButton}
                    onClick={() => setSelectedPlantForModal(p)}
                >
                    +
                </button>
            </div>
            <div className={styles.cardInfo}>
                <h3 className={styles.scientificName}>{p.scientificName}</h3>
                <p className={styles.familyName}>{p.family}</p>
                <div className={styles.commonNamesContainer}>
                    {hasNames ? (
                        <>
                            {namesToShow.map((name, i) => (
                                <span key={i} className={styles.commonNames}>
                                    {name}
                                </span>
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
                                        {originalNames.map((n, idx) => (
                                            <span key={`f-${idx}`} className={styles.commonNames}>
                                                {n}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <span className={styles.commonNames}>Nomes não disponíveis</span>
                    )}
                </div>
                <div className={styles.cardActions}>
                    <span 
                        className={styles.scoreBubble}
                        style={{
                            backgroundColor: p.score >= 0.7 ? '#059669' : p.score >= 0.4 ? '#d97706' : '#dc2626'
                        }}
                    >
                        {(p.score * 100).toFixed(1).replace('.', ',')}%
                    </span>
                    <button 
                        className={styles.confirmButton}
                        onClick={() => confirmPlant(p)}
                    >
                        confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

const BottomSheet = ({ plant, loading, setSelectedPlantForModal, confirmPlant }) => {
    const [isSheetExpanded, setIsSheetExpanded] = useState(false);

    const handleScroll = (e) => {
        if (e.target.scrollTop > 10 && !isSheetExpanded) {
            setIsSheetExpanded(true);
        }
    };

    const toggleSheet = () => {
        setIsSheetExpanded(!isSheetExpanded);
    };

    if (!plant || plant.length === 0 || loading) {
        return null;
    }

    return (
        <div className={`${styles.resultsSheet} ${isSheetExpanded ? styles.expanded : ''}`}>
            <div className={styles.sheetHandle} onClick={toggleSheet}></div>
            <div className={styles.resultsList} onScroll={handleScroll}>
                {plant.map((p, index) => (
                    <PlantCard 
                        key={index} 
                        p={p} 
                        setSelectedPlantForModal={setSelectedPlantForModal} 
                        confirmPlant={confirmPlant} 
                    />
                ))}
            </div>
        </div>
    );
};

export default BottomSheet;
