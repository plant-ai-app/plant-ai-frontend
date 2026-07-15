import { useState, useEffect } from 'react';
import styles from './Loader.module.css';
import iaLoader from '../imgs/IA_loader.svg';

const messages = [
    'Conectando ao assistente botânico de IA...',
    'Analisando características morfológicas...',
    'Cruzando dados com catálogos botânicos...',
    'Identificando padrões de rega ideal...',
    'Calculando necessidades de luz solar...',
    'Verificando alertas de toxicidade para pets...',
    'Compilando guia completo de cuidados...',
];

const Loader = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Cycle messages every 900ms
    useEffect(() => {
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 900);
        return () => clearInterval(messageInterval);
    }, []);

    // Progress bar animation from 0 to 100% over 3 seconds
    useEffect(() => {
        const startTime = Date.now();
        const duration = 3000;

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (elapsed >= duration) {
                clearInterval(progressInterval);
            }
        }, 30);

        return () => clearInterval(progressInterval);
    }, []);

    return (
        <div className={styles.loaderScreen}>
            {/* Soft background ambient glowing effects */}
            <div className={styles.ambientGlows}>
                <div className={`${styles.glowBall} ${styles.glowPink}`}></div>
                <div className={`${styles.glowBall} ${styles.glowBlue}`}></div>
                <div className={`${styles.glowBall} ${styles.glowPurple}`}></div>
            </div>

            <div className={styles.glassContainer}>

                {/* Layered SVG loader images for depth and premium feel */}
                <div className={styles.loaderVisualWrapper}>
                    {/* Pulsing blurred background glow */}
                    <div className={`${styles.svgContainer} ${styles.svgBgGlow}`}>
                        <img src={iaLoader} alt="Glow" className={styles.loaderImg} />
                    </div>

                    {/* Counter-rotating middle layer */}
                    <div className={`${styles.svgContainer} ${styles.svgCounterRotate}`}>
                        <img src={iaLoader} alt="Middle" className={styles.loaderImg} />
                    </div>

                    {/* Main foreground rotating loader */}
                    <div className={`${styles.svgContainer} ${styles.svgForeground}`}>
                        <img src={iaLoader} alt="Main" className={styles.loaderImg} />
                    </div>
                </div>

                <div className={styles.textWrapper}>
                    <h3 className={styles.title}>IA Plant-AI</h3>
                    
                    {/* Animated changing messages */}
                    <div className={styles.messageBox}>
                        <p className={styles.message} key={messageIndex}>
                            {messages[messageIndex]}
                        </p>
                    </div>
                </div>

                {/* Progress bar representing load status */}
                <div className={styles.progressBarBg}>
                    <div 
                        className={styles.progressBarFill} 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
