import { type RenderResult, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { SideNavigation } from ".";
import {
	CategoryGroups,
	CategoryGroupsWithIcons,
	Default,
	DoesNotConflictWithOtherNavs,
} from "./SideNavigation.stories";

describe("Side Navigation", () => {
	window.HTMLElement.prototype.scrollIntoView = vi.fn();
	describe("a11y tests", () => {
		const examplechildren = (
			<>
				<SideNavigation.TopLinkItem label="Active by default" href="#active" />

				<SideNavigation.TopLinkItem label="Link 2" href="#test2" disabled />

				<SideNavigation.NavCategory expanded={true} label="Text Only Category">
					<SideNavigation.LinkItem href="http://first.com">
						First Item
					</SideNavigation.LinkItem>
					<SideNavigation.LinkItem href="http://avaya.com" disabled>
						Disabled Item
					</SideNavigation.LinkItem>
				</SideNavigation.NavCategory>
			</>
		);

		it("renders properly when `aria-label` is passed", () => {
			render(
				<SideNavigation aria-label="Main Navigation">
					{examplechildren}
				</SideNavigation>,
			);

			expect(screen.getByRole("navigation")).toBeInTheDocument();
		});

		it("renders properly when `aria-labelledby` is passed", () => {
			const id = "side-nav-title";
			render(
				<div>
					<h1 id={id}>Side Navigation</h1>

					<SideNavigation aria-labelledby={id}>
						{examplechildren}
					</SideNavigation>
				</div>,
			);

			expect(screen.getByRole("navigation")).toBeInTheDocument();
		});

		it("throws an error if no 'aria-label*` is passed", () => {
			vi.spyOn(console, "error").mockImplementation(() => null);

			expect(() =>
				render(
					// biome-ignore lint/a11y/useValidAriaValues: we are purposefully testing an invalid value
					<SideNavigation aria-label="">{examplechildren}</SideNavigation>,
				),
			).toThrowError();
		});
	});

	describe("storybook tests", () => {
		describe("Default", () => {
			let renderResult: RenderResult;

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

		describe("CategoryGroups", () => {
			let renderResult: RenderResult;

			beforeEach(() => {
				renderResult = render(<CategoryGroups />);
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

		describe("CategoryGroupsWithIcons", () => {
			let renderResult: RenderResult;

			beforeEach(() => {
				renderResult = render(<CategoryGroupsWithIcons />);
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

		describe("DoesNotConflictWithOtherNavs", () => {
			let renderResult: RenderResult;

			beforeEach(() => {
				renderResult = render(<DoesNotConflictWithOtherNavs />);
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
