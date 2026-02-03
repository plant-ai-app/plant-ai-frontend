import img from './img_presentation.svg';
import styles from './Step.module.css';

const StepFour = () => {
    return (
        <div className={styles.step_container}>
            <div className={styles.img}>
                <img src={img} alt="" />
            </div>
            <div className={styles.texts}>
                <h1>Organize e acompanhe seus cuidados</h1>
                <p>
                   Dê o primeiro passo no cuidado das suas plantas.
                </p>
            </div>
            <div className={styles.buttons}>
                <div className={styles.last_step_buttons}>
                    <button onClick={() => {}}>Criar</button>
                    <button onClick={() => {}}>Entrar</button>
                </div>
            </div>
        </div>
    );
};

export default StepFour;
