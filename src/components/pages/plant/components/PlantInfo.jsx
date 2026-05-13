import styles from './PlantInfo.module.css';

const PlantInfo = ({ plant }) => {
    return (
        <div className={styles.plantInfo}>
            <h2 className={styles.scientificName}>{plant.nome_cientifico}</h2>
            <p className={styles.familyInfo}>Especie da família: <strong>{plant.familia || 'N/A'}</strong></p>
            <p className={styles.commonNames}>
                Nomes comuns: <span>{plant.nome_popular || 'N/A'}</span>
            </p>
        </div>
    );
};

export default PlantInfo;
