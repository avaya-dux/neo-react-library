import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import {
  ClosableChip,
  getButtonAriaLabel,
  getClosableChipClassNames,
} from "./ClosableChip";
import * as ClosableChipStories from "./ClosableChip.stories";

jest.spyOn(console, "warn").mockImplementation(() => {});

const {
  ClosableDefault,
  ClosableSuccess,
  ClosableInfo,
  ClosableAlert,
  ClosableWarning,
  ClosableWarningWithTooltip,
} = composeStories(ClosableChipStories);

describe("Closable Chip: ", () => {
  describe("Default", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ClosableDefault />);
    });
    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("button should have proper css", async () => {
      const { findByRole } = renderResult;
      const button = await findByRole("button", { hidden: true });
      expect(button).not.toBe(null);
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
      renderResult = render(<ClosableSuccess />);
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
      renderResult = render(<ClosableInfo />);
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
      renderResult = render(<ClosableAlert />);
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
  describe("Warning", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ClosableWarning />);
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
  describe("Warning with tooltip", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ClosableWarningWithTooltip />);
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
      expect(tooltip).toHaveTextContent(/Warning/i);
    });
  });
  describe("getClosableChipClassNames", () => {
    describe("given icon === info", () => {
      it("given `variant = alert` and `disabled = false` and `withinChipContainer = false`, should return correct css names", () => {
        expect(
          getClosableChipClassNames("alert", false, false)
        ).toMatchInlineSnapshot(
          `"neo-chip neo-chip--alert neo-chip--close neo-chip--close--alert"`
        );
      });
      it("given `variant = alert` and `disabled = true` and `withinChipContainer = false`, should return correct css names", () => {
        expect(
          getClosableChipClassNames("alert", true, false)
        ).toMatchInlineSnapshot(
          `"neo-chip neo-chip--alert neo-chip--alert--disabled neo-chip--close neo-chip--close--alert"`
        );
      });
      it("given `variant = alert` and `disabled = true` and `withinChipContainer = true`, should return correct css names", () => {
        expect(
          getClosableChipClassNames("alert", true, true)
        ).toMatchInlineSnapshot(
          `"neo-chip neo-chip--alert neo-chip--alert--disabled neo-chips__item neo-chip--close neo-chip--close--alert"`
        );
      });
      it("given `variant = alert` and `disabled = true` and `withinChipContainer = true` and `icon = info`, should return correct css names", () => {
        expect(
          getClosableChipClassNames("alert", true, true, "info")
        ).toMatchInlineSnapshot(
          `"neo-chip neo-chip--alert neo-chip--alert--disabled neo-chips__item neo-chip--close neo-chip--close--alert neo-icon-info"`
        );
      });
    });
  });
  describe("props test", () => {
    const closableChip = {
      chiptype: "closable",
      text: "some text",
      id: "1234",
    };
    it("chiptype is forced correctly", () => {
      expect(closableChip.chiptype).toBe("closable");
    });
    it("component.props is the same as input", () => {
      const component = <ClosableChip {...closableChip} />;
      expect(component.props).toEqual(closableChip);
    });
  });
  describe("getButtonAriaLabel", () => {
    it("should return correct value", () => {
      expect(getButtonAriaLabel("test")).toEqual("remove test");
    });
  });
});
