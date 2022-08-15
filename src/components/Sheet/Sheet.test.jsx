import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { Button } from "components/Button";

import { Sheet } from ".";
import * as SheetStories from "./Sheet.stories";

const { Default, Templated } = composeStories(SheetStories);

describe("Sheet", () => {
  it("fully renders without exploding", () => {
    render(<Sheet aria-label="example sheet">content</Sheet>);

    const rootElement = screen.getByRole("dialog");
    expect(rootElement).toBeInTheDocument();
  });

  it("fully renders with a title without exploding", () => {
    const { getByRole } = render(<Sheet title="example title" />);

    const rootElement = getByRole("dialog");
    expect(rootElement).toBeTruthy();
  });

  it("fully renders with a JSX title without exploding", () => {
    const { getByRole } = render(
      <Sheet title={<span>example JSX title</span>} />
    );

    const rootElement = getByRole("dialog");
    expect(rootElement).toBeTruthy();
  });

  it("fully renders with a title and buttons without exploding", () => {
    const { getByRole } = render(
      <Sheet
        title="example title"
        actions={[<Button key="example1">example</Button>]}
      />
    );

    const rootElement = getByRole("dialog");
    expect(rootElement).toBeTruthy();
  });

  it("allows the passing of `<div>` props", () => {
    render(<Sheet aria-label="basic sheet example" style={{ width: 100 }} />);
    render(<Sheet title="full sheet" style={{ width: 100 }} />);

    const [basicSheetRootElement, sheetRootElement] =
      screen.getAllByRole("dialog");

    expect(basicSheetRootElement).toHaveStyle("width: 100px");
    expect(sheetRootElement).toHaveStyle("width: 100px");
  });

  it("throws error if buttons are passed without a title", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <Sheet
          aria-label="innapropriate aria label, need to use `title` prop"
          actions={[<Button key="example1">example</Button>]}
        />
      )
    ).toThrow();
    expect(spy).toHaveBeenCalled();
  });

  it("throws error if there is no `aria-label` or `title` passed", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Sheet />)).toThrow();
    expect(spy).toHaveBeenCalled();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Sheet title="sheet title" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("`open` functionality", () => {
    it("when `open={true}`, a Sheet's contents _are_ visible and tab-able", () => {
      const btnSpy = jest.fn();
      const buttons = [<Button onClick={btnSpy}>example</Button>];
      render(<Sheet open={true} title="sheet title" actions={buttons} />);

      const sheet = screen.getByRole("dialog");
      expect(sheet).not.toHaveClass("neo-display-none");

      const button = screen.getByRole("button");

      expect(button).not.toHaveFocus();
      userEvent.tab();
      expect(button).toHaveFocus();
      userEvent.click(button);
      expect(btnSpy).toHaveBeenCalledTimes(1);
    });

    it("when `open={false}`, a Sheet's contents are _not_ visible", () => {
      render(<Sheet open={false} title="sheet title" />);

      const sheet = screen.getByRole("dialog");
      expect(sheet).toHaveClass("neo-display-none");
    });

    it("when `open={false}`, a BasicSheet's contents are _not_ visible", () => {
      render(<Sheet aria-label="basic sheet display none" open={false} />);

      const sheet = screen.getByRole("dialog");
      expect(sheet).toHaveClass("neo-slide");
      expect(sheet).toHaveClass("neo-display-none");
      expect(sheet).not.toHaveClass("sheet-horizontal-slide-in-shim");
      expect(sheet).toHaveClass("sheet-horizontal-slide-out-shim");
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
