import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Button } from "components/Button";

import { Breadcrumbs, getNavCssName } from "./Breadcrumbs";
import * as BreadcrumbsStories from "./Breadcrumbs.stories";

const {
  CurrentPageAndOneButton,
  CurrentPageOnly,
  HavingOneLink,
  HavingOneLinkAndTwoButtons,
  HavingTwoLinks,
  HavingTwoLinksAndThreeButtons,
  HavingTwoLinksAndTwoButtons,
} = composeStories(BreadcrumbsStories);

describe("Breadcrumbs: ", () => {
  describe("getNavCssName", () => {
    it("returns neo-breadcrumbs with undefined cssName", () => {
      expect(getNavCssName()).toBe("neo-breadcrumbs");
    });
    it("return neo-breadcrumbs with defined cssName", () => {
      expect(getNavCssName("a b c")).toBe("neo-breadcrumbs a b c");
    });
  });

  describe("given just current page link: ", () => {
    const currentPageLink = { href: "root", text: "root", color: "red" };
    const dataTestId = "Breadcrumbs-root-manual-id";
    const props = {
      currentPageLink,
    };
    let renderResult;
    beforeEach(() => {
      renderResult = render(
        <Breadcrumbs {...props} data-testid={dataTestId} />
      );
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });

    it("renders ok", () => {
      const { getByTestId } = renderResult;
      const rootElement = getByTestId(dataTestId);
      expect(rootElement).toBeTruthy();
    });

    it("gets navigation role ok", () => {
      const { getByRole } = renderResult;
      const rootElement = getByRole("navigation");
      expect(rootElement).toBeTruthy();
    });

    it("style of current page link has current", () => {
      const { getByRole } = renderResult;
      const currentPageByRole = getByRole("listitem");
      expect(currentPageByRole).toHaveClass("neo-breadcrumbs__link--current");
    });

    it("style of current page link has link", () => {
      const { getByRole } = renderResult;
      const currentPageByRole = getByRole("listitem");
      expect(currentPageByRole).toHaveClass("neo-breadcrumbs__link");
    });

    it("description is not rendered", () => {
      const { container } = renderResult;
      const description = container.querySelector(
        ".neo-breadcrumbs__description"
      );
      expect(description).toBeNull();
    });
  });

  describe("given one parent link and current page link and description: ", () => {
    const currentPageLink = { href: "#current", text: "Current Page" };
    const links = [{ href: "#parent1", text: "parent1" }];

    const props = {
      links,
      currentPageLink,
      description: "Breadcrumb Example page description",
    };
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Breadcrumbs {...props} />);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });

    it("it renders two links", () => {
      const { getAllByRole } = renderResult;
      const allListItems = getAllByRole("listitem");
      expect(allListItems).toHaveLength(2);
    });

    it("it renders page description", () => {
      const { getByText } = renderResult;
      const descriptionElement = getByText(props.description);
      expect(descriptionElement).toBeTruthy();
    });

    it("current link has correct text and aria-current", () => {
      const { getAllByRole } = renderResult;
      const currentPageByRole = getAllByRole("link")[1];
      expect(currentPageByRole).toHaveTextContent("Current Page");
      expect(currentPageByRole).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Having one button", () => {
    const currentPageLink = { href: "#current", text: "Current Page" };
    const links = [{ href: "#parent1", text: "parent1" }];
    const button1 = (
      <Button
        data-testid="neo-button1"
        id="test-axe1"
        aria-label="test-axe-name1"
      >
        button1
      </Button>
    );
    const props = {
      links,
      currentPageLink,
      description: "Breadcrumb Example page description",
      buttons: [button1],
    };
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Breadcrumbs {...props} />);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });

    it("should render button", () => {
      const { getByRole } = renderResult;
      const buttonElement = getByRole("button");
      expect(buttonElement).toBeTruthy();
    });
  });

  describe("Having two buttons", () => {
    const currentPageLink = { href: "#current", text: "Current Page" };
    const links = [{ href: "#parent1", text: "parent1", color: "red" }];
    const button1 = (
      <Button data-testid="neo-button1" id="test-axe1">
        Save
      </Button>
    );
    const button2 = (
      <Button data-testid="neo-button2" id="test-axe2">
        Edit
      </Button>
    );
    const props = {
      links,
      currentPageLink,
      "aria-label": "better breadcrumbs",
      description: "Breadcrumb Example page description",
      buttons: [button1, button2],
    };
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Breadcrumbs {...props} />);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });

    it("should render buttons", () => {
      const { getAllByRole } = renderResult;
      const buttonElements = getAllByRole("button");
      expect(buttonElements).toHaveLength(2);
    });

    it("should match snapshots", () => {
      const { container } = renderResult;
      expect(container).toMatchInlineSnapshot(`
        <div>
          <nav
            aria-label="better breadcrumbs"
            class="neo-breadcrumbs"
          >
            <div
              class="neo-breadcrumbs__wrapper"
            >
              <ol>
                <li
                  class="neo-breadcrumbs__link"
                >
                  <a
                    color="red"
                    href="#parent1"
                  >
                    parent1
                  </a>
                </li>
                <li
                  class="neo-breadcrumbs__link neo-breadcrumbs__link--current"
                >
                  <a
                    aria-current="page"
                    href="#current"
                  >
                    Current Page
                  </a>
                </li>
              </ol>
              <p
                class="neo-breadcrumbs__description"
              >
                Breadcrumb Example page description
              </p>
            </div>
            <div
              class="neo-breadcrumbs__actions"
            >
              <button
                class="neo-btn neo-btn--default neo-btn-primary neo-btn-primary--default"
                data-badge=""
                data-testid="neo-button1"
                dir="ltr"
                id="test-axe1"
              >
                Save
              </button>
              <button
                class="neo-btn neo-btn--default neo-btn-primary neo-btn-primary--default"
                data-badge=""
                data-testid="neo-button2"
                dir="ltr"
                id="test-axe2"
              >
                Edit
              </button>
            </div>
          </nav>
        </div>
      `);
    });
  });

  describe("storybook tests", () => {
    describe("CurrentPageAndOneButton story: ", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<CurrentPageAndOneButton />);
      });

      it("renders ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        await axeTest(renderResult);
      });
    });

    describe("CurrentPageOnly story: ", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<CurrentPageOnly />);
      });

      it("renders ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        await axeTest(renderResult);
      });
    });

    describe("HavingOneLink story: ", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<HavingOneLink />);
      });

      it("renders ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        await axeTest(renderResult);
      });
    });

    describe("HavingOneLinkAndTwoButtons story: ", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<HavingOneLinkAndTwoButtons />);
      });

      it("renders ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        await axeTest(renderResult);
      });
    });

    describe("HavingTwoLinks story: ", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<HavingTwoLinks />);
      });

      it("renders ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        await axeTest(renderResult);
      });

      it("it renders three links", () => {
        const { getAllByRole } = renderResult;
        const allListItems = getAllByRole("listitem");
        expect(allListItems).toHaveLength(3);
      });
    });

    describe("HavingTwoLinksAndThreeButtons story: ", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<HavingTwoLinksAndThreeButtons />);
      });

      it("renders ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        await axeTest(renderResult);
      });
    });

    describe("HavingTwoLinksAndTwoButtons story: ", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<HavingTwoLinksAndTwoButtons />);
      });

      it("renders ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        await axeTest(renderResult);
      });
    });
  });
});

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
