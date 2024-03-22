import clsx from "clsx";

import "./Stepper_shim.css";

export interface StepperProps {
  steps: Steps[];
  activeStep: number;
  setActiveStep: (step: number) => void;

  type?: "linear" | "editable";
  direction?: "horizontal" | "vertical";
}
// TODO: expand :pointup: to use either linear or editable stepper and not dupe types

export interface Steps {
  title: string;
  description?: string;
}

export interface LinnearStepperProps {
  steps: Steps[];
  activeStep: number;
}

export interface EditableStepperProps extends LinnearStepperProps {
  setActiveStep: (step: number) => void;
}

export const Stepper = ({
  steps,
  activeStep,
  setActiveStep,
  type = "linear",
  direction = "horizontal",
}: StepperProps) => {
  return (
    <div
      className={clsx(
        direction === "vertical" ? "neo-stepper--vertical" : "neo-stepper",
      )}
    >
      {type === "linear" ? (
        <LinearStepper steps={steps} activeStep={activeStep} />
      ) : (
        <EditableStepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
    </div>
  );
};

const LinearStepper = ({ steps, activeStep }: LinnearStepperProps) => {
  return (
    <>
      {steps.map((step, index) => (
        <span
          key={`${step.title}-${index}`}
          className={clsx(
            "neo-stepper__item",
            index < activeStep && "neo-stepper__item--complete",
            index === activeStep && "neo-stepper__item--active",
            index > activeStep && "neo-stepper__item--disabled",
          )}
        >
          <div>{step.title}</div>
          {step.description && (
            <div className="neo-stepper__item-description">
              {step.description}
            </div>
          )}
        </span>
      ))}
    </>
  );
};

// TODO: implement
const EditableStepper = ({
  steps,
  activeStep,
  setActiveStep,
}: EditableStepperProps) => {
  return (
    <>
      {steps.map((step, index) => (
        <span
          key={`${step.title}-${index}`}
          className={clsx(
            "neo-stepper__item",
            index < activeStep && "neo-stepper__item--complete",
            index === activeStep && "neo-stepper__item--active",
            index > activeStep && "neo-stepper__item--disabled",
          )}
          onClick={() => setActiveStep(index)}
        >
          <div>{step.title}</div>
          {step.description && <div>{step.description}</div>}
        </span>
      ))}
    </>
  );
};
