import { ChevronRight, Edit2 } from 'lucide-react';
import styles from './AboutPlant.module.css';

const AboutPlant = ({ plant, onEditNickname, onEditLocation, onEditObservation }) => {
    return (
        <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Sobre a Planta</h3>
            
            <button type="button" className={styles.itemRow} onClick={onEditNickname}>
                <div className={styles.itemContent}>
                    <span className={styles.itemLabel}>APELIDO</span>
                    <span className={styles.itemValue}>{plant.apelido || 'Adicionar apelido'}</span>
                </div>
                <ChevronRight size={18} color="#ccc" />
            </button>
            
            <button type="button" className={styles.itemRow} onClick={onEditLocation}>
                <div className={styles.itemContent}>
                    <span className={styles.itemLabel}>LOCALIZAÇÃO</span>
                    <span className={styles.itemValue}>{plant.local?.nome || 'Adicionar localização'}</span>
                </div>
                <ChevronRight size={18} color="#ccc" />
            </button>
            
            <div className={styles.observationCard}>
                <div className={styles.observationHeader}>
                    <span className={styles.itemLabel}>OBSERVAÇÕES</span>
                    <button type="button" className={styles.editBtn} onClick={onEditObservation}>
                        <Edit2 size={14} color="#888" />
                    </button>
                </div>
                <p className={styles.observationText}>
                    {plant.observacao || 'Nenhuma observação adicionada.'}
                </p>
            </div>
        </section>
    );
};

export default AboutPlant;
