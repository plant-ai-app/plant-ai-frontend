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
import CarouselModal from './components/carrouselModal/CarouselModal.jsx';
import BottomSheet from './components/bottomSheet/BottomSheet.jsx';

const Scan = () => {
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);
    
    // PlantNet Data
    const { plant, loading, identifyPlant } = usePlantNet();
    
    // Modal State
    const [selectedPlantForModal, setSelectedPlantForModal] = useState(null);


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
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
            
            try {
                await identifyPlant(file);
            } catch (error) {
                console.error("Erro ao identificar planta:", error);
            }
        }
    };

    const confirmPlant = (confirmedPlant) => {
        console.log("Planta confirmada:", confirmedPlant);
    };

    return (
        <Container padding='0'>
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
        </Container>
    );
};

export default Scan;
