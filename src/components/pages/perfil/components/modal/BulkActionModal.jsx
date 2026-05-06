import { useState, useEffect } from 'react';
import styles from './BulkActionModal.module.css';
import { BsSearch, BsX } from 'react-icons/bs';

const BulkActionModal = ({ 
    isOpen, 
    onClose, 
    title, 
    searchPlaceholder,
    showSearch = false,
    items = [], 
    onConfirmBulk,
    confirmText,
    loadingText,
    isLoading = false,
    emptyMessage = "Nenhum item encontrado",
    renderItem
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
            setSelectedIds([]);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredItems = items.filter(item => {
        if (!showSearch) return true;
        const name = (item.title || item.name || '').toLowerCase();
        return name.includes(searchTerm.toLowerCase());
    });

    const isAllSelected = filteredItems.length > 0 && selectedIds.length === filteredItems.length;

    const handleToggleAll = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredItems.map(item => item.id));
        }
    };

    const handleToggleSelect = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.handle} />
                    <div className={styles.headerTop}>
                        <h2 className={styles.title}>{title}</h2>
                        <button className={styles.closeBtn} onClick={onClose}><BsX size={28} /></button>
                    </div>
                    {showSearch && (
                        <div className={styles.searchWrapper}>
                            <BsSearch className={styles.searchIcon} />
                            <input 
                                type="text" 
                                className={styles.searchInput} 
                                placeholder={searchPlaceholder || "Buscar..."}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.content}>
                    {items.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>{emptyMessage}</p>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>Nenhum resultado para "{searchTerm}"</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.selectAllWrapper}>
                                <label className={styles.checkboxLabel}>
                                    <div className={styles.checkboxContainer}>
                                        <input 
                                            type="checkbox" 
                                            checked={isAllSelected}
                                            onChange={handleToggleAll}
                                            className={styles.checkbox}
                                        />
                                        <span className={styles.customCheckbox}></span>
                                    </div>
                                    <span className={styles.selectAllText}>Selecionar todos</span>
                                </label>
                            </div>
                            
                            <div className={styles.listContainer}>
                                {filteredItems.map(item => renderItem({
                                    item,
                                    isSelected: selectedIds.includes(item.id),
                                    onToggleSelect: handleToggleSelect
                                }))}
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.footer}>
                    <button 
                        className={styles.confirmBtn} 
                        onClick={() => onConfirmBulk(selectedIds)}
                        disabled={selectedIds.length === 0 || isLoading}
                    >
                        {isLoading ? loadingText : `${confirmText} ${selectedIds.length > 0 ? `(${selectedIds.length})` : ''}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BulkActionModal;
