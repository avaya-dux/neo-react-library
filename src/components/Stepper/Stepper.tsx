export interface StepperProps {
  steps: string[];
  activeStep: number;
  setActiveStep: (step: number) => void;
}

export const Stepper = ({ steps, activeStep, setActiveStep }: StepperProps) => {
  return (
    <div>
      {steps.map((step, index) => (
        <button
          key={step}
          onClick={() => setActiveStep(index)}
          disabled={index > activeStep}
        >
          {step}
        </button>
      ))}
    </div>
  );
};
