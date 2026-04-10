import React, { useRef, useCallback, useState } from 'react';
//biblioteca
import Webcam from 'react-webcam';
//hooks
import { useNavigate } from 'react-router-dom';
import { usePlantNet } from '../../../hooks/usePlantNet.js';
//estilos
import styles from './Scan.module.css';
import { FiX, FiImage } from 'react-icons/fi';
//componentes
import Container from '../../common/container/Container.jsx';
import Message from '../../layouts/message/Message.jsx';
import Loading from '../../layouts/loading/Loading.jsx';
import CarouselModal from './components/carrouselModal/CarouselModal.jsx';
import BottomSheet from './components/bottomSheet/BottomSheet.jsx';
import SavePlantModal from './components/savePlantModal/SavePlantModal.jsx';
import { createPlant } from '../../../services/plant.service.js';

const Scan = () => {
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);
    
    // PlantNet Data
    const { plant, loading, identifyPlant } = usePlantNet();
    
    // Modal State
    const [selectedPlantForModal, setSelectedPlantForModal] = useState(null);
    const [plantToSave, setPlantToSave] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');


    const capture = useCallback(async () => {
        const capturedSrc = webcamRef.current?.getScreenshot();
        
        if (capturedSrc) {
            setImageSrc(capturedSrc);
            
            // Convert base64 to File object
            const arr = capturedSrc.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            const file = new File([u8arr], "scanned_plant.jpg", { type: mime });
            
            try {
                await identifyPlant(file);
            } catch (error) {
                console.error("Erro ao identificar planta:", error);
            }
        }
    }, [webcamRef, identifyPlant]);

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64data = reader.result;
                setImageSrc(base64data);
                
                try {
                    await identifyPlant(file);
                } catch (error) {
                    console.error("Erro ao identificar planta:", error);
                }
            };
        }
    };

    const confirmPlant = (confirmedPlant) => {
        setPlantToSave(confirmedPlant);
    };

    const handleSavePlant = async (plantData) => {
        setIsSaving(true);
        setMessage(''); // Limpa a mensagem anterior antes de tentar salvar
        try {
            const payload = {
                fk_local_id: plantData.fk_local_id || null,
                nome_popular: plantData.nome_popular,
                nome_cientifico: plantData.nome_cientifico,
                apelido: plantData.apelido,
                foto_url: imageSrc,
                observacao: plantData.observacao,
                data_aquisicao: new Date().toISOString()
            };

            await createPlant(payload);
            setPlantToSave(null); // Esconde o modal para visualização focar na mensagem
            setMessage('Planta salva com sucesso!');
            setType('success');
            
            // Aguarda a exibição da mensagem antes de ir para a Home
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (error) {
            console.error("Erro ao salvar planta:", error);
            setMessage(error.response?.data?.message || 'Falha ao salvar a planta. Tente novamente.');
            setType('error');
            setTimeout(() => setMessage(''), 3500);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Container padding='0'>
            {isSaving && <Loading />}
            <Message msg={message} type={type} />
            {!imageSrc ? (
                 <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      screenshotQuality={1}
                      videoConstraints={{
                          facingMode: "environment",
                          width: 1280,
                          height: {ideal: 800}
                      }}
                      className={styles.webcam}
                  />
            ) : (
                <img 
                    src={imageSrc} 
                    alt="Preview" 
                    style={!loading ? {height: '40dvh', width: '100%', objectFit: 'cover'} : {height: '100dvh', width: '100%', objectFit: 'cover'}}
                />
            )}
                        
            <div className={styles.overlay}>
                <button className={styles.closeButton} onClick={() => navigate(-1)} aria-label="Close">
                    <FiX />
                </button>

                {/*Animacao de scanner, ocultar se carregou as plantas */}
                {(!plant || plant.length === 0) && (
                    <div className={styles.reticleContainer}>
                        {imageSrc && loading && (
                            <>
                                <div className={styles.scannerGrid}></div>
                                <div className={styles.scannerLine}></div>
                            </>
                        )}
                        <div className={`${styles.corner} ${styles.topLeft}`}></div>
                        <div className={`${styles.corner} ${styles.topRight}`}></div>
                        <div className={`${styles.corner} ${styles.bottomLeft}`}></div>
                        <div className={`${styles.corner} ${styles.bottomRight}`}></div>
                    </div>
                )}

                <div className={styles.bottomControls}>
                    {!imageSrc && (
                        <>
                            <label className={styles.galleryButton} aria-label="Gallery">
                                <FiImage />
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className={styles.fileInput} 
                                    onChange={handleFileChange}
                                />
                            </label>
                            
                            <button className={styles.captureButtonWrapper} onClick={capture} aria-label="Capture">
                                <div className={styles.captureButton}></div>
                            </button>
                            
                            {/* Placeholder for symmetry */}
                            <div className={styles.placeholderButton}></div>
                        </>
                    )}
                </div>

                {/* Results Panel */}
                <BottomSheet
                    plant={plant}
                    loading={loading}
                    setSelectedPlantForModal={setSelectedPlantForModal}
                    confirmPlant={confirmPlant}
                />
            </div>

            {selectedPlantForModal && (
                <CarouselModal 
                    plant={selectedPlantForModal} 
                    onClose={() => setSelectedPlantForModal(null)} 
                />
            )}

            {plantToSave && (
                <SavePlantModal
                    plant={plantToSave}
                    imageSrc={imageSrc}
                    onClose={() => setPlantToSave(null)}
                    onSave={handleSavePlant}
                    isSaving={isSaving}
                />
            )}
        </Container>
    );
};

export default Scan;
