import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { TopNavIconButton } from ".";

describe("TopNavIconButton", () => {
  const user = userEvent.setup();
  const icon = "settings";
  const ariaLabel = "Settings";

  it("renders without exploding", () => {
    const badge = "example";
    const { container } = render(
      <TopNavIconButton aria-label={ariaLabel} badge={badge} icon={icon} />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();

    const grid = container.querySelector(`[data-badge="${badge}"]`);
    expect(grid).toHaveClass("neo-badge__icon");
  });

  describe("click events", () => {
    it("fires click event when clicked", async () => {
      const onClickSpy = vi.fn();
      render(
        <TopNavIconButton
          aria-label={ariaLabel}
          icon={icon}
          onClick={onClickSpy}
        />
      );

      expect(onClickSpy).toHaveBeenCalledTimes(0);
      await user.click(screen.getByRole("button"));
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it("does not fire click event if disabled", async () => {
      const onClickSpy = vi.fn();
      render(
        <TopNavIconButton
          aria-label={ariaLabel}
          disabled
          icon={icon}
          onClick={onClickSpy}
        />
      );

      expect(onClickSpy).not.toHaveBeenCalled();
      await user.click(screen.getByRole("button"));
      expect(onClickSpy).not.toHaveBeenCalled();
    });
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <TopNavIconButton aria-label={ariaLabel} icon={icon} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
