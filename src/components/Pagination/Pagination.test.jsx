import { composeStories } from "@storybook/testing-react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { UserEventKeys } from "utils";

import { Pagination } from ".";
import {
	buildAllNavItems,
	buildNavItems,
	buildNavItemsWithSeparators,
	calculateMaxNavNodes,
} from "./Nodes/helpers";
import * as PaginationStories from "./Pagination.stories";

const {
	WithSpaceForFiveNavItems,
	WithSpaceForSevenNavItems,
	WithSpaceForTenNavItems,
	SettingTheDefaultIndex,
	Templated,
} = composeStories(PaginationStories);

describe("Pagination", () => {
	const user = userEvent.setup();

	const selectedPageClass = "neo-btn-secondary";

	const defaultProps = {
		currentPageIndex: 1,
		itemCount: 10,
		itemsPerPage: 1,
		itemsPerPageOptions: [1, 5, 10],
		onPageChange: () => null,
		onItemsPerPageChange: () => null,
	};

	it("fully renders without exploding", () => {
		render(<Pagination {...defaultProps} />);

		const innerNavElement = screen.getByRole("navigation");
		const buttons = screen.getAllByRole("button");
		expect(innerNavElement).toBeTruthy();
		expect(buttons).toHaveLength(4);
	});

	it("does not render the `<select>` if no options are passed for it", () => {
		const props = {
			...defaultProps,
			itemsPerPageOptions: undefined,
		};
		const { getByRole, getAllByRole } = render(<Pagination {...props} />);

		const innerNavElement = getByRole("navigation");
		const buttons = getAllByRole("button");
		expect(innerNavElement).toBeTruthy();
		expect(buttons).toHaveLength(3);
	});

	it("does NOT show any nav items when `totalPages === 1`", () => {
		const props = {
			...defaultProps,
			itemCount: 10,
			itemsPerPage: 10,
		};
		const { queryAllByRole } = render(<Pagination {...props} />);

		const innerNavElement = queryAllByRole("navigation");
		expect(innerNavElement).toHaveLength(0);

		const navItems = queryAllByRole("button");
		expect(navItems).toHaveLength(1); // only the "Rows" select
	});

	it("shows a single, nav item when `totalPages === 1` and prop `alwaysShowPagination` is passed", () => {
		const props = {
			...defaultProps,
			itemCount: 10,
			itemsPerPage: 10,
		};
		const { queryAllByRole } = render(
			<Pagination {...props} alwaysShowPagination />,
		);

		const innerNavElement = queryAllByRole("navigation");
		expect(innerNavElement).toHaveLength(1);

		const navItems = queryAllByRole("button");
		expect(navItems).toHaveLength(4); // left, 1, right, and "Rows" select
		expect(navItems[0]).toBeDisabled();
		expect(navItems[1]).toBeEnabled();
		expect(navItems[2]).toBeDisabled();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<Pagination {...defaultProps} />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	describe("`GoToPage` functionality", () => {
		it("`GoToPage` responds to user input and page click appropriately", async () => {
			render(<SettingTheDefaultIndex />);

			const goToPageInput = screen.getByRole("spinbutton");
			expect(goToPageInput).toHaveValue(5);

			// when user clicks pagination arrows, `GoToPage` updates it's text input appropriately
			const leftArrow = screen.getByLabelText("previous");
			const rightArrow = screen.getByLabelText("next");
			await user.click(leftArrow);
			expect(goToPageInput).toHaveValue(4);
			await user.click(rightArrow);
			await user.click(rightArrow);
			expect(goToPageInput).toHaveValue(6);

			await user.type(goToPageInput, UserEventKeys.BACKSPACE);
			await user.type(goToPageInput, "11");
			expect(goToPageInput).toHaveValue(11);

			await user.type(goToPageInput, UserEventKeys.ENTER);
			await waitFor(() => {
				const activePaginationPageButton = screen.getByText("11");
				expect(activePaginationPageButton).toHaveClass(selectedPageClass);
			});
		});

		it("`GoToPage` sets value to `1` if users enters no value", async () => {
			render(<SettingTheDefaultIndex />);

			const goToPageInput = screen.getByRole("spinbutton");
			expect(goToPageInput).toHaveValue(5);

			await user.type(goToPageInput, UserEventKeys.BACKSPACE);
			await user.type(goToPageInput, UserEventKeys.ENTER);
			await waitFor(() => {
				expect(screen.getByRole("spinbutton")).toHaveValue(1);
			});
		});

		it("`GoToPage` sets value to `1` if users enters a value less than one", async () => {
			render(<SettingTheDefaultIndex />);

			const goToPageInput = screen.getByRole("spinbutton");
			expect(goToPageInput).toHaveValue(5);

			await user.type(goToPageInput, "-1");
			await user.type(goToPageInput, UserEventKeys.ENTER);
			await waitFor(() => {
				expect(screen.getByRole("spinbutton")).toHaveValue(1);
			});
		});

		it("`GoToPage` sets value to `totalPages` if users enters a value more than `totalPages`", async () => {
			render(<SettingTheDefaultIndex />);

			const goToPageInput = screen.getByRole("spinbutton");
			expect(goToPageInput).toHaveValue(5);

			await user.type(goToPageInput, "30000");
			await user.type(goToPageInput, UserEventKeys.ENTER);
			await waitFor(() => {
				expect(screen.getByRole("spinbutton")).toHaveValue(20);
			});
		});
	});

	describe("storybook tests", () => {
		describe("WithSpaceForFiveNavItems", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<WithSpaceForFiveNavItems />);
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

		describe("WithSpaceForSevenNavItems", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<WithSpaceForSevenNavItems />);
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

		describe("WithSpaceForTenNavItems", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<WithSpaceForTenNavItems />);
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

		describe("Templated", () => {
			let renderResult;

			beforeEach(() => {
				renderResult = render(<Templated />);
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

	describe("helpers", () => {
		describe("calculateMaxNavNodes", () => {
			it("should return `5` when width is 500", () => {
				expect(calculateMaxNavNodes(500)).toBe(5);
			});

			it("should return `7` when width is 600", () => {
				expect(calculateMaxNavNodes(600)).toBe(7);
			});

			it("should return `10` when width is 800", () => {
				expect(calculateMaxNavNodes(800)).toBe(10);
			});
		});

		describe("buildAllNavItems", () => {
			it("should return an array that is the length of `totalPages`", () => {
				expect(buildAllNavItems(1, null, 0)).toHaveLength(0);
				expect(buildAllNavItems(1, null, 1)).toHaveLength(1);
				expect(buildAllNavItems(1, null, 10)).toHaveLength(10);
				expect(buildAllNavItems(1, null, 100)).toHaveLength(100);
			});
		});

		describe("buildNavItemsWithSeparators", () => {
			const totalPages = 10;

			const assertTestedIndexesMatchExpectedOutputStrings = (
				testIndexes,
				expectedDisplayedText,
				maxNodes,
			) => {
				for (let i = 0; i < testIndexes.length; i++) {
					const currentPageIndex = testIndexes[i];

					const navArray = buildNavItemsWithSeparators(
						currentPageIndex,
						maxNodes,
						null,
						totalPages,
					);

					expect(navArray).toHaveLength(maxNodes);

					const { queryAllByRole, unmount } = render(navArray);
					const navItems = queryAllByRole("button");
					expect(navItems).toHaveLength(maxNodes - 1); // minus the "..." span element

					navItems.forEach((navItem, index) => {
						expect(navItem).toHaveTextContent(expectedDisplayedText[index]);
						expect(navItem).toBeEnabled();
					});

					// unmount to avoid memory leak
					unmount();
				}
			};

			describe("when `maxNodes === 7`", () => {
				const maxNodes = 7;

				it("should display '1 2 3 4 ... 9 10' when `currentPageIndex <= 3`", () => {
					const testIndexes = [1, 2, 3];
					const expectedDisplayedText = [1, 2, 3, 4, 9, 10];

					assertTestedIndexesMatchExpectedOutputStrings(
						testIndexes,
						expectedDisplayedText,
						maxNodes,
					);
				});

				it("should display '1 2 ... 7 8 9 10' when `currentPageIndex >= 8`", () => {
					const testIndexes = [8, 9, 10];
					const expectedDisplayedText = [1, 2, 7, 8, 9, 10];

					assertTestedIndexesMatchExpectedOutputStrings(
						testIndexes,
						expectedDisplayedText,
						maxNodes,
					);
				});

				it("should display '1 ... i-1 i i+1 ... 10' when `3 < currentPageIndex < 8`", () => {
					const testIndexes = [4, 5, 6, 7];

					for (let i = 0; i < testIndexes.length; i++) {
						const currentPageIndex = testIndexes[i];

						const navArray = buildNavItemsWithSeparators(
							currentPageIndex,
							maxNodes,
							null,
							totalPages,
						);

						expect(navArray).toHaveLength(maxNodes);

						const { queryAllByRole, unmount } = render(navArray);
						const navItems = queryAllByRole("button");
						expect(navItems).toHaveLength(maxNodes - 2); // minus the two "..." span element

						const navItemLeftOfSelected = navItems[1];
						expect(navItemLeftOfSelected).toHaveTextContent(
							currentPageIndex - 1,
						);
						expect(navItemLeftOfSelected).toBeEnabled();
						const selectedNavItem = navItems[2];
						expect(selectedNavItem).toHaveTextContent(currentPageIndex);
						expect(selectedNavItem).toBeEnabled();
						const navItemRightOfSelected = navItems[3];
						expect(navItemRightOfSelected).toHaveTextContent(
							currentPageIndex + 1,
						);
						expect(navItemRightOfSelected).toBeEnabled();

						// unmount to avoid memory leak
						unmount();
					}
				});
			});

			describe("when `maxNodes === 5`", () => {
				const maxNodes = 5;

				it("should display '1 2 3 ... 10' when `currentPageIndex <= 3`", () => {
					const testIndexes = [1, 2, 3];
					const expectedDisplayedText = [1, 2, 3, 10];

					assertTestedIndexesMatchExpectedOutputStrings(
						testIndexes,
						expectedDisplayedText,
						maxNodes,
					);
				});

				it("should display '1 ... 8 9 10' when `currentPageIndex >= 8`", () => {
					const testIndexes = [8, 9, 10];
					const expectedDisplayedText = [1, 8, 9, 10];

					assertTestedIndexesMatchExpectedOutputStrings(
						testIndexes,
						expectedDisplayedText,
						maxNodes,
					);
				});

				it("should display '1 ... i ... 10' when `3 < currentPageIndex < 8`", () => {
					const testIndexes = [4, 5, 6, 7];

					for (let i = 0; i < testIndexes.length; i++) {
						const currentPageIndex = testIndexes[i];

						const navArray = buildNavItemsWithSeparators(
							currentPageIndex,
							maxNodes,
							null,
							totalPages,
						);

						expect(navArray).toHaveLength(maxNodes);

						const { queryAllByRole, unmount } = render(navArray);
						const navItems = queryAllByRole("button");
						expect(navItems).toHaveLength(maxNodes - 2); // minus the two "..." span element

						const selectedNavItem = navItems[1];
						expect(selectedNavItem).toHaveTextContent(currentPageIndex);
						expect(selectedNavItem).toBeEnabled();

						// unmount to avoid memory leak
						unmount();
					}
				});
			});

			it("when `0 <= maxNodes < 5`, display a single nav item", () => {
				const spy = vi.spyOn(console, "error").mockImplementation(() => null);

				for (let i = 0; i < 5; i++) {
					const navArray = buildNavItemsWithSeparators(i, i, null, totalPages);

					expect(navArray).toHaveLength(1);

					const { queryAllByRole, unmount } = render(navArray);
					const navItems = queryAllByRole("button");
					expect(navItems).toHaveLength(1);

					const navItem = navItems[0];
					expect(navItem).toHaveTextContent(i);
					expect(navItem).toBeEnabled();

					// unmount to avoid memory leak
					unmount();
				}

				// NOTE: "0" is a valid case, but 1-4 are not and should cause a console error
				expect(spy.mock.calls.length).toBe(4);
			});
		});

		describe("buildNavItems", () => {
			const pageIndex = 1;

			describe("should create an array whose length matches `totalPages` when `totalPages < 5 || maxNavNodes >= totalPages`", () => {
				it("`totalPages < 5` output length should be `totalPages`", () => {
					for (let i = 1; i < 5; i++) {
						const totalPages = i;
						expect(buildNavItems(pageIndex, 1, null, totalPages)).toHaveLength(
							totalPages,
						);
					}
				});

				it("`maxNodes === totalPages` output length should be `totalPages`", () => {
					for (let i = 5; i < 10; i++) {
						expect(buildNavItems(pageIndex, i, null, i)).toHaveLength(i);
					}
				});

				it("`maxNodes >= totalPages` output length should be `totalPages`", () => {
					for (let i = 5; i < 10; i++) {
						const maxNodes = i;
						expect(buildNavItems(pageIndex, maxNodes, null, 5)).toHaveLength(5);
					}
				});
			});

			it("should call `buildAllNavItems` when `totalPages < 5 || maxNavNodes >= totalPages`", () => {
				const allNavItemsSpy = vi.fn(() => []);
				const navItemsWithSeperatorsSpy = vi.fn(() => []);

				expect(
					buildNavItems(
						pageIndex,
						1,
						null,
						3,
						allNavItemsSpy,
						navItemsWithSeperatorsSpy,
					),
				).toHaveLength(0);
				expect(allNavItemsSpy).toHaveBeenCalledTimes(1);
				expect(navItemsWithSeperatorsSpy).toHaveBeenCalledTimes(0);
			});

			it("should call `buildNavItemsWithSeparators` when `totalPages >= 5 && maxNavNodes < totalPages`", () => {
				const allNavItemsSpy = vi.fn(() => []);
				const navItemsWithSeperatorsSpy = vi.fn(() => []);

				expect(
					buildNavItems(
						pageIndex,
						3,
						null,
						10,
						allNavItemsSpy,
						navItemsWithSeperatorsSpy,
					),
				).toHaveLength(0);
				expect(allNavItemsSpy).toHaveBeenCalledTimes(0);
				expect(navItemsWithSeperatorsSpy).toHaveBeenCalledTimes(1);
			});

			it("should create an array of length `7` when `totalPages` and `maxNavNodes` are large and `maxNavNodes < totalPages`", () => {
				expect(buildNavItems(pageIndex, 10, null, 100)).toHaveLength(7);
				expect(buildNavItems(pageIndex, 99, null, 100)).toHaveLength(7);
			});

			it("should create an array of length `5` when `totalPages` is large, but `maxNavNodes < 7`", () => {
				expect(buildNavItems(pageIndex, 6, null, 100)).toHaveLength(5);
				expect(buildNavItems(pageIndex, 5, null, 100)).toHaveLength(5);
			});
		});
	});
});
