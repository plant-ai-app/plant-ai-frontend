import img from './img_presentation.svg';
import styles from './Step.module.css';
import { useNavigate } from 'react-router-dom';

const StepFour = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.step_container}>
            <div className={styles.img}>
                <img src={img} alt="" />
            </div>
            <div className={styles.texts}>
                <h1>Comece sua coleção hoje</h1>
                <p>
                   Tudo o que suas plantas precisam em um só lugar.
                </p>
            </div>
            <div className={styles.buttons}>
                <div className={styles.last_step_buttons}>
                    <button onClick={() => { navigate('/register') }}>Criar</button>
                    <button onClick={() => { navigate('/login') }}>Entrar</button>
                </div>
            </div>
        </div>
    );
};

export default StepFour;
