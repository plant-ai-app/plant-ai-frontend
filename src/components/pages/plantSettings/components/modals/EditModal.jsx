import styles from './EditModal.module.css';

const EditModal = ({ isOpen, onClose, onSave, title, value, setValue, fieldType = 'text' }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h3 className={styles.title}>{title}</h3>
                
                {fieldType === 'textarea' ? (
                    <textarea 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={styles.textarea}
                        rows={4}
                    />
                ) : (
                    <input 
                        type="text" 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={styles.input}
                        autoFocus
                    />
                )}
                
                <div className={styles.actions}>
                    <button type="button" className={styles.cancelBtn} onClick={onClose}>
                        Cancelar
                    </button>
                    <button type="button" className={styles.saveBtn} onClick={onSave}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
