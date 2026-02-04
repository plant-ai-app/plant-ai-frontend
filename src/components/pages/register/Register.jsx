import Container from "../../common/container/Container.jsx";
import RegisterForm from "../../forms/registerForm/RegisterForm.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log(formData);
    };

    return (
        <Container padding={'18% 1.2rem 2.2rem 1.2rem'}>
            <div className={styles.register_container}>
                <div className={styles.texts_header}>
                    <h1>Vamos criar sua <br /> Conta ✍️</h1>
                    <p>Crie sua conta e tenha suas plantas sempre  bem cuidadas.</p>
                </div>
                <RegisterForm
                    value={formData}
                    handleChange={handleChange}
                    onSubmit={handleSubmit}
                />
                <span>Já tem uma conta ?<Link to={'/login'}>Login</Link></span>
            </div>
        </Container>
    );
};

export default Register;
