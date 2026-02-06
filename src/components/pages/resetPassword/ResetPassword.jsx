import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";

import Container from "../../common/container/Container.jsx";
import Input from "../../common/input/Input.jsx";
import SubmitButton from "../../common/submitButton/SubmitButton.jsx";
import Loading from "../../layouts/loading/Loading.jsx";
import Message from "../../layouts/message/Message.jsx";

import styles from './ResetPassword.module.css';

const ResetPassword = () => {

    const { resetPassword, loading, error } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        novaSenha: "",
        confirmarSenha: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const clearForm = () => {
        setFormData({ novaSenha: '', confirmarSenha: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('')
        setType('')

        try {
            const data = await resetPassword({
                token,
                novaSenha: formData.novaSenha,
                confirmarSenha: formData.confirmarSenha
            });

            setType('success')
            setMessage(data.message);

            clearForm();

            console.log(data);
        } catch (error) {
            console.log(error);
            setType('error')
            setTimeout(() => clearForm(), 2000)
            setMessage(error.response?.data?.message || "Erro ao redefinir senha");
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
        <Container padding={'8% 1.2rem 1.2rem 1.2rem'}>
            <Message type={type} msg={message} />
            {loading && <Loading />}
            <div className={styles.reset_container}>
                <div className={styles.texts}>
                    <h1>Redefinir Senha</h1>
                    <p>
                        Crie uma nova senha para sua conta.
                    </p>
                </div>

                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <Input
                        type="password"
                        text="Nova Senha"
                        name="novaSenha"
                        placeholder="Digite sua nova senha"
                        handleOnChange={handleChange}
                        value={formData.novaSenha}
                        required={true}
                    />
                    <Input
                        type="password"
                        text="Repetir Nova Senha"
                        name="confirmarSenha"
                        placeholder="Repita sua nova senha"
                        handleOnChange={handleChange}
                        value={formData.confirmarSenha}
                        required={true}
                    />

                    <div className={styles.button_container}>
                        <SubmitButton text="Redefinir Senha" />
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default ResetPassword;
