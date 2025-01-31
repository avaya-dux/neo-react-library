import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { InternalTextInputElement, TextInput } from "./TextInput";
import * as TextInputStories from "./TextInput.stories";

const {
	Default,
	DifferentHTMLOutputExamples,
	ErrorState,
	AdornmentIcons,
	AdornmentStrings,
	Clearable,
	ReadOnly,
	Disabled,
	BadAccessibility,
	TypeSwitch,
	LabelWithIcon,
} = composeStories(TextInputStories);

describe("TextInput", () => {
	it("fully renders without exploding", () => {
		const { getByLabelText } = render(<TextInput label="My Label" />);
		const rootElement = getByLabelText("My Label");
		expect(rootElement).toBeTruthy();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<TextInput label="Has Label" />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("throws an error without `label` AND `placeholder`", () => {
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => null);
		expect(() => {
			render(<TextInput />);
		}).toThrow();

		expect(errorSpy).toHaveBeenCalled();
	});

	it("does not throw an error with `label` OR `placeholder`", () => {
		expect(() => render(<TextInput label="truthy" />)).not.toThrow();
		expect(() => render(<TextInput aria-label="truthy" />)).not.toThrow();
		expect(() =>
			render(<TextInput label="double" placeholder="truthy" />),
		).not.toThrow();
	});

	describe("InternalTextInputElement", () => {
		it("fully renders without exploding", () => {
			const testid = "testid";
			const { getByTestId } = render(
				<InternalTextInputElement data-testid={testid} />,
			);
			const rootElement = getByTestId(testid);
			expect(rootElement).toBeTruthy();

			expect(rootElement.classList.contains("neo-input")).toBe(true);
			expect(rootElement.classList.length).toBe(1);
			expect(rootElement.tabIndex).toBe(0);
		});

		it("for the `readOnly` usecase, has an extra class name and `tabIndex === -1`", () => {
			const testid = "testid";
			const { getByTestId } = render(
				<InternalTextInputElement data-testid={testid} readOnly />,
			);
			const rootElement = getByTestId(testid);
			expect(rootElement).toBeTruthy();

			expect(rootElement.classList.contains("neo-input")).toBe(true);
			expect(rootElement.classList.length).toBe(2);
			expect(rootElement.tabIndex).toBe(-1);
		});

		it("passes basic axe compliance", async () => {
			const internalId = "testid";
			const WrappedInLabel = () => (
				<div>
					<label htmlFor={internalId}>descriptive text</label>
					<InternalTextInputElement id={internalId} />
				</div>
			);
			const { container } = render(<WrappedInLabel />);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
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

		describe("LabelWithIcon", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<LabelWithIcon />);
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

		describe("DifferentHTMLOutputExamples", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<DifferentHTMLOutputExamples />);
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

		describe("ErrorState", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<ErrorState />);
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

		describe("AdornmentIcons", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<AdornmentIcons />);
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

		describe("AdornmentStrings", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<AdornmentStrings />);
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

		describe("Clearable", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<Clearable />);
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

		describe("ReadOnly", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<ReadOnly />);
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

		describe("Disabled", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<Disabled />);
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

		describe("BadAccessibility", () => {
			it("explodes", async () => {
				const errorSpy = vi
					.spyOn(console, "error")
					.mockImplementation(() => null);

				expect(() => {
					render(<BadAccessibility />);
				}).toThrow();

				expect(errorSpy).toHaveBeenCalled();
			});
		});
		describe("TypeSwitch", () => {
			const user = userEvent.setup();

			let renderResult;

			beforeEach(() => {
				renderResult = render(<TypeSwitch />);
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

			it("changes type to text", async () => {
				const input = screen.getByLabelText("Text Input");
				expect(input).toHaveAttribute("type", "password");
				const checkbox = screen.getByRole("checkbox");
				expect(checkbox.checked).toBeTruthy();
				await user.click(checkbox);
				expect(checkbox.checked).toBeFalsy();
				expect(input).toHaveAttribute("type", "text");
			});
		});
	});
});
