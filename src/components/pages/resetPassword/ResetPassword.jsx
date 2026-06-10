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
    // Importamos também o validateResetToken
    const { resetPassword, validateResetToken, loading } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    
    // Novo estado: null = validando, true = válido, false = inválido
    const [tokenValido, setTokenValido] = useState(null); 

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

    // 1. Validar o token assim que o componente for montado
    useEffect(() => {
        const verificarToken = async () => {
            if (!token) {
                setTokenValido(false);
                setType('error');
                setMessage('Token de recuperação não foi fornecido.');
                return;
            }

            try {
                await validateResetToken(token);
                setTokenValido(true);
            } catch (err) {
                setTokenValido(false);
                setType('error');
                setMessage(err.response?.data?.error || 'Link de recuperação inválido ou expirado.');
            }
        };

        verificarToken();
    }, [token]);

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

        if (tokenValido === false) return;

        const timer = setTimeout(() => {
            setMessage('');
            setType('');
        }, 2000);

        return () => clearTimeout(timer);
    }, [message, tokenValido]);

    return (
        <Container padding={'8% 1.2rem 1.2rem 1.2rem'}>
            <Message type={type} msg={message} />
            {loading && <Loading />}
            
            <div className={styles.reset_container}>
                <div className={styles.texts}>
                    <h1>Redefinir Senha</h1>
                    <p>
                        {tokenValido === false 
                            ? "Não foi possível prosseguir com a redefinição." 
                            : "Crie uma nova senha para sua conta."}
                    </p>
                </div>

                {tokenValido === true && (
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <Input
                            showToggle={true}
                            type="password"
                            text="Nova Senha"
                            name="novaSenha"
                            placeholder="Digite sua nova senha"
                            handleOnChange={handleChange}
                            value={formData.novaSenha}
                            required={true}
                        />
                        <Input
                            showToggle={true}
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
                )}

                {tokenValido === false && (
                    <div className={styles.button_container} style={{ marginTop: '2rem' }}>
                        <SubmitButton 
                            text="Solicitar Novo Link" 
                            onClick={() => navigate('/forgot-password')} 
                        />
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ResetPassword;