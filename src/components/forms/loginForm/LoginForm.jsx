import Input from "../../common/input/Input.jsx";
import SubmitButton from "../../common/submitButton/SubmitButton.jsx";
import styles from "./LoginForm.module.css";
import {Link} from "react-router-dom";

const LoginForm = ({value, handleChange, onSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    }
    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <Input
                type="email"
                text="Digite seu email"
                name="email"
                placeholder="Email"
                handleOnChange={handleChange}
                value={value.email ? value.email : ''}
                required = {true}
            />
            <Input
                type="password"
                text="Digite sua senha"
                name="senha"
                placeholder="Senha"
                handleOnChange={handleChange}
                value={value.senha ? value.senha : ''}
                required = {true}
            />
            <span><Link to={'/forgot-password'}>Esqueceu sua senha ?</Link></span>

            <SubmitButton text="Entrar"/>
        </form>
    );
};

export default LoginForm;