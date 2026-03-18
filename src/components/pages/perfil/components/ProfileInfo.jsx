import React, { useState, useContext, useEffect } from 'react';
import styles from './ProfileInfo.module.css';
import { BsCameraFill, BsPencil } from 'react-icons/bs';
import EditProfileSheet from '../editProfileModal/EditProfileSheet.jsx';

//hooks
import { useUser } from '../../../../hooks/useUser.js';

//context
import { AuthContext } from '../../../../contexts/AuthContext.jsx';

const ProfileInfo = () => {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);


    const { user } = useContext(AuthContext);
    

    const formattedName = user?.nome ? user.nome.split(' ').slice(0, 2).join(' ') : '';

    return (
        <div className={styles.infoContainer}>
            <div className={styles.avatarWrapper}>
                <div className={styles.avatarBorder}>
                    <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=f0d9b5" 
                        alt="Alex Rivers" 
                        className={styles.avatarImage} 
                    />
                </div>
                <button onClick={() => alert("Change photo")} className={styles.cameraButton} aria-label="Change photo">
                    <BsCameraFill />
                </button>
            </div>
            
            <h1 className={styles.name}>{formattedName}</h1>
            <p className={styles.email}>{user && user.email}</p>
            
            <button onClick={() => setIsEditProfileOpen(true)} className={styles.editButton}>
                <BsPencil className={styles.editIcon} />
                Edit Profile
            </button>

            <EditProfileSheet 
                isOpen={isEditProfileOpen} 
                onClose={() => setIsEditProfileOpen(false)} 
                initialData={{ name: user && user.nome, email: user && user.email }}
            />
        </div>
    );
};

export default ProfileInfo;
