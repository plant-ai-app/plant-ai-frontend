import React from 'react';
import styles from './OverviewSection.module.css';

const OverviewSection = React.forwardRef(({ data }, ref) => {
    if (!data) return null;

    return (
        <div id="overview" ref={ref} className={styles.sectionBlock}>
            <h3 className={styles.sectionTitle}>Classificação Científica</h3>
            <div className={styles.classificationCard}>
                <div className={styles.classificationRow}>
                    <span className={styles.rowLabel}>Família</span>
                    <span className={styles.rowValue}>{data.family || 'Não informada'}</span>
                </div>
                <div className={styles.classificationRow}>
                    <span className={styles.rowLabel}>Tipo</span>
                    <span className={styles.rowValue} style={{ textTransform: 'capitalize' }}>{data.type || 'Não informado'}</span>
                </div>
                <div className={styles.classificationRow}>
                    <span className={styles.rowLabel}>Origem</span>
                    <span className={styles.rowValue}>{data.origin || 'Não informada'}</span>
                </div>
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>Ambientes Ideais</h3>
            <div className={styles.pillsContainer}>
                {data.ideal_locations && data.ideal_locations.length > 0 ? (
                    data.ideal_locations.map((loc, index) => (
                        <span key={index} className={styles.pillBadge}>{loc.name}</span>
                    ))
                ) : (
                    <span className={styles.pillBadge}>Nenhum local mapeado</span>
                )}
            </div>
        </div>
    );
});

OverviewSection.displayName = 'OverviewSection';

export default OverviewSection;
