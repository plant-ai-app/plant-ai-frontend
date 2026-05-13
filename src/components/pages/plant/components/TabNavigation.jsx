import styles from './TabNavigation.module.css';

const TabNavigation = ({ activeTab, setActiveTab }) => {
    return (
        <div className={styles.tabs}>
            <button 
                className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('overview')}
            >
                Visão geral
            </button>
            <button 
                className={`${styles.tab} ${activeTab === 'care' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('care')}
            >
                Cuidados
            </button>
            <button 
                className={`${styles.tab} ${activeTab === 'info' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('info')}
            >
                obter info.
            </button>
        </div>
    );
};

export default TabNavigation;
