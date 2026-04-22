import { useState } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import styles from './CareTypeGrid.module.css';
import CareTypeInfoSheet from './CareTypeInfoSheet/CareTypeInfoSheet.jsx';

const CareTypeGrid = ({ types, selectedTypeId, onSelect }) => {
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    return (
        <div>
            <div className={styles.headerRow}>
                <h4 className={styles.sectionTitle}>Tipo de Cuidado</h4>
                <button type="button" className={styles.infoBtn} onClick={() => setIsInfoOpen(true)}>
                    <BsInfoCircleFill />
                </button>
            </div>
            <div className={styles.typesGrid}>
                {types.map(type => (
                    <button
                        key={type.id}
                        type="button"
                        className={`${styles.typePill} ${selectedTypeId === type.id ? styles.active : ''}`}
                        style={selectedTypeId === type.id ? { 
                            borderColor: type.color, 
                            color: type.color 
                        } : {}}
                        onClick={() => onSelect(type.id)}
                    >
                        <span 
                            className={styles.typeIcon}
                            style={{ 
                                color: type.color, 
                                backgroundColor: type.bgColor 
                            }}
                        >
                            {type.icon}
                        </span>
                        {type.label}
                    </button>
                ))}
            </div>
            <CareTypeInfoSheet 
                isOpen={isInfoOpen} 
                onClose={() => setIsInfoOpen(false)} 
                types={types} 
            />
        </div>
    );
};

export default CareTypeGrid;
