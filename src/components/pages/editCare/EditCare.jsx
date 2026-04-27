import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditCare.module.css';
import CareForm from '../../care/CareForm.jsx';
import Container from '../../common/container/Container.jsx';
import { BsArrowLeft, BsThreeDotsVertical } from 'react-icons/bs';
import { usePlant } from '../../../hooks/usePlant';
import { useCare } from '../../../hooks/useCare';

const EditCare = () => {
    const { id, careId } = useParams();
    const navigate = useNavigate();
    const { getPlantById } = usePlant();
    const { getCareById, updateCare, deleteCare, loading: saving } = useCare();
    
    const [plant, setPlant] = useState(null);
    const [care, setCare] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id && careId) {
                    const [plantData, careData] = await Promise.all([
                        getPlantById(id),
                        getCareById(careId)
                    ]);
                    setPlant(plantData);
                    setCare(careData);
                }
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, careId]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleToggleMenu = () => setShowMenu(!showMenu);

    const handleDelete = async () => {
        if(window.confirm("Certeza que deseja excluir este cuidado?")) {
            try {
                await deleteCare(careId);
                navigate(-1);
            } catch (error) {
                console.error("Erro ao deletar cuidado", error);
                alert("Não foi possível excluir o cuidado.");
            }
        }
    };

    const handleSubmit = async (formData) => {
        // Formata a data para ISO-8601 (ex: "2024-04-25T09:00:00.000Z")
        const payload = {
            ...formData,
            proxima_data: new Date(`${formData.proxima_data}T${formData.horario_preferencial}:00`).toISOString()
        };

        try {
            await updateCare(careId, payload);
            navigate(-1);
        } catch (error) {
            console.error("Erro ao atualizar cuidado:", error);
            alert(error.response?.data?.message || "Não foi possível salvar as alterações. Tente novamente.");
        }
    };

    return (
        // <div className={styles.pageContainer}>
        <Container padding="0">
            <header className={styles.header}>
                <button onClick={handleGoBack} className={styles.backButton} aria-label="Voltar">
                    <BsArrowLeft />
                </button>
                <h1 className={styles.title}>Editar Cuidado</h1>
                
                <div className={styles.optionsMenuContainer}>
                    <button onClick={handleToggleMenu} className={styles.moreButton} aria-label="Opções">
                        <BsThreeDotsVertical />
                    </button>
                    {showMenu && (
                        <>
                            <div className={styles.optionsBackdrop} onClick={handleToggleMenu} />
                            <div className={styles.optionsPopover}>
                                <button 
                                    className={`${styles.optionsMenuItem} ${styles.deleteItem}`} 
                                    onClick={() => { handleToggleMenu(); handleDelete(); }}
                                >
                                    Deletar Cuidado
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </header>

            <main className={styles.content}>
                {loading ? (
                    <div className={styles.loadingContainer}>Carregando dados da planta e do cuidado...</div>
                ) : (
                    care && (
                        <CareForm 
                            initialValues={care} 
                            plant={plant} 
                            onSubmit={handleSubmit} 
                            loading={saving} 
                            submitText="Salvar Edição" 
                        />
                    )
                )}
            </main>
        </Container>
    );
};

export default EditCare;
