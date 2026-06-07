import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './AiAnalysisHero.module.css';

const AiAnalysisHero = ({ fotoUrl, plantName, scientificName, onBack }) => {
    return (
        <>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <img 
                    src={fotoUrl || '/placeholder-plant.jpg'} 
                    alt={plantName || scientificName} 
                    className={styles.heroImage} 
                />
                <div className={styles.heroOverlay} />
                
                <div className={styles.topBar}>
                    <button className={styles.iconButton} onClick={onBack} aria-label="Voltar">
                        <ArrowLeft size={24} color="#1e293b" />
                    </button>
                </div>
            </div>

            {/* Plant Titles */}
            <div className={styles.heroContent}>
                <h1 className={styles.plantName}>{plantName || scientificName}</h1>
                <p className={styles.scientificName}>{scientificName}</p>
            </div>
        </>
    );
};

export default AiAnalysisHero;
