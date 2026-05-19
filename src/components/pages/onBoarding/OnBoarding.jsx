import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../common/container/Container";
import StepOne from "./steps/stepOne/StepOne.jsx";
import StepTwo from "./steps/stepTwo/StepTwo.jsx";
import StepThree from "./steps/stepThree/StepThree.jsx";
import StepFour from "./steps/stepFour/StepFour.jsx";

const pageVariants = {
    initial: {
        opacity: 0,
        x: 30,
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: -30,
    },
};

const pageTransition = {
    type: "tween",
    ease: [0.4, 0, 0.2, 1],
    duration: 0.25,
};


const OnBoarding = () => {
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(location.state?.step || 1);

    const handleNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <Container padding={'1% 1.2rem 0rem 1.2rem'}>
            <div style={{ overflow: "hidden", position: "relative", width: "100%", height: "100%" }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        style={{ width: "100%", height: "100%" }}
                    >
                        {currentStep === 1 && <StepOne onNext={handleNextStep} />}
                        {currentStep === 2 && <StepTwo onNext={handleNextStep} />}
                        {currentStep === 3 && <StepThree onNext={handleNextStep} />}
                        {currentStep === 4 && <StepFour onNext={handleNextStep} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </Container>
    );
};

export default OnBoarding;
