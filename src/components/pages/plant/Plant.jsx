import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getPlantById } from '../../../services/plant.service';
import styles from './Plant.module.css';
import BackButton from '../../common/backButton/BackButton';
import CareCard from '../../common/CareCard/CareCard';
import { Clock, Hexagon, Camera, Search, MoreHorizontal } from 'lucide-react';

const Plant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const data = await getPlantById(id);
                console.log("Dados da planta recebidos:", data);
                setPlant(data);
            } catch (error) {
                console.error("Erro ao buscar planta:", error);
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

    // Dados mockados para histórico (não encontrados no objeto da planta)
    const careHistory = [
        {
            id: 1,
            title: 'Fiddle Leaf Fig',
            type: 'Watering',
            date: 'Today',
            status: 'COMPLETED',
            note: 'Used filtered water'
        },
        {
            id: 2,
            title: 'Snake Plant',
            type: 'Fertilizing',
            date: 'Oct 23',
            status: 'COMPLETED',
            note: 'New growth spotted!'
        }
    ];

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
                            widht="40px"
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
                    <p className={styles.familyInfo}>Especie da família: <strong>{plant.family || 'Asparagaceae'}</strong></p>
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
                        {careHistory.map(item => (
                            <CareCard key={item.id} {...item} />
                        ))}
                    </div>
                    <div className={styles.moreActions}>
                        <MoreHorizontal />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plant;