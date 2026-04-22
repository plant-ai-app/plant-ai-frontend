import { useEffect, useState } from 'react';
import { BsX } from 'react-icons/bs';
import styles from './CareTypeInfoSheet.module.css';

const CareTypeInfoSheet = ({ isOpen, onClose, types }) => {
    const [renderSheet, setRenderSheet] = useState(false);
    const [showAnim, setShowAnim] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setRenderSheet(true);
            setTimeout(() => setShowAnim(true), 10); // Permite montar no DOM antes de animar
        } else {
            setShowAnim(false);
            const timer = setTimeout(() => setRenderSheet(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !renderSheet) return null;

    return (
        <>
            <div 
                className={`${styles.backdrop} ${showAnim ? styles.open : ''}`} 
                onClick={onClose} 
            />
            <div className={`${styles.sheet} ${showAnim ? styles.open : ''}`}>
                <div className={styles.dragHandleWrapper}>
                    <div className={styles.dragHandle} />
                </div>
                <div className={styles.header}>
                    <h3 className={styles.title}>Categorias</h3>
                    <button type="button" onClick={onClose} className={styles.closeBtn}>
                        <BsX />
                    </button>
                </div>
                <div className={styles.content}>
                    {types && types.map((type, index) => (
                        <div key={type.id || index} className={styles.typeItem}>
                            <div 
                                className={styles.iconWrapper} 
                                style={{ 
                                    backgroundColor: type.bgColor, 
                                    color: type.color 
                                }}
                            >
                                {type.icon}
                            </div>
                            <div className={styles.textWrapper}>
                                <h4 className={styles.typeName}>{type.nome}</h4>
                                <p className={styles.typeDesc}>{type.descricao}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CareTypeInfoSheet;
