import React, { useState } from 'react';
import styles from './SettingsList.module.css';
import { BsBellFill, BsClockFill, BsGlobe, BsPaletteFill, BsChevronRight } from 'react-icons/bs';

const SettingsList = () => {
    const [notificationsOn, setNotificationsOn] = useState(true);

    return (
        <div className={styles.sectionContainer}>
            <h3 className={styles.sectionHeader}>CONFIGURAÇÕES</h3>
            
            <div className={styles.listContainer}>
                {/* Notifications Item */}
                <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={styles.iconWrapper}>
                            <BsBellFill className={styles.itemIcon} />
                        </div>
                        <span className={styles.itemTitle}>Notificações</span>
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
                {/* <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={styles.iconWrapper}>
                            <BsClockFill className={styles.itemIcon} />
                        </div>
                        <span className={styles.itemTitle}>Horário de Lembrete</span>
                    </div>
                    <div className={styles.itemRight}>
                        <span className={styles.itemValue}>9:00 AM</span>
                        <BsChevronRight className={styles.chevronIcon} />
                    </div>
                </div> */}

                {/* Language Item */}
                <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={styles.iconWrapper}>
                            <BsGlobe className={styles.itemIcon} />
                        </div>
                        <span className={styles.itemTitle}>Idioma</span>
                    </div>
                    <div className={styles.itemRight}>
                        <span className={styles.itemValue}>Português</span>
                        <BsChevronRight className={styles.chevronIcon} />
                    </div>
                </div>

                {/* Theme Item */}
                {/* <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={styles.iconWrapper}>
                            <BsPaletteFill className={styles.itemIcon} />
                        </div>
                        <span className={styles.itemTitle}>Tema</span>
                    </div>
                    <div className={styles.itemRight}>
                        <span className={styles.itemValue}>Claro</span>
                        <BsChevronRight className={styles.chevronIcon} />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default SettingsList;
