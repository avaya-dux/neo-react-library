import { Meta, Story } from "@storybook/react";
import log from "loglevel";
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
const menuItemLogger = log.getLogger("menu-item");
menuItemLogger.enableAll();
const keyboardLogger = log.getLogger("menu-keyboard-event-handler");
keyboardLogger.enableAll();
const mouseLogger = log.getLogger("menu-mouse-event-handler");
mouseLogger.enableAll();
const menuHelpersLogger = log.getLogger("menu-helpers");
menuHelpersLogger.enableAll();

export const SimpleMenu = () => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu menuRootElement={<MenuButton>Open Menu</MenuButton>}>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </Menu>
      <Menu
        positionToToggle="right"
        menuRootElement={<MenuButton>Multilevel Right</MenuButton>}
      >
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

      <Menu
        menuRootElement={<MenuButton>To the right of Toggle</MenuButton>}
        positionToToggle="right"
      >
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </Menu>
      <Menu
        menuRootElement={<MenuButton>To the left of Toggle</MenuButton>}
        positionToToggle="left"
      >
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </Menu>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        bottom: "50px",
        width: "100%",
      }}
    >
      <Menu menuRootElement={<MenuButton>Open Menu</MenuButton>}>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </Menu>
      <Menu
        positionToToggle="right"
        menuRootElement={<MenuButton>Multilevel Right</MenuButton>}
      >
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
      <Menu
        menuRootElement={<MenuButton>To the right of Toggle</MenuButton>}
        positionToToggle="right"
      >
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </Menu>
      <Menu
        menuRootElement={<MenuButton>To the left of Toggle</MenuButton>}
        positionToToggle="left"
      >
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </Menu>
    </div>
  </div>
);

export const RTLExample = () => (
  <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
    <div dir="ltr">
      <h2>LTR Menu Layout</h2>
      <Menu menuRootElement={<MenuButton>Open Menu</MenuButton>}>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <SubMenu menuRootElement={<MenuItem>Sub Menu</MenuItem>}>
          <MenuItem>Sub Item1</MenuItem>
          <MenuItem>Sub Item2</MenuItem>
          <MenuItem>Sub Item3</MenuItem>
          <SubMenu menuRootElement={<MenuItem>Sub-sub SubMenu</MenuItem>}>
            <MenuItem>Sub-sub Item1</MenuItem>
            <MenuItem>Sub-sub Item2</MenuItem>
            <MenuItem>Sub-sub Item3</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>

    <div dir="rtl">
      <h2>RTL Menu Layout</h2>
      <Menu menuRootElement={<MenuButton>Open Menu</MenuButton>}>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <SubMenu menuRootElement={<MenuItem>Sub Menu</MenuItem>}>
          <MenuItem>Sub Item1</MenuItem>
          <MenuItem>Sub Item2</MenuItem>
          <MenuItem>Sub Item3</MenuItem>
          <SubMenu menuRootElement={<MenuItem>Sub-sub SubMenu</MenuItem>}>
            <MenuItem>Sub-sub Item1</MenuItem>
            <MenuItem>Sub-sub Item2</MenuItem>
            <MenuItem>Sub-sub Item3</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  </div>
);

export const UpGoingMenus = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eum
      cupiditate dolorum nihil, quo a impedit tenetur delectus repellat totam
      possimus inventore corrupti dolor. Nobis deserunt aspernatur temporibus
      nemo dolores?
    </p>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        bottom: "50px",
        width: "90%",
      }}
    >
      <Menu menuRootElement={<MenuButton>Multilevel Menu</MenuButton>}>
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
      |
      <Menu menuRootElement={<MenuButton>Simple & Left Align</MenuButton>}>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </Menu>
      |
      <Menu
        itemAlignment="right"
        menuRootElement={<MenuButton>Simple & Right Align</MenuButton>}
      >
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </Menu>
    </div>
  </>
);
const Template: Story<MenuProps> = ({ children, ...rest }: MenuProps) => (
  <section
    style={{
      display: "flex",
      justifyContent: "center",
    }}
  >
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
  <section>
    <Menu menuRootElement={<MenuButton />}>
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <MenuSeparator />
      <MenuItem>Menu Item 3</MenuItem>
      <MenuItem>Menu Item 4</MenuItem>
    </Menu>
  </section>
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
