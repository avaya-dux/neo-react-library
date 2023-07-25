import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { UserEventKeys } from "utils";

import { Link } from "./Link";
import { Default, Misc } from "./Link.stories";

describe("Link", () => {
  const user = userEvent.setup();
  it("onClick is called when clicked", async () => {
    const onClick = vi.fn();
    render(
      <Link onClick={onClick} href="#main">
        Link
      </Link>,
    );
    const link = screen.getByRole("link");
    await user.click(link);
    expect(onClick).toBeCalled();
  });
  it("onClick is not called on a disabled link when clicked", async () => {
    const onClick = vi.fn();
    render(
      <Link onClick={onClick} href="#main" disabled>
        Link
      </Link>,
    );
    const link = screen.getByRole("link");
    await user.click(link);
    expect(onClick).not.toBeCalled();
  });
  it("onKeyDown is called when enter is pressed", async () => {
    const onKeyDown = vi.fn();
    render(
      <Link onKeyDown={onKeyDown} href="#main">
        Link
      </Link>,
    );
    const link = screen.getByRole("link");
    await user.tab();
    expect(link).toHaveFocus();
    await user.keyboard(UserEventKeys.ENTER);
    expect(onKeyDown).toBeCalled();
  });
  it("onKeyDown is not called when enter is pressed", async () => {
    const onKeyDown = vi.fn();
    render(
      <Link onKeyDown={onKeyDown} href="#main" disabled>
        Link
      </Link>,
    );
    const link = screen.getByRole("link");
    await user.tab();
    expect(link).toHaveFocus();
    await user.keyboard(UserEventKeys.ENTER);
    expect(onKeyDown).not.toBeCalled();
  });
  describe("storybook tests", () => {
    describe("Default", () => {
      let renderResult: RenderResult;

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
    describe("Misc", () => {
      let renderResult: RenderResult;

      beforeEach(() => {
        renderResult = render(<Misc />);
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
