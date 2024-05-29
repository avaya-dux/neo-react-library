import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { Tree } from ".";
import * as TreeStories from "./Tree.stories";

const { Default, DirectionExamples, EmbededActions, LeafContentExamples } =
	composeStories(TreeStories);

describe("Tree", () => {
	it("fully renders without exploding", () => {
		render(<Tree label="example label" />);

		const rootElement = screen.getByRole("tree");
		expect(rootElement).toBeInTheDocument();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<Tree label="example label" />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("throws error if no label is passed", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => null);
		expect(() => render(<Tree />)).toThrow();
		expect(spy).toHaveBeenCalled();
	});

	describe("storybook tests", () => {
		describe("Default", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<Default />);
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

		describe("LeafContentExamples", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<LeafContentExamples />);
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

		describe("DirectionExamples", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<DirectionExamples />);
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

		describe("EmbededActions", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<EmbededActions />);
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
