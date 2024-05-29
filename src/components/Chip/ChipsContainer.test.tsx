import { type RenderResult, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Chip, ChipsContainer } from ".";
import { ChipsContainerExamples } from "./Chip.stories";

describe("ChipsContainer", () => {
	const allVariants = (
		<ChipsContainer>
			<Chip variant="default">Default</Chip>
			<Chip variant="alert">Alert</Chip>
			<Chip variant="info">Info</Chip>
			<Chip variant="success">Success</Chip>
			<Chip variant="warning">Warning</Chip>
		</ChipsContainer>
	);

	it("fully renders without exploding", () => {
		render(allVariants);

		const element = screen.getByText("Default");
		expect(element).toBeInTheDocument();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(allVariants);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	describe("storybook tests", () => {
		describe("ChipsContainerExamples", () => {
			let renderResult: RenderResult;

			beforeEach(() => {
				renderResult = render(<ChipsContainerExamples />);
			});

			it("should render ok", () => {
				const { container } = renderResult;
				expect(container).not.toBe(null);
			});

			it("passes basic axe compliance", async () => {
				const { container } = renderResult;
				const results = await axe(container);
				expect(results).toHaveNoViolations();
			});
		});
	});
});
