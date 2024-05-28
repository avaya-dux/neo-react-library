import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { TopNavIconButton, TopNavLinkButton } from ".";

describe("TopNavIconButton", () => {
	const user = userEvent.setup();
	const icon = "settings";
	const ariaLabel = "Settings";

	it("renders without exploding", () => {
		const badge = "example";
		const { container } = render(
			<TopNavIconButton aria-label={ariaLabel} badge={badge} icon={icon} />,
		);

		expect(screen.getByRole("button")).toBeInTheDocument();
		expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();

		const grid = container.querySelector(`[data-badge="${badge}"]`);
		expect(grid).toHaveClass("neo-badge__icon");
	});

	it("explodes if an accessibility error is found", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => null);
		expect(() => render(<TopNavIconButton aria-label="" />)).toThrow();
		expect(spy).toHaveBeenCalled();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(
			<TopNavIconButton aria-label={ariaLabel} icon={icon} />,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	describe("click events", () => {
		it("fires click event when clicked", async () => {
			const onClickSpy = vi.fn();
			render(
				<TopNavIconButton
					aria-label={ariaLabel}
					icon={icon}
					onClick={onClickSpy}
				/>,
			);

			expect(onClickSpy).toHaveBeenCalledTimes(0);
			await user.click(screen.getByRole("button"));
			expect(onClickSpy).toHaveBeenCalledTimes(1);
		});

		it("does not fire click event if disabled", async () => {
			const onClickSpy = vi.fn();
			render(
				<TopNavIconButton
					aria-label={ariaLabel}
					disabled
					icon={icon}
					onClick={onClickSpy}
				/>,
			);

			expect(onClickSpy).not.toHaveBeenCalled();
			await user.click(screen.getByRole("button"));
			expect(onClickSpy).not.toHaveBeenCalled();
		});
	});
});

describe("TopNavLinkButton", () => {
	const href = "/example";
	const children = "Example";

	it("explodes if an accessibility error is found", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => null);
		expect(() => render(<TopNavLinkButton href={href} />)).toThrow();
		expect(spy).toHaveBeenCalled();
	});

	it("renders a link when not disabled", () => {
		render(<TopNavLinkButton href={href}>{children}</TopNavLinkButton>);

		expect(screen.getByRole("link")).toBeInTheDocument();
	});

	it("renders a button when disabled", () => {
		render(
			<TopNavLinkButton disabled href={href}>
				{children}
			</TopNavLinkButton>,
		);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("has active class when active", () => {
		render(
			<TopNavLinkButton active href={href}>
				{children}
			</TopNavLinkButton>,
		);

		expect(screen.getByRole("link")).toHaveClass("neo-nav-link-btn-active");
	});

	it("has active class when both active and disabled", () => {
		render(
			<TopNavLinkButton active disabled href={href}>
				{children}
			</TopNavLinkButton>,
		);

		expect(screen.getByRole("button")).toHaveClass("neo-nav-link-btn-active");
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(
			<TopNavLinkButton href={href}>{children}</TopNavLinkButton>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("passes basic axe compliance when disabled", async () => {
		const { container } = render(
			<TopNavLinkButton href={href} disabled>
				{children}
			</TopNavLinkButton>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
