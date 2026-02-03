import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/home/Home.jsx";
import Splash from "../components/pages/splash/Splash.jsx";
import OnBoarding from "../components/pages/onBoarding/OnBoarding.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Splash/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/onBoarding" element={<OnBoarding/>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
