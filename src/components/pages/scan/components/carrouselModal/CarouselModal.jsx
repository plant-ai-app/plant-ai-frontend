import React, { useState, useEffect } from 'react';
import { FiX, FiMoreVertical, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './CarouselModal.module.css';

const CarouselModal = ({ plant, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCredits, setShowCredits] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    if (!plant || !plant.images || plant.images.length === 0) return null;

    const images = plant.images;

    // Pré-carrega todas as imagens em cache assim que o modal abre
    useEffect(() => {
        if (images && images.length > 0) {
            images.forEach((img) => {
                if (img.url) {
                    const preloadImage = new Image();
                    preloadImage.src = img.url;
                }
            });
        }
    }, [images]);

    const handleNext = () => {
        setImageLoading(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setShowCredits(false);
    };

    const handlePrev = () => {
        setImageLoading(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setShowCredits(false);
    };

    const toggleCredits = () => {
        setShowCredits(!showCredits);
    };

    const currentImage = images[currentIndex];

    // Fecha o modal ao clicar fora do conteúdo
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <div className={styles.headerControls}>
                    <button className={styles.iconButton} onClick={onClose} aria-label="Close">
                        <FiX />
                    </button>
                    <button className={styles.iconButton} onClick={toggleCredits} aria-label="Credits">
                        <FiMoreVertical />
                    </button>
                    
                    {showCredits && (
                        <div className={styles.creditsPopover}>
                            <p><strong>Autor:</strong> {currentImage.author || "Desconhecido"}</p>
                            <p><strong>Licença:</strong> {currentImage.license || "-"}</p>
                            <p><strong>Citação:</strong> {currentImage.citation || "-"}</p>
                            {currentImage.url && (
                                <a href={currentImage.url} target="_blank" rel="noopener noreferrer">Acessar original</a>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.carouselContainer}>
                    {images.length > 1 && (
                        <button className={`${styles.navButton} ${styles.left}`} onClick={handlePrev} aria-label="Previous image">
                            <FiChevronLeft />
                        </button>
                    )}
                    
                    {imageLoading && (
                        <div className={styles.loaderContainer}>
                            <div className={styles.spinner}></div>
                        </div>
                    )}
                    
                    <img 
                        src={currentImage.url} 
                        alt={`${plant.name} image ${currentIndex + 1}`} 
                        className={`${styles.mainImage} ${imageLoading ? styles.hidden : styles.visible}`}
                        onLoad={() => setImageLoading(false)}
                    />
                    
                    {images.length > 1 && (
                        <button className={`${styles.navButton} ${styles.right}`} onClick={handleNext} aria-label="Next image">
                            <FiChevronRight />
                        </button>
                    )}
                </div>

                {images.length > 1 && (
                    <div className={styles.dotsContainer}>
                        {images.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`${styles.dot} ${idx === currentIndex ? styles.active : ''}`}
                                onClick={() => {
                                    if (idx !== currentIndex) {
                                        setImageLoading(true);
                                        setCurrentIndex(idx);
                                        setShowCredits(false);
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarouselModal;
