import { Meta, Story } from "@storybook/react/types-6-0";
import { cloneElement, FormEvent, useState } from "react";

import {
  AgentCard,
  Avatar,
  LinkItem,
  Menu,
  MenuButton,
  MenuItem,
  NavCategory,
  SubMenu,
  Tab,
  TabList,
  Tabs,
  TextInput,
} from "components";

import { Navbar, NavbarProps } from ".";
import { LinkLogo, Logo } from "./LeftContent";
import fpo from "./logo-fpo.png";
import { NavbarAvatar, NavbarButton } from "./RightContent";

export default {
  title: "Components/Navbar",
  component: Navbar,
} as Meta<NavbarProps>;

const logo = <Logo src={fpo} />;

const linkLogo = (
  <LinkLogo
    link="https://design.avayacloud.com"
    src={fpo}
    alt="Link to Avaya"
  />
);

const search = (
  <TextInput
    clearable={true}
    disabled={false}
    placeholder="Search"
    startIcon="search"
    aria-label="search"
  />
);

const navbarAvatar = (
  <NavbarAvatar
    avatar={<Avatar initials="MD" />}
    dropdown={
      <Menu
        itemAlignment="right"
        menuRootElement={
          <MenuButton onClick={() => console.log("Functional Menu opened")}>
            Functional Menu
          </MenuButton>
        }
      >
        <MenuItem key={"1"}>Item1</MenuItem>
        <SubMenu key={"2"} menuRootElement={<MenuItem>Sub Menu</MenuItem>}>
          <MenuItem key={"2-1"}>Sub Item1</MenuItem>
          <MenuItem key={"2-2"}>Sub Item2</MenuItem>
        </SubMenu>
        <MenuItem key={"3"}>Item3</MenuItem>
      </Menu>
    }
  />
);

const Template: Story<NavbarProps> = (props: NavbarProps) => {
  return <Navbar {...props} />;
};

export const BasicNavbar = Template.bind({});
BasicNavbar.args = {
  logo,
};

export const AltNavbarWithNavigationToggle = () => {
  const [displayLeftNav, setDisplayLeftNav] = useState(false);

  return (
    <section>
      <Navbar
        logo={
          <Logo src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png" />
        }
        navButtons={[
          <NavbarButton
            key="1"
            aria-label="Toggle Menu"
            onClick={() => setDisplayLeftNav(!displayLeftNav)}
          />,
        ]}
      />

      {displayLeftNav && (
        <div
          className={
            displayLeftNav
              ? "neo-slide neo-slide--in-left neo-leftnav--collapsible"
              : "neo-leftnav--collapsible neo-slide neo-slide--out-left"
          }
          style={{ width: "15%" }}
        >
          <div className="neo-leftnav--wrapper">
            <nav className="neo-leftnav">
              <ul className="neo-leftnav__nav">
                <NavCategory icon="audio-on" label="Collapsed">
                  <LinkItem href="#fake"> First Item </LinkItem>
                  <LinkItem href="#fake"> Second Item </LinkItem>
                  <LinkItem href="#fake"> Third Item </LinkItem>
                  <LinkItem href="#fake"> Fourth Item </LinkItem>
                </NavCategory>
                <NavCategory active expanded icon="call" label="Active">
                  <LinkItem href="#fake"> Item 1 </LinkItem>
                  <LinkItem href="#fake" active={true}>
                    Active Item 2
                  </LinkItem>
                  <LinkItem href="#fake"> Item 3</LinkItem>
                </NavCategory>
                <NavCategory
                  disabled
                  icon="available"
                  label="Disabled Category"
                >
                  <LinkItem href="#fake"> First Item </LinkItem>
                  <LinkItem href="#fake"> Second Item </LinkItem>
                </NavCategory>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </section>
  );
};

const navMenuToggleBtn = <NavbarButton aria-label="Toggle Menu" icon="menu" />;
export const NavbarWithNavigationToggle = Template.bind({});
NavbarWithNavigationToggle.args = {
  logo: linkLogo,
  skipLabel: "Skip it!",
  skipHref: "http://google.com",
  navMenuToggleBtn,
};
NavbarWithNavigationToggle.decorators = [
  (Story, context) => {
    const [displayLeftNav, setDisplayLeftNav] = useState(false);

    const args = { ...context.args };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const navMenuToggleWithHandler = cloneElement(args.navMenuToggleBtn!, {
      onClick: () => setDisplayLeftNav(!displayLeftNav),
    });

    return (
      <>
        <Story args={{ ...args, navMenuToggleBtn: navMenuToggleWithHandler }} />
        {displayLeftNav && (
          <div
            className={
              displayLeftNav
                ? "neo-slide neo-slide--in-left neo-leftnav--collapsible"
                : "neo-leftnav--collapsible neo-slide neo-slide--out-left"
            }
            style={{ width: "15%" }}
          >
            <div className="neo-leftnav--wrapper">
              <nav className="neo-leftnav">
                <ul className="neo-leftnav__nav">
                  <NavCategory icon="audio-on" label="Collapsed">
                    <LinkItem href="#fake"> First Item </LinkItem>
                    <LinkItem href="#fake"> Second Item </LinkItem>
                    <LinkItem href="#fake"> Third Item </LinkItem>
                    <LinkItem href="#fake"> Fourth Item </LinkItem>
                  </NavCategory>
                  <NavCategory active expanded icon="call" label="Active">
                    <LinkItem href="#fake"> Item 1 </LinkItem>
                    <LinkItem href="#fake" active={true}>
                      Active Item 2
                    </LinkItem>
                    <LinkItem href="#fake"> Item 3</LinkItem>
                  </NavCategory>
                  <NavCategory
                    disabled
                    icon="available"
                    label="Disabled Category"
                  >
                    <LinkItem href="#fake"> First Item </LinkItem>
                    <LinkItem href="#fake"> Second Item </LinkItem>
                  </NavCategory>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  },
];

export const NavbarWithTitle = Template.bind({});
NavbarWithTitle.args = {
  logo,
  title: "Product Name",
};

export const NavbarWithSearch = Template.bind({});
NavbarWithSearch.args = {
  logo,
  search,
};
NavbarWithSearch.decorators = [
  (Story, context) => {
    const [searchString, setSearchString] = useState("");

    const captureSearchString = (e: FormEvent) => {
      setSearchString((e.target as HTMLInputElement).value);
    };

    const args = { ...context.args };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const searchWithHandler = cloneElement(args.search!, {
      onChange: captureSearchString,
    });

    return (
      <>
        <Story args={{ ...args, search: searchWithHandler }} />
        <p>You are searching for: {searchString}</p>
      </>
    );
  },
];

export const NavbarWithNavButtons = Template.bind({});
NavbarWithNavButtons.args = {
  logo,
  navButtons: [
    <NavbarButton icon="info" aria-label="Info" key="info" />,
    <NavbarButton icon="settings" aria-label="Settings" key="settings" />,
  ],
};

export const NavbarWithAvatar = Template.bind({});
NavbarWithAvatar.args = {
  logo,
  userOptions: navbarAvatar,
  navButtons: [
    <NavbarButton icon="info" aria-label="Info" key="info" />,
    <NavbarButton icon="settings" aria-label="Settings" key="settings" />,
  ],
};

export const NavbarWithAvatarAndDropdown = Template.bind({});
NavbarWithAvatarAndDropdown.args = {
  logo,
  userOptions: navbarAvatar,
};

export const NavbarWithTabs = () => {
  const [activeTabPanelIndex, setActiveTabPanelIndex] = useState(0);
  const contentToToggle = ["Tab 1 content", "Tab 2 content", "Tab 3 content"];
  return (
    <>
      <Navbar
        logo={logo}
        navbarTabs={
          <Tabs onTabPanelChange={setActiveTabPanelIndex}>
            <TabList>
              <Tab id="tab1" onClick={() => alert("Clicked")}>
                Tab1
              </Tab>
              <Tab id="tab2">Tab2</Tab>
              <Tab id="tab3">Tab3</Tab>
            </TabList>
          </Tabs>
        }
      />
      <h4 style={{ marginTop: "30px" }}>
        {contentToToggle[activeTabPanelIndex]}
      </h4>
    </>
  );
};

export const StickyNavbar: Story<NavbarProps> = () => {
  return (
    <>
      <Navbar logo={logo} sticky />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        egestas orci sit amet mi dapibus condimentum. Etiam placerat facilisis
        velit in congue. Donec ut commodo augue, quis hendrerit lorem. Etiam ac
        pulvinar magna. Etiam vel eros euismod, imperdiet sem sit amet,
        ultricies nisl. Duis consectetur vitae sapien et blandit. Cras vel
        eleifend justo. In interdum aliquam diam ut porta. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Integer turpis eros, dignissim non
        elit eget, mollis dapibus massa. Maecenas ultricies vulputate lacinia.
        Vestibulum blandit leo erat, eget semper eros rhoncus ac. Proin quis
        purus quis magna dignissim sollicitudin eu auctor mauris. Mauris quis
        purus sed mauris commodo viverra. Vivamus porttitor consequat facilisis.
        Aenean dignissim tortor ac dapibus sollicitudin. Duis tempor sapien in
        ante eleifend ornare. Praesent viverra lectus vitae nunc semper viverra.
        Nunc sit amet tincidunt dolor. Aliquam consectetur nunc eget pharetra
        molestie. Integer molestie sollicitudin dapibus. Nulla facilisi. Integer
        congue bibendum urna ut pretium. Nulla vitae bibendum purus. Integer dui
        ligula, varius nec porttitor malesuada, fringilla id ante. Nunc sagittis
        luctus enim, eu vestibulum ante egestas quis. Nam ut porttitor metus,
        nec sodales velit. Fusce et est fringilla, convallis diam fermentum,
        auctor libero. Maecenas interdum neque quis quam tempus, quis facilisis
        odio pellentesque. Vivamus mattis ante a accumsan gravida. Nullam
        volutpat pulvinar feugiat. Sed bibendum erat velit, sagittis tempor eros
        condimentum ut. Suspendisse feugiat nec odio at maximus. Integer nec
        ligula ac felis porttitor consequat et id nisl. Donec vulputate massa
        massa, nec lobortis magna lobortis vitae. Pellentesque pharetra
        tincidunt libero, ac porta eros sagittis sed. Proin porttitor id purus
        eu rhoncus. Vestibulum pellentesque orci eget euismod blandit. Aenean
        nec quam eu lectus vulputate tincidunt. Aenean dictum in urna sit amet
        malesuada. Integer at mauris vel purus pellentesque volutpat at nec
        tellus. Cras at pulvinar felis. Proin vel leo in ex porta porta ut sed
        nisi. Etiam volutpat metus risus, et vestibulum magna malesuada semper.
        In condimentum elit felis, at auctor lectus elementum sit amet. Sed
        vehicula tellus enim, facilisis mollis turpis imperdiet ac. Morbi et
        odio at ipsum ullamcorper mollis. Sed vestibulum, mauris vitae hendrerit
        eleifend, nisl arcu imperdiet ex, ut bibendum eros urna quis orci.
        Maecenas urna libero, condimentum id dignissim id, semper sed velit.
        Duis sodales est eu mauris ma
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        egestas orci sit amet mi dapibus condimentum. Etiam placerat facilisis
        velit in congue. Donec ut commodo augue, quis hendrerit lorem. Etiam ac
        pulvinar magna. Etiam vel eros euismod, imperdiet sem sit amet,
        ultricies nisl. Duis consectetur vitae sapien et blandit. Cras vel
        eleifend justo. In interdum aliquam diam ut porta. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Integer turpis eros, dignissim non
        elit eget, mollis dapibus massa. Maecenas ultricies vulputate lacinia.
        Vestibulum blandit leo erat, eget semper eros rhoncus ac. Proin quis
        purus quis magna dignissim sollicitudin eu auctor mauris. Mauris quis
        purus sed mauris commodo viverra. Vivamus porttitor consequat facilisis.
        Aenean dignissim tortor ac dapibus sollicitudin. Duis tempor sapien in
        ante eleifend ornare. Praesent viverra lectus vitae nunc semper viverra.
        Nunc sit amet tincidunt dolor. Aliquam consectetur nunc eget pharetra
        molestie. Integer molestie sollicitudin dapibus. Nulla facilisi. Integer
        congue bibendum urna ut pretium. Nulla vitae bibendum purus. Integer dui
        ligula, varius nec porttitor malesuada, fringilla id ante. Nunc sagittis
        luctus enim, eu vestibulum ante egestas quis. Nam ut porttitor metus,
        nec sodales velit. Fusce et est fringilla, convallis diam fermentum,
        auctor libero. Maecenas interdum neque quis quam tempus, quis facilisis
        odio pellentesque. Vivamus mattis ante a accumsan gravida. Nullam
        volutpat pulvinar feugiat. Sed bibendum erat velit, sagittis tempor eros
        condimentum ut. Suspendisse feugiat nec odio at maximus. Integer nec
        ligula ac felis porttitor consequat et id nisl. Donec vulputate massa
        massa, nec lobortis magna lobortis vitae. Pellentesque pharetra
        tincidunt libero, ac porta eros sagittis sed. Proin porttitor id purus
        eu rhoncus. Vestibulum pellentesque orci eget euismod blandit. Aenean
        nec quam eu lectus vulputate tincidunt. Aenean dictum in urna sit amet
        malesuada. Integer at mauris vel purus pellentesque volutpat at nec
        tellus. Cras at pulvinar felis. Proin vel leo in ex porta porta ut sed
        nisi. Etiam volutpat metus risus, et vestibulum magna malesuada semper.
        In condimentum elit felis, at auctor lectus elementum sit amet. Sed
        vehicula tellus enim, facilisis mollis turpis imperdiet ac. Morbi et
        odio at ipsum ullamcorper mollis. Sed vestibulum, mauris vitae hendrerit
        eleifend, nisl arcu imperdiet ex, ut bibendum eros urna quis orci.
        Maecenas urna libero, condimentum id dignissim id, semper sed velit.
        Duis sodales est eu mauris ma
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        egestas orci sit amet mi dapibus condimentum. Etiam placerat facilisis
        velit in congue. Donec ut commodo augue, quis hendrerit lorem. Etiam ac
        pulvinar magna. Etiam vel eros euismod, imperdiet sem sit amet,
        ultricies nisl. Duis consectetur vitae sapien et blandit. Cras vel
        eleifend justo. In interdum aliquam diam ut porta. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Integer turpis eros, dignissim non
        elit eget, mollis dapibus massa. Maecenas ultricies vulputate lacinia.
        Vestibulum blandit leo erat, eget semper eros rhoncus ac. Proin quis
        purus quis magna dignissim sollicitudin eu auctor mauris. Mauris quis
        purus sed mauris commodo viverra. Vivamus porttitor consequat facilisis.
        Aenean dignissim tortor ac dapibus sollicitudin. Duis tempor sapien in
        ante eleifend ornare. Praesent viverra lectus vitae nunc semper viverra.
        Nunc sit amet tincidunt dolor. Aliquam consectetur nunc eget pharetra
        molestie. Integer molestie sollicitudin dapibus. Nulla facilisi. Integer
        congue bibendum urna ut pretium. Nulla vitae bibendum purus. Integer dui
        ligula, varius nec porttitor malesuada, fringilla id ante. Nunc sagittis
        luctus enim, eu vestibulum ante egestas quis. Nam ut porttitor metus,
        nec sodales velit. Fusce et est fringilla, convallis diam fermentum,
        auctor libero. Maecenas interdum neque quis quam tempus, quis facilisis
        odio pellentesque. Vivamus mattis ante a accumsan gravida. Nullam
        volutpat pulvinar feugiat. Sed bibendum erat velit, sagittis tempor eros
        condimentum ut. Suspendisse feugiat nec odio at maximus. Integer nec
        ligula ac felis porttitor consequat et id nisl. Donec vulputate massa
        massa, nec lobortis magna lobortis vitae. Pellentesque pharetra
        tincidunt libero, ac porta eros sagittis sed. Proin porttitor id purus
        eu rhoncus. Vestibulum pellentesque orci eget euismod blandit. Aenean
        nec quam eu lectus vulputate tincidunt. Aenean dictum in urna sit amet
        malesuada. Integer at mauris vel purus pellentesque volutpat at nec
        tellus. Cras at pulvinar felis. Proin vel leo in ex porta porta ut sed
        nisi. Etiam volutpat metus risus, et vestibulum magna malesuada semper.
        In condimentum elit felis, at auctor lectus elementum sit amet. Sed
        vehicula tellus enim, facilisis mollis turpis imperdiet ac. Morbi et
        odio at ipsum ullamcorper mollis. Sed vestibulum, mauris vitae hendrerit
        eleifend, nisl arcu imperdiet ex, ut bibendum eros urna quis orci.
        Maecenas urna libero, condimentum id dignissim id, semper sed velit.
        Duis sodales est eu mauris ma
      </p>
    </>
  );
};

export const NavbarWithAgentCard = () => {
  return (
    <Navbar
      logo={logo}
      userOptions={
        <AgentCard
          agentName="Bob Boberson"
          agentStatus="connected"
          avatar={<Avatar />}
        />
      }
    />
  );
};
