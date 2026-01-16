import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Shipping Details", "Payment", "Review"];

function CheckoutStepper({ activeStep }) {
  return (
    <Stepper
      activeStep={activeStep}
      sx={{
        mb: 4,
        "& .MuiStepLabel-root": {
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
        },
      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default CheckoutStepper;

