import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { getIconChipClassNames } from "./IconChip";
import * as IconChipsStories from "./IconChip.stories";

const {
  DefaultWithIcon,
  SuccessWithIconAndTooltip,
  InfoWithIcon,
  AlertWithIcon,
  WarningWithIconOnRight,
} = composeStories(IconChipsStories);

describe("Icon Chip: ", () => {
  describe("DefaultWithIcon", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<DefaultWithIcon />);
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
  describe("SuccessWithIcon", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<SuccessWithIconAndTooltip />);
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
    it("tooltip is rendered", async () => {
      const { getByRole } = renderResult;
      const tooltip = await getByRole("tooltip");
      expect(tooltip).toHaveTextContent(/success/i);
    });
  });
  describe("InfoWithIcon", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<InfoWithIcon />);
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
  describe("AlertWithIcon", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<AlertWithIcon />);
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
  describe("WarningWithIconOnRight", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<WarningWithIconOnRight />);
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

describe("getIconChipClassNames", () => {
  describe("given variant = alert and icon === info ", () => {
    it("given `disabled = false` and `withinChipContainer = false`, should return correct css names", () => {
      expect(
        getIconChipClassNames("alert", false, "info", false)
      ).toMatchInlineSnapshot(`"neo-chip neo-chip--alert neo-icon-info"`);
    });
    it("given `disabled = true` and `withinChipContainer = false`, should return correct css names", () => {
      expect(
        getIconChipClassNames("alert", true, "info", false)
      ).toMatchInlineSnapshot(
        `"neo-chip neo-chip--alert neo-chip--alert--disabled neo-icon-info"`
      );
    });
    it("given `disabled = true` and `withinChipContainer = true`, should return correct css names", () => {
      expect(
        getIconChipClassNames("alert", true, "info", true)
      ).toMatchInlineSnapshot(
        `"neo-chip neo-chip--alert neo-chip--alert--disabled neo-chips__item neo-icon-info"`
      );
    });
  });
});
