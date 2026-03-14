import React, { useState } from "react";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import styles from './changePwdForm.module.css';

const ChangePasswordForm = ({value, handleChange, onSubmit, onClose}) => {

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    return (
        <form onSubmit={onSubmit}>
              <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Senha Atual</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type={showCurrent ? "text" : "password"}
                                className={styles.input}
                                placeholder="........"
                                name="senhaAtual"
                                value={value.senhaAtual || ''}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className={styles.eyeBtn}
                                onClick={() => setShowCurrent(!showCurrent)}
                            >
                                {showCurrent ? <BsEyeSlashFill /> : <BsEyeFill />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Nova Senha</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type={showNew ? "text" : "password"}
                                className={styles.input}
                                placeholder="........"
                                name="senhaNova"
                                value={value.senhaNova || ''}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className={styles.eyeBtn}
                                onClick={() => setShowNew(!showNew)}
                            >
                                {showNew ? <BsEyeSlashFill /> : <BsEyeFill />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.saveBtn} onClick={onSubmit}>
                            Salvar Senha
                        </button>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
        </form>
    );
};

export default ChangePasswordForm;
