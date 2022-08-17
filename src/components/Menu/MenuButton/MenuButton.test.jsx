import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { MenuButton } from ".";

describe("MenuButton", () => {
  it("fully renders without exploding when passed zero params", () => {
    const { getByRole } = render(<MenuButton />);
    const rootElement = getByRole("button");
    expect(rootElement).toBeTruthy();
  });

  it("fully renders without exploding when passed a child", () => {
    const { getByRole } = render(<MenuButton>MenuButton</MenuButton>);
    const rootElement = getByRole("button");
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<MenuButton />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
