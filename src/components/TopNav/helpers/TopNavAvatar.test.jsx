import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Avatar, Menu, MenuItem } from "components";

import { TopNavAvatar } from "./";

describe("TopNavAvatar", () => {
  describe("Avatar without Dropdown tests", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<TopNavAvatar avatar={<Avatar initials="MD" />} />);
    });

    it("renders without exploding", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("renders without Dropdown when props not passed", () => {
      const { getByRole } = renderResult;
      const avatar = getByRole("figure");
      expect(avatar).not.toHaveClass("neo-dropdown__link-header");
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Avatar with Dropdown tests", () => {
    let renderResult;
    const dropdownItems = (
      <Menu itemAlignment="right">
        <MenuItem key={"1"}>Item1</MenuItem>
        <MenuItem key={"3"}>Item3</MenuItem>
      </Menu>
    );
    beforeEach(() => {
      renderResult = render(
        <TopNavAvatar
          avatar={<Avatar initials="MD" />}
          dropdown={dropdownItems}
        />
      );
    });

    it("renders without exploding", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("renders with Dropdown when props passed", () => {
      const { getByRole } = renderResult;
      const avatar = getByRole("figure");
      expect(avatar).toHaveClass("neo-dropdown__link-header");
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
