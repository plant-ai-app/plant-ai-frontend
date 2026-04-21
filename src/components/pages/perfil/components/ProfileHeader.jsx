//styles and icons
import styles from './ProfileHeader.module.css';
import { BsGearFill } from 'react-icons/bs';
//hooks
import { useNavigate } from 'react-router-dom';
//components
import BackButton from '../../../common/backButton/BackButton.jsx';

const ProfileHeader = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.headerContainer}>
            <BackButton 
                width="40px"
                height="40px"
                borderRadius="50%"
                backgroundColor="transparent"
                color="#1a1a1a"
                onClick={()=> navigate(-1)}
            />
            <h2 className={styles.title}>Perfil</h2>
            <button onClick={() => alert('Settings')} className={styles.iconButton} aria-label="Settings">
                <BsGearFill />
            </button>
        </div>
    );
};

export default ProfileHeader;
