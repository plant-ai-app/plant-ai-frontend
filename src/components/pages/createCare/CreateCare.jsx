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
//hooks
import { usePlant } from '../../../hooks/usePlant.js';
import { useCare } from '../../../hooks/useCare.js';

const CreateCare = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPlantById } = usePlant();
    const { createCare, loading: saving } = useCare();
    
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                if (id) {
                    const data = await getPlantById(id);
                    setPlant(data);
                }
            } catch (error) {
                console.error("Erro ao buscar planta", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlant();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (formData) => {
        try {
            await createCare(formData);
            navigate(-1); // Volta para a tela da planta ou agenda após salvar
        } catch (error) {
            console.error("Erro ao agendar cuidado:", error);
            alert("Não foi possível salvar o cuidado. Tente novamente.");
        }
    };

    return (
        <Container padding={'0'}>
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
