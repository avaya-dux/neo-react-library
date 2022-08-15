import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import * as ListStories from "./List.stories";

describe("List: ", () => {
  describe("Render Portal Spaces UI Examples Story", () => {
    const { PortalListItemExamples } = composeStories(ListStories);
    let renderResult;

    beforeEach(() => {
      jest.spyOn(console, "warn").mockImplementation(() => {});
      renderResult = render(<PortalListItemExamples />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render Portal ListSection examples ", () => {
    const { PortalListSectionsExamples } = composeStories(ListStories);
    let renderResult;

    beforeEach(() => {
      jest.spyOn(console, "warn").mockImplementation(() => {});
      renderResult = render(<PortalListSectionsExamples />);
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

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
