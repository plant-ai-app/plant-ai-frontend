import logo from "./logo.png"
import Container from "../../common/container/Container";
import styles from "./Splash.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        setTimeout(() => {
            navigate('/onBoarding');
        }, 2000);
    }, []);

    return (
        <Container
            padding={'0'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <img className={styles.logo} src={logo} alt="Logo" />
        </Container>
    );
};

export default Splash;
