//react
import React, { useState, useEffect } from 'react';

//styles
import styles from './ChangePasswordSheet.module.css';

//hooks
import { useAuth } from '../../../../hooks/useAuth.js';

//components
import ChangePasswordForm from '../changePwdForm/changePwdForm.jsx';
import Message from '../../../layouts/message/Message.jsx'
import Loading from '../../../layouts/loading/Loading.jsx'

const ChangePasswordSheet = ({ isOpen, onClose }) => {

    const { changePassword, loading, error } = useAuth();
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const [formData, setFormData] = useState({
        senhaAtual: "",
        senhaNova: "",
    });
    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };
    const clearForm = () => {
        setFormData({ senhaAtual: '', senhaNova: '' })
    }
    const handleSubmit = async (e) => {
        if(e && e.preventDefault) e.preventDefault();
        setMessage('')
        setType('')
        try {
            console.log(formData);
            const data = await changePassword(formData);
            console.log(data);
            setType('success')
            setMessage(data.message || 'Senha alterada com sucesso!');
            setTimeout(() => onClose(), 2000)
            clearForm();
            console.log(data);

        } catch (error) {
            console.log(error)
            setType('error')
            setMessage(error.response?.data?.message || "Erro ao alterar senha");
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
    

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            {loading && <Loading />}
            {message && <Message msg={message} type={type} />}
            <div className={styles.sheet} onClick={e => e.stopPropagation()}>
                <div className={styles.dragIndicator}></div>

                <div className={styles.header}>
                    <h2 className={styles.title}>Alterar Senha</h2>
                    <p className={styles.subtitle}>Por favor, insira os dados da sua senha abaixo</p>
                </div>
                <ChangePasswordForm 
                    value={formData} 
                    handleChange={handleChange} 
                    onSubmit={handleSubmit} 
                    onClose={onClose} 
                />
            </div>
        </div>
    );
};

export default ChangePasswordSheet;
