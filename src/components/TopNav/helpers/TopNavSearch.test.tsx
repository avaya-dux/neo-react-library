import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { TopNavSearch } from ".";

describe("TopNavSearch", () => {
  const text = "Search";

  it("renders without exploding", () => {
    render(<TopNavSearch />);

    expect(screen.getByRole("button")).toBeDefined();
    expect(screen.getByLabelText(text)).toBeDefined();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<TopNavSearch />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
