import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { Checkbox } from "./";
import * as CheckboxStories from "./Checkbox.stories";

const { Default, Templated } = composeStories(CheckboxStories);

const DefaultProps = {
  id: "checkbox-id",
  label: "example label",
  onChange: vi.fn(),
  value: "1",
};

describe("Checkbox", () => {
  it("renders as unchecked appropriately", () => {
    const { getByLabelText } = render(<Checkbox {...DefaultProps} />);

    const checkboxElement = getByLabelText(DefaultProps.label);
    expect(checkboxElement.cheched).toBeFalsy();
  });

  it("renders as checked appropriately", () => {
    const { getByLabelText } = render(<Checkbox {...DefaultProps} checked />);

    const checkboxElement = getByLabelText(DefaultProps.label);
    expect(checkboxElement).toBeTruthy();
    expect(checkboxElement.checked).toBeTruthy();
  });

  it("throws if an accessibility issue is discovered", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => null);
    expect(() => render(<Checkbox value="test one" />)).toThrow();
    expect(() =>
      render(<Checkbox value="test one" label="bad accessbility" checked />)
    ).toThrow();
    expect(spy).toHaveBeenCalled();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Checkbox {...DefaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("className is assigned appropriately", () => {
    it("returns the correct class name when passed `true`", () => {
      render(<Checkbox {...DefaultProps} checked />);
      const checkboxElement = screen.getByLabelText(DefaultProps.label);

      expect(checkboxElement).not.toHaveClass("neo-check--indeterminate");
      expect(checkboxElement).toHaveClass("neo-check");
    });

    it("returns the correct class name when passed `false`", () => {
      render(<Checkbox {...DefaultProps} />);
      const checkboxElement = screen.getByLabelText(DefaultProps.label);

      expect(checkboxElement).not.toHaveClass("neo-check--indeterminate");
      expect(checkboxElement).toHaveClass("neo-check");
    });

    it("returns the correct class name when passed `mixed`", () => {
      render(<Checkbox {...DefaultProps} checked="mixed" />);
      const checkboxElement = screen.getByLabelText(DefaultProps.label);

      expect(checkboxElement).toHaveClass("neo-check--indeterminate");
      expect(checkboxElement).toHaveClass("neo-check");
    });

    it("returns the correct class name when passed a `className`", () => {
      const exampleCssClass = "example-css-class";
      render(<Checkbox {...DefaultProps} className={exampleCssClass} />);
      const checkboxElement = screen.getByLabelText(DefaultProps.label);

      expect(checkboxElement).toHaveClass(exampleCssClass);
      expect(checkboxElement).toHaveClass("neo-check");
    });
  });

  describe("storybook tests", () => {
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
});
