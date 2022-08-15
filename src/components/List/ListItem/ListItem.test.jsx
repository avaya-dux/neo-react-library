import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import * as ListItemStories from "./ListItem.stories";

describe("ListItem: ", () => {
  describe("Render ListItems: Text Only", () => {
    const { ListItemTextOnly } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<ListItemTextOnly />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("should match snapshots", () => {
      const { container } = renderResult;
      expect(container).toMatchInlineSnapshot(`
        <div>
          <ul
            class="neo-group-list neo-group-list--hover"
          >
            <li
              class="neo-group-list__wrapper"
            >
              <div
                class="neo-group-list__item"
              />
              <div
                class="neo-group-list__item neo-group-list__item--middle"
              >
                First item, text Only
              </div>
              <div
                class="neo-group-list__item"
              />
            </li>
            <li
              class="neo-group-list__wrapper"
            >
              <div
                class="neo-group-list__item"
              />
              <div
                class="neo-group-list__item neo-group-list__item--middle"
              >
                Second item, text only
              </div>
              <div
                class="neo-group-list__item"
              />
            </li>
          </ul>
        </div>
      `);
    });
  });

  describe("Render ListItems: Tooltip and divider", () => {
    const { ListItemTooltipAndDivider } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<ListItemTooltipAndDivider />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });
  });
});

describe("ListSection: ", () => {
  describe("Render ListSections: Text Only", () => {
    const { ListSectionTextOnly } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<ListSectionTextOnly />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("should match snapshots", () => {
      const { container } = renderResult;
      expect(container).toMatchInlineSnapshot(`
        <div>
          <ul
            class="neo-group-list--actions"
          >
            <li
              class="neo-group-list--actions__item"
            >
              <div
                class="neo-group-list__actions--left"
              >
                First item
              </div>
              <div
                class="neo-group-list__actions--right"
              />
            </li>
            <li
              class="neo-group-list--actions__item"
            >
              <div
                class="neo-group-list__actions--left"
              >
                Second item
              </div>
              <div
                class="neo-group-list__actions--right"
              />
            </li>
          </ul>
        </div>
      `);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render ListSections: Text with Hover", () => {
    const { ListSectionTextOnlyWithHover } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<ListSectionTextOnlyWithHover />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render ListSections: Text with Icon and Hover", () => {
    const { ListSectionTextWithIconAndHover } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<ListSectionTextWithIconAndHover />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render ListSections: Text with Icon and Hover and Switch", () => {
    const { ListSectionTextWithIconAndHoverAndSwitch } =
      composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<ListSectionTextWithIconAndHoverAndSwitch />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render ListSections: Text with Icon and Hover and IconButton", () => {
    const { ListSectionTextWithIconAndHoverAndIconButton } =
      composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<ListSectionTextWithIconAndHoverAndIconButton />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("should match snapshots", () => {
      const { container } = renderResult;
      expect(container).toMatchInlineSnapshot(`
        <div>
          <ul
            class="neo-group-list--actions"
          >
            <li
              class="neo-group-list--actions__item neo-group-list--actions__item--clickable"
            >
              <div
                class="neo-group-list__actions--left"
              >
                <span
                  aria-label="chat icon"
                  class=" neo-icon-chat"
                  data-testid="neo-icon-chat"
                  id="icon-chat"
                  role="img"
                />
                First item with chat icon and transfer call button
              </div>
              <div
                class="neo-group-list__actions--right"
              >
                <button
                  aria-label="transfer call"
                  class="neo-btn neo-btn-circle neo-btn--default neo-btn-tertiary neo-btn-tertiary--default neo-btn-circle-tertiary--default"
                  data-badge=""
                  data-testid="neo-button-transfer"
                  id="btn-transfer-call"
                >
                  <span
                    class="neo-icon-call-transfer"
                    style="font-size: 20px;"
                  />
                </button>
              </div>
            </li>
            <li
              class="neo-group-list--actions__item neo-group-list--actions__item--clickable"
            >
              <div
                class="neo-group-list__actions--left"
              >
                <span
                  aria-label="star icon"
                  class=" neo-icon-star"
                  data-testid="neo-icon-star"
                  id="icon-star"
                  role="img"
                />
                Second item with star icon
              </div>
              <div
                class="neo-group-list__actions--right"
              />
            </li>
          </ul>
        </div>
      `);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });
});

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
