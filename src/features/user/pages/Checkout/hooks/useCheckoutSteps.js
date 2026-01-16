import { useState } from "react";

export const useCheckoutSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleNext = async (validateForm = null) => {
    if (activeStep === 0) {
      if (validateForm) {
        const isValid = await validateForm();
        if (isValid) {
          setActiveStep(1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        setActiveStep(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (activeStep === 1) {
      setActiveStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return {
    activeStep,
    paymentMethod,
    setPaymentMethod,
    handleNext,
    handleBack,
  };
};
