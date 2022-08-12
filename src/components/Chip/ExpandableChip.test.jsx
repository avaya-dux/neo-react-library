import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { getExpandableChipClassNames } from "./ExpandableChip";
import * as ChipsStories from "./ExpandableChip.stories";

jest.spyOn(console, "warn").mockImplementation(() => {});

const { Default, Success, Info, AlertWithTooltip, Warning, TooltipTopLeft } =
  composeStories(ChipsStories);

describe("Basic Chip: ", () => {
  describe("Default", () => {
    let renderResult;
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
  describe("Success", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Success />);
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
  describe("Info", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Info />);
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
  describe("Alert", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<AlertWithTooltip />);
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
    it("should render tooltip", async () => {
      const { getByRole } = renderResult;
      const tooltip = await getByRole("tooltip");
      expect(tooltip).toHaveTextContent(/Alert/i);
    });
  });
  describe("Warning", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Warning />);
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
  describe("TooltipTopLeft", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<TooltipTopLeft />);
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

describe("getExpandableChipClassNames", () => {
  it("given `variant = alert` and `disabled = false` and `withinChipContainer = false`, should return correct css names", () => {
    expect(
      getExpandableChipClassNames("alert", false, false)
    ).toMatchInlineSnapshot(
      `"neo-chip neo-chip--alert neo-chip--expandable neo-chip--expandable--alert"`
    );
  });
  it("given `variant = alert` and `disabled = true` and `withinChipContainer = false`, should return correct css names", () => {
    expect(
      getExpandableChipClassNames("alert", true, false)
    ).toMatchInlineSnapshot(
      `"neo-chip neo-chip--alert neo-chip--alert--disabled neo-chip--expandable neo-chip--expandable--alert"`
    );
  });
  it("given `variant = alert` and `disabled = true` and `withinChipContainer = true`, should return correct css names", () => {
    expect(
      getExpandableChipClassNames("alert", true, true)
    ).toMatchInlineSnapshot(
      `"neo-chip neo-chip--alert neo-chip--alert--disabled neo-chips__item neo-chip--expandable neo-chip--expandable--alert"`
    );
  });
  it("given `variant = alert` and `disabled = true` and `withinChipContainer = true` and `icon = alert`, should return correct css names", () => {
    expect(
      getExpandableChipClassNames("alert", true, true, "alert")
    ).toMatchInlineSnapshot(
      `"neo-chip neo-chip--alert neo-chip--alert--disabled neo-chips__item neo-chip--expandable neo-chip--expandable--alert neo-icon-alert"`
    );
  });
});
