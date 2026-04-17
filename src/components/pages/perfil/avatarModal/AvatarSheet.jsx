import React, { useState, useEffect } from 'react';
import styles from './AvatarSheet.module.css';
import { useAvatar } from '../../../../hooks/useAvatar';
import { BsCheck } from 'react-icons/bs';
import Loading from '../../../layouts/loading/Loading';

const AvatarSheet = ({ isOpen, onClose, onSave, currentAvatarUrl }) => {
    const { getAvatar, loading, error } = useAvatar();
    const [avatars, setAvatars] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState(currentAvatarUrl || null);

    //busca os avatares quando o modal é aberto
    useEffect(() => {
        if (isOpen) {
            const fetchAvatars = async () => {
                try {
                    const response = await getAvatar();
                    if (response?.data?.images) {
                        setAvatars(response.data.images);
                    }
                } catch (err) {
                    console.error("Failed to load avatars", err);
                }
            };
            fetchAvatars();
        }
    }, [isOpen]);

    //seleciona o avatar atual quando o modal é aberto
    useEffect(() => {
        if (isOpen) {
            setSelectedUrl(currentAvatarUrl);
        }
    }, [isOpen, currentAvatarUrl]);

    if (!isOpen) return null;

    //salva o avatar
    const handleSave = () => {
        if (selectedUrl) {
            const selectedAvatar = avatars.find(a => a.url === selectedUrl);
            onSave(selectedAvatar);
        }
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.sheet} onClick={e => e.stopPropagation()}>
                <div className={styles.dragIndicator}></div>

                <div className={styles.header}>
                    <h2 className={styles.title}>Escolha seu avatar</h2>
                    <p className={styles.subtitle}>Selecione uma ilustração que combine com o seu jardim</p>
                </div>

                {loading ? (
                    <div className={styles.loadingContainer}>
                        <Loading inline={true} size="100px" />
                    </div>
                ) : (
                    <div className={styles.avatarGrid}>
                        {avatars.map((avatar) => (
                            <div 
                                key={avatar.id} 
                                className={`${styles.avatarItem} ${selectedUrl === avatar.url ? styles.selected : ''}`}
                                onClick={() => setSelectedUrl(avatar.url)}
                            >
                                <img src={avatar.url} alt={`Avatar ${avatar.id}`} className={styles.avatarImage} onClick={() =>{console.log(avatar)}} />
                                {selectedUrl === avatar.url && (
                                    <div className={styles.checkIconWrapper}>
                                        <BsCheck className={styles.checkIcon} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <button 
                    className={styles.saveButton} 
                    onClick={handleSave}
                    disabled={!selectedUrl || loading}
                >
                    Salvar avatar
                </button>
                <button className={styles.cancelButton} onClick={onClose}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default AvatarSheet;
