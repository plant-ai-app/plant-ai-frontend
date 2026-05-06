import BulkActionModal from './BulkActionModal';
import SelectableCard from './SelectableCard';
import { getIconForCareType } from '../../../schedule/Schedule.jsx';
import styles from '../ProfileStats.module.css';

const formatImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:3000';
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

const CaresBulkModal = ({ isOpen, onClose, cares, isConcluding, onBulkConclude }) => {
    const formattedItems = cares.map(c => {
        const plant = c.planta || {};
        return {
            id: c.id,
            name: plant.apelido || plant.nome_popular || 'Planta',
            type: c.tipo?.nome || 'Outros',
            image: formatImageUrl(plant.foto_url || plant.imagem || plant.foto),
            care: c
        };
    });

    return (
        <BulkActionModal
            isOpen={isOpen}
            onClose={onClose}
            title="Tarefas Pendentes"
            showSearch={false}
            items={formattedItems}
            onConfirmBulk={onBulkConclude}
            confirmText="Concluir Tarefas"
            loadingText="Concluindo..."
            isLoading={isConcluding}
            renderItem={({ item, isSelected, onToggleSelect }) => {
                const styleData = getIconForCareType(item.type);
                return (
                    <SelectableCard
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        title={item.name}
                        subtitle={item.type}
                        isSelected={isSelected}
                        onToggleSelect={onToggleSelect}
                        iconBadge={{
                            icon: styleData.icon,
                            bgColor: styleData.bgColor,
                            color: styleData.color
                        }}
                    />
                );
            }}
        />
    );
};

export default CaresBulkModal;
