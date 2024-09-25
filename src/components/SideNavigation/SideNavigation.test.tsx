import { composeStories } from "@storybook/testing-react";
import type { RenderResult } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { SideNavigation } from ".";

import * as SideNavigationStories from "./SideNavigation.stories";
const {
	CategoryGroups,
	CategoryGroupsWithIcons,
	Default,
	DoesNotConflictWithOtherNavs,
} = composeStories(SideNavigationStories);

describe("Side Navigation", () => {
	// TODO: "Avoid mutating global prototypes directly; use setup and teardown methods" per CodeRabbit - https://github.com/avaya-dux/neo-react-library/pull/549#discussion_r1775919025
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

			// Restore console.error after the test
			vi.restoreAllMocks();
		});
	});

	describe("storybook tests", () => {
		const stories = [
			{ name: "Default", Component: Default },
			{ name: "CategoryGroups", Component: CategoryGroups },
			{ name: "CategoryGroupsWithIcons", Component: CategoryGroupsWithIcons },
			{
				name: "DoesNotConflictWithOtherNavs",
				Component: DoesNotConflictWithOtherNavs,
			},
		];
		stories.forEach(({ name, Component }) => {
			describe(name, () => {
				let renderResult: RenderResult;

				beforeEach(() => {
					renderResult = render(<Component />);
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
});
