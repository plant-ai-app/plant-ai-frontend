import Input from "../../common/input/Input.jsx";
import SubmitButton from "../../common/submitButton/SubmitButton.jsx";

import styles from "./ForgotPwdForm.module.css";

const ForgotPwdForm = ({value, handleChange, onSubmit}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    }
    
    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <Input
                type="text"
                text="Digite seu email"
                name="email"
                placeholder="Digite seu email"
                handleOnChange={handleChange}
                value={value.email || ''}
                required = {true}
            />
            <SubmitButton text="Enviar"/>
        </form>
    )
}

export default ForgotPwdForm;

