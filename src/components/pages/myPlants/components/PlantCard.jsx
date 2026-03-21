import React from 'react';
import styles from './PlantCard.module.css';
import { BsThreeDotsVertical, BsGeoAltFill, BsDropletHalf } from 'react-icons/bs';

const PlantCard = ({ plant }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={plant.image} alt={plant.name} className={styles.plantImage} />
            </div>
            
            <div className={styles.infoContainer}>
                <div className={styles.headerRow}>
                    <h3 className={styles.plantName}>{plant.name}</h3>
                    <button className={styles.moreButton} aria-label="Mais opções">
                        <BsThreeDotsVertical />
                    </button>
                </div>
                
                <p className={styles.nickname}>"{plant.nickname}"</p>
                
                <div className={styles.detailsRow}>
                    <div className={styles.detailItem}>
                        <BsGeoAltFill className={styles.detailIcon} />
                        <span>{plant.location}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <BsDropletHalf className={styles.detailIcon} />
                        <span>Every {plant.waterDays} days</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlantCard;
