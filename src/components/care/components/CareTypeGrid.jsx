import React from 'react';
import styles from './CareTypeGrid.module.css';

const CareTypeGrid = ({ types, selectedTypeId, onSelect }) => {
    return (
        <div>
            <h4 className={styles.sectionTitle}>Tipo de Cuidado</h4>
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
        </div>
    );
};

export default CareTypeGrid;
