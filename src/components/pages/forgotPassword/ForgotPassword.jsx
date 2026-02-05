import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../common/container/Container.jsx";   
import ForgotPwdForm from "../../forms/forgotPwdForm/ForgotPwdForm.jsx";
import BackButton from "../../common/backButton/BackButton.jsx";
import img from "./forgot_pwd.svg";

import styles from './ForgotPassword.module.css';


const ForgotPassword = () => {
    
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log(formData);
    };

    useEffect(() =>{
        console.log(formData)
    }, [formData])
 

    return(
        <Container padding={'8% 1.2rem 1.2rem 1.2rem'} >
            <div className={styles.forgot_container}>
                <BackButton />
                <div className={styles.img}>
                    <img src={img} alt="" />
                </div>
                <div className={styles.under_img_container}>
                    <div className={styles.texts}>
                    <h1>Esqueceu sua <br/>Senha?</h1>
                    <p>
                        Não se preocupe! Isso acontece. <br/>
                        Insira o seu endereço de email para o qual enviaremos uma mensagem.
                    </p>
                </div>
                <ForgotPwdForm
                    value={formData}
                    handleChange={handleChange}
                    onSubmit={handleSubmit}
                 />
                </div>
            </div>
        </Container>
    )
}

export default ForgotPassword;
