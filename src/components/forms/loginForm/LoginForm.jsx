import Input from "../../common/input/Input.jsx";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
    return (
        <form>
            <Input
                type="email"
                text="Digite seu email"
                name="email"
                placeholder="Email"
                handleOnChange={handleChange}
                value={newUser.email ? newUser.email : ''}
            />
            <Input
                type="password"
                text="Digite sua senha"
                name="password"
                placeholder="password"
                handleOnChange={handleChange}
                value={newUser.password ? newUser.password : ''}
            />
        </form>
    );
};

export default LoginForm;