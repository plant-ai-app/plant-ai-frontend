import React, { useState, useEffect } from 'react';
// styles
import styles from './SavePlantForm.module.css';
// icons
import {
    FiCheck,
    FiMoon,
    FiTv,
    FiCoffee,
    FiDroplet,
    FiBriefcase,
    FiSun,
    FiSunrise,
    FiMap,
    FiMinus
} from 'react-icons/fi';
import { useLocal } from '../../../../../hooks/useLocal.js';

const VISUAL_STYLES = [
    { icon: FiMoon, bg: '#E0F2FE', color: '#0EA5E9' },
    { icon: FiTv, bg: '#FFEDD5', color: '#F97316' },
    { icon: FiCoffee, bg: '#FEE2E2', color: '#EF4444' },
    { icon: FiDroplet, bg: '#F0FDFA', color: '#14B8A6' },
    { icon: FiBriefcase, bg: '#F3E8FF', color: '#A855F7' },
    { icon: FiSun, bg: '#F0FDF4', color: '#22C55E' },
    { icon: FiSunrise, bg: '#FEF9C3', color: '#EAB308' },
    { icon: FiMap, bg: '#ECFCCB', color: '#84CC16' },
    { icon: FiMinus, bg: '#F3F4F6', color: '#6B7280' },
    { icon: FiCheck, bg: '#F3F4F6', color: '#478628' }
];

const SavePlantForm = ({ plant, imageSrc, onSave, isSaving }) => {
    const { getLocal } = useLocal();

    const [locais, setLocais] = useState([]);

    useEffect(() => {
        const fetchLocais = async () => {
            try {
                const response = await getLocal();
                // Ensure we are setting the array from the response object
                const locaisData = Array.isArray(response) ? response : response.locais || [];
                setLocais(locaisData);
            } catch (error) {
                console.error('Erro ao buscar locais:', error);
            }
        };
        fetchLocais();
    }, []);

    const [formData, setFormData] = useState({
        apelido: '',
        nome_popular: plant.commonNames ? plant.commonNames.join(', ') : '',
        nome_cientifico: plant.scientificName || '',
        family: plant.family || '',
        observacao: '',
        fk_local_id: '', // Added this
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            foto_url: plant.images && plant.images.length > 0 ? plant.images[0].url : '',
            score: plant.score
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.imagePreview}>
                {imageSrc ? (
                    <img src={imageSrc} alt={plant.scientificName || "Minha Foto"} />
                ) : plant.images && plant.images.length > 0 ? (
                    <img src={plant.images[0].url} alt={plant.scientificName} />
                ) : (
                    <div className={styles.placeholderImg}>Sem Imagem</div>
                )}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="apelido">Apelido (Opcional)</label>
                <input
                    type="text"
                    id="apelido"
                    name="apelido"
                    value={formData.apelido}
                    onChange={handleChange}
                    placeholder="Dê um apelido para sua planta"
                />
            </div>

            <div className={styles.locationsSection}>
                <label>Em qual local ela está?</label>
                <div className={styles.locationsGrid}>
                    {locais.map((local, index) => {
                        const styleConfig = VISUAL_STYLES[index % VISUAL_STYLES.length];
                        const Icon = styleConfig.icon;
                        const isActive = formData.fk_local_id === local.id;

                        return (
                            <div
                                key={local.id}
                                className={`${styles.locationCard} ${isActive ? styles.activeCard : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, fk_local_id: local.id }))}
                            >
                                <div
                                    className={styles.iconWrapper}
                                    style={{ backgroundColor: styleConfig.bg, color: styleConfig.color }}
                                >
                                    <Icon />
                                </div>
                                <span className={styles.locationName}>{local.nome}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="nome_cientifico">Nome Científico</label>
                <input
                    type="text"
                    id="nome_cientifico"
                    name="nome_cientifico"
                    value={formData.nome_cientifico}
                    readOnly
                    className={styles.readOnlyInput}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="nome_popular">Nomes Comuns (separados por vírgula)</label>
                <input
                    type="text"
                    id="nome_popular"
                    name="nome_popular"
                    value={formData.nome_popular}
                    readOnly
                    className={styles.readOnlyInput}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="family">Família</label>
                <input
                    type="text"
                    id="family"
                    name="family"
                    value={formData.family}
                    readOnly
                    className={styles.readOnlyInput}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="observacao">Observações (Opcional)</label>
                <textarea
                    id="observacao"
                    name="observacao"
                    value={formData.observacao}
                    onChange={handleChange}
                    placeholder="Ex: Regar 2x na semana..."
                    rows="3"
                />
            </div>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isSaving}
            >
                {isSaving ? 'Salvando...' : 'Salvar'} 
            </button>
        </form>
    );
};

export default SavePlantForm;
