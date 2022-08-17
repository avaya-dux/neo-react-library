import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { Leaf, Tree } from "..";

describe("TreeItem", () => {
  it("fully renders without exploding", () => {
    render(<Leaf>example</Leaf>);

    const rootElement = screen.getByRole("treeitem");
    expect(rootElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <div role="tree">
        <Leaf>example</Leaf>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("adds 'selected' class when treeitem is clicked", () => {
    render(
      <Tree aria-label="tree label">
        <Leaf>example</Leaf>
      </Tree>
    );

    const rootElement = screen.getByRole("treeitem");
    userEvent.click(rootElement);
    expect(rootElement).toHaveClass("neo-treeview__item--selected");
  });
});
