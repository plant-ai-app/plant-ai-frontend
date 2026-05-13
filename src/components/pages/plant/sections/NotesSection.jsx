import styles from './NotesSection.module.css';

const NotesSection = ({ plant }) => {
    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Anotação</h3>
            <div className={styles.noteCard}>
                <div className={styles.noteContent}>
                    {plant.observacao || 'Nenhuma observação adicionada.'}
                </div>
                <span className={styles.noteDate}>
                    Atualizado em: {new Date(plant.atualizado_em).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: '2-digit' })}
                </span>
            </div>
        </div>
    );
};

export default NotesSection;
