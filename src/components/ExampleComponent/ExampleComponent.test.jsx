import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { ExampleComponent } from "./ExampleComponent";
import * as ExampleComponentStories from "./ExampleComponent.stories";

const { DefaultExample, TemplatedExample } = composeStories(
  ExampleComponentStories,
);

describe("ExampleComponent", () => {
  it("fully renders without exploding", () => {
    const passedText = "test";
    render(<ExampleComponent text={passedText} />);

    const rootElement = screen.getByText(passedText);
    expect(rootElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<ExampleComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("throws error if no label is passed", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => null);
    expect(() => render(<ExampleComponent text="error" />)).toThrow();
    expect(spy).toHaveBeenCalled();
  });

  describe("storybook tests", () => {
    describe("DefaultExample", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<DefaultExample />);
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

    describe("TemplatedExample", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<TemplatedExample />);
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
