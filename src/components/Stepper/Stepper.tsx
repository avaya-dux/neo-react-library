import clsx from "clsx";
import { useCallback, useMemo } from "react";

import { Keys } from "utils";

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
	title?: string;
}

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
					: "neo-stepper--vertical__item--active",
			complete:
				direction === "horizontal"
					? "neo-stepper__item--complete"
					: "neo-stepper--vertical__item--complete",
			content:
				direction === "horizontal"
					? undefined
					: "neo-stepper--vertical__content",
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
Stepper.displayName = "Stepper";

interface StepperClassNames {
	classes: {
		active: string;
		complete: string;
		content?: string;
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
					<StepText
						title={step.title}
						description={step.description}
						containerClass={classes.content}
					/>
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
						index < activeStep && "neo-stepper__item--editable",
						index === activeStep && classes.active,
						index > activeStep && classes.disabled,
						index > activeStep && classes.disabledNext,
					)}
				>
					<StepText
						title={step.title}
						description={step.description}
						containerClass={classes.content}
					/>
				</div>
			))}
		</>
	);
};

const StepText = ({
	title,
	description,
	containerClass,
}: Steps & { containerClass?: string }) => (
	<div className={containerClass}>
		<p>{title}</p>
		{description && <p>{description}</p>}
	</div>
);
