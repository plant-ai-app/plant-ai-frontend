import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/home/Home.jsx";
import Splash from "../components/pages/splash/Splash.jsx";
import OnBoarding from "../components/pages/onBoarding/OnBoarding.jsx";
import Login from "../components/pages/login/Login.jsx";
import Register from "../components/pages/register/Register.jsx";
import ForgotPassword from "../components/pages/forgotPassword/ForgotPassword.jsx";
import EmailSent from "../components/pages/emailSent/EmailSent.jsx";
import ResetPassword from "../components/pages/resetPassword/ResetPassword.jsx";
import MyPlants from "../components/pages/myPlants/MyPlants.jsx";
import Perfil from "../components/pages/perfil/Perfil.jsx";
import Schedule from "../components/pages/schedule/Schedule.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Splash/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/onBoarding" element={<OnBoarding/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/email-sent" element={<EmailSent/>} />
                <Route path="/reset-password" element={<ResetPassword/>} />
                <Route path="/my-plants" element={<MyPlants/>} />
                <Route path="/perfil" element={<Perfil/>} />
                <Route path="/schedule" element={<Schedule/>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
