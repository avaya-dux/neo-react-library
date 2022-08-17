import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Shimmer } from "./";
import * as ShimmerStories from "./Shimmer.stories";

const { Default, Templated } = composeStories(ShimmerStories);

describe("Shimmer", () => {
  it("fully renders without exploding", () => {
    render(<Shimmer />);

    const rootElement = screen.getByRole("alert");
    expect(rootElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Shimmer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("prop tests", () => {
    it("applies the appropriate style for `loopInfinitely={false}`", () => {
      render(<Shimmer loopInfinitely={false} />);

      const rootElement = screen.getByRole("alert");
      expect(rootElement).toHaveClass("neo-shimmer--3-count");
    });
    it("applies the appropriate style for `loopInfinitely={true}`", () => {
      render(<Shimmer loopInfinitely />);

      const rootElement = screen.getByRole("alert");
      expect(rootElement).not.toHaveClass("neo-shimmer--3-count");
    });

    it("applies the appropriate styles for `shape='circle'`", () => {
      render(<Shimmer shape="circle" />);

      const rootElement = screen.getByRole("alert");
      expect(rootElement).toHaveClass("neo-shimmer__circle--medium");
    });
    it("applies the appropriate styles for `shape='circle'` and size is passed", () => {
      render(<Shimmer shape="circle" size="sm" />);
      render(<Shimmer shape="circle" size="md" />);
      render(<Shimmer shape="circle" size="lg" />);

      const [smShimmer, mdShimmer, lgShimmer] = screen.getAllByRole("alert");
      expect(smShimmer).toHaveClass("neo-shimmer__circle--small");
      expect(mdShimmer).toHaveClass("neo-shimmer__circle--medium");
      expect(lgShimmer).toHaveClass("neo-shimmer__circle--large");
    });

    it("applies the appropriate styles for `shape='rectangle'`", () => {
      render(<Shimmer shape="rectangle" />);

      const rootElement = screen.getByRole("alert");
      expect(rootElement).toHaveClass("neo-shimmer__rectangle");
    });
    it("applies the appropriate styles for `shape='rectangle'` and size is passed", () => {
      render(<Shimmer shape="rectangle" size="sm" />);
      render(<Shimmer shape="rectangle" size="md" />);
      render(<Shimmer shape="rectangle" size="lg" />);

      const [smRectangle, mdRectangle, lgRectangle] =
        screen.getAllByRole("alert");
      expect(smRectangle).toHaveClass("neo-shimmer__rectangle sm");
      expect(mdRectangle).toHaveClass("neo-shimmer__rectangle");
      expect(lgRectangle).toHaveClass("neo-shimmer__rectangle lg");
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
