import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { FiX, FiImage } from 'react-icons/fi';
import styles from './Scan.module.css';
import Container from '../../common/container/Container.jsx';

const Scan = () => {
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        
        if (imageSrc) {
            setImageSrc(imageSrc);
            
            // Convert base64 to File object
            const arr = imageSrc.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            const file = new File([u8arr], "scanned_plant.jpg", { type: mime });
            
            // Add functionality to handle image upload/identification here
        }
    }, [webcamRef]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
            // Add functionality to handle image upload/identification here
        }
    };

    return (
        <Container padding='0'>
            {!imageSrc ? (
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className={styles.webcam}
                videoConstraints={{ facingMode: "environment" }}
            />
        ) : (
            <img 
                src={imageSrc} 
                alt="Preview" 
                className={styles.webcam}
            />
        )}
                    
            <div className={styles.overlay}>
                <button className={styles.closeButton} onClick={() => navigate(-1)} aria-label="Close">
                    <FiX />
                </button>

                <div className={styles.reticleContainer}>
                    {imageSrc && (
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
            </div>
        </Container>
    );
};

export default Scan;
