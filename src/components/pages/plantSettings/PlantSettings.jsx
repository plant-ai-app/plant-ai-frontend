import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// hooks
import { usePlantSettings } from './hooks/usePlantSettings';

// components
import SettingsHeader from './components/header/SettingsHeader.jsx';
import PlantProfile from './components/profile/PlantProfile.jsx';
import AboutPlant from './components/about/AboutPlant.jsx';
import CareSchedules from './components/cares/CareSchedules.jsx';
import EditModal from './components/modals/EditModal.jsx';
import LocationBottomSheet from './components/location/LocationBottomSheet.jsx';
import ActionPopup from '../../layouts/popup/ActionPopup.jsx';

// styles
import styles from './PlantSettings.module.css';

const PlantSettings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { plant, cares, loading, updatePlant, deletePlant } = usePlantSettings(id);

    // States for modals
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState('');

    if (loading) {
        return <div className={styles.loading}>Carregando configurações...</div>;
    }

    if (!plant) {
        return <div className={styles.error}>Planta não encontrada.</div>;
    }

    const openEditModal = (field, currentValue) => {
        setEditField(field);
        setEditValue(currentValue || '');
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async () => {
        const data = {};
        if (editField === 'nickname') data.apelido = editValue;
        if (editField === 'observation') data.descricao = editValue;

        await updatePlant(data);
        setIsEditModalOpen(false);
    };

    const handleUpdateLocation = async (localId, localNome) => {
        await updatePlant({ fk_local_id: localId });
        // The backend should return the updated plant with the new location name
        // or we might need to update the local state manually if it doesn't
    };

    const handleDeletePlant = async () => {
        try {
            await deletePlant(id);
            navigate('/home');
        } catch (error) {
            console.error("Erro ao deletar planta:", error);
            alert("Erro ao deletar planta. Tente novamente.");
        }
    };


    return (
        <div className={styles.container}>
            <SettingsHeader plantId={id} />

            <div className={styles.scrollArea}>
                <PlantProfile
                    plant={plant}
                    onEditImage={() => alert("Editar imagem (Em desenvolvimento)")}
                />

                <AboutPlant
                    plant={plant}
                    onEditNickname={() => openEditModal('nickname', plant.apelido)}
                    onEditLocation={() => setIsLocationSheetOpen(true)}
                    onEditObservation={() => openEditModal('observation', plant.observacao)}
                />

                <CareSchedules
                    cares={cares}
                    plantId={id}
                    plantPhoto={plant.foto_url}
                />

                <div className={styles.deleteSection}>
                    <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => setIsDeletePopupOpen(true)}
                    >
                        Excluir Planta
                    </button>
                </div>
            </div>

            {/* Nickname and Observation Modal */}
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveEdit}
                title={editField === 'nickname' ? 'Editar Apelido' : 'Editar Observações'}
                value={editValue}
                setValue={setEditValue}
                fieldType={editField === 'observation' ? 'textarea' : 'text'}
            />

            <ActionPopup
                isOpen={isDeletePopupOpen}
                onClose={() => setIsDeletePopupOpen(false)}
                onConfirm={handleDeletePlant}
                title="Excluir planta"
                description="Deseja excluir esta planta? Esta ação apagará permanentemente todos os dados e agendamentos"
                confirmText="Excluir"
                cancelText="Cancelar"
            />

            {/* Location Bottom Sheet */}
            <LocationBottomSheet
                isOpen={isLocationSheetOpen}
                onClose={() => setIsLocationSheetOpen(false)}
                onConfirm={handleUpdateLocation}
                currentLocalId={plant.fk_local_id}
            />
        </div>
    );
};

export default PlantSettings;