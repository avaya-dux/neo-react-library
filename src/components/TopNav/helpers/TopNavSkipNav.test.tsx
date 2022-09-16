import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { TopNavSkipNav } from ".";

describe("TopNavSkipNav", () => {
  const text = "Skip To Main Content";
  const href = "#main-content";

  it("renders without exploding", () => {
    render(<TopNavSkipNav href={href}>{text}</TopNavSkipNav>);

    expect(screen.getByRole("link")).toBeDefined();
    expect(screen.getByText(text)).toBeDefined();
  });

  // it("throws an error if no descriptive text is passed", () => {});
  // it("does not throws an error if children are passed", () => {});
  // it("does not throws an error if 'aria-label' are passed", () => {});

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <TopNavSkipNav href={href}>{text}</TopNavSkipNav>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
