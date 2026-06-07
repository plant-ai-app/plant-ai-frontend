import React from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './AlertsSection.module.css';

const AlertsSection = React.forwardRef(({ data }, ref) => {
    if (!data || !data.alerts) return null;

    const { common_problems } = data.alerts;

    return (
        <div id="alerts" ref={ref} className={styles.sectionBlock}>
            <h3 className={styles.sectionTitle}>Alertas e Problemas Comuns</h3>
            
            <div className={styles.alertsContainer}>
                {common_problems && common_problems.length > 0 ? (
                    common_problems.map((problem, index) => (
                        <div key={index} className={styles.problemCard}>
                            <div className={styles.problemIconContainer}>
                                <AlertTriangle size={24} />
                            </div>
                            <div className={styles.problemContent}>
                                <h4 className={styles.problemTitle}>{problem.title}</h4>
                                <p className={styles.problemDesc}>{problem.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Nenhum alerta ou problema grave mapeado para esta espécie.</p>
                )}
            </div>
        </div>
    );
});

AlertsSection.displayName = 'AlertsSection';

export default AlertsSection;
