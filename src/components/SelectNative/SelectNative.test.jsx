import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { SelectNative } from ".";
import * as SelectNativeStories from "./SelectNative.stories";

const { FormSubmission, LoadOptions, Templated } =
  composeStories(SelectNativeStories);

describe("SelectNative", () => {
  const defaultLabel = "jest test label";
  const exampleHelperText = "example helper text";
  const exampleErrorText = ["error one", "error two"];

  it("fully renders without exploding", () => {
    const { getByText } = render(<SelectNative label={defaultLabel} />);

    const labelElement = getByText(defaultLabel);
    expect(labelElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<SelectNative label={defaultLabel} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("throws error if no label is passed", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => null);
    expect(() => render(<SelectNative />)).toThrow();
    expect(spy).toHaveBeenCalled();
  });

  describe("helper and error text functionality", () => {
    it("shows helper text when `helperText` is passed", () => {
      const { getByText } = render(
        <SelectNative label={defaultLabel} helperText={exampleHelperText} />
      );

      const labelElement = getByText(defaultLabel);
      expect(labelElement).toBeTruthy();

      const helperElement = getByText(exampleHelperText);
      expect(helperElement).toBeTruthy();
    });

    it("shows error text when `errorText` is passed", () => {
      const { getByText } = render(
        <SelectNative label={defaultLabel} errorList={exampleErrorText} />
      );

      const labelElement = getByText(defaultLabel);
      expect(labelElement).toBeTruthy();

      const errorElementZero = getByText(exampleErrorText[0]);
      expect(errorElementZero).toBeTruthy();
      const errorElementOne = getByText(exampleErrorText[1]);
      expect(errorElementOne).toBeTruthy();
    });

    it("shows both helper and error text when both are passed", () => {
      const { getByText } = render(
        <SelectNative
          label={defaultLabel}
          helperText={exampleHelperText}
          errorList={exampleErrorText}
        />
      );

      const labelElement = getByText(defaultLabel);
      expect(labelElement).toBeTruthy();

      const errorElementZero = getByText(exampleErrorText[0]);
      expect(errorElementZero).toBeTruthy();
      const errorElementOne = getByText(exampleErrorText[1]);
      expect(errorElementOne).toBeTruthy();

      const helperElement = getByText(exampleHelperText);
      expect(helperElement).toBeTruthy();
    });
  });

  describe("storybook tests", () => {
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

      it("passes basic axe compliance when `multiple === true`", async () => {
        const { container } = render(
          <Templated label={defaultLabel} multiple />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("FormSubmission", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<FormSubmission />);
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

    describe("LoadOptions", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<LoadOptions />);
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
