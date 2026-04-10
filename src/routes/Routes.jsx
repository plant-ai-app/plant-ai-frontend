//react
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import {useContext} from "react";

//routes
import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

//context
import { AuthContext } from "../contexts/AuthContext.jsx";

//pages
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
import Scan from "../components/pages/scan/Scan.jsx";
import Plant from "../components/pages/plant/Plant.jsx";

//components
import BottomNav from "../components/layouts/bottomNav/BottomNav.jsx";

//componente para mostrar o bottomNav apenas nas rotas especificadas
const ShowBottomNav = () => {
    const routes = ['/home','/my-plants', '/schedule', '/perfil', '/plant'];
    const location = useLocation();
    const { token } = useContext(AuthContext);

    if(!token) return null;
    
    return routes.includes(location.pathname) ? <BottomNav /> : null;
}

const AppRoutes = () => {
    return (
        <Router>
            <ShowBottomNav/>
            <Routes>

                {/* 🌍 Rotas públicas */}
                
                <Route path="/" element={<Splash/>} />
                <Route path="/onBoarding" element={<OnBoarding/>} />

                <Route path="/login" element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                } />
                <Route path="/register" element={
                    <PublicRoute>
                        <Register/>
                    </PublicRoute>
                } />

                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/email-sent" element={<EmailSent/>} />
                <Route path="/reset-password" element={<ResetPassword/>} />


                {/* 🔒 Rotas privadas */}
                <Route path="/home" element={
                    <PrivateRoute>
                        <Home/>
                    </PrivateRoute>
                } />
                <Route path="/my-plants" element={
                    <PrivateRoute>
                        <MyPlants/>
                    </PrivateRoute>
                } />
                <Route path="/perfil" element={
                    <PrivateRoute>
                        <Perfil/>
                    </PrivateRoute>
                } />
                <Route path="/schedule" element={
                    <PrivateRoute>
                        <Schedule/>
                    </PrivateRoute>
                } />
                <Route path="/scan" element={
                    <PrivateRoute>
                        <Scan/>
                    </PrivateRoute>
                } />
                <Route path="/plant" element={
                    <PrivateRoute>
                        <Plant/>
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
