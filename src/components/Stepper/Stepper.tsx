import clsx from "clsx";
import { useMemo } from "react";

export interface InnerStepperProps {
  activeStep: number;
  steps: Steps[];
}
export interface StepperProps extends InnerStepperProps {
  direction?: "horizontal" | "vertical";
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
  const classes = useMemo(() => {
    return {
      active:
        direction === "horizontal"
          ? "neo-stepper__item--active"
          : "neo-stepper__item--active-vertical",
      complete:
        direction === "horizontal"
          ? "neo-stepper__item--complete"
          : "neo-stepper--vertical__item--complete",
      disabled:
        direction === "horizontal"
          ? "neo-stepper__item--disabled"
          : "neo-stepper--vertical__item--disabled",
      disabledNext:
        direction === "horizontal"
          ? "neo-stepper__item--disabled-next"
          : "neo-stepper--vertical__item--disabled-next",
    };
  }, [direction]);

  return (
    <div
      className={clsx(
        direction === "vertical" ? "neo-stepper--vertical" : "neo-stepper",
      )}
    >
      {type === "linear" ? (
        <LinearStepper
          steps={steps}
          activeStep={activeStep}
          classes={classes}
        />
      ) : (
        <EditableStepper
          steps={steps}
          activeStep={activeStep}
          classes={classes}
        />
      )}
    </div>
  );
};

interface StepperClassNames {
  classes: {
    active: string;
    complete: string;
    disabled: string;
    disabledNext: string;
  };
}

const LinearStepper = ({
  activeStep,
  classes,
  steps,
}: StepperProps & StepperClassNames) => {
  return (
    <>
      {steps.map((step, index) => (
        <span
          key={`${step.title}-${index}`}
          className={clsx(
            "neo-stepper__item",
            index < activeStep && classes.complete,
            index === activeStep && classes.active,
            index > activeStep && classes.disabled,
            index > activeStep && classes.disabledNext,
          )}
        >
          <p>{step.title}</p>
          {step.description && <p>{step.description}</p>}
        </span>
      ))}
    </>
  );
};

const EditableStepper = ({
  activeStep,
  classes,
  steps,
}: StepperProps & StepperClassNames) => {
  return (
    <>
      {steps.map((step, index) => (
        <div
          key={`${step.title}-${index}`}
          role="button"
          tabIndex={0}
          className={clsx(
            "neo-stepper__item",
            index < activeStep && classes.complete,
            index === activeStep && classes.active,
            index > activeStep && classes.disabled,
            index > activeStep && classes.disabledNext,
          )}
          // onClick={() => onStepClick(index)} // TODO: implement
        >
          <p>{step.title}</p>
          {step.description && <p>{step.description}</p>}
        </div>
      ))}
    </>
  );
};
