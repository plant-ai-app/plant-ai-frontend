import React, { useState } from 'react';
import { BsX, BsPlus } from 'react-icons/bs';
import { createPortal } from 'react-dom';
import styles from './AppliedFilters.module.css';

const AppliedFilters = ({ 
    isFiltered, 
    activeFilters = [],
    setActiveTypeChip, 
    filters, 
    setFilters, 
    removeTypeFilter, 
    removePlantFilter, 
    clearFilters 
}) => {
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    if (!isFiltered || activeFilters.length === 0) return null;

    const visibleFilters = activeFilters.slice(0, 2);
    const hiddenFiltersCount = activeFilters.length - 2;

    const handleRemove = (filter) => {
        if (filter.type === 'chipType') setActiveTypeChip('Todos');
        else if (filter.type === 'type') removeTypeFilter(filter.value);
        else if (filter.type === 'plant') removePlantFilter(filter.value);
        else if (filter.type === 'status') setFilters({ ...filters, status: '' });
        else if (filter.type === 'date') {
            if (filter.id === 'startDate') setFilters({ ...filters, startDate: '' });
            else if (filter.id === 'endDate') setFilters({ ...filters, endDate: '' });
        }
    };

    return (
        <div className={styles.appliedFilters}>
            <span className={styles.filtrandoLabel}>Filtrando:</span>
            <div className={styles.filterPills}>
                {visibleFilters.map(filter => (
                    <div key={filter.id} className={styles.filterPill}>
                        <span className={styles.pillLabel}>{filter.label}</span>
                        <button className={styles.removeFilter} onClick={() => handleRemove(filter)}>
                            <BsX />
                        </button>
                    </div>
                ))}

                {hiddenFiltersCount > 0 && (
                    <button className={styles.morePill} onClick={() => setIsMoreOpen(true)}>
                        <BsPlus /> {hiddenFiltersCount}
                    </button>
                )}
            </div>
            <button className={styles.clearAll} onClick={clearFilters}>Limpar</button>

            {isMoreOpen && createPortal(
                <div className={styles.modalOverlay} onClick={() => setIsMoreOpen(false)}>
                    <div className={styles.bottomSheet} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Filtros Aplicados</h3>
                            <button className={styles.closeButton} onClick={() => setIsMoreOpen(false)}>
                                <BsX size={28} />
                            </button>
                        </div>
                        <div className={styles.allFiltersList}>
                            {activeFilters.map(filter => (
                                <div key={filter.id} className={styles.modalFilterItem}>
                                    <span className={styles.modalFilterLabel}>{filter.label}</span>
                                    <button className={styles.modalRemoveBtn} onClick={() => handleRemove(filter)}>
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className={styles.modalClearBtn} onClick={() => { clearFilters(); setIsMoreOpen(false); }}>
                            Limpar todos os filtros
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default AppliedFilters;
