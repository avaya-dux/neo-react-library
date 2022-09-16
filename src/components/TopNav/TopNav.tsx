import clsx from "clsx";
import { cloneElement, useCallback, useEffect, useState } from "react";

import { genId } from "utils";

import { TopNavAvatar, TopNavButton, TopNavSkipNav } from "./helpers";
import { TopNavProps } from "./TopNavTypes";

import "./TopNav_shim.css";

// TODO: NEO-731 - add Search Component to Design System

/**
 * TopNav is used to orient users, and to access different areas within an interface.
 *
 * @example
 * <TopNav
    logo={<Image isDecorativeOrBranding src="link/to/image.png"/>}
    skipNav={<TopNav.SkipNav href="#main-content">Skip To Main Content</TopNav.SkipNav>}
    title="Product Name"
  />
 *
 * @see https://design.avayacloud.com/components/web/navbar-web
 * @see https://neo-react-library-storybook.netlify.app/
 */
export const TopNav = ({
  buttons,
  logo,
  menuToggleBtn,
  search,
  skipNav: skipNavButton,
  sticky,
  tabs,
  title,
  userOptions,
}: TopNavProps) => {
  // TO-DO: NEO-786 - Replace inline styles on line 80 with updated CSS rules to avoid use of <form> element in Navbar
  // TO-DO: NEO-785 - Replace inline styles on line 76 with updated CSS rules for correct styling of 'title' prop
  // TO-DO: NEO-794 - Confirm use-case for Avatar in Navbar without Dropdown and resulting need for inline styles on line 132
  const [ids, setIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setIds([]);
    buttons?.forEach(() => {
      setIds((ids) => (ids = [...ids, genId()]));
    });
  }, [buttons]);

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
        {skipNavButton}

        {menuToggleBtn}

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

        {search && (
          <div style={{ marginLeft: "16px", alignSelf: "center" }}>
            {search}
          </div>
        )}
      </div>

      <div className="neo-nav" style={{ alignItems: "center" }}>
        {tabs}

        {buttons?.map((button, key) =>
          cloneElement(button, {
            key,
            active: ids[key] === activeId,
            id: ids[key],
            onClick: () =>
              navButtonOnClickCallback(key, button.props.handleClick),
          })
        )}

        {userOptions}
      </div>
    </nav>
  );
};
TopNav.displayName = "TopNav";
TopNav.Avatar = TopNavAvatar;
TopNav.Button = TopNavButton;
TopNav.SkipNav = TopNavSkipNav;
