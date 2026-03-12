import React from 'react';
import styles from './ProfileHeader.module.css';
import { BsArrowLeft, BsGearFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.headerContainer}>
            <button className={styles.iconButton} onClick={() => navigate(-1)} aria-label="Go back">
                <BsArrowLeft />
            </button>
            <h2 className={styles.title}>Profile</h2>
            <button onClick={() => alert('Settings')} className={styles.iconButton} aria-label="Settings">
                <BsGearFill />
            </button>
        </div>
    );
};

export default ProfileHeader;
