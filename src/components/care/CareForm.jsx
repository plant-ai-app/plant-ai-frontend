//react
import { useState, useEffect } from 'react';
//styles
import styles from './CareForm.module.css';
//icons
import { 
    BsSave, 
    BsDroplet, 
    BsLightningCharge, 
    BsScissors, 
    BsSun, 
    BsWind, 
    BsBug, 
    BsStars, 
    BsArrowRepeat 
} from 'react-icons/bs';
//components
import SelectedPlant from './components/SelectedPlant.jsx';
import CareTypeGrid from './components/CareTypeGrid.jsx';
import FrequencySelector from './components/FrequencySelector.jsx';
import DateTimeSelector from './components/DateTimeSelector.jsx';
import InstructionsInput from './components/InstructionsInput.jsx';
import StatusToggle from './components/StatusToggle';
import Loading from '../layouts/loading/Loading.jsx';
//hooks
import { useCareType } from '../../hooks/useCareType.js';

//função para obter o ícone correspondente ao tipo de cuidado
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

const CareForm = ({
    initialValues,
    plant,
    onSubmit,
    submitText = "Salvar",
    loading = false
}) => {

    const { getCareTypes } = useCareType();
    
    // States
    const [careTypes, setCareTypes] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(true);
    
    const [tipoId, setTipoId] = useState(initialValues?.tipo_id || null);
    const [frequenciaDias, setFrequenciaDias] = useState(initialValues?.frequencia_dias || 7);
    const [proximaData, setProximaData] = useState(() => {
        if (initialValues?.proxima_data) return initialValues.proxima_data.split('T')[0];
        return new Date().toISOString().split('T')[0]; // today
    });
    const [horarioPreferencial, setHorarioPreferencial] = useState(initialValues?.horario_preferencial || '09:00');
    const [instrucoes, setInstrucoes] = useState(initialValues?.quantidade_instrucao || '');
    const [isActive, setIsActive] = useState(initialValues?.ativo !== false);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const typesResponse = await getCareTypes();
                console.log(typesResponse);
                
                // The backend returns { message: '...', tipos: [...] }
                const typesArray = typesResponse.tipos || [];
                
                const mappedTypes = typesArray.map(t => {
                    const styleData = getIconForCareType(t.nome);
                    return {
                        ...t,
                        label: t.nome,
                        icon: styleData.icon,
                        color: styleData.color,
                        bgColor: styleData.bgColor
                    };
                });
                setCareTypes(mappedTypes);
                
                if (!initialValues?.tipo_id && mappedTypes.length > 0) {
                    setTipoId(mappedTypes[0].id);
                }
            } catch (error) {
                console.error("Erro ao carregar tipos de cuidado:", error);
            } finally {
                setLoadingTypes(false);
            }
        };
        fetchTypes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handlers
    const handleFreqDecrease = () => {
        if (frequenciaDias > 1) setFrequenciaDias(prev => prev - 1);
    };

    const handleFreqIncrease = () => {
        setFrequenciaDias(prev => prev + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = {
            tipo_id: tipoId,
            frequencia_dias: frequenciaDias,
            proxima_data: proximaData,
            horario_preferencial: horarioPreferencial,
            quantidade_instrucao: instrucoes,
            ativo: isActive
        };

        if (plant?.id) {
            formData.planta_id = plant.id;
        } else if (plant?._id) {
            formData.planta_id = plant._id;
        }

        onSubmit(formData);
    };

    if (loadingTypes) {
        return <div className={styles.loadingContainer}>Carregando tipos de cuidado...</div>;
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <SelectedPlant plant={plant} />

            <CareTypeGrid
                types={careTypes}
                selectedTypeId={tipoId}
                onSelect={setTipoId}
            />

            <FrequencySelector
                frequency={frequenciaDias}
                onIncrease={handleFreqIncrease}
                onDecrease={handleFreqDecrease}
            />

            <DateTimeSelector
                date={proximaData}
                time={horarioPreferencial}
                onDateChange={setProximaData}
                onTimeChange={setHorarioPreferencial}
            />

            <InstructionsInput
                value={instrucoes}
                onChange={setInstrucoes}
            />

            {initialValues && (
                <StatusToggle
                    isActive={isActive}
                    onToggle={setIsActive}
                />
            )}

            <div className={styles.submitButtonContainer}>
                {loading ? (
                    <Loading />
                ) : (
                    <button
                        disabled={!tipoId || loading}
                        type="submit"
                        className={styles.submitBtn}
                    >
                        <BsSave />
                        {submitText}
                    </button>
                )}
            </div>
        </form>
    );
};

export default CareForm;
