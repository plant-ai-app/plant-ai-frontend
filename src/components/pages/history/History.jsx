//hooks
import { useHistoryPage } from './hooks/useHistoryPage.js';

//styles and icons
import styles from './History.module.css';
import { BsFilter, BsArrowUp } from 'react-icons/bs';

//components
import Container from '../../common/container/Container';
import Loading from '../../layouts/loading/Loading';
import HistoryCard from './components/HistoryCard';
import HistoryFilterBottomSheet from './components/HistoryFilterBottomSheet';
import BackButton from '../../common/backButton/BackButton';
import AppliedFilters from './components/AppliedFilters';

const History = () => {
    const {
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
    } = useHistoryPage();

    return (
        <Container padding="0">
            <div className={styles.scrollArea} ref={scrollRef} onScroll={handleScroll}>
                <div className={styles.header}>
                    <BackButton
                        width="44px"
                        height="44px"
                        borderRadius="12px"
                        backgroundColor="#f8f9fa"
                        color="#000"
                    />
                    <div className={styles.headerTitle}>
                        <h1>Histórico</h1>
                        <span className={styles.month}>
                            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase()}
                        </span>
                    </div>
                    <button className={styles.filterBtn} onClick={() => setIsFilterOpen(true)}>
                        <BsFilter />
                    </button>
                </div>

                <div className={styles.summaryCard}>
                    <div className={styles.summaryIcon}>
                        <span>🌱</span>
                    </div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>MÊS ATUAL</span>
                        <h2 className={styles.summaryValue}>{totalPerformed} cuidados realizados</h2>
                    </div>
                </div>

                <div className={styles.typeFilters}>
                    {['Todos', ...careTypes].map(type => (
                        <button
                            key={type}
                            className={`${styles.typeChip} ${activeTypeChip === type ? styles.activeChip : ''}`}
                            onClick={() => setActiveTypeChip(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <AppliedFilters 
                    isFiltered={isFiltered}
                    activeFilters={activeFilters}
                    setActiveTypeChip={setActiveTypeChip}
                    filters={filters}
                    setFilters={setFilters}
                    removeTypeFilter={removeTypeFilter}
                    removePlantFilter={removePlantFilter}
                    clearFilters={clearFilters}
                />
                
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
                    careTypes={careTypes}
                    onApply={(newFilters) => {
                        setFilters(newFilters);
                        setIsFilterOpen(false);
                    }}
                    onClear={(cleared) => {
                        setFilters(cleared);
                        setIsFilterOpen(false);
                    }}
                />

                {showScrollTop && (
                    <button className={styles.scrollTopBtn} onClick={scrollToTop} aria-label="Voltar ao topo">
                        <BsArrowUp />
                    </button>
                )}
            </div>
        </Container>
    );
};

export default History;
