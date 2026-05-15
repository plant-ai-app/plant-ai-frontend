//react
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//styles
import styles from './CreateCare.module.css';
import { BsArrowLeft } from 'react-icons/bs';
//components
import Container from '../../common/container/Container.jsx'
import CareForm from '../../care/CareForm.jsx';
import BackButton from '../../common/backButton/BackButton.jsx';
import Message from '../../layouts/message/Message.jsx';
import Loading from '../../layouts/loading/Loading.jsx';
//hooks
import { usePlant } from '../../../hooks/usePlant.js';
import { useCare } from '../../../hooks/useCare.js';

const CreateCare = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPlantById } = usePlant();
    const { createCare, getCaresByPlantId, loading: saving } = useCare();
    
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const [plantData, caresData] = await Promise.all([
                        getPlantById(id),
                        getCaresByPlantId(id).catch(() => ({ cuidados: [] }))
                    ]);

                    const plantWithCares = {
                        ...plantData,
                        cuidados: caresData?.cuidados || (Array.isArray(caresData) ? caresData : [])
                    };

                    setPlant(plantWithCares);
                }
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (formData) => {
        setMessage('');
        setMessageType('');

        // Prepara o payload no formato esperado para a criação do cuidado
        const payload = {
            planta_id: formData.planta_id,
            tipo_id: formData.tipo_id,
            frequencia_dias: formData.frequencia_dias,
            // Formata a data para ISO-8601 (ex: "2024-04-25T09:00:00.000Z")
            proxima_data: `${formData.proxima_data}T${formData.horario_preferencial}:00`,
            quantidade_instrucao: formData.quantidade_instrucao,
            horario_preferencial: formData.horario_preferencial
        };

        try {   
            const data = await createCare(payload);
            setMessage(data.message);
            setMessageType("success");
            setTimeout(() => {
                navigate(-1); // Volta para a tela da planta ou agenda após salvar
            }, 1000);
        } catch (error) {
            console.error("Erro ao agendar cuidado:", error);
            setMessage(error.response?.data?.message || "Não foi possível salvar o cuidado. Tente novamente.");
            setMessageType("error");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };

    return (
        <Container padding={'0'}>
            {saving && <Loading />}
            {message && <Message type={messageType} msg={message} />}

            <header className={styles.header}>
                <BackButton 
                    onClick={handleGoBack} 
                    width="40px"
                    height="40px"
                    borderRadius="50%"
                    backgroundColor="transparent"
                    color="#1a1a1a"
                />
                <h1 className={styles.title}>Agendar Cuidado</h1>
                <div className={styles.placeholderBtn}></div>
            </header>

            <main className={styles.content}>
                {loading ? (
                    <div className={styles.loadingContainer}>Carregando dados da planta...</div>
                ) : (
                    <CareForm 
                        plant={plant} 
                        onSubmit={handleSubmit} 
                        loading={saving} 
                        submitText="Agendar Cuidado" 
                    />
                )}
            </main>
        </Container>
    );
};

export default CreateCare;
