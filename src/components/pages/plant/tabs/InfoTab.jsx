import { useNavigate } from 'react-router-dom';
import styles from './InfoTab.module.css';

const InfoTab = ({ plant }) => {
    const navigate = useNavigate();

    const handleAiClick = () => {
        navigate('/ai-analysis', { 
            state: { 
                scientificName: plant?.nome_cientifico,
                fotoUrl: plant?.foto_url,
                plantName: plant?.apelido || plant?.nome_comum
            } 
        });
    };

    return (
        <div className={styles.tabContent}>
            <div className={styles.aiSection}>
                <div className={styles.headerRow}>
                    <span className={styles.aiBadge}>Inteligência Artificial</span>
                </div>
                <h3 className={styles.aiTitle}>Análise Inteligente da Planta</h3>
                <p className={styles.aiDescription}>
                    Obtenha diagnósticos instantâneos, guias de rega, recomendações de iluminação e dicas avançadas para a saúde e desenvolvimento desta planta em segundos.
                </p>
                <button className={styles.aiButton} onClick={handleAiClick}>
                    <span>Consultar IA do Plant-AI</span>
                    <span className={styles.btnIcon}></span>
                </button>
            </div>

            <p className={styles.aiDisclaimer}>
                A inteligência artificial pode cometer erros. Sempre valide informações cruciais para a saúde da sua planta.
            </p>
        </div>
    );
};

export default InfoTab;
