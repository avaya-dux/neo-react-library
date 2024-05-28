import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { UserEventKeys } from "utils";

import { Stepper, type Steps } from "./Stepper";

describe("Stepper", () => {
	const user = userEvent.setup();

	const steps: Steps[] = [
		{ title: "Step 1", description: "This is step 1" },
		{ title: "Step 2", description: "This is step 2" },
		{ title: "Step 3", description: "This is step 3" },
		{ title: "Step 4", description: "This is step 4" },
		{ title: "Step 5", description: "This is step 5" },
	];

	const getStep = async (index: number) =>
		(await screen.findByText(steps[index].title as string)).parentElement
			?.parentElement;

	it("fully renders vertical view without exploding", () => {
		const { container } = render(
			<Stepper steps={steps} activeStep={0} direction="vertical" />,
		);

		const rootElement = container.querySelector(".neo-stepper--vertical");
		const stepElements = container.querySelectorAll(
			".neo-stepper--vertical__item",
		);

		expect(rootElement).toBeInTheDocument();
		expect(stepElements).toHaveLength(steps.length);
	});

	it("fully renders horizontal view without exploding", () => {
		const { container } = render(<Stepper steps={steps} activeStep={0} />);

		const rootElement = container.querySelector(".neo-stepper");
		const stepElements = container.querySelectorAll(".neo-stepper__item");

		expect(rootElement).toBeInTheDocument();
		expect(stepElements).toHaveLength(steps.length);
	});

	it("fully renders without exploding when steps have no title or description", () => {
		const { container } = render(
			<Stepper steps={steps.map(() => ({}))} activeStep={0} />,
		);

		const rootElement = container.querySelector(".neo-stepper");
		expect(rootElement).toBeInTheDocument();
	});

	it("appropriately assigns active state", async () => {
		render(<Stepper steps={steps} activeStep={1} />);

		const firstStep = await getStep(0);
		const secondStep = await getStep(1);

		expect(firstStep).toHaveClass("neo-stepper__item");
		expect(firstStep).not.toHaveClass("neo-stepper__item--active");
		expect(firstStep).toHaveClass("neo-stepper__item--complete");

		expect(secondStep).toHaveClass("neo-stepper__item");
		expect(secondStep).toHaveClass("neo-stepper__item--active");
		expect(secondStep).not.toHaveClass("neo-stepper__item--complete");
	});

	describe("linear stepper functionality", () => {
		it("does not notify the user when a step is clicked", async () => {
			const activeStep = 2;
			const spy = vi.fn();
			render(
				<Stepper steps={steps} activeStep={activeStep} onStepClick={spy} />,
			);

			const previousStep = await getStep(activeStep - 1);
			const currentStep = await getStep(activeStep);
			const nextStep = await getStep(activeStep + 1);

			expect(previousStep).toBeDefined();
			expect(currentStep).toBeDefined();
			expect(nextStep).toBeDefined();

			previousStep?.click();
			expect(spy).not.toHaveBeenCalled();

			currentStep?.click();
			expect(spy).not.toHaveBeenCalled();

			nextStep?.click();
			expect(spy).not.toHaveBeenCalled();
		});
	});

	describe("editable stepper functionality", () => {
		it("notifies the user when a previous step is clicked", async () => {
			const spy = vi.fn();
			render(
				<Stepper
					steps={steps}
					activeStep={1}
					type="editable"
					onStepClick={spy}
				/>,
			);

			const firstStep = await getStep(0);
			expect(firstStep).toBeDefined();

			firstStep?.click();
			expect(spy).toHaveBeenCalledWith(0);
		});

		it("does not notify the user when a future step is clicked", async () => {
			const spy = vi.fn();
			render(
				<Stepper
					steps={steps}
					activeStep={1}
					type="editable"
					onStepClick={spy}
				/>,
			);

			const thirdStep = await getStep(2);
			expect(thirdStep).toBeDefined();

			thirdStep?.click();
			expect(spy).not.toHaveBeenCalled();
		});

		it("notifies the user when a previous step is selected via the enter key", async () => {
			const spy = vi.fn();
			render(
				<Stepper
					steps={steps}
					activeStep={1}
					type="editable"
					onStepClick={spy}
				/>,
			);

			const firstStep = await getStep(0);
			expect(firstStep).toBeDefined();

			firstStep?.focus();
			await user.keyboard(UserEventKeys.ENTER);
			expect(spy).toHaveBeenCalledWith(0);
		});

		it("does not notify the user when a future step is selected via the enter key", async () => {
			const spy = vi.fn();
			render(
				<Stepper
					steps={steps}
					activeStep={1}
					type="editable"
					onStepClick={spy}
				/>,
			);

			const thirdStep = await getStep(2);
			expect(thirdStep).toBeDefined();

			thirdStep?.focus();
			await user.keyboard(UserEventKeys.ENTER);
			expect(spy).not.toHaveBeenCalled();
		});
	});
});
