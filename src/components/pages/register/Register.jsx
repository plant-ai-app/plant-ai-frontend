import { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useUser} from "../../../hooks/useUser.js"

import Container from "../../common/container/Container.jsx";
import RegisterForm from "../../forms/registerForm/RegisterForm.jsx";
import Message from "../../layouts/message/Message.jsx";
import Loading from "../../layouts/loading/Loading.jsx";
import styles from "./Register.module.css";

const Register = () => {
    
    const navigate = useNavigate();

    const {createUser, loading, error} = useUser();
    const [type, setType] = useState('');
    const [message, setMessage] = useState();
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmaSenha: ""
    });
    const clearForm = () =>{
        setFormData({nome: '',email: '', senha: '', confirmaSenha: ''})
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        setMessage('');
        setType('');
        try {
            const data = await createUser(formData);

            setType('success')
            setMessage(data.message);

            clearForm();

            navigate('/login');
        } catch (error) {
            console.log(error)
            setType('error')
            setMessage(error.response?.data?.message || "Erro ao cadastrar");
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
        <Container padding={'16% 1.2rem 2.2rem 1.2rem'}>
            <Message type={type} msg={message} />
            {loading && <Loading />}
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
