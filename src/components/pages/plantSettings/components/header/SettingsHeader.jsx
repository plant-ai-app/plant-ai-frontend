import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import styles from './SettingsHeader.module.css';
import BackButton from '../../../../common/backButton/BackButton.jsx';

const SettingsHeader = ({ plantId }) => {
    return (
        <header className={styles.header}>
            <BackButton
                backgroundColor={'transparent'}
             />
            <h1 className={styles.title}>Configurações</h1>
            <button 
                type="button" 
                className={styles.iconButton}
                onClick={() => {}}
            >
                <MoreVertical size={24} color="#478628" />
            </button>
        </header>
    );
};

export default SettingsHeader;
