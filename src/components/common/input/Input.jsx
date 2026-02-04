import styles from './Input.module.css';

const Input = ({type, text, name, placeholder, value, handleOnChange, required = false }) => {
    return (
        <div className={styles.input_container}>
            <label className={styles.visually_hidden} htmlFor={name}>{text}:</label>
            <input
                required = {required}
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange} 
                value={value} 
            />
        </div>
    );
};

export default Input;
