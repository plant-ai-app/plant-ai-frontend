//styles
import styles from "./Perfil.module.css";

//components
import Container from "../../common/container/Container.jsx";
import BottomNav from "../../layouts/bottomNav/BottomNav.jsx";

const Perfil = () => {
    return (
        <Container padding={'0'}>
            <h1>Perfil</h1>
            <BottomNav />
        </Container>
    );
};

export default Perfil;