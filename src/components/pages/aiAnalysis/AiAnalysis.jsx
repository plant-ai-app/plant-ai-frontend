//react
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//styles and icons
import { ArrowLeft } from 'lucide-react';
import styles from './AiAnalysis.module.css';

//components
import AiAnalysisHero from './components/AiAnalysisHero';
import BadgeRow from './components/BadgeRow';
import TabNavigation from './components/TabNavigation';
import OverviewSection from './sections/OverviewSection';
import CareSection from './sections/CareSection';
import AlertsSection from './sections/AlertsSection';
import CuriositiesSection from './sections/CuriositiesSection';

//hooks
import { useAiAnalysis } from './hooks/useAiAnalysis';


const AiAnalysis = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { scientificName, fotoUrl, plantName } = location.state || {};
    
    // Local hook encapsulates state management & fetching logic cleanly without loops
    const { data, loading, error } = useAiAnalysis(scientificName);
    
    const [activeTab, setActiveTab] = useState('overview');
    const containerRef = useRef(null);

    const overviewRef = useRef(null);
    const careRef = useRef(null);
    const alertsRef = useRef(null);
    const curiositiesRef = useRef(null);

    const tabs = [
        { id: 'overview', label: 'Overview', ref: overviewRef },
        { id: 'care', label: 'Care', ref: careRef },
        { id: 'alerts', label: 'Alerts', ref: alertsRef },
        { id: 'curiosities', label: 'Curiosities', ref: curiositiesRef },
    ];

    // Scrollspy logic to highlight tab on scroll
    useEffect(() => {
        if (loading || error || !data) return;

        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollPosition = container.scrollTop + 120; // offset for sticky header

            for (let i = tabs.length - 1; i >= 0; i--) {
                const section = tabs[i];
                if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
                    setActiveTab(section.id);
                    break;
                }
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [loading, error, data]);

    const handleTabClick = (tabId, ref) => {
        setActiveTab(tabId);
        if (ref.current && containerRef.current) {
            containerRef.current.scrollTo({
                top: ref.current.offsetTop - 80, // sticky offset
                behavior: 'smooth'
            });
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <p>Gerando análise da IA...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.topBar}>
                    <button className={styles.iconButton} onClick={() => navigate(-1)} aria-label="Voltar">
                        <ArrowLeft size={24} color="#1e293b" />
                    </button>
                </div>
                <p>{error || 'Nenhum dado retornado pela IA.'}</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={styles.container}>
            {/* Hero and Title Banner */}
            <AiAnalysisHero 
                fotoUrl={fotoUrl} 
                plantName={plantName} 
                scientificName={data.scientific_name || scientificName} 
                onBack={() => navigate(-1)} 
            />

            {/* Visual Badges Row */}
            <BadgeRow 
                difficulty={data.difficulty} 
                growth={data.growth} 
                toxicity={data.toxicity} 
            />

            {/* Scroll-Spy Tab Navigation */}
            <TabNavigation 
                activeTab={activeTab} 
                tabs={tabs} 
                onTabClick={handleTabClick} 
            />

            {/* Subcomponents for each view section */}
            <div className={styles.contentSection}>
                <OverviewSection ref={overviewRef} data={data} />
                <CareSection ref={careRef} data={data} />
                <AlertsSection ref={alertsRef} data={data} />
                <CuriositiesSection ref={curiositiesRef} data={data} />
            </div>

            {/* Disclaimer Footer */}
            <div className={styles.aiFooter}>
                <p className={styles.footerText}>
                    As informações botânicas exibidas acima são geradas automaticamente por Inteligência Artificial.
                </p>
                <p className={styles.footerText}>
                    A IA pode cometer erros. Sempre consulte profissionais ou referências botânicas especializadas antes de manusear ou permitir o contato de plantas potencialmente tóxicas com crianças ou animais de estimação.
                </p>
            </div>
        </div>
    );
};

export default AiAnalysis;
