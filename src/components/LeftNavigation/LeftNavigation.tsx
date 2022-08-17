import { useCallback, useId, useMemo, useState } from "react";
import { RovingTabIndexProvider } from "react-roving-tabindex";

import { LeftNavProps, NavigationContextType } from "./LeftNavigationTypes";
import { NavigationContext } from "./NavigationContext";

/**
 * This is the main Left Navigation outer container that contains all other subComponents
 *
 * @example
 * <LeftNavigation>
*   <NavCategory>
*     <LinkItem> First Item </LinkItem>
*     <LinkItem> Second Item </LinkItem>
*     <LinkItem> Third Item </LinkItem>
*   </NavCategory>
*   <TopLinkItem icon="call"/>
*   <NavCategory>
*     <LinkItem active> First Item </LinkItem>
*     <LinkItem> Second Item </LinkItem>
*   </NavCategory>
* </LeftNavigation>


 * @see https://design.avayacloud.com/components/web/left-nav-web
 */
export const LeftNavigation = ({
  children,
  currentUrl = "",
  onNavigate,
  ...rest
}: LeftNavProps) => {
  if (!rest["aria-label"]) {
    console.error(
      "A descriptive ariaLabel prop value is required for screen readers to identify the navigation component"
    );
  }

  const [curUrl, setCurUrl] = useState(currentUrl);

  const navId = useMemo(() => useId(), []);

  const handleSelectedLink = useCallback(
    (id: string, url: string) => {
      setCurUrl(url);

      if (onNavigate) {
        onNavigate(id, url);
      }
    },
    [onNavigate]
  );

  const navContext: NavigationContextType = {
    currentUrl: curUrl,
    onSelectedLink: handleSelectedLink,
  };

  return (
    <RovingTabIndexProvider
      options={{ direction: "vertical", focusOnClick: true }}
    >
      <NavigationContext.Provider value={navContext}>
        <div id={navId} className="neo-leftnav--wrapper">
          <nav className="neo-leftnav">
            <ul className="neo-leftnav__nav">{children}</ul>
          </nav>
        </div>
      </NavigationContext.Provider>
    </RovingTabIndexProvider>
  );
};
