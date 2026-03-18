import React from "react";
import styles from './EditProfileForm.module.css';

const EditProfileForm = ({value, handleChange, onSubmit, onClose}) => {
    return (
        <form onSubmit={onSubmit}>
              <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Nome</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Name"
                                name="name"
                                value={value.name || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="Email"
                                name="email"
                                value={value.email || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="submit" className={styles.saveBtn}>
                            Salvar Alterações
                        </button>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
        </form>
    );
};

export default EditProfileForm;
