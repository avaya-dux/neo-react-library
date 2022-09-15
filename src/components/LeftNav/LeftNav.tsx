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
 * <LeftNav>
    <LeftNav.NavCategory>
      <LeftNav.LinkItem> First Item </LeftNav.LinkItem>
      <LeftNav.LinkItem> Second Item </LeftNav.LinkItem>
      <LeftNav.LinkItem> Third Item </LeftNav.LinkItem>
    </LeftNav.NavCategory>
    <LeftNav.TopLinkItem icon="call"/>
    <LeftNav.NavCategory>
      <LeftNav.LinkItem active> First Item </LeftNav.LinkItem>
      <LeftNav.LinkItem> Second Item </LeftNav.LinkItem>
    </LeftNav.NavCategory>
  </LeftNav>

 * @see https://design.avayacloud.com/components/web/left-nav-web
 */
export const LeftNav: FC<LeftNavProps> & LeftNavSubComponents = ({
  children,
  currentUrl = "",
  onNavigate,
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
  };

  return (
    <RovingTabIndexProvider
      options={{ direction: "vertical", focusOnClick: true }}
    >
      <LeftNavContext.Provider value={navContext}>
        <div id={navId} className="neo-leftnav--wrapper">
          <nav className="neo-leftnav">
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
