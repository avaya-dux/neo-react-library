import { Meta, Story } from "@storybook/react";
import log from "loglevel";

import { Button } from "components/Button";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuProps,
  MenuSeparator,
  SubMenu,
} from "./";

export default {
  title: "Components/Menu",
  component: Menu,
} as Meta<MenuProps>;

const menuLogger = log.getLogger("menu");
menuLogger.enableAll();
const subMenuLogger = log.getLogger("submenu");
subMenuLogger.enableAll();
const keyboardLogger = log.getLogger("menu-keyboard-event-handler");
keyboardLogger.enableAll();
const mouseLogger = log.getLogger("menu-mouse-event-handler");
mouseLogger.enableAll();
const menuHelpersLogger = log.getLogger("menu-helpers");
menuHelpersLogger.enableAll();

export const SimpleMenu = () => (
  <Menu menuRootElement={<Button>Open Menu</Button>}>
    <MenuItem>Menu Item 1</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
    <MenuItem>Menu Item 3</MenuItem>
  </Menu>
);

const Template: Story<MenuProps> = ({ children, ...rest }: MenuProps) => (
  <section style={{ display: "flex", justifyContent: "center", margin: "300px 50%", width: "200px" }}>
    <Menu {...rest}>{children}</Menu>
  </section>
);
export const SimpleMenuTemplated = Template.bind({});
SimpleMenuTemplated.args = {
  children: [
    <MenuItem key="1">Item1</MenuItem>,
    <MenuItem key="2">Item2</MenuItem>,
    <MenuItem key="3">Item3</MenuItem>,
  ],
  defaultIsOpen: true,
  itemAlignment: "left",
  menuRootElement: <MenuButton>Open Menu</MenuButton>,
  openOnHover: true,
};

export const SimpleMenuRightAlignedTemplated = Template.bind({});
SimpleMenuRightAlignedTemplated.args = {
  menuRootElement: <MenuButton>Open Menu</MenuButton>,
  children: [
    <MenuItem key="1">Item1</MenuItem>,
    <MenuItem key="2">Item2</MenuItem>,
    <MenuItem key="3">Item3</MenuItem>,
  ],
  itemAlignment: "right",
};

export const FunctionalMenu = () => (
  <section>
    <Menu
      onMenuClose={() => console.log("Functional Menu closed")}
      menuRootElement={
        <MenuButton onClick={() => console.log("Functional Menu opened")}>
          Functional Menu
        </MenuButton>
      }
    >
      <MenuItem onClick={() => console.log("first menu item was clicked")}>
        Console log click
      </MenuItem>
      <MenuItem disabled>Menu Item 2</MenuItem>
      <MenuItem>
        <a
          href="https://design.avayacloud.com/components/web/setup-web"
          target="_blank"
          rel="noreferrer"
        >
          Go to Portal
        </a>
      </MenuItem>
    </Menu>
  </section>
);

export const MenuSeperator = () => (
  <Menu menuRootElement={<MenuButton />}>
    <MenuItem>Menu Item 1</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
    <MenuSeparator />
    <MenuItem>Menu Item 3</MenuItem>
    <MenuItem>Menu Item 4</MenuItem>
  </Menu>
);

export const MultiLevelSubMenu = () => (
  <Menu menuRootElement={<MenuButton />}>
    <MenuItem>Item1</MenuItem>
    <SubMenu menuRootElement={<MenuItem>SubMenu</MenuItem>}>
      <MenuItem>Sub Item1</MenuItem>
      <MenuItem>Sub Item2</MenuItem>
      <MenuItem>Sub Item3</MenuItem>
      <SubMenu menuRootElement={<MenuItem>Sub SubMenu</MenuItem>}>
        <MenuItem>Sub Sub Item1</MenuItem>
        <MenuItem>Sub Sub Item2</MenuItem>
        <MenuItem>Sub Sub Item3</MenuItem>
      </SubMenu>
    </SubMenu>
    <MenuItem>Item3</MenuItem>
  </Menu>
);

interface TwoMenuTemplateProps {
  closeOnBlur: boolean;
  onLeftMenuClose: () => void;
  onRightMenuClose: () => void;
}
const TwoMenuTemplate: Story<TwoMenuTemplateProps> = ({
  closeOnBlur,
  onLeftMenuClose,
  onRightMenuClose,
}: TwoMenuTemplateProps) => {
  return (
    <section style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu
        closeOnBlur={closeOnBlur}
        onMenuClose={onLeftMenuClose}
        menuRootElement={<MenuButton>Menu One</MenuButton>}
        itemAlignment="left"
      >
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </Menu>

      <Menu
        closeOnBlur={closeOnBlur}
        onMenuClose={onRightMenuClose}
        menuRootElement={<MenuButton>Menu Two</MenuButton>}
        itemAlignment="right"
      >
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Menu>
    </section>
  );
};

export const TwoMenus = TwoMenuTemplate.bind({});
TwoMenus.args = {
  closeOnBlur: true,
  onLeftMenuClose: () => {
    console.log("left menu closed");
  },
  onRightMenuClose: () => {
    console.log("right menu closed");
  },
};
