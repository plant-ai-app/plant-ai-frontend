import React from 'react';
import { Globe, Lightbulb, Compass, Heart } from 'lucide-react';
import styles from './CuriositiesSection.module.css';

const CuriositiesSection = React.forwardRef(({ data }, ref) => {
    if (!data || !data.curiosities) return null;

    const { origin, fun_fact, symbolism, decorative_use } = data.curiosities;

    return (
        <div id="curiosities" ref={ref} className={styles.sectionBlock}>
            <h3 className={styles.sectionTitle}>Curiosities & Facts</h3>
            
            <div className={styles.curiositiesGrid}>
                {origin && (
                    <div className={styles.curiosityCard}>
                        <div className={styles.curiosityCardHeader}>
                            <Globe size={18} />
                            <h4 className={styles.curiosityCardTitle}>Origem & Habitat</h4>
                        </div>
                        <p className={styles.curiosityDesc}>{origin}</p>
                    </div>
                )}

                {fun_fact && (
                    <div className={styles.curiosityCard}>
                        <div className={styles.curiosityCardHeader}>
                            <Lightbulb size={18} />
                            <h4 className={styles.curiosityCardTitle}>Fato Curioso</h4>
                        </div>
                        <p className={styles.curiosityDesc}>{fun_fact}</p>
                    </div>
                )}

                {symbolism && (
                    <div className={styles.curiosityCard}>
                        <div className={styles.curiosityCardHeader}>
                            <Heart size={18} />
                            <h4 className={styles.curiosityCardTitle}>Simbolismo</h4>
                        </div>
                        <p className={styles.curiosityDesc}>{symbolism}</p>
                    </div>
                )}

                {decorative_use && (
                    <div className={styles.curiosityCard}>
                        <div className={styles.curiosityCardHeader}>
                            <Compass size={18} />
                            <h4 className={styles.curiosityCardTitle}>Uso Decorativo</h4>
                        </div>
                        <p className={styles.curiosityDesc}>{decorative_use}</p>
                    </div>
                )}
            </div>
        </div>
    );
});

CuriositiesSection.displayName = 'CuriositiesSection';

export default CuriositiesSection;
