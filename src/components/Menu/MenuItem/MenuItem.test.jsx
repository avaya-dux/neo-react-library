import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import log from "loglevel";

import * as MenuItemStories from "./MenuItem.stories";

log.disableAll();

const { Default, ItemTemplate } = composeStories(MenuItemStories);

describe("Menu Item Storybook tests", () => {
  describe("Default", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Default />);
    });

    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).toBeDefined();
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("ItemTemplate", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ItemTemplate />);
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
