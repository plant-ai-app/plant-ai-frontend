import styles from './SubmitButton.module.css'

const SubmitButton = ({text, onClick, disabled}) => {
    return(
        <button 
            className={styles.btn}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default SubmitButton;