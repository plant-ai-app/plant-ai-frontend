import React, { useState, useEffect, useContext } from 'react';
import styles from './EditProfileSheet.module.css';
import EditProfileForm from '../editProfileForm/EditProfileForm.jsx';
import Message from '../../../layouts/message/Message.jsx';
import Loading from '../../../layouts/loading/Loading.jsx';
import { AuthContext } from '../../../../contexts/AuthContext.jsx';
import { useUser } from '../../../../hooks/useUser.js';

const EditProfileSheet = ({ isOpen, onClose, initialData }) => {
    const { updateUser, loading } = useUser();
    const { user, setUser } = useContext(AuthContext);

    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const [formData, setFormData] = useState({
        name: initialData?.name,
        email: initialData?.email,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                email: initialData.email
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        if(e && e.preventDefault) e.preventDefault();
        setMessage('');
        setType('');
        
        try {
            // Envia apenas o que deve ser atualizado para a API (usando "nome")
            const payload = {
                nome: formData.name,
                email: formData.email
            };

            console.log("Enviando para a API:", payload);

            const data = await updateUser(payload);
            console.log("Resposta da API:", data);
            
            // Atualiza o contexto local (e storage) fundindo os dados novos
            const updatedUserData = {
                ...user,
                nome: formData.name,
                email: formData.email
            };

            localStorage.setItem('user', JSON.stringify(updatedUserData));
            setUser(updatedUserData);

            setType('success');
            setMessage('Perfil atualizado com sucesso!');
            setTimeout(() => onClose(), 2000);

        } catch (error) {
            console.error(error);
            setType('error');
            setMessage(error.response?.data?.message || "Erro ao atualizar perfil");
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
                    <h2 className={styles.title}>Editar Perfil</h2>
                    <p className={styles.subtitle}>Mantenha suas informações de perfil atualizadas</p>
                </div>
                <EditProfileForm 
                    value={formData} 
                    handleChange={handleChange} 
                    onSubmit={handleSubmit} 
                    onClose={onClose} 
                />
            </div>
        </div>
    );
};

export default EditProfileSheet;
