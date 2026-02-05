import Input from "../../common/input/Input.jsx";
import styles from "./RegisterForm.module.css";
import SubmitButton from "../../common/submitButton/SubmitButton.jsx";

const RegisterForm = ({value, handleChange, onSubmit}) => {

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit()
    }
    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <Input
                type="text"
                text="Digite seu nome"
                name="nome"
                placeholder="Nome"
                handleOnChange={handleChange}
                value={value.nome ? value.nome : ''}
                required = {true}
            />
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
            <Input
                type="password"
                text="Confirme sua senha"
                name="confirmaSenha"
                placeholder="Confirmar senha"
                handleOnChange={handleChange}
                value={value.confirmaSenha ? value.confirmaSenha : ''}
                required = {true}
            />
            <SubmitButton text="Criar conta"/>
        </form>
    );
};

export default RegisterForm;