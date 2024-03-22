import clsx from "clsx";

export interface StepperProps {
  activeStep: number;
  direction?: "horizontal" | "vertical";
  steps: Steps[];
  type?: "linear" | "editable";
}
export interface Steps {
  description?: string;
  title: string;
}

export const Stepper = ({
  steps,
  activeStep,
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
        <EditableStepper steps={steps} activeStep={activeStep} />
      )}
    </div>
  );
};

const LinearStepper = ({ steps, activeStep }: StepperProps) => {
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
          <p>{step.title}</p>
          {step.description && <p>{step.description}</p>}
        </span>
      ))}
    </>
  );
};

const EditableStepper = ({ steps, activeStep }: StepperProps) => {
  return (
    <>
      {steps.map((step, index) => (
        <div
          key={`${step.title}-${index}`}
          role="button"
          tabIndex={0}
          className={clsx(
            "neo-stepper__item",
            index < activeStep && "neo-stepper__item--complete",
            index === activeStep && "neo-stepper__item--active",
            index > activeStep && "neo-stepper__item--disabled",
          )}
          // onClick={() => setActiveStep(index)} // TODO: implement
        >
          <p>{step.title}</p>
          {step.description && <p>{step.description}</p>}
        </div>
      ))}
    </>
  );
};
