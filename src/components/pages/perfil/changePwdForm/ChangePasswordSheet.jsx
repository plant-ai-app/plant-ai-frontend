import React, { useState } from 'react';
import styles from './ChangePasswordSheet.module.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const ChangePasswordSheet = ({ isOpen, onClose }) => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.sheet} onClick={e => e.stopPropagation()}>
                <div className={styles.dragIndicator}></div>
                
                <div className={styles.header}>
                    <h2 className={styles.title}>Change Password</h2>
                    <p className={styles.subtitle}>Please enter your password details below</p>
                </div>

                <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>CURRENT PASSWORD</label>
                        <div className={styles.inputWrapper}>
                            <input 
                                type={showCurrent ? "text" : "password"} 
                                className={styles.input} 
                                placeholder="........"
                            />
                            <button 
                                type="button" 
                                className={styles.eyeBtn}
                                onClick={() => setShowCurrent(!showCurrent)}
                            >
                                {showCurrent ? <BsEyeSlash /> : <BsEye />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>NEW PASSWORD</label>
                        <div className={styles.inputWrapper}>
                            <input 
                                type={showNew ? "text" : "password"} 
                                className={styles.input} 
                                placeholder="........"
                            />
                            <button 
                                type="button" 
                                className={styles.eyeBtn}
                                onClick={() => setShowNew(!showNew)}
                            >
                                {showNew ? <BsEyeSlash /> : <BsEye />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>CONFIRM NEW PASSWORD</label>
                        <div className={styles.inputWrapper}>
                            <input 
                                type={showConfirm ? "text" : "password"} 
                                className={styles.input}
                                placeholder="........"
                            />
                            <button 
                                type="button" 
                                className={styles.eyeBtn}
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <BsEyeSlash /> : <BsEye />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.saveBtn} onClick={onClose}>
                            Save Password
                        </button>
                        <button className={styles.cancelBtn} onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordSheet;
