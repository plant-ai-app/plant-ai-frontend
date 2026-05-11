import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistoricoCuidado } from '../../../../hooks/useHistoricoCuidado';
import { usePlant } from '../../../../hooks/usePlant';
import { useCareType } from '../../../../hooks/useCareType';

export const useHistoryPage = () => {
    const { fetchHistoricoCuidado, loading } = useHistoricoCuidado();
    const { getPlants } = usePlant();
    const { getCareTypes } = useCareType();
    const scrollRef = useRef(null);
    const location = useLocation();

    const [history, setHistory] = useState([]);
    const [plants, setPlants] = useState([]);
    const [careTypes, setCareTypes] = useState(['Rega', 'Poda', 'Adubação']);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        plantIds: [],
        types: [],
        status: ''
    });

    const [activeTypeChip, setActiveTypeChip] = useState('Todos');

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (location.state?.plantId) {
            setFilters(prev => ({
                ...prev,
                plantIds: [String(location.state.plantId)]
            }));
        }
    }, [location.state]);

    const loadData = async () => {
        try {
            const [historyData, plantsData, typesData] = await Promise.all([
                fetchHistoricoCuidado(),
                getPlants(),
                getCareTypes()
            ]);

            if (Array.isArray(historyData)) setHistory(historyData);
            else if (historyData?.registros) setHistory(historyData.registros);
            else if (historyData?.historico) setHistory(historyData.historico);

            if (Array.isArray(plantsData)) setPlants(plantsData);
            else if (plantsData?.plantas) setPlants(plantsData.plantas);

            if (Array.isArray(typesData)) setCareTypes(typesData.map(t => t.nome));
            else if (typesData?.tipos) setCareTypes(typesData.tipos.map(t => t.nome));

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            setShowScrollTop(scrollRef.current.scrollTop > 100);
        }
    };

    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const clearFilters = () => {
        setFilters({
            startDate: '',
            endDate: '',
            plantIds: [],
            types: [],
            status: ''
        });
        setActiveTypeChip('Todos');
    };

    const removePlantFilter = (id) => {
        setFilters(prev => ({
            ...prev,
            plantIds: prev.plantIds.filter(pId => String(pId) !== String(id))
        }));
    };

    const removeTypeFilter = (type) => {
        setFilters(prev => ({
            ...prev,
            types: prev.types.filter(t => t !== type)
        }));
    };

    const isFiltered = filters.startDate || filters.endDate || filters.plantIds.length > 0 || filters.types.length > 0 || filters.status || activeTypeChip !== 'Todos';

    const activeFilters = useMemo(() => {
        const list = [];
        
        // Chip rápido
        if (activeTypeChip !== 'Todos') {
            list.push({ id: 'activeType', type: 'chipType', label: activeTypeChip });
        }
        
        // Tipos do filtro
        filters.types.forEach(type => {
            list.push({ id: `type-${type}`, type: 'type', label: type, value: type });
        });
        
        // Plantas
        filters.plantIds.forEach(id => {
            const plant = plants.find(p => String(p.id) === String(id));
            list.push({ 
                id: `plant-${id}`, 
                type: 'plant', 
                label: plant?.apelido || plant?.nome_popular || 'Planta', 
                value: id 
            });
        });
        
        // Status
        if (filters.status) {
            list.push({ id: 'status', type: 'status', label: filters.status });
        }

        // Datas
        if (filters.startDate) {
            list.push({ id: 'startDate', type: 'date', label: `De: ${new Date(filters.startDate).toLocaleDateString('pt-BR')}` });
        }
        if (filters.endDate) {
            list.push({ id: 'endDate', type: 'date', label: `Até: ${new Date(filters.endDate).toLocaleDateString('pt-BR')}` });
        }

        return list;
    }, [filters, activeTypeChip, plants]);

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
            const typeMatch = activeTypeChip === 'Todos' 
                ? (filters.types.length === 0 || filters.types.includes(item.tipo))
                : item.tipo === activeTypeChip;
            
            if (!typeMatch) return false;

            if (filters.plantIds.length > 0 && !filters.plantIds.map(String).includes(String(item.planta_id))) {
                return false;
            }

            if (filters.status) {
                const currentStatus = getCalculatedStatus(item);
                if (currentStatus !== filters.status) return false;
            }

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

    return {
        loading,
        plants,
        careTypes,
        isFilterOpen,
        setIsFilterOpen,
        showScrollTop,
        filters,
        setFilters,
        activeTypeChip,
        setActiveTypeChip,
        groupedHistory,
        totalPerformed,
        scrollRef,
        handleScroll,
        scrollToTop,
        clearFilters,
        removePlantFilter,
        removeTypeFilter,
        isFiltered,
        activeFilters
    };
};
