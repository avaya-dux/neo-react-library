import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { CheckboxGroup } from ".";
import * as CheckboxGroupStories from "./CheckboxGroup.stories";
import { DefaultCheckboxArray } from "./helpers";

const { DefaultCheckboxGroup, InlineCheckboxGroup } =
  composeStories(CheckboxGroupStories);

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

const DefaultProps = {
  checkboxes: DefaultCheckboxArray,
  groupName: "Checkbox Group",
  checked: "Check 1",
  onChange: () => null,
};

describe("CheckboxGroup", () => {
  describe("base tests", () => {
    let renderResult;

    beforeEach(() => {
      // ignore tooltip position warning
      vi.spyOn(console, "warn").mockImplementation(() => null);

      renderResult = render(<CheckboxGroup {...DefaultProps} />);
    });

    it("checkbox group renders ok", () => {
      const { getByTestId } = renderResult;
      const rootElement = getByTestId("CheckboxGroup-root");
      expect(rootElement).toBeTruthy();
    });

    it("checkbox renders ok", () => {
      const { getByLabelText } = renderResult;
      const rootElement = getByLabelText(DefaultCheckboxArray[0].label);
      expect(rootElement).toBeTruthy();
    });

    it("checkbox renders with correct class name", () => {
      const { getByLabelText } = renderResult;
      const rootElement = getByLabelText(DefaultCheckboxArray[5].label);
      expect(rootElement).toHaveAttribute(
        "class",
        "neo-check neo-check--indeterminate"
      );
    });

    it("has a value that matches the label", () => {
      const { getByLabelText } = renderResult;
      DefaultCheckboxArray.forEach((checkboxObject) => {
        const check = getByLabelText(checkboxObject.label);
        expect(check).toHaveAttribute("value", checkboxObject.label);
      });
    });

    it("has a correct id when passed", () => {
      const { getByLabelText } = renderResult;
      const check = getByLabelText(DefaultCheckboxArray[2].label);
      expect(check).toHaveAttribute("id", DefaultCheckboxArray[2].id);
    });

    it("renders as disabled", () => {
      const { getByLabelText } = renderResult;
      DefaultCheckboxArray.forEach((checkboxObject) => {
        if (checkboxObject.disabled) {
          const check = getByLabelText(checkboxObject.label);
          expect(check).toHaveAttribute("disabled");
        } else {
          const check = getByLabelText(checkboxObject.label);
          expect(check).not.toHaveAttribute("disabled");
        }
      });
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("storybook tests", () => {
    describe("DefaultCheckboxGroup", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<DefaultCheckboxGroup />);
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

    describe("InlineCheckboxGroup", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<InlineCheckboxGroup />);
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
