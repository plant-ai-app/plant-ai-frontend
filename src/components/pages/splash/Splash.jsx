import logo from "./logo.png"
import Container from "../../common/container/Container";
import styles from "./Splash.module.css";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const Splash = () => {

    const navigate = useNavigate();
    
    const { token } = useContext(AuthContext);
    
    useEffect(() => {
        setTimeout(() => {
            if (token) {
                navigate('/home');
            } else {
                navigate('/onBoarding');
            }
        }, 2000);
    }, [token, navigate]);

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
