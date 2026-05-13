import { useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import PlantHeader from './components/PlantHeader';
import PlantInfo from './components/PlantInfo';
import TabNavigation from './components/TabNavigation';

// tabs
import OverviewTab from './tabs/OverviewTab';
import CareTab from './tabs/CareTab';
import InfoTab from './tabs/InfoTab';

// styles
import styles from './Plant.module.css';

// hooks
import { usePlantPage } from './hooks/usePlantPage';

const Plant = () => {
    const { id } = useParams();
    const { plant, history, loading } = usePlantPage(id);
    const [activeTab, setActiveTab] = useState('overview');

    if (loading) return <div className={styles.loading}>Carregando...</div>;
    if (!plant) return <div className={styles.error}>Planta não encontrada.</div>;

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab plant={plant} history={history} />;
            case 'care':
                return <CareTab plant={plant} />;
            case 'info':
                return <InfoTab plant={plant} />;
            default:
                return <OverviewTab plant={plant} history={history} />;
        }
    };

    return (
        <div className={styles.container}>
            <PlantHeader plant={plant} plantId={id} />

            <div className={styles.contentCard}>
                <PlantInfo plant={plant} />
                
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                {renderActiveTab()}
            </div>
        </div>
    );
};

export default Plant;