import React, { useState, useEffect } from 'react';
import styles from './HistoryFilterBottomSheet.module.css';
import { BsX, BsChevronDown, BsCheck } from 'react-icons/bs';
import PlantSelectionModal from './PlantSelectionModal';

const HistoryFilterBottomSheet = ({ isOpen, onClose, filters, onApply, onClear }) => {
    const [tempFilters, setTempFilters] = useState(filters);
    const [isPlantModalOpen, setIsPlantModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTempFilters(filters);
        }
    }, [isOpen, filters]);

    const careTypes = ['Rega', 'Poda', 'Adubação', 'Troca de Vaso', 'Controle de Pragas'];
    const statuses = ['CONCLUIDO', 'PULADO', 'ATRASADO', 'ADIANTADO'];

    const handleToggleType = (type) => {
        setTempFilters(prev => ({
            ...prev,
            types: prev.types.includes(type) 
                ? prev.types.filter(t => t !== type) 
                : [...prev.types, type]
        }));
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.handle} />
                    <div className={styles.headerTop}>
                        <h2 className={styles.title}>Filtros</h2>
                        <button className={styles.closeBtn} onClick={onClose}><BsX /></button>
                    </div>
                </div>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>PERÍODO</h3>
                        <div className={styles.dateRange}>
                            <div className={styles.dateInputWrapper}>
                                <label>Início</label>
                                <input 
                                    type="date" 
                                    value={tempFilters.startDate || ''} 
                                    onChange={e => setTempFilters({...tempFilters, startDate: e.target.value})}
                                />
                            </div>
                            <div className={styles.dateInputWrapper}>
                                <label>Fim</label>
                                <input 
                                    type="date" 
                                    value={tempFilters.endDate || ''} 
                                    onChange={e => setTempFilters({...tempFilters, endDate: e.target.value})}
                                />
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>PLANTA</h3>
                        <button className={styles.selectBtn} onClick={() => setIsPlantModalOpen(true)}>
                            {tempFilters.plantIds.length === 0 
                                ? 'Todas as plantas' 
                                : `${tempFilters.plantIds.length} plantas selecionadas`}
                            <BsChevronDown />
                        </button>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>TIPO DE CUIDADO</h3>
                        <div className={styles.chips}>
                            <button 
                                className={`${styles.chip} ${tempFilters.types.length === 0 ? styles.activeChip : ''}`}
                                onClick={() => setTempFilters({...tempFilters, types: []})}
                            >
                                Todas
                            </button>
                            {careTypes.map(type => (
                                <button 
                                    key={type}
                                    className={`${styles.chip} ${tempFilters.types.includes(type) ? styles.activeChip : ''}`}
                                    onClick={() => handleToggleType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>STATUS</h3>
                        <div className={styles.statusList}>
                            {statuses.map(status => (
                                <button 
                                    key={status}
                                    className={styles.statusItem}
                                    onClick={() => setTempFilters({
                                        ...tempFilters, 
                                        status: tempFilters.status === status ? '' : status
                                    })}
                                >
                                    <span>{status.charAt(0) + status.slice(1).toLowerCase()}</span>
                                    {tempFilters.status === status && <BsCheck className={styles.checkIcon} />}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                <div className={styles.footer}>
                    <button className={styles.applyBtn} onClick={() => onApply(tempFilters)}>
                        Aplicar filtros
                    </button>
                    <button className={styles.clearBtn} onClick={() => {
                        const cleared = { startDate: '', endDate: '', plantIds: [], types: [], status: '' };
                        setTempFilters(cleared);
                        onClear(cleared);
                    }}>
                        Limpar filtros
                    </button>
                </div>

                <PlantSelectionModal 
                    isOpen={isPlantModalOpen}
                    onClose={() => setIsPlantModalOpen(false)}
                    selectedPlantIds={tempFilters.plantIds}
                    onConfirm={(ids) => {
                        setTempFilters({...tempFilters, plantIds: ids});
                        setIsPlantModalOpen(false);
                    }}
                />
            </div>
        </div>
    );
};

export default HistoryFilterBottomSheet;
