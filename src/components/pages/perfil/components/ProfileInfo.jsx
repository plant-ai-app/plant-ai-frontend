//react
import React, { useState, useContext, useEffect } from 'react';

//styles
import styles from './ProfileInfo.module.css';
import { BsCameraFill, BsPencil } from 'react-icons/bs';
import img from '../img/default.png'

//components
import EditProfileSheet from '../editProfileModal/EditProfileSheet.jsx';
import AvatarSheet from '../avatarModal/AvatarSheet.jsx';

//hooks
import { useUser } from '../../../../hooks/useUser.js';

//context
import { AuthContext } from '../../../../contexts/AuthContext.jsx';

const ProfileInfo = () => {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isAvatarSheetOpen, setIsAvatarSheetOpen] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const { updateUser, getUser } = useUser();

    const [currentAvatarUrl, setCurrentAvatarUrl] = useState(null);

    //useEffect para carregar o usuário
    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getUser();
                const userData = data.data.usuario;

                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));

            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
            }
        };
        loadUser();
    }, []);

    //useEffect para carregar a foto de perfil
    useEffect(() => {
        if (user) {
            let url = null;
            if (user.foto_perfil_url) {
                url = user.foto_perfil_url;
            } else if (user.foto_perfil?.path_url) {
                const baseUrl = import.meta.env.VITE_API_URL 
                    ? import.meta.env.VITE_API_URL.replace('/api', '') 
                    : 'http://localhost:3000';
                    
                url = user.foto_perfil.path_url.startsWith('http') 
                    ? user.foto_perfil.path_url 
                    : `${baseUrl}/uploads/${user.foto_perfil.path_url}`;
            } else if (user.foto_perfil?.url) {
                url = user.foto_perfil.url;
            }
            
            setCurrentAvatarUrl(url);
        }
    }, [user]);

    const handleSaveAvatar = async (avatar) => {
        if (!avatar) return;

        try {
            const payload = {
                fk_foto_perfil: avatar.id
            };

            await updateUser(payload);

            setCurrentAvatarUrl(avatar.url);

            const updatedUserData = {
                ...user,
                fk_foto_perfil: avatar.id,
                foto_perfil_url: avatar.url
            };

            setUser(updatedUserData);
            localStorage.setItem("user", JSON.stringify(updatedUserData));

        } catch (error) {
            console.error("Erro ao atualizar a foto de perfil:", error);
        }
    };


    const formattedName = user?.nome ? user.nome.split(' ').slice(0, 2).join(' ') : '';

    return (
        <div className={styles.infoContainer}>
            <div className={styles.avatarWrapper}>
                <div className={styles.avatarBorder}>
                    <img 
                        src={currentAvatarUrl || img} 
                        alt="User Avatar" 
                        className={styles.avatarImage} 
                    />
                </div>
                <button onClick={() => setIsAvatarSheetOpen(true)} className={styles.cameraButton} aria-label="Change photo">
                    <BsCameraFill />
                </button>
            </div>
            
            <h1 className={styles.name}>{formattedName}</h1>
            <p className={styles.email}>{user && user.email}</p>
            
            <button onClick={() => setIsEditProfileOpen(true)} className={styles.editButton}>
                <BsPencil className={styles.editIcon} />
                Editar
            </button>

            <EditProfileSheet 
                isOpen={isEditProfileOpen} 
                onClose={() => setIsEditProfileOpen(false)} 
                initialData={{ name: user && user.nome, email: user && user.email }}
            />

            <AvatarSheet 
                isOpen={isAvatarSheetOpen} 
                onClose={() => setIsAvatarSheetOpen(false)}
                onSave={handleSaveAvatar}
                currentAvatarUrl={currentAvatarUrl}
            />
        </div>
    );
};

export default ProfileInfo;
