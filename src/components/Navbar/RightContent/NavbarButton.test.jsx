import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { NavbarButton } from "./NavbarButton";

describe("NavbarButton", () => {
  let renderResult;
  const mockCallBack = vi.fn();
  beforeEach(() => {
    renderResult = render(
      <NavbarButton
        icon={"settings"}
        aria-label={"Settings"}
        onClick={mockCallBack}
      />
    );
  });

  it("renders without exploding", () => {
    const { container } = renderResult;
    expect(container).not.toBe(null);
  });

  it("fires click event correctly", () => {
    const { getByRole } = renderResult;
    const button = getByRole("button");
    fireEvent.click(button);
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  it("passes basic axe compliance", async () => {
    const { container } = renderResult;
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
