//react
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//components
import BackButton from '../../common/backButton/BackButton';
import HistoryCard from '../history/components/HistoryCard';

//icons and styles
import { Clock, Hexagon, Camera, Search } from 'lucide-react';
import styles from './Plant.module.css';

//hooks
import { useHistoricoCuidado } from '../../../hooks/useHistoricoCuidado';
import { usePlant } from '../../../hooks/usePlant';

const Plant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const { fetchHistoricoCuidado } = useHistoricoCuidado();
    const { getPlantById } = usePlant();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const [plantData, historyData] = await Promise.all([
                    getPlantById(id),
                    fetchHistoricoCuidado()
                ]);
                
                setPlant(plantData);
                
                // Extrair registros do histórico (lidando com diferentes formatos de resposta)
                const allHistory = Array.isArray(historyData) ? historyData : 
                                  historyData?.registros || historyData?.historico || [];
                
                // Filtrar histórico para esta planta específica
                const plantHistory = allHistory.filter(item => String(item.planta_id) === String(id));
                
                // Ordenar por data (mais recente primeiro)
                plantHistory.sort((a, b) => new Date(b.data_realizacao) - new Date(a.data_realizacao));
                
                setHistory(plantHistory);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPlant();
    }, [id]);

    const handleSettingsClick = () => {
        navigate(`/plant/settings/${id}`);
    };

    if (loading) return <div className={styles.loading}>Carregando...</div>;
    if (!plant) return <div className={styles.error}>Planta não encontrada.</div>;

    // Histórico real filtrado no useEffect
    const careHistory = history;

    return (
        <div className={styles.container}>
            {/* Header com Imagem */}
            <div className={styles.header}>
                <img 
                    src={plant.foto_url || '/placeholder-plant.jpg'} 
                    alt={plant.nome_cientifico} 
                    className={styles.headerImage} 
                />
                <div className={styles.headerOverlay}>
                    <div className={styles.topActions}>
                        <BackButton 
                            width="40px"
                            height="40px"
                            borderRadius="50%"
                            backgroundColor="rgba(255, 255, 255, 0.2)"
                            color="#fbfbfb"
                        />
                        <button className={styles.iconButton} onClick={handleSettingsClick} aria-label="Settings">
                            <Hexagon size={24} color="white" />
                        </button>
                    </div>
                    <div className={styles.headerInfo}>
                        <h1 className={styles.nickname}>{plant.apelido || 'Planta sem apelido'}</h1>
                        <div className={styles.dateInfo}>
                            <Clock size={16} />
                            <span>{new Date(plant.criado_em).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conteúdo em Card Sobreposto */}
            <div className={styles.contentCard}>
                <div className={styles.plantInfo}>
                    <h2 className={styles.scientificName}>{plant.nome_cientifico}</h2>
                    <p className={styles.familyInfo}>Especie da família: <strong>{plant.familia || 'N/A'}</strong></p>
                    <p className={styles.commonNames}>
                        Nomes comuns: <span>{plant.nome_popular || 'N/A'}</span>
                    </p>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button 
                        className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Visão geral
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'care' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('care')}
                    >
                        Cuidados
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'info' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('info')}
                    >
                        obter info.
                    </button>
                </div>

                {/* Seção Anotação */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Anotação</h3>
                    <div className={styles.noteCard}>
                        {/* Conteúdo vindo do campo observacao */}
                        <div className={styles.noteContent}>
                            {plant.observacao || 'Nenhuma observação adicionada.'}
                        </div>
                        <span className={styles.noteDate}>
                            Atualizado em: {new Date(plant.atualizado_em).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: '2-digit' })}
                        </span>
                    </div>
                </div>

                {/* Seção Identificar Planta */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Identificar Planta</h3>
                    <div className={styles.identifyCard}>
                        <div className={styles.identifyHeader}>
                            <div className={styles.searchIconWrapper}>
                                <Search size={20} />
                            </div>
                            <div className={styles.identifyText}>
                                <p className={styles.identifyTitle}>Tire uma foto da sua planta</p>
                                <p className={styles.identifySubtitle}>Descubra a espécie em segundos</p>
                            </div>
                        </div>
                        <button onClick={() => navigate('/scan')} className={styles.identifyButton}>
                            <Camera size={18} />
                            <span>Identificar Planta</span>
                        </button>
                    </div>
                </div>

                {/* Seção Cuidados Anteriores */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Cuidados anteriores</h3>
                    <div className={styles.careList}>
                        {careHistory.length === 0 ? (
                            <p className={styles.emptyHistory}>Nenhum cuidado registrado.</p>
                        ) : (
                            careHistory.slice(0, 4).map(item => (
                                <HistoryCard key={item.id} item={item} />
                            ))
                        )}
                    </div>
                    {careHistory.length > 4 && (
                        <div className={styles.seeMoreWrapper}>
                            <button 
                                className={styles.seeMoreButton} 
                                onClick={() => navigate('/history', { state: { plantId: id } })}
                            >
                                Ver todo o histórico
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Plant;