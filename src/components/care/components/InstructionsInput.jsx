import React from 'react';
import styles from './InstructionsInput.module.css';

const InstructionsInput = ({ value, onChange }) => {
    return (
        <div>
            <h4 className={styles.sectionTitle}>Instruções</h4>
            <div className={styles.textAreaBox}>
                <textarea maxLength={80}
                    className={styles.instructionsInput}
                    placeholder="Instruções especiais (ex: Usar 200ml de água filtrada)"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                ></textarea>
                <div className={styles.charCounter}>
                    {(value || '').length}/80
                </div>
            </div>
        </div>
    );
};

export default InstructionsInput;
