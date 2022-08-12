import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { InternalTextInputElement, TextInput } from "./TextInput";
import * as TextInputStories from "./TextInput.stories";

const {
  Default,
  DifferentHTMLOutputExamples,
  ErrorState,
  AdornmentIcons,
  AdornmentStrings,
  Clearable,
  ReadOnly,
  Disabled,
  BadAccessibility,
} = composeStories(TextInputStories);

describe("TextInput", () => {
  it("fully renders without exploding", () => {
    const { getByLabelText } = render(<TextInput label="My Label" />);
    const rootElement = getByLabelText("My Label");
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<TextInput label="Has Label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("throws an error without `label` AND `placeholder`", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(<TextInput />);
    }).toThrow();

    expect(errorSpy).toHaveBeenCalled();
  });

  it("does not throw an error with `label` OR `placeholder`", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TextInput label="truthy" />)).not.toThrow();
    expect(() => render(<TextInput placeholder="truthy" />)).not.toThrow();
    expect(() =>
      render(<TextInput label="double" placeholder="truthy" />)
    ).not.toThrow();

    expect(errorSpy).not.toHaveBeenCalled();
  });

  describe("InternalTextInputElement", () => {
    it("fully renders without exploding", () => {
      const testid = "testid";
      const { getByTestId } = render(
        <InternalTextInputElement data-testid={testid} />
      );
      const rootElement = getByTestId(testid);
      expect(rootElement).toBeTruthy();

      expect(rootElement.classList.contains("neo-input")).toBe(true);
      expect(rootElement.classList.length).toBe(1);
      expect(rootElement.tabIndex).toBe(0);
    });

    it("for the `readOnly` usecase, has an extra class name and `tabIndex === -1`", () => {
      const testid = "testid";
      const { getByTestId } = render(
        <InternalTextInputElement data-testid={testid} readOnly />
      );
      const rootElement = getByTestId(testid);
      expect(rootElement).toBeTruthy();

      expect(rootElement.classList.contains("neo-input")).toBe(true);
      expect(rootElement.classList.length).toBe(2);
      expect(rootElement.tabIndex).toBe(-1);
    });

    it("passes basic axe compliance", async () => {
      const internalId = "testid";
      const WrappedInLabel = () => (
        <div>
          <label htmlFor={internalId}>descriptive text</label>
          <InternalTextInputElement internalId={internalId} />
        </div>
      );
      const { container } = render(<WrappedInLabel />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
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

    describe("DifferentHTMLOutputExamples", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<DifferentHTMLOutputExamples />);
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

    describe("ErrorState", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<ErrorState />);
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

    describe("AdornmentIcons", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<AdornmentIcons />);
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

    describe("AdornmentStrings", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<AdornmentStrings />);
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

    describe("Clearable", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<Clearable />);
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

    describe("ReadOnly", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<ReadOnly />);
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

    describe("Disabled", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<Disabled />);
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

    describe("BadAccessibility", () => {
      it("explodes", async () => {
        const errorSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});

        expect(() => {
          render(<BadAccessibility />);
        }).toThrow();

        expect(errorSpy).toHaveBeenCalled();
      });
    });
  });
});
