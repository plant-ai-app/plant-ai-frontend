import styles from './Home.module.css';
import Header from './components/header/Header.jsx';
import DueToday from './components/doToday/DueToday.jsx';
import Upcoming from './components/upComing/Upcoming.jsx';
import MyPlantsList from './components/myPlantsList/MyPlantsList.jsx';
import Container from '../../common/container/Container.jsx';
import { useHomeData } from './hooks/useHomeData.js';

const Home = () => {
    const { plants, dueTodayCares, upcomingCares, loading, error, refresh } = useHomeData();

    return (
        <Container padding={'0'}>
            <div className={styles.scrollArea}>
                <Header count={dueTodayCares.length} />
                {loading ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>Carregando dados...</div>
                ) : error ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: '#ff4d4d' }}>{error}</div>
                ) : (
                    <>
                        <DueToday tasks={dueTodayCares} onRefresh={refresh} />
                        <Upcoming tasks={upcomingCares} />
                        <MyPlantsList plants={plants} dueTodayCares={dueTodayCares} />
                    </>
                )}
            </div>
        </Container>
    );
};

export default Home;