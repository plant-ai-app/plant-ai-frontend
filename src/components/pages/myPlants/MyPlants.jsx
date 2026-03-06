//styles
import styles from "./MyPlants.module.css";

//components
import Container from "../../common/container/Container.jsx";
import BottomNav from "../../layouts/bottomNav/BottomNav.jsx";

const MyPlants = () => {
    return (
        <Container padding={'0'}>
            <h1>Minhas Plantas</h1>
            <BottomNav />
        </Container>
    );
};

export default MyPlants;