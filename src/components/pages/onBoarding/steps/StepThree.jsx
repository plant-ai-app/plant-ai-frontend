import img from './img_presentation.svg';
import styles from './Step.module.css';

const StepThree = ({ onNext }) => {
    return (
       <div className={styles.step_container}>
            <div className={styles.img}>
                <img src={img} alt="" />
            </div>
            <div className={styles.texts}>
                <h1>Organize e acompanhe seus cuidados</h1>
                <p>
                   Salve suas plantas e receba lembretes para cuidar delas no momento certo.
                </p>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => onNext()}>Próximo</button>
            </div>
        </div>
    );
};

export default StepThree;
