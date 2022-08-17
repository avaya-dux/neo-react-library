import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { Button } from "components/Button";

import { Branch } from ".";
import { Leaf, Tree } from "..";

describe("Tree", () => {
  it("fully renders without exploding", () => {
    render(
      <Tree aria-label="tree-root">
        <Branch title="example">
          <Leaf>one</Leaf>
          <Leaf>two</Leaf>
        </Branch>
      </Tree>
    );

    const treeitems = screen.getAllByRole("treeitem");
    expect(treeitems).toHaveLength(3);

    const groupUl = screen.getByRole("group");
    expect(groupUl).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <Tree aria-label="tree-root">
        <Branch title="example">
          <Leaf>one</Leaf>
        </Branch>
      </Tree>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("a `disabled` Branch does not expand when clicked, and has `tabIndex='-1'`", () => {
    render(
      <Tree aria-label="tree-root">
        <Branch title="example" disabled>
          <Leaf>one</Leaf>
          <Leaf>two</Leaf>
        </Branch>
      </Tree>
    );

    const treeitems = screen.getAllByRole("treeitem");
    treeitems.shift(); // remove "branch" so that we can inspect the leaves

    treeitems.forEach((treeitem) => {
      expect(treeitem).toHaveClass("neo-treeview__item--disabled");
      expect(treeitem).toHaveAttribute("tabIndex", "-1");
    });

    const groupOfLeaves = screen.getByRole("group");
    expect(groupOfLeaves).toHaveAttribute("aria-expanded", "false");

    const branch = screen.getByRole("button");
    userEvent.click(branch);

    // still not expanded
    expect(groupOfLeaves).toHaveAttribute("aria-expanded", "false");

    userEvent.keyboard("{enter}");

    // still not expanded
    expect(groupOfLeaves).toHaveAttribute("aria-expanded", "false");
  });

  describe("interactivity", () => {
    const treeitemText = "treeitem";
    const buttonText = "button";
    const subTreeText = "sub tree";
    let container;

    beforeEach(() => {
      const { container: c } = render(
        <Tree aria-label="testing tree">
          <Branch
            title={subTreeText}
            actions={<Button key="btn-one">{buttonText}</Button>}
          >
            <Leaf>{treeitemText}</Leaf>
          </Branch>
        </Tree>
      );

      container = c;
    });

    it("expands and collapses when sub-menu is clicked", () => {
      const subtreeEdges = screen.getByRole("group");
      const subtreeTitle = screen.getByText(subTreeText);

      expect(subtreeEdges).toBeInTheDocument();
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");

      expect(subtreeTitle).toBeInTheDocument();

      userEvent.click(subtreeTitle);

      expect(subtreeEdges).toHaveAttribute("aria-expanded", "true");

      userEvent.click(subtreeTitle);

      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");
    });
    it("does _not_ expand/collapse when `actions` are clicked", () => {
      const subtreeEdges = screen.getByRole("group");
      const button = screen.getByText(buttonText);

      expect(subtreeEdges).toBeInTheDocument();
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");

      expect(button).toBeInTheDocument();

      userEvent.click(button);

      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");
    });

    it("on keyboard space/enter, sets active=>true and toggles expanded", () => {
      const subtreeEdges = screen.getByRole("group");
      const subtreeTitle = screen.getByText(subTreeText);

      expect(subtreeEdges).toBeInTheDocument();
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");

      expect(subtreeTitle).toBeInTheDocument();

      userEvent.click(subtreeTitle);

      expect(subtreeEdges).toHaveAttribute("aria-expanded", "true");

      userEvent.keyboard("{space}");

      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");

      userEvent.keyboard("{enter}");

      expect(subtreeEdges).toHaveAttribute("aria-expanded", "true");
    });

    it("on keyboard left, sets active=>true and expanded=>false", () => {
      const subTreeDiv = container.querySelector(
        "li.neo-treeview__sub-tree-item div"
      );
      const subtreeEdges = screen.getByRole("group");
      const subtreeTitle = screen.getByText(subTreeText);

      expect(subTreeDiv).not.toHaveClass("neo-treeview__item--selected"); // NOT active

      userEvent.click(subtreeTitle);

      expect(subtreeEdges).toHaveAttribute("aria-expanded", "true");

      userEvent.keyboard("{ArrowLeft}");

      expect(subTreeDiv).toHaveClass("neo-treeview__item--selected"); // _is_ active
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");

      userEvent.keyboard("{ArrowLeft}");

      expect(subTreeDiv).toHaveClass("neo-treeview__item--selected"); // _is_ active (still)
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");
    });
    it("on keyboard right, sets active=>true and expanded=>true", () => {
      const subTreeDiv = container.querySelector(
        "li.neo-treeview__sub-tree-item div"
      );
      const subtreeEdges = screen.getByRole("group");
      const subtreeTitle = screen.getByText(subTreeText);

      expect(subTreeDiv).not.toHaveClass("neo-treeview__item--selected"); // NOT active

      userEvent.click(subtreeTitle);

      expect(subtreeEdges).toHaveAttribute("aria-expanded", "true");

      userEvent.keyboard("{ArrowRight}");

      expect(subTreeDiv).toHaveClass("neo-treeview__item--selected"); // _is_ active
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "true");

      userEvent.keyboard("{ArrowRight}");

      expect(subTreeDiv).toHaveClass("neo-treeview__item--selected"); // _is_ active (still)
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "true");
    });
    it("on keyboard up, sets active appropriately", () => {
      const subTreeDiv = container.querySelector(
        "li.neo-treeview__sub-tree-item div"
      );
      const subtreeTitle = screen.getByText(subTreeText);

      expect(subTreeDiv).not.toHaveClass("neo-treeview__item--selected"); // NOT active

      userEvent.click(subtreeTitle);

      expect(subTreeDiv).toHaveClass("neo-treeview__item--selected"); // _is_ active

      userEvent.keyboard("{ArrowDown}");

      expect(subTreeDiv).not.toHaveClass("neo-treeview__item--selected"); // NOT active, cursor is on the next item

      userEvent.keyboard("{ArrowUp}");

      expect(subTreeDiv).toHaveClass("neo-treeview__item--selected"); // _is_ active (again)
    });
    it("on keyboard down, sets active=>false", () => {
      const subTreeDiv = container.querySelector(
        "li.neo-treeview__sub-tree-item div"
      );
      const subtreeTitle = screen.getByText(subTreeText);

      expect(subTreeDiv).not.toHaveClass("neo-treeview__item--selected"); // NOT active

      userEvent.click(subtreeTitle);

      expect(subTreeDiv).toHaveClass("neo-treeview__item--selected"); // _is_ active

      userEvent.keyboard("{ArrowDown}");

      expect(subTreeDiv).not.toHaveClass("neo-treeview__item--selected"); // _is_ NOT active

      userEvent.keyboard("{ArrowDown}");

      expect(subTreeDiv).not.toHaveClass("neo-treeview__item--selected"); // _is_ NOT active (still);
    });
  });
});
