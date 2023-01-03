import { FC, useCallback, useId, useState } from "react";
import { RovingTabIndexProvider } from "react-roving-tabindex";

import { handleAccessbilityError } from "utils";

import { LeftNavContext } from "./LeftNavContext";
import {
  LeftNavContextType,
  LeftNavProps,
  LeftNavSubComponents,
} from "./LeftNavTypes";
import { LinkItem } from "./LinkItem";
import { NavCategory } from "./NavCategory";
import { TopLinkItem } from "./TopLinkItem";

/**
 * This is the main Left Navigation outer container that contains all other subComponents
 *
 * @example
 * <LeftNav aria-label="Collapsible Navigation Menu">
    <LeftNav.NavCategory icon="audio-on" label="Collapsed">
      <LeftNav.LinkItem href="#first">First Item</LeftNav.LinkItem>
      <LeftNav.LinkItem href="#second">Second Item</LeftNav.LinkItem>
    </LeftNav.NavCategory>
    <LeftNav.NavCategory expanded icon="call" label="Active">
      <LeftNav.LinkItem href="#item1">Item 1</LeftNav.LinkItem>
      <LeftNav.LinkItem href="#item2" active>
        Active Item 2
      </LeftNav.LinkItem>
      <LeftNav.LinkItem href="#item3"> Item 3</LeftNav.LinkItem>
    </LeftNav.NavCategory>
    <LeftNav.NavCategory disabled icon="available" label="Disabled">
      <LeftNav.LinkItem href="#disabled1">First Item</LeftNav.LinkItem>
      <LeftNav.LinkItem href="#disabled2">Second Item</LeftNav.LinkItem>
    </LeftNav.NavCategory>
  </LeftNav>

 * @see https://design.avayacloud.com/components/web/left-nav-web
 */
export const LeftNav: FC<LeftNavProps> & LeftNavSubComponents = ({
  children,
  currentUrl = "",
  onNavigate,
  isActiveOverride,
  ...rest
}: LeftNavProps) => {
  if (!rest["aria-label"]) {
    handleAccessbilityError(
      "A descriptive ariaLabel prop value is required for screen readers to identify the navigation component"
    );
  }

  const [curUrl, setCurUrl] = useState(currentUrl);

  const navId = useId();

  const handleSelectedLink = useCallback(
    (id: string, url: string) => {
      setCurUrl(url);

      if (onNavigate) {
        onNavigate(id, url);
      }
    },
    [onNavigate]
  );

  const navContext: LeftNavContextType = {
    currentUrl: curUrl,
    onSelectedLink: handleSelectedLink,
    isActiveOverride,
  };

  return (
    <RovingTabIndexProvider
      options={{ direction: "vertical", focusOnClick: true }}
    >
      <LeftNavContext.Provider value={navContext}>
        <div id={navId} className="neo-leftnav--wrapper">
          <nav className="neo-leftnav" {...rest}>
            <ul className="neo-leftnav__nav">{children}</ul>
          </nav>
        </div>
      </LeftNavContext.Provider>
    </RovingTabIndexProvider>
  );
};

LeftNav.displayName = "LeftNav";
LeftNav.LinkItem = LinkItem;
LeftNav.NavCategory = NavCategory;
LeftNav.TopLinkItem = TopLinkItem;
