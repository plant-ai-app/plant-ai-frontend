
//styles
import styles from "./Schedule.module.css";

//components
import Container from "../../common/container/Container.jsx";
import BottomNav from "../../layouts/bottomNav/BottomNav.jsx";

const Schedule = () => {
    return (
        <Container padding={'0'}>
            <h1>Schedule</h1>
            <BottomNav />
        </Container>
    );
};

export default Schedule;