import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";

import Container from "../../common/container/Container.jsx";
import LoginForm from "../../forms/loginForm/LoginForm.jsx";
import BackButton from "../../common/backButton/BackButton.jsx";
import Message from "../../layouts/message/Message.jsx";
import Loading from "../../layouts/loading/Loading.jsx";
import styles from "./Login.module.css";

const Login = () => {

    const {login, loading, error} = useAuth();

    const navigate = useNavigate();

    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: "",
        senha: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const clearForm = () => {
        setFormData({ email: '', senha: '' })
    }
    const handleSubmit = async () => {
        setMessage('')
        setType('')
        try {
            const data = await login(formData);

            setType('success')
            setMessage(data.message);
            
            clearForm();

            console.log(data);
            
        } catch (error) {
            console.log(error)
            setType('error')
            setMessage(error.response?.data?.message || "Erro ao logar");
        }
    };

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage('');
            setType('');
        }, 2000);

        return () => clearTimeout(timer);
    }, [message]);


    return (
        <Container padding={'8% 1.2rem 2.2rem 1.2rem'}>
            <Message type={type} msg={message} />
            {loading && <Loading />}
            <div className={styles.login_container}>
                <BackButton />
                <div className={styles.texts_header}>
                    <h1>Bem-vindo de <br /> Volta 👋</h1>
                    <p>Acesse sua conta e continue cuidando das suas plantas.</p>
                </div>
                <div className={styles.form_container}>
                    <LoginForm
                        value={formData}
                        handleChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>
                <span>Novo por aqui? <Link to={'/register'}>Registre-se</Link></span>
            </div>

        </Container>
    );
};

export default Login;
