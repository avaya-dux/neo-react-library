import clsx from "clsx";
import { useCallback, useMemo } from "react";

import { Keys } from "utils";

import "./Stepper.css";

export interface InnerStepperProps {
  activeStep: number;
  steps: Steps[];
  onStepClick?: (index: number) => void;
}
export interface StepperProps extends InnerStepperProps {
  direction?: "horizontal" | "vertical";
  type?: "linear" | "editable";
}
export interface Steps {
  description?: string;
  title: string;
}

/**
 * TODOs
 * fix vertical stepper
 * fix a11y when using the keyboard
 */

export const Stepper = ({
  steps,
  activeStep,
  type = "linear",
  direction = "horizontal",
  onStepClick,
}: StepperProps) => {
  const classes = useMemo(() => {
    return {
      item:
        direction === "horizontal"
          ? "neo-stepper__item"
          : "neo-stepper--vertical__item",
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
          onStepClick={onStepClick}
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
    item: string;
  };
}

const LinearStepper = ({
  activeStep,
  classes,
  steps,
}: InnerStepperProps & StepperClassNames) => {
  return (
    <>
      {steps.map((step, index) => (
        <span
          key={`${step.title}-${index}`}
          className={clsx(
            classes.item,
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
  onStepClick,
}: InnerStepperProps & StepperClassNames) => {
  const handleStepInteraction = useCallback(
    (index: number, currentStep: number) => {
      if (index < currentStep) {
        onStepClick?.(index);
      }
    },
    [onStepClick],
  );

  return (
    <>
      {steps.map((step, index) => (
        <div
          key={`${step.title}-${index}`}
          role="button"
          tabIndex={0}
          onClick={() => handleStepInteraction(index, activeStep)}
          onKeyUp={(e) =>
            e.key === Keys.ENTER && handleStepInteraction(index, activeStep)
          }
          className={clsx(
            classes.item,
            index < activeStep && classes.complete,
            index === activeStep && classes.active,
            index > activeStep && classes.disabled,
            index > activeStep && classes.disabledNext,
          )}
        >
          <p>{step.title}</p>
          {step.description && <p>{step.description}</p>}
        </div>
      ))}
    </>
  );
};
