import NotesSection from '../sections/NotesSection';
import IdentifySection from '../sections/IdentifySection';
import HistorySection from '../sections/HistorySection';
import styles from './OverviewTab.module.css';

const OverviewTab = ({ plant, history }) => {
    return (
        <div className={styles.tabContent}>
            <NotesSection plant={plant} />
            <IdentifySection />
            <HistorySection history={history} plantId={plant.id} />
        </div>
    );
};

export default OverviewTab;
