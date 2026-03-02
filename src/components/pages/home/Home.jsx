import styles from './Home.module.css';
import Header from './components/header/Header.jsx';
import DueToday from './components/doToday/DueToday.jsx';
import Upcoming from './components/upComing/Upcoming.jsx';
import MyPlantsList from './components/myPlantsList/MyPlantsList.jsx';
import BottomNav from '../../layouts/bottomNav/BottomNav.jsx';
import Container from '../../common/container/Container.jsx';

const Home = () => {
    return (
        <Container padding={'0'}>
            <div className={styles.scrollArea}>
                <Header />
                <DueToday />
                <Upcoming />
                <MyPlantsList />
            </div>
            <BottomNav />
        </Container>
    );
};

export default Home;