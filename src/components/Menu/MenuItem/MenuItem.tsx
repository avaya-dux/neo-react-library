import clsx from "clsx";
import log from "loglevel";
import { RefObject, useEffect, useId, useRef } from "react";

import { MenuItemProps } from "../MenuTypes";

const logger = log.getLogger("menu-item");
logger.disableAll();

/**
 * The MenuItem is meant to be used as a child of the Menu component. It can take any valid React element as a child.
 *
 * @example
 * <Menu
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
        >
          Go to Portal
        </a>
      </MenuItem>
    </Menu>
 */
export const MenuItem = ({
  children,
  className,
  counter,
  disabled = false,
  hasFocus = false,
  id = useId(),
  isActive = false,
  tabIndex = 0,
  ...rest
}: MenuItemProps) => {
  const ref = useRef(null);

  log.debug(
    `debug menuitem hasFocus = ${hasFocus}, isActive=${isActive}, counter=${counter}`
  );

  // run it in every render
  useEffect(() => {
    log.debug(`trigger focus ${counter}`);
    focus(hasFocus, ref);
  });

  return (
    <div
      {...rest}
      className={clsx(
        "neo-dropdown__link",
        isActive && "neo-dropdown__link-active",
        disabled && "neo-dropdown--disabled",
        className
      )}
      id={id}
      ref={ref}
      role="menuitem"
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};
MenuItem.displayName = "MenuItem";

export const focus = (hasFocus: boolean, ref: RefObject<HTMLDivElement>) => {
  if (hasFocus) {
    log.debug("focusing menu item");
    ref.current?.focus();
  }
};
