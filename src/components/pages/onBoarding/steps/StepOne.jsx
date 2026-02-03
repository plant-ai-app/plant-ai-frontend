import styles from './Step.module.css';
import img from './img_presentation.svg'

const StepOne = ({ onNext }) => {
    return (
        <div className={styles.step_container}>
            <div className={styles.img}>
                <img src={img} alt="" />
            </div>
            <div className={styles.texts}>
                <h1>Identifique suas plantas em segundos</h1>
                <p>
                   Use a câmera do celular para descobrir o nome da planta e informações essenciais.
                </p>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => onNext()}>Próximo</button>
            </div>
        </div>
    );
};

export default StepOne;
