import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './BackButton.module.css';

const BackButton = ({ onClick, width, height, borderRadius, backgroundColor, color }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(-1);
        }
    };

    return (
        <button className={styles.backButton}
            style={{
                width: width,
                height: height,
                borderRadius: borderRadius,
                backgroundColor: backgroundColor,
                color: color
            }}
            onClick={handleGoBack} aria-label="Voltar">
            <ArrowLeft className={styles.icon} />
        </button>
    );
};

export default BackButton;
