import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

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
  Templated,
} = composeStories(PaginationStories);

describe("Pagination", () => {
  const defaultProps = {
    currentPageIndex: 1,
    itemCount: 10,
    itemsPerPage: 1,
    itemsPerPageOptions: [1, 5, 10],
    onPageChange: () => null,
    onItemsPerPageChange: () => null,
  };

  it("fully renders without exploding", () => {
    vi.spyOn(console, "warn").mockImplementation(() => null);
    const { getByRole, getAllByRole } = render(
      <Pagination {...defaultProps} />
    );

    const innerNavElement = getByRole("navigation");
    const tooltips = getAllByRole("tooltip");
    expect(innerNavElement).toBeTruthy();
    expect(tooltips).toHaveLength(2);
  });

  it("does not render the `<select>` if no options are passed for it", () => {
    vi.spyOn(console, "warn").mockImplementation(() => null);

    const props = {
      ...defaultProps,
      itemsPerPageOptions: undefined,
    };
    const { getByRole, getAllByRole } = render(<Pagination {...props} />);

    const innerNavElement = getByRole("navigation");
    const tooltips = getAllByRole("tooltip");
    expect(innerNavElement).toBeTruthy();
    expect(tooltips).toHaveLength(1);
  });

  it("does NOT show any nav items when `totalPages === 1`", () => {
    vi.spyOn(console, "warn").mockImplementation(() => null);

    const props = {
      ...defaultProps,
      itemCount: 10,
      itemsPerPage: 10,
    };
    const { queryAllByRole } = render(<Pagination {...props} />);

    const innerNavElement = queryAllByRole("navigation");
    expect(innerNavElement).toHaveLength(0);

    const navItems = queryAllByRole("button");
    expect(navItems).toHaveLength(0);
  });

  it("shows a single, nav item when `totalPages === 1` and prop `alwaysShowPagination` is passed", () => {
    vi.spyOn(console, "warn").mockImplementation(() => null);

    const props = {
      ...defaultProps,
      itemCount: 10,
      itemsPerPage: 10,
    };
    const { queryAllByRole } = render(
      <Pagination {...props} alwaysShowPagination />
    );

    const innerNavElement = queryAllByRole("navigation");
    expect(innerNavElement).toHaveLength(1);

    const navItems = queryAllByRole("button");
    expect(navItems).toHaveLength(3); // left, 1, right
    expect(navItems[0]).toBeDisabled();
    expect(navItems[1]).toBeEnabled();
    expect(navItems[2]).toBeDisabled();
  });

  it("matches it's previous snapshot", () => {
    const { container } = render(
      <Pagination {...defaultProps} id="pagination-test" />
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-pagination__row"
          id="pagination-test"
        >
          <div
            class="neo-tooltip neo-tooltip--up neo-tooltip--onhover"
            id="pagination-item-display-Item count"
          >
            <div
              aria-describedby=":rc:"
            >
              1-1 / 10
            </div>
            <div
              class="neo-tooltip__content neo-tooltip__content--multiline"
              id=":rc:"
              role="tooltip"
            >
              <div
                class="neo-arrow"
              />
              Item count
            </div>
          </div>
          <nav
            aria-label="pagination"
            class="neo-pagination"
            role="navigation"
          >
            <button
              aria-label="previous"
              class="neo-btn neo-btn-square neo-btn--default neo-btn-tertiary neo-btn-tertiary--default neo-btn-square-tertiary--default"
              data-badge=""
              disabled=""
              style="color: gray;"
            >
              <span
                class="neo-icon-arrow-left"
                style="font-size: 20px;"
              />
            </button>
            <ul
              class="neo-pagination__list"
            >
              <li>
                <button
                  class="neo-btn neo-btn--default neo-btn-secondary neo-btn-secondary--default neo-btn-square neo-btn-square-secondary neo-btn-square-secondary--info"
                  data-badge=""
                >
                  1
                </button>
              </li>
            </ul>
            <button
              aria-label="next"
              class="neo-btn neo-btn-square neo-btn--default neo-btn-tertiary neo-btn-tertiary--default neo-btn-square-tertiary--default"
              data-badge=""
              style="color: black;"
            >
              <span
                class="neo-icon-arrow-right"
                style="font-size: 20px;"
              />
            </button>
          </nav>
          <div
            class="neo-tooltip neo-tooltip--up neo-tooltip--onhover"
            id="pagination-items-per-page-selection-items per page"
          >
            <div
              aria-describedby=":rd:"
            >
              <label>
                Show: 
              </label>
              <select
                aria-label="items per page"
              >
                <option
                  selected=""
                  value="1"
                >
                  1
                </option>
                <option
                  value="5"
                >
                  5
                </option>
                <option
                  value="10"
                >
                  10
                </option>
              </select>
            </div>
            <div
              class="neo-tooltip__content neo-tooltip__content--multiline"
              id=":rd:"
              role="tooltip"
            >
              <div
                class="neo-arrow"
              />
              items per page
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Pagination {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
        maxNodes
      ) => {
        for (let i = 0; i < testIndexes.length; i++) {
          const currentPageIndex = testIndexes[i];

          const navArray = buildNavItemsWithSeparators(
            currentPageIndex,
            maxNodes,
            null,
            totalPages
          );

          expect(navArray).toHaveLength(maxNodes);

          const { queryAllByRole, unmount } = render(<>{navArray}</>);
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
            maxNodes
          );
        });

        it("should display '1 2 ... 7 8 9 10' when `currentPageIndex >= 8`", () => {
          const testIndexes = [8, 9, 10];
          const expectedDisplayedText = [1, 2, 7, 8, 9, 10];

          assertTestedIndexesMatchExpectedOutputStrings(
            testIndexes,
            expectedDisplayedText,
            maxNodes
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
              totalPages
            );

            expect(navArray).toHaveLength(maxNodes);

            const { queryAllByRole, unmount } = render(<>{navArray}</>);
            const navItems = queryAllByRole("button");
            expect(navItems).toHaveLength(maxNodes - 2); // minus the two "..." span element

            const navItemLeftOfSelected = navItems[1];
            expect(navItemLeftOfSelected).toHaveTextContent(
              currentPageIndex - 1
            );
            expect(navItemLeftOfSelected).toBeEnabled();
            const selectedNavItem = navItems[2];
            expect(selectedNavItem).toHaveTextContent(currentPageIndex);
            expect(selectedNavItem).toBeEnabled();
            const navItemRightOfSelected = navItems[3];
            expect(navItemRightOfSelected).toHaveTextContent(
              currentPageIndex + 1
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
            maxNodes
          );
        });

        it("should display '1 ... 8 9 10' when `currentPageIndex >= 8`", () => {
          const testIndexes = [8, 9, 10];
          const expectedDisplayedText = [1, 8, 9, 10];

          assertTestedIndexesMatchExpectedOutputStrings(
            testIndexes,
            expectedDisplayedText,
            maxNodes
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
              totalPages
            );

            expect(navArray).toHaveLength(maxNodes);

            const { queryAllByRole, unmount } = render(<>{navArray}</>);
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

          const { queryAllByRole, unmount } = render(<>{navArray}</>);
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
              totalPages
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
            navItemsWithSeperatorsSpy
          )
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
            navItemsWithSeperatorsSpy
          )
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
