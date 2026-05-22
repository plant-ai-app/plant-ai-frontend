//react
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import styles from './DeleteModal.module.css';
//icons
import { BsExclamationTriangleFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
//components
import Loading from '../../../layouts/loading/Loading.jsx';
import Message from '../../../layouts/message/Message.jsx';
//hooks
import { useAuth } from '../../../../hooks/useAuth.js';
//contexts
import { AuthContext } from '../../../../contexts/AuthContext.jsx';

const DeleteModal = ({ isOpen, onClose }) => {

    const { deleteAccount, loading } = useAuth();
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ senha: '' });
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('')
        setType('')
        try {''
            const data = await deleteAccount(formData);
            setType('success')
            setMessage(data.message || 'Conta deletada com sucesso!');
            setTimeout(() => {onClose(); logout(); navigate('/login')}, 2000)
        } catch (error) {
            setType('error')
            setMessage(error.response?.data?.message || "Erro ao deletar conta");
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

    const handleBackdropClick = (e) => {
        if (e.target.className === styles.modalOverlay) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleBackdropClick}>
            {loading && <Loading />}
            {message && <Message msg={message} type={type} />}
            <div className={styles.modalContent}>
                <div className={styles.warningIconContainer}>
                    <BsExclamationTriangleFill className={styles.warningIcon} />
                </div>

                <h2 className={styles.modalTitle}>Deletar Conta</h2>
                <p className={styles.modalDescription}>
                    Ao deletar sua conta, todos os seus dados serão apagados permanentemente. Esta ação não pode ser desfeita.
                </p>

                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Digite sua senha</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            className={styles.passwordInput}
                            placeholder="........"
                            value={formData.senha || ''}
                            name="senha"
                            onChange={handleChange}
                        />
                        <button
                            className={styles.eyeButton}
                            onClick={() => { setShowPassword(!showPassword); }}
                            type="button"
                        >
                            {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                        </button>
                    </div>
                </div>


                <button className={styles.deleteButton} onClick={handleSubmit}>
                    Deletar Conta
                </button>

                <button className={styles.cancelButton} onClick={onClose}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default DeleteModal;
