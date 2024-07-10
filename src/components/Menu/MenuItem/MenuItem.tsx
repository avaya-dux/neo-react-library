import clsx from "clsx";
import log from "loglevel";
import {
	type KeyboardEvent,
	type KeyboardEventHandler,
	type Ref,
	type RefObject,
	forwardRef,
	useEffect,
	useId,
	useRef,
} from "react";

import { Keys } from "utils";
import type { MenuItemProps } from "../MenuTypes";

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
export const MenuItem = forwardRef(
	(
		{
			children,
			className,
			counter,
			disabled = false,
			hasFocus = false,
			id,
			isActive = false,
			tabIndex = 0,
			onClick,
			onKeyDown,
			...rest
		}: MenuItemProps,
		ref: Ref<HTMLDivElement>,
	) => {
		const generatedId = useId();
		id = id || generatedId;
		const _ref = useRef(null);
		const localRef = ref || _ref;

		logger.debug(
			`debug menuitem hasFocus = ${hasFocus}, isActive=${isActive}, counter=${counter}`,
		);

		const handleMenuItemKeyDown: KeyboardEventHandler = (
			e: KeyboardEvent<HTMLDivElement>,
		) => {
			logger.debug("MenuItem handling keydown event ...");
			if (onKeyDown) {
				onKeyDown(e);
				return;
			}

			switch (e.key) {
				case Keys.ENTER:
				case Keys.SPACE:
					logger.debug("trigger onclick ...");
					if (onClick && e.target === e.currentTarget) {
						const clickEvent = new MouseEvent("click", {
							bubbles: true,
							cancelable: true,
						});
						e.target.dispatchEvent(clickEvent);
					}
					break;
			}
		};

		// run it in every render
		useEffect(() => {
			logger.debug(`trigger focus ${counter}`);
			focus(hasFocus, localRef as RefObject<HTMLDivElement>);
		});

		return (
			<div
				{...rest}
				className={clsx(
					"neo-dropdown__link",
					isActive && "neo-dropdown__link-active",
					disabled && "neo-dropdown--disabled",
					className,
				)}
				id={id}
				ref={localRef}
				role="menuitem"
				tabIndex={tabIndex}
				onKeyDown={handleMenuItemKeyDown}
				onClick={onClick}
			>
				{children}
			</div>
		);
	},
);
MenuItem.displayName = "MenuItem";

export const focus = (hasFocus: boolean, ref: RefObject<HTMLDivElement>) => {
	if (hasFocus) {
		logger.debug("focusing menu item");
		ref.current?.focus();
	}
};
