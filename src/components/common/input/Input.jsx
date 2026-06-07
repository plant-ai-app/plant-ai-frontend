import { useState } from 'react';
import styles from './Input.module.css';

const EyeIcon = ({ open }) =>
    open ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );

const Input = ({ type, text, name, placeholder, value, handleOnChange, required = false, showToggle = false }) => {
    const [visible, setVisible] = useState(false);

    const resolvedType = showToggle
        ? (visible ? 'text' : 'password')
        : type;

    return (
        <div className={styles.input_container}>
            <label className={styles.visually_hidden} htmlFor={name}>{text}:</label>
            <div className={styles.input_wrapper}>
                <input
                    required={required}
                    type={resolvedType}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    value={value}
                />
                {showToggle && (
                    <button
                        type="button"
                        className={styles.toggle_btn}
                        onClick={() => setVisible((prev) => !prev)}
                        aria-label={visible ? 'Ocultar valor' : 'Exibir valor'}
                    >
                        <EyeIcon open={visible} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
