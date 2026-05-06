import { useNavigate } from 'react-router-dom';
import styles from './ProfileStats.module.css';

import { PiPlant } from 'react-icons/pi';
import { BsClockHistory, BsExclamationCircle } from 'react-icons/bs';

import { useProfileStats } from '../hooks/useProfileStats';

import PlantsBulkModal from './modal/PlantsBulkModal';
import CaresBulkModal from './modal/CaresBulkModal';
import ActionPopup from '../../../layouts/popup/ActionPopup';

const ProfileStats = () => {
    const navigate = useNavigate();
    
    const { 
        data: { plants, cares, historyCount, loadingStats },
        modals: { isPlantModalOpen, setIsPlantModalOpen, isCareModalOpen, setIsCareModalOpen, isDeleting, isConcluding, popupConfig },
        actions: { handlePlantCardClick, handleCareCardClick, handleBulkDeletePlants, handleBulkConcludeCares }
    } = useProfileStats();

    return (
        <>
            <div className={styles.statsContainer}>
                <div className={`${styles.statCard} ${styles.cardPlantas} ${styles.interactive}`} onClick={handlePlantCardClick}>
                    <div className={styles.iconWrapper}>
                        <PiPlant className={styles.statIcon} />
                    </div>
                    <span className={styles.statValue}>{loadingStats ? '-' : plants.length}</span>
                    <span className={styles.statLabel}>Plantas</span>
                </div>
                
                <div className={`${styles.statCard} ${styles.cardHistorico} ${styles.interactive}`} onClick={() => navigate('/history')}>
                    <div className={styles.iconWrapper}>
                        <BsClockHistory className={styles.statIcon} />
                    </div>
                    <span className={styles.statValue}>{loadingStats ? '-' : historyCount}</span>
                    <span className={styles.statLabel}>Histórico</span>
                </div>
                
                <div className={`${styles.statCard} ${styles.cardPendentes} ${styles.interactive}`} onClick={handleCareCardClick}>
                    <div className={styles.iconWrapper}>
                        <BsExclamationCircle className={styles.statIcon} />
                    </div>
                    <span className={styles.statValue}>{loadingStats ? '-' : cares.length}</span>
                    <span className={styles.statLabel}>Pendentes</span>
                </div>
            </div>

            <PlantsBulkModal 
                isOpen={isPlantModalOpen}
                onClose={() => setIsPlantModalOpen(false)}
                plants={plants}
                isDeleting={isDeleting}
                onBulkDelete={handleBulkDeletePlants}
            />

            <CaresBulkModal 
                isOpen={isCareModalOpen}
                onClose={() => setIsCareModalOpen(false)}
                cares={cares}
                isConcluding={isConcluding}
                onBulkConclude={handleBulkConcludeCares}
            />

            <ActionPopup {...popupConfig} />
        </>
    );
};

export default ProfileStats;
