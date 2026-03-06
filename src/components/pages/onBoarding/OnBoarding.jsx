import { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../../common/container/Container";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";

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
            <div>
                {currentStep === 1 && <StepOne onNext={handleNextStep} />}
                {currentStep === 2 && <StepTwo onNext={handleNextStep} />}
                {currentStep === 3 && <StepThree onNext={handleNextStep} />}
                {currentStep === 4 && <StepFour onNext={handleNextStep} />}
            </div>
        </Container>

    );
};

export default OnBoarding;
