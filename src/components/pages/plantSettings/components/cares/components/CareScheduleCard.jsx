import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BsSun,
    BsLightningCharge,
    BsScissors,
    BsBug,
    BsStars,
    BsDroplet,
    BsArrowRepeat,
} from 'react-icons/bs';
import { useCare } from '../../../../../../hooks/useCare';
import styles from './CareScheduleCard.module.css';

const getIconForCareType = (name) => {
    switch (name) {
        case 'Exposição Solar': return { icon: <BsSun />, color: '#ffcc00', bgColor: '#ffffe6' };
        case 'Adubação': return { icon: <BsLightningCharge />, color: '#88cc00', bgColor: '#f2ffe6' };
        case 'Poda': return { icon: <BsScissors />, color: '#ff4d4d', bgColor: '#ffe6e6' };
        case 'Controle de Pragas': return { icon: <BsBug />, color: '#a64dff', bgColor: '#f2e6ff' };
        case 'Limpeza das Folhas': return { icon: <BsStars />, color: '#0088ff', bgColor: '#e6f4ff' };
        case 'Rega': return { icon: <BsDroplet />, color: '#00b386', bgColor: '#e6fff7' };
        case 'Troca de Vaso': return { icon: <BsArrowRepeat />, color: '#ff8800', bgColor: '#ffeee0' };
        default: return { icon: <BsSun />, color: '#808080', bgColor: '#f2f2f2' };
    }
};

const CareScheduleCard = ({ care, plantId, plantPhoto }) => {
    const navigate = useNavigate();
    const { updateCare } = useCare();

    const careTypeName = care.tipo?.nome || '';
    const config = getIconForCareType(careTypeName);
    const [isActive, setIsActive] = useState(
        care.ativo !== undefined ? care.ativo : true
    );

    const handleToggle = async (e) => {
        e.stopPropagation();
        const newValue = !isActive;
        setIsActive(newValue); // optimistic update
        try {
            await updateCare(care.id, { ativo: newValue });
        } catch {
            setIsActive(!newValue); // reverter em caso de erro
        }
    };

    const handleCardClick = () => {
        navigate(`/plant/${plantId}/care/edit/${care.id}`);
    };

    const nextDateStr = care.proxima_data
        ? new Date(care.proxima_data).toLocaleDateString('pt-BR')
        : 'Indefinido';

    return (
        <div
            className={`${styles.card} ${!isActive ? styles.inactive : ''}`}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
        >
            <div className={styles.imageSection}>
                <div className={styles.plantImageWrapper}>
                    <img
                        src={plantPhoto || '/placeholder-plant.jpg'}
                        alt="Plant"
                        className={styles.plantImage}
                    />
                    <div
                        className={styles.careBadge}
                        style={{ backgroundColor: config.bgColor, color: config.color }}
                    >
                        {config.icon}
                    </div>
                </div>
            </div>

            <div className={styles.contentSection}>
                <div className={styles.topRow}>
                    <h4 className={styles.careTitle}>{careTypeName}</h4>
                </div>

                <p className={styles.frequencyText}>
                    {care.frequencia_dias ? `A cada ${care.frequencia_dias} dias` : 'Frequência não definida'}
                    {care.horario_preferencial && <span className={styles.timeText}> • {care.horario_preferencial}</span>}
                </p>

                <p className={styles.nextDateText}>
                    Próximo: {nextDateStr}
                </p>
            </div>

            <div className={styles.rightSection}>
                <button
                    id={`toggle-care-${care.id}`}
                    className={`${styles.toggleBtn} ${isActive ? styles.toggleActive : styles.toggleInactive}`}
                    onClick={handleToggle}
                    aria-label={isActive ? 'Desativar cuidado' : 'Ativar cuidado'}
                    title={isActive ? 'Desativar' : 'Ativar'}
                >
                    <span className={styles.toggleKnob} />
                </button>
            </div>

        </div>
    );
};

export default CareScheduleCard;
