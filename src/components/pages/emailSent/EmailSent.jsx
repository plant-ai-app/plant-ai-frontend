import Container from '../../common/container/Container.jsx';
import SubmitButton from '../../common/submitButton/SubmitButton.jsx';
import styles from './EmailSent.module.css';
import img from './img_email.svg';

import { useNavigate } from 'react-router-dom';


const EmailSent = () => {

    const navigate = useNavigate();

    return(
      <Container padding={'1.2rem'} justifyContent="center" alignItems="center" textAlign="center">
          <div className={styles.email_container}>
            <div className={styles.img}>
                <img src={img} alt="carta imagem" />
            </div>
            <div className={styles.texts}>
                <h1>Email enviado <br /> com sucesso ✌️</h1>
                <p>
                    Enviamos um link para redefinir a senha.<br />
                    Por favor, chegue sua caixa de mensagens.
                </p>
            </div>
            <SubmitButton text="Voltar para login" onClick={() => navigate("/login") }/>
          </div>
      </Container>
    )
}

export default EmailSent;
