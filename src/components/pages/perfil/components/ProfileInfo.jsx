import React from 'react';
import styles from './ProfileInfo.module.css';
import { BsCameraFill, BsPencil } from 'react-icons/bs';

const ProfileInfo = () => {
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
                <button className={styles.cameraButton} aria-label="Change photo">
                    <BsCameraFill />
                </button>
            </div>
            
            <h1 className={styles.name}>Alex Rivers</h1>
            <p className={styles.email}>alex.rivers@email.com</p>
            
            <button className={styles.editButton}>
                <BsPencil className={styles.editIcon} />
                Edit Profile
            </button>
        </div>
    );
};

export default ProfileInfo;
