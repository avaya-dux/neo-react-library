import { Meta, Story } from "@storybook/react/types-6-0";

import { Icon } from "components";

import { MenuItemProps } from "../MenuTypes";
import { MenuItem } from "./MenuItem";

export default {
  title: "Components/Menu/Menu Item",
  component: MenuItem,
} as Meta<MenuItemProps>;

export const Default = () => {
  return (
    <div role="menu">
      <MenuItem>plain text</MenuItem>

      <MenuItem>
        <span>JSX Node</span>
      </MenuItem>

      <MenuItem>
        text w/ Icon{" "}
        <Icon icon="check" aria-label="example icon in menu item" />
      </MenuItem>
    </div>
  );
};

const Template: Story<MenuItemProps> = (props) => (
  <div role="menu">
    <MenuItem {...props} />;
  </div>
);

export const ItemTemplate = Template.bind({});
ItemTemplate.args = {
  children: "text",
};
