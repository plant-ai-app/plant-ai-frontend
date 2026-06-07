import React from 'react';
// import { ArrowLeft } from 'lucide-react';
import styles from './AiAnalysisHero.module.css';
import BackButton from '../../../../components/common/backButton/BackButton.jsx';
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
                    <BackButton
                        width="40px"
                        height="40px"
                        borderRadius="50%"
                        backgroundColor="rgba(255, 255, 255, 0.2)"
                        color="#fbfbfb"
                        onClick={onBack} 
                    />
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
