import React from 'react';
import styles from './TabNavigation.module.css';

const TabNavigation = ({ activeTab, tabs, onTabClick }) => {
    return (
        <div className={styles.tabBar}>
            {tabs.map((tab) => (
                <button 
                    key={tab.id}
                    className={`${styles.tabItem} ${activeTab === tab.id ? styles.active : ''}`}
                    onClick={() => onTabClick(tab.id, tab.ref)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;
