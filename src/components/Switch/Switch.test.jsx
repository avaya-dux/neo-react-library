import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { Switch } from "./";
import * as SwitchStories from "./Switch.stories";

const { Default, FormControl, Template } = composeStories(SwitchStories);

describe("Switch Component", () => {
  const labelText = "example label";

  it("fully renders without exploding", () => {
    render(<Switch>{labelText}</Switch>);
    expect(screen.getByLabelText(labelText)).toBeInTheDocument();

    const input = screen.getByRole("switch");
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Switch>{labelText}</Switch>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("applies `disabled` prop functionality appropriately", () => {
    it("does not allow toggle when disabled", () => {
      render(<Switch disabled>{labelText}</Switch>);

      const input = screen.getByRole("switch");
      expect(input).toBeDisabled();
      expect(input).not.toBeChecked();

      userEvent.click(input);
      expect(input).toBeDisabled();
      expect(input).not.toBeChecked();
    });

    it("toggles Switch when not `disabled`", () => {
      const changeSpy = jest.fn();
      render(<Switch onChange={changeSpy}>{labelText}</Switch>);

      const input = screen.getByRole("switch");
      expect(input).not.toBeDisabled();
      expect(input).not.toBeChecked();

      userEvent.click(input);
      expect(input).toBeChecked();
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("applies the `multiline` and `disabled` classes appropriately", () => {
    it("applies the `multiline` and `disabled` classes when those props are passed", () => {
      const { container } = render(
        <Switch multiline disabled>
          {labelText}
        </Switch>
      );

      const input = container.querySelector("label.neo-switch");
      expect(input).toHaveClass("neo-switch--multiline");
      expect(input).toHaveClass("neo-switch--disabled");
    });

    it("does not apply the `multiline` and `disabled` classes when those props are not passed", () => {
      const { container } = render(<Switch>{labelText}</Switch>);

      const input = container.querySelector("label.neo-switch");
      expect(input).not.toHaveClass("neo-switch--multiline");
      expect(input).not.toHaveClass("neo-switch--disabled");
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

    describe("FormControl", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<FormControl />);
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

    describe("Template", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<Template />);
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
