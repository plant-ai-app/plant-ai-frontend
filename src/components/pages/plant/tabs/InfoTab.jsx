import styles from './InfoTab.module.css';

const InfoTab = ({ plant }) => {
    return (
        <div className={styles.tabContent}>
            <div className={styles.placeholderCard}>
                <p>Informações adicionais em breve.</p>
            </div>
        </div>
    );
};

export default InfoTab;
