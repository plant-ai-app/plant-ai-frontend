import BulkActionModal from './BulkActionModal';
import SelectableCard from './SelectableCard';

const formatImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:3000';
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

const PlantsBulkModal = ({ isOpen, onClose, plants, isDeleting, onBulkDelete }) => {
    const formattedItems = plants.map(p => ({
        id: p.id,
        name: p.apelido || p.nome_popular,
        location: p.local?.nome || 'Sem localização',
        image: formatImageUrl(p.foto_url || p.imagem || p.foto)
    }));

    return (
        <BulkActionModal
            isOpen={isOpen}
            onClose={onClose}
            title="Suas Plantas"
            showSearch={true}
            searchPlaceholder="Buscar planta por nome..."
            items={formattedItems}
            onConfirmBulk={onBulkDelete}
            confirmText="Deletar Plantas"
            loadingText="Deletando..."
            isLoading={isDeleting}
            renderItem={({ item, isSelected, onToggleSelect }) => (
                <SelectableCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    title={item.name}
                    subtitle={item.location}
                    isSelected={isSelected}
                    onToggleSelect={onToggleSelect}
                />
            )}
        />
    );
};

export default PlantsBulkModal;
