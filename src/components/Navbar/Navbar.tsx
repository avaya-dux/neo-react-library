import clsx from "clsx";
import {
  cloneElement,
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";

import { AgentCardProps } from "components/AgentCard";
import { TabProps } from "components/Tab";
import { TextInputProps } from "components/TextInput";
import { genId } from "utils";

import { LinkLogoProps, LogoProps } from "./LeftContent";
import { NavbarAvatarProps, NavbarButtonProps } from "./RightContent";

export interface NavbarProps {
  logo: ReactElement<LogoProps | LinkLogoProps>;
  // TO:DO: NEO-731 - add Search Component to Design System
  search?: ReactElement<
    Pick<
      TextInputProps,
      | "clearable"
      | "disabled"
      | "placeholder"
      | "value"
      | "startIcon"
      | "aria-label"
      | "onChange"
    >
  >;
  title?: string;
  sticky?: boolean;
  skipLabel?: string;
  skipHref?: string;
  navButtons?: ReactElement<NavbarButtonProps>[];
  navMenuToggleBtn?: ReactElement<Partial<NavbarButtonProps>>;
  navbarTabs?: ReactElement<TabProps>;
  userOptions?: ReactElement<AgentCardProps | NavbarAvatarProps>;
}

/**
 * Navbars are used to orient users, and to access different areas within an interface.
 *
 * This Component receives props for the left and right content areas
 * @example
const exampleNavbarProps: NavbarProps = {
  logo: {
    <Logo src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png" />
  },
  search: {
  <TextInput
    clearable={true}
    disabled={false}
    placeholder="Search"
    startIcon="search"
    aria-label="search"
  />
  },
  title: "Product Name",
  skipLabel: "Skip to main content",
  skipHref: "#content",
  navButtons: [
    <NavbarButton icon="info" aria-label="Info" />,
    <NavbarButton icon="settings" aria-label="Settings" />,
  ],
};

return <Navbar {...exampleNavbarProps} />;
 *
 * @see https://design.avayacloud.com/components/web/navbar-web
 */

export const Navbar = ({
  logo,
  search,
  title,
  navButtons,
  navMenuToggleBtn,
  navbarTabs,
  userOptions,
  sticky,
  skipLabel = "Skip to main content",
  skipHref = "#",
}: NavbarProps) => {
  // TO-DO: NEO-786 - Replace inline styles on line 80 with updated CSS rules to avoid use of <form> element in Navbar
  // TO-DO: NEO-785 - Replace inline styles on line 76 with updated CSS rules for correct styling of 'title' prop
  // TO-DO: NEO-794 - Confirm use-case for Avatar in Navbar without Dropdown and resulting need for inline styles on line 132
  const [ids, setIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setIds([]);
    navButtons?.forEach(() => {
      setIds((ids) => (ids = [...ids, genId()]));
    });
  }, [navButtons]);

  const navButtonOnClickCallback = useCallback(
    (id: number, clickHandler?: () => void | Promise<void>) => {
      if (clickHandler) clickHandler();
      setActiveId(ids[id]);
    },
    [ids]
  );

  return (
    <nav className={clsx("neo-navbar", sticky && "neo-navbar--sticky")}>
      <div className="neo-nav--left">
        <a className="neo-skipnav" href={skipHref}>
          {skipLabel}
        </a>
        {navMenuToggleBtn}

        {logo}

        {title && (
          <div
            style={{ fontSize: "19px", lineHeight: "28px", marginLeft: "16px" }}
            role="heading"
            aria-level={1}
          >
            {title}
          </div>
        )}

        {navbarTabs}

        {search && (
          <div style={{ marginLeft: "16px", alignSelf: "center" }}>
            {search}
          </div>
        )}
      </div>

      <div className="neo-nav" style={{ alignItems: "center" }}>
        {navButtons?.map((navButton, key) =>
          cloneElement(navButton, {
            key,
            active: ids[key] === activeId,
            id: ids[key],
            onClick: () =>
              navButtonOnClickCallback(key, navButton.props.handleClick),
          })
        )}
        {userOptions}
      </div>
    </nav>
  );
};
