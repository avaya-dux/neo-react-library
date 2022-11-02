import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { Chip } from "./";

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

  it("removes closable chip from DOM if 'closed'", async () => {
    const spy = vi.fn();
    render(
      <Chip closable closeOnClick={spy}>
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
});
