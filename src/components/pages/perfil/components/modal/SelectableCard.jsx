import styles from './SelectableCard.module.css';

const SelectableCard = ({
    id,
    image,
    title,
    subtitle,
    isSelected,
    onToggleSelect,
    actionButton,
    iconBadge
}) => {
    return (
        <div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
            <div className={styles.checkboxWrapper} onClick={() => onToggleSelect(id)}>
                <input 
                    type="checkbox" 
                    checked={isSelected} 
                    onChange={() => onToggleSelect(id)} 
                    className={styles.checkbox}
                />
                <span className={styles.customCheckbox}></span>
            </div>
            
            <div className={styles.contentWrapper} onClick={() => onToggleSelect(id)}>
                <div className={styles.imageContainer}>
                    {image ? (
                        <img src={image} alt={title} className={styles.image} />
                    ) : (
                        <div className={styles.imagePlaceholder}></div>
                    )}
                    {iconBadge && (
                        <div className={styles.iconBadge} style={{ backgroundColor: iconBadge.bgColor }}>
                            <span style={{ color: iconBadge.color }}>{iconBadge.icon}</span>
                        </div>
                    )}
                </div>

                <div className={styles.info}>
                    <h4 className={styles.title}>{title}</h4>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
            </div>

            {actionButton && (
                <div className={styles.actionWrapper}>
                    {actionButton}
                </div>
            )}
        </div>
    );
};

export default SelectableCard;
