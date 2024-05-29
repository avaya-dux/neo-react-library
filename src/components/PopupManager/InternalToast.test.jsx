import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { InternalToast } from "./InternalToast";

describe("InternalToast", () => {
	describe("duration greater 1 second", () => {
		let renderResult;
		let remove;
		beforeEach(() => {
			vi.useFakeTimers();

			remove = vi.fn();
			renderResult = render(
				<InternalToast
					id="toast1"
					position="top"
					message="This is a toast"
					duration={5000}
					remove={remove}
				/>,
			);
		});

		it("should render ok", () => {
			const { container } = renderResult;
			expect(container).toBeDefined();
			const toast = screen.getByRole("alert");
			expect(toast).toHaveAttribute(
				"aria-label",
				expect.stringContaining("5 seconds"),
			);
		});

		it("passes basic axe compliance", async () => {
			vi.useRealTimers();
			const { container } = renderResult;
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("timeout works", () => {
			vi.runAllTimers();
			expect(remove).toBeCalled();
		});
	});

	describe("duration less than 1 second", () => {
		let renderResult;
		let remove;
		beforeEach(() => {
			vi.useFakeTimers();

			remove = vi.fn();
			renderResult = render(
				<InternalToast
					id="toast1"
					position="top"
					message="This is a toast"
					duration={500}
					remove={remove}
				/>,
			);
		});

		it("should render ok", () => {
			const { container } = renderResult;
			expect(container).toBeDefined();
			const toast = screen.getByRole("alert");
			expect(toast).toHaveAttribute(
				"aria-label",
				expect.stringContaining("1 second"),
			);
		});

		it("passes basic axe compliance", async () => {
			vi.useRealTimers();
			const { container } = renderResult;
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("timeout works", () => {
			vi.runAllTimers();
			expect(remove).toBeCalled();
		});
	});
});
