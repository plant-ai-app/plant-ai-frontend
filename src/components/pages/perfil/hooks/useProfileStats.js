import { useState, useEffect, useCallback } from 'react';
import { usePlant } from '../../../../hooks/usePlant';
import { useHistoricoCuidado } from '../../../../hooks/useHistoricoCuidado';
import { getAllCares } from '../../../../services/care.service';

export const useProfileStats = () => {
    const { getPlants, deleteManyPlants } = usePlant();
    const { fetchHistoricoCuidado, createHistoricoCuidado } = useHistoricoCuidado();

    // States for data
    const [plants, setPlants] = useState([]);
    const [cares, setCares] = useState([]);
    const [historyCount, setHistoryCount] = useState(0);
    const [loadingStats, setLoadingStats] = useState(true);

    // States for modals
    const [isPlantModalOpen, setIsPlantModalOpen] = useState(false);
    const [isCareModalOpen, setIsCareModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isConcluding, setIsConcluding] = useState(false);

    // State for popup
    const [popupConfig, setPopupConfig] = useState(null);

    const loadStats = useCallback(async () => {
        setLoadingStats(true);
        try {
            const [plantsData, caresResponse, historyResponse] = await Promise.all([
                getPlants(),
                getAllCares(),
                fetchHistoricoCuidado()
            ]);

            setPlants(plantsData || []);

            // Filter pending cares (active and overdue - before today)
            const allCares = caresResponse?.cuidados || [];
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            const pending = allCares.filter(c => {
                if (!c.ativo || !c.proxima_data) return false;
                const taskDate = new Date(c.proxima_data);
                if (isNaN(taskDate.getTime())) return false;
                return taskDate < today;
            });

            setCares(pending);

            // Set history count
            let hCount = 0;
            if (Array.isArray(historyResponse)) hCount = historyResponse.length;
            else if (historyResponse?.registros) hCount = historyResponse.registros.length;
            else if (historyResponse?.historico) hCount = historyResponse.historico.length;
            setHistoryCount(hCount);

        } catch (error) {
            console.error("Erro ao carregar stats:", error);
        } finally {
            setLoadingStats(false);
        }
    }, []);

    useEffect(() => {
        loadStats();
    }, [loadStats]);

    const handlePlantCardClick = () => {
        if (plants.length > 0) {
            setIsPlantModalOpen(true);
        } else {
            setPopupConfig({
                isOpen: true,
                title: 'Aviso',
                description: 'Nenhuma planta cadastrada',
                confirmText: 'Ok',
                cancelText: null,
                confirmColor: '#4CAF50',
                onConfirm: () => setPopupConfig(null),
                onClose: () => setPopupConfig(null)
            });
        }
    };

    const handleCareCardClick = () => {
        if (cares.length > 0) {
            setIsCareModalOpen(true);
        } else {
            setPopupConfig({
                isOpen: true,
                title: 'Aviso',
                description: 'Nenhuma tarefa pendente',
                confirmText: 'Ok',
                cancelText: null,
                confirmColor: '#4CAF50',
                onConfirm: () => setPopupConfig(null),
                onClose: () => setPopupConfig(null)
            });
        }
    };

    const handleBulkDeletePlants = async (selectedIds) => {
        setPopupConfig({
            isOpen: true,
            title: 'Excluir Plantas?',
            description: `Você tem certeza que deseja deletar ${selectedIds.length} planta(s)? Esta ação apagará permanentemente todos os dados e agendamentos.`,
            confirmText: 'Sim, excluir',
            cancelText: 'Cancelar',
            confirmColor: '#D32F2F',
            onConfirm: async () => {
                setPopupConfig(null);
                setIsDeleting(true);
                try {
                    await deleteManyPlants(selectedIds);
                    setIsPlantModalOpen(false);
                    loadStats();
                } catch (error) {
                    console.error("Erro ao deletar plantas:", error);
                    setPopupConfig({
                        isOpen: true,
                        title: 'Erro',
                        description: 'Ocorreu um erro ao deletar algumas plantas.',
                        confirmText: 'Ok',
                        cancelText: null,
                        confirmColor: '#D32F2F',
                        onConfirm: () => setPopupConfig(null),
                        onClose: () => setPopupConfig(null)
                    });
                } finally {
                    setIsDeleting(false);
                }
            },
            onClose: () => setPopupConfig(null)
        });
    };

    const handleBulkConcludeCares = async (selectedIds) => {
        setPopupConfig({
            isOpen: true,
            title: 'Concluir Tarefas?',
            description: `Você está prestes a concluir ${selectedIds.length} tarefa(s). Não será possível adicionar comentários e a ação é irreversível. Deseja continuar?`,
            confirmText: 'Sim, concluir',
            cancelText: 'Cancelar',
            confirmColor: '#4CAF50',
            onConfirm: async () => {
                setPopupConfig(null);
                setIsConcluding(true);
                try {
                    const promises = selectedIds.map(id => {
                        const care = cares.find(c => c.id === id);
                        if (!care) return Promise.resolve();
                        return createHistoricoCuidado({
                            cuidado_id: care.id,
                            data_prevista: care.proxima_data,
                            status: 'CONCLUIDO',
                            observacoes: ''
                        });
                    });
                    await Promise.all(promises);
                    setIsCareModalOpen(false);
                    loadStats();
                } catch (error) {
                    console.error("Erro ao concluir tarefas:", error);
                    setPopupConfig({
                        isOpen: true,
                        title: 'Erro',
                        description: 'Ocorreu um erro ao concluir algumas tarefas.',
                        confirmText: 'Ok',
                        cancelText: null,
                        confirmColor: '#D32F2F',
                        onConfirm: () => setPopupConfig(null),
                        onClose: () => setPopupConfig(null)
                    });
                } finally {
                    setIsConcluding(false);
                }
            },
            onClose: () => setPopupConfig(null)
        });
    };

    return {
        data: {
            plants,
            cares,
            historyCount,
            loadingStats
        },
        modals: {
            isPlantModalOpen,
            setIsPlantModalOpen,
            isCareModalOpen,
            setIsCareModalOpen,
            isDeleting,
            isConcluding,
            popupConfig,
            setPopupConfig
        },
        actions: {
            handlePlantCardClick,
            handleCareCardClick,
            handleBulkDeletePlants,
            handleBulkConcludeCares
        }
    };
};
