import img from './img_presentation.svg';
import styles from './Step.module.css';

const StepTwo = ({ onNext }) => {
    return (
        <div className={styles.step_container}>
            <div className={styles.img}>
                <img src={img} alt="" />
            </div>
            <div className={styles.texts}>
                <h1>Geração de informações com IA</h1>
                <p>
                   Conteúdo das plantas gerado por IA com auxílio de um chatbot.
                </p>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => onNext()}>Próximo</button>
            </div>
        </div>
    )
        
};

export default StepTwo;
