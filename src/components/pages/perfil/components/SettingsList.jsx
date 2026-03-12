import React, { useState } from 'react';
import styles from './SettingsList.module.css';
import { BsBellFill, BsClockFill, BsGlobe, BsPaletteFill, BsChevronRight } from 'react-icons/bs';

const SettingsList = () => {
    const [notificationsOn, setNotificationsOn] = useState(true);

    return (
        <div className={styles.sectionContainer}>
            <h3 className={styles.sectionHeader}>SETTINGS</h3>
            
            <div className={styles.listContainer}>
                {/* Notifications Item */}
                <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={styles.iconWrapper}>
                            <BsBellFill className={styles.itemIcon} />
                        </div>
                        <span className={styles.itemTitle}>Notifications</span>
                    </div>
                    <div className={styles.itemRight}>
                        <div 
                            className={`${styles.toggleSwitch} ${notificationsOn ? styles.toggleOn : ''}`}
                            onClick={() => setNotificationsOn(!notificationsOn)}
                        >
                            <div className={styles.toggleKnob}></div>
                        </div>
                    </div>
                </div>

                {/* Reminder Time Item */}
                <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={styles.iconWrapper}>
                            <BsClockFill className={styles.itemIcon} />
                        </div>
                        <span className={styles.itemTitle}>Reminder Time</span>
                    </div>
                    <div className={styles.itemRight}>
                        <span className={styles.itemValue}>9:00 AM</span>
                        <BsChevronRight className={styles.chevronIcon} />
                    </div>
                </div>

                {/* Language Item */}
                <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={styles.iconWrapper}>
                            <BsGlobe className={styles.itemIcon} />
                        </div>
                        <span className={styles.itemTitle}>Language</span>
                    </div>
                    <div className={styles.itemRight}>
                        <span className={styles.itemValue}>English</span>
                        <BsChevronRight className={styles.chevronIcon} />
                    </div>
                </div>

                {/* Theme Item */}
                <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={styles.iconWrapper}>
                            <BsPaletteFill className={styles.itemIcon} />
                        </div>
                        <span className={styles.itemTitle}>Theme</span>
                    </div>
                    <div className={styles.itemRight}>
                        <span className={styles.itemValue}>Light</span>
                        <BsChevronRight className={styles.chevronIcon} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsList;
