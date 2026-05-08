//react
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

//hooks
import { useHistoricoCuidado } from '../../../hooks/useHistoricoCuidado';

//styles and icons
import styles from './History.module.css';
import { BsFilter } from 'react-icons/bs';

//components
import Container from '../../common/container/Container';
import Loading from '../../layouts/loading/Loading';
import HistoryCard from './components/HistoryCard';
import HistoryFilterBottomSheet from './components/HistoryFilterBottomSheet';
import BackButton from '../../common/backButton/BackButton';

const History = () => {
    const navigate = useNavigate();
    const { fetchHistoricoCuidado, loading } = useHistoricoCuidado();
    const [history, setHistory] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Filtros
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        plantIds: [],
        types: [],
        status: ''
    });

    const [activeTypeChip, setActiveTypeChip] = useState('Todos');

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const response = await fetchHistoricoCuidado();
            // Verifica se a resposta é um array ou se contém a propriedade 'registros' ou 'historico'
            if (Array.isArray(response)) {
                setHistory(response);
            } else if (response && response.registros) {
                setHistory(response.registros);
            } else if (response && response.historico) {
                setHistory(response.historico);
            } else {
                setHistory([]);
            }
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
            setHistory([]);
        }
    };

    const getCalculatedStatus = (item) => {
        if (item.status === 'PULADO') return 'PULADO';
        const datePrevista = new Date(item.data_prevista);
        const dateRealizacao = new Date(item.data_realizacao);
        if (dateRealizacao > datePrevista) return 'ATRASADO';
        if (dateRealizacao < datePrevista) return 'ADIANTADO';
        return 'CONCLUIDO';
    };

    const filteredHistory = useMemo(() => {
        return history.filter(item => {
            // Filtro por Tipo (Chips rápidos ou do BottomSheet)
            const typeMatch = activeTypeChip === 'Todos' 
                ? (filters.types.length === 0 || filters.types.includes(item.tipo))
                : item.tipo === activeTypeChip;
            
            if (!typeMatch) return false;

            // Filtro por Planta
            if (filters.plantIds.length > 0 && !filters.plantIds.map(String).includes(String(item.planta_id))) {
                return false;
            }

            // Filtro por Status
            if (filters.status) {
                const currentStatus = getCalculatedStatus(item);
                if (currentStatus !== filters.status) return false;
            }

            // Filtro por Data
            const itemDate = new Date(item.data_realizacao);
            if (filters.startDate && itemDate < new Date(filters.startDate)) return false;
            if (filters.endDate) {
                const end = new Date(filters.endDate);
                end.setHours(23, 59, 59);
                if (itemDate > end) return false;
            }

            return true;
        });
    }, [history, filters, activeTypeChip]);

    const groupedHistory = useMemo(() => {
        const groups = {};
        
        filteredHistory.forEach(item => {
            const date = new Date(item.data_realizacao);
            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            let dateLabel = "";
            if (date.toDateString() === today.toDateString()) {
                dateLabel = "Hoje";
            } else if (date.toDateString() === yesterday.toDateString()) {
                dateLabel = "Ontem";
            } else {
                dateLabel = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
            }

            if (!groups[dateLabel]) groups[dateLabel] = [];
            groups[dateLabel].push(item);
        });

        return Object.keys(groups).map(label => ({
            label,
            items: groups[label]
        }));
    }, [filteredHistory]);

    const totalPerformed = history.filter(h => h.status === 'CONCLUIDO').length;

    return (
        <Container padding="0">
            <div className={styles.scrollArea}>
                <div className={styles.header}>
                    <BackButton
                        width="30px"
                        height="30px"
                        borderRadius="50%"
                        backgroundColor="transparent"
                        color="#000"
                    />
                    <div className={styles.headerTitle}>
                        <h1>Histórico de Cuidados</h1>
                        <span className={styles.month}>MAIO DE 2026</span>
                    </div>
                    <button className={styles.filterBtn} onClick={() => setIsFilterOpen(true)}>
                        <BsFilter />
                    </button>
                </div>
                <div className={styles.summaryCard}>
                    <div className={styles.summaryIcon}>
                        <div className={styles.leafIcon}>🌱</div>
                    </div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>MÊS ATUAL</span>
                        <h2 className={styles.summaryValue}>{totalPerformed} cuidados realizados</h2>
                    </div>
                </div>
                <div className={styles.typeFilters}>
                    {['Todos', 'Rega', 'Poda', 'Adubação'].map(type => (
                        <button
                            key={type}
                            className={`${styles.typeChip} ${activeTypeChip === type ? styles.activeChip : ''}`}
                            onClick={() => setActiveTypeChip(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className={styles.historyList}>
                    {loading ? (
                        <Loading />
                    ) : groupedHistory.length > 0 ? (
                        groupedHistory.map(group => (
                            <div key={group.label} className={styles.group}>
                                <h3 className={styles.groupLabel}>{group.label}</h3>
                                {group.items.map(item => (
                                    <HistoryCard key={item.id} item={item} />
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className={styles.empty}>
                            <p>Nenhum registro encontrado para os filtros selecionados.</p>
                        </div>
                    )}
                </div>
                <HistoryFilterBottomSheet
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    filters={filters}
                    onApply={(newFilters) => {
                        setFilters(newFilters);
                        setIsFilterOpen(false);
                    }}
                    onClear={(cleared) => {
                        setFilters(cleared);
                        setIsFilterOpen(false);
                    }}
                />
            </div>
        </Container>
    );
};

export default History;
