import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { Chip } from "./";
import { Closable, Default, Templated } from "./Chip.stories";

describe("Chip", () => {
  const user = userEvent.setup();
  const chipText = "Example Text";

  it("fully renders without exploding", () => {
    render(<Chip>{chipText}</Chip>);

    const element = screen.getByText(chipText);
    expect(element).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Chip>{chipText}</Chip>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("utilizes the `Avatar` component and `avatarInitials` are passed", () => {
    const { container } = render(<Chip avatarInitials="D1">{chipText}</Chip>);
    expect(container.querySelector("figure")).toBeInTheDocument();
  });

  it("removes closable chip from DOM if 'closed'", async () => {
    const spy = vi.fn();
    render(
      <Chip closable onClose={spy}>
        {chipText}
      </Chip>
    );
    expect(spy).not.toHaveBeenCalled();

    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();

    await user.click(btn);
    expect(spy).toHaveBeenCalled();
    expect(btn).not.toBeInTheDocument();
    expect(screen.queryByText(chipText)).not.toBeInTheDocument();
  });

  describe("storybook tests", () => {
    describe("Default", () => {
      let renderResult: RenderResult<
        typeof import("@testing-library/dom/types/queries"),
        HTMLElement,
        HTMLElement
      >;

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

    describe("Closable", () => {
      let renderResult: RenderResult<
        typeof import("@testing-library/dom/types/queries"),
        HTMLElement,
        HTMLElement
      >;

      beforeEach(() => {
        renderResult = render(<Closable />);
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
      let renderResult: RenderResult<
        typeof import("@testing-library/dom/types/queries"),
        HTMLElement,
        HTMLElement
      >;

      beforeEach(() => {
        renderResult = render(<Templated>test</Templated>);
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
