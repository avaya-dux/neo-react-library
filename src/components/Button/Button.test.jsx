import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Button } from "./Button";
import * as ButtonStories from "./Button.stories";

const {
  AnimationPulse,
  AnimationSpinner,
  Badge,
  BadgeLongText,
  LeftIconExample,
  RightIconExample,
  WithMultipleChildren,
} = composeStories(ButtonStories);

describe("Button", () => {
  it("fully renders without exploding", () => {
    const { getByTestId } = render(
      <Button data-testid="neo-button">Test</Button>
    );

    const rootElement = getByTestId("neo-button");
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <Button data-testid="neo-button" id="test-axe">
        Button
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should respect the 'badge' prop", () => {
    const badgeText = "100k";
    const { getByTestId } = render(
      <Button data-testid="neo-button" badge={badgeText}>
        badge test
      </Button>
    );
    const rootElement = getByTestId("neo-button");
    expect(rootElement).toHaveAttribute("data-badge", badgeText);
  });

  it("cuts off 'badge' text at 12 characters", () => {
    const badgeText = "12345678901234567";
    const { getByTestId } = render(
      <Button data-testid="neo-button" badge={badgeText}>
        test
      </Button>
    );
    const rootElement = getByTestId("neo-button");

    expect(badgeText.length).toBe(17);
    expect(rootElement).toHaveAttribute("data-badge", badgeText.slice(0, 12));
  });

  it("sets `dir='ltr'` when passed an icon without a position", () => {
    const { getByTestId } = render(
      <Button data-testid="neo-button" icon="settings" />
    );
    const rootElement = getByTestId("neo-button");
    expect(rootElement).toHaveAttribute("dir", "ltr");
  });

  it("sets `dir='rtl'` when passed an icon with a position", () => {
    const { getByTestId } = render(
      <Button data-testid="neo-button" icon="settings" iconPosition="right" />
    );
    const rootElement = getByTestId("neo-button");
    expect(rootElement).toHaveAttribute("dir", "rtl");
  });

  describe("storybook tests", () => {
    describe("AnimationSpinner", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<AnimationSpinner />);
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

    describe("AnimationPulse", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<AnimationPulse />);
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

    describe("Badge", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<Badge />);
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

    describe("BadgeLongText", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<BadgeLongText />);
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

    describe("LeftIconExample", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<LeftIconExample />);
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

    describe("RightIconExample", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<RightIconExample />);
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

    describe("WithMultipleChildren", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<WithMultipleChildren />);
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
