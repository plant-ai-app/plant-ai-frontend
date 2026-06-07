import React from 'react';
import { Droplet, Sun, CloudRain, Sparkles, Scissors, RefreshCw } from 'lucide-react';
import styles from './CareSection.module.css';

const CareSection = React.forwardRef(({ data }, ref) => {
    if (!data || !data.care) return null;

    const { water, light, climate, maintenance } = data.care;

    return (
        <div id="care" ref={ref} className={styles.sectionBlock}>
            <h3 className={styles.sectionTitle}>Basic Care Needs</h3>
            
            <div className={styles.careGrid}>
                {water && (
                    <div className={styles.careCard}>
                        <div className={styles.careHeader}>
                            <div className={`${styles.careIconContainer} ${styles.water}`}>
                                <Droplet size={20} />
                            </div>
                            <h4 className={styles.careTitle}>Rega</h4>
                            {water.frequency && <span className={styles.careBadge}>{water.frequency}</span>}
                        </div>
                        <p className={styles.careDesc}>{water.description}</p>
                    </div>
                )}

                {light && (
                    <div className={styles.careCard}>
                        <div className={styles.careHeader}>
                            <div className={`${styles.careIconContainer} ${styles.light}`}>
                                <Sun size={20} />
                            </div>
                            <h4 className={styles.careTitle}>Iluminação</h4>
                            {light.type && <span className={styles.careBadge}>{light.type}</span>}
                        </div>
                        <p className={styles.careDesc}>{light.description}</p>
                    </div>
                )}

                {climate && (
                    <div className={styles.careCard}>
                        <div className={styles.careHeader}>
                            <div className={`${styles.careIconContainer} ${styles.climate}`}>
                                <CloudRain size={20} />
                            </div>
                            <h4 className={styles.careTitle}>Clima e Umidade</h4>
                            {climate.humidity && <span className={styles.careBadge}>Umidade: {climate.humidity}</span>}
                        </div>
                        <p className={styles.careDesc}>
                            {climate.description}
                            {climate.temperature && ` (Temperatura ideal: ${climate.temperature})`}
                        </p>
                    </div>
                )}
            </div>

            {maintenance && (
                <div className={styles.maintenanceSection}>
                    <h3 className={styles.sectionTitle}>Maintenance & Routine</h3>
                    <div className={styles.careGrid}>
                        {maintenance.fertilizing && (
                            <div className={styles.careCard}>
                                <div className={styles.careHeader}>
                                    <div className={`${styles.careIconContainer} ${styles.maintenance}`}>
                                        <Sparkles size={20} />
                                    </div>
                                    <h4 className={styles.careTitle}>Adubação</h4>
                                    {maintenance.fertilizing.frequency && (
                                        <span className={styles.careBadge}>{maintenance.fertilizing.frequency}</span>
                                    )}
                                </div>
                                <p className={styles.careDesc}>{maintenance.fertilizing.description}</p>
                            </div>
                        )}

                        {maintenance.pruning && (
                            <div className={styles.careCard}>
                                <div className={styles.careHeader}>
                                    <div className={`${styles.careIconContainer} ${styles.maintenance}`}>
                                        <Scissors size={20} />
                                    </div>
                                    <h4 className={styles.careTitle}>Poda</h4>
                                    {maintenance.pruning.title && (
                                        <span className={styles.careBadge}>{maintenance.pruning.title}</span>
                                    )}
                                </div>
                                <p className={styles.careDesc}>{maintenance.pruning.description}</p>
                            </div>
                        )}

                        {maintenance.repotting && (
                            <div className={styles.careCard}>
                                <div className={styles.careHeader}>
                                    <div className={`${styles.careIconContainer} ${styles.maintenance}`}>
                                        <RefreshCw size={20} />
                                    </div>
                                    <h4 className={styles.careTitle}>Replantio</h4>
                                    {maintenance.repotting.frequency && (
                                        <span className={styles.careBadge}>{maintenance.repotting.frequency}</span>
                                    )}
                                </div>
                                <p className={styles.careDesc}>{maintenance.repotting.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});

CareSection.displayName = 'CareSection';

export default CareSection;
