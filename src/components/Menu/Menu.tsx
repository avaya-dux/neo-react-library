import clsx from "clsx";
import log from "loglevel";
import {
	type FocusEvent,
	type FocusEventHandler,
	type KeyboardEvent,
	type KeyboardEventHandler,
	type MouseEvent,
	type MouseEventHandler,
	type Ref,
	cloneElement,
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import ClickAwayListener from "react-click-away-listener";

import { Tooltip } from "components/Tooltip";
import {
	handleBlurEvent,
	handleButtonKeyDownEvent,
	handleKeyDownEvent,
	handleMenuButtonClickEvent,
	handleMouseMoveEvent,
} from "./EventHandlers";
import { MenuContext } from "./MenuContext";
import type {
	ActionType,
	MenuContextType,
	MenuIndexesType,
	MenuProps,
} from "./MenuTypes";
import { addIdToChildren, buildMenuIndexes, layoutChildren } from "./helpers";

const logger = log.getLogger("menu");
logger.disableAll();

/**
 * The Menu is meant to be used as a way to display single select options to a user
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
 *
 * @see https://design.avayacloud.com/components/web/dropdown-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-menu--functional-menu
 */
export const Menu = forwardRef(
	(
		{
			children,
			className,
			closeOnBlur = true,
			closeOnSelect = true,
			defaultIsOpen = false,
			itemAlignment = "left",
			menuRootElement: menuRootElementOriginal,
			onMenuClose = () => null,
			openOnHover = false,
			positionToToggle = "below",
			...rest
		}: MenuProps,
		ref: Ref<HTMLButtonElement>,
	) => {
		logger.debug("debugging Menu ...");
		const _ref = useRef<HTMLButtonElement>(null);
		const toggleRef = ref || _ref;
		const menuRef = useRef<HTMLDivElement>(null);

		const [isOpen, setOpen] = useState(defaultIsOpen);
		const [enterCounter, setEnterCounter] = useState(1);
		const [upwards, setUpwards] = useState(false);
		const [userHasInteracted, setUserHasInteracted] = useState(false);
		const clonedChildren = useMemo(() => addIdToChildren(children), [children]);
		const menuIndexes: MenuIndexesType = useMemo(
			() => buildMenuIndexes(clonedChildren),
			[clonedChildren],
		);

		logger.debug({ menuIndexes });
		// remember item to have focus
		const [cursor, setCursor] = useState(0);
		const [cursorAction, setCursorAction] = useState<ActionType>("");

		const adjustPosition = useCallback(() => {
			if (!isOpen) {
				return;
			}
			const { clientHeight: viewHeight, clientWidth: viewWidth } =
				document.lastElementChild || { clientHeight: 0, clientWidth: 0 };
			logger.debug({ viewWidth, viewHeight });

			if (toggleRef && "current" in toggleRef && toggleRef.current) {
				const { offsetWidth: toggleWidth, offsetHeight: toggleHeight } =
					toggleRef.current;
				const { top, right, bottom, left } =
					toggleRef.current?.getBoundingClientRect() || {};
				logger.debug({ toggleWidth, toggleHeight, top, right, bottom, left });

				if (menuRef && "current" in menuRef && menuRef.current) {
					const { offsetWidth: menuWidth, offsetHeight: menuHeight } =
						menuRef.current || {};
					logger.debug({ menuWidth, menuHeight });
					const noSpaceBelow =
						positionToToggle === "below"
							? bottom + menuHeight > viewHeight
							: top + menuHeight > viewHeight;
					const haveSpaceAbove =
						positionToToggle === "below"
							? menuHeight < top
							: menuHeight < bottom;
					logger.debug({ noSpaceBelow, haveSpaceAbove });
					setUpwards(noSpaceBelow && haveSpaceAbove);
				}
			}
		}, [isOpen, positionToToggle, toggleRef]);

		// biome-ignore lint/correctness/useExhaustiveDependencies: self explanatory
		useEffect(() => {
			if (isOpen === true && !userHasInteracted) {
				setUserHasInteracted(true);
			}
		}, [isOpen]);

		// biome-ignore lint/correctness/useExhaustiveDependencies: self explanatory
		useEffect(() => {
			logger.debug(`debugging menu useEffect when open = ${isOpen}`);

			if (isOpen === false && didMount.current) {
				logger.debug("calling onMenuClose");
				onMenuClose();

				// set focus to parent button on menu closed
				if (
					toggleRef &&
					"current" in toggleRef &&
					toggleRef.current &&
					userHasInteracted // only focus if user has interacted with the menu (i.e. not on initial render)
				) {
					logger.debug("focus button");
					toggleRef.current.focus();
					setUserHasInteracted(false); // user is done using the menu, reset userHasInteracted
				}
				return;
			}

			adjustPosition();
			window.addEventListener("resize", adjustPosition);

			return () => window.removeEventListener("resize", adjustPosition);
		}, [adjustPosition, isOpen, onMenuClose, toggleRef]);

		// `didMount` must be placed _after_ any usage of it in a hook
		const didMount = useRef(false);
		useEffect(() => {
			didMount.current = true;
		}, []);

		const handleMenuKeyDown: KeyboardEventHandler = (
			e: KeyboardEvent<HTMLDivElement>,
		) => {
			return handleKeyDownEvent(
				e,
				menuIndexes,
				cursorAction,
				setCursorAction,
				cursor,
				setCursor,
				enterCounter,
				setEnterCounter,
				setOpen,
				closeOnSelect,
				"Menu",
			);
		};

		const handleMenuBlur: FocusEventHandler = (
			e: FocusEvent<HTMLDivElement>,
		) => {
			logger.debug("handling menu blur event");
			e.stopPropagation();
			return handleBlurEvent(e, closeOnBlur, setOpen);
		};

		const handleMenuMouseMove: MouseEventHandler = (e: MouseEvent) => {
			return handleMouseMoveEvent(
				e,
				menuIndexes,
				cursor,
				setCursor,
				cursorAction,
				setCursorAction,
				enterCounter,
				setEnterCounter,
			);
		};

		type MenuButtonOnClickEventType = HTMLButtonElement & HTMLDivElement;

		const menuButton = useMemo(() => {
			let menuRootElement = menuRootElementOriginal;
			if (menuRootElementOriginal.type === Tooltip) {
				menuRootElement = menuRootElementOriginal.props
					.children as React.ReactElement;
			}
			const buttonProps = {
				...menuRootElement.props,

				onClick: (e: MouseEvent<MenuButtonOnClickEventType>) => {
					handleMenuButtonClickEvent(e, isOpen, setOpen);

					if (menuRootElement.props.onClick) {
						menuRootElement.props.onClick(e);
					}
				},

				onKeyDown: (e: KeyboardEvent<MenuButtonOnClickEventType>) => {
					handleButtonKeyDownEvent(e, menuIndexes, setCursor, setOpen);

					if (menuRootElement.props.onKeyDown) {
						menuRootElement.props.onKeyDown(e);
					}
				},

				onMouseEnter: (e: MouseEvent<MenuButtonOnClickEventType>) => {
					if (openOnHover) {
						setOpen(true);
					}

					if (menuRootElement.props.onMouseEnter) {
						menuRootElement.props.onMouseEnter(e);
					}
				},
				ref: toggleRef,
			};
			const button = cloneElement(menuRootElement, buttonProps);
			if (menuRootElementOriginal.type === Tooltip) {
				return cloneElement(menuRootElementOriginal, { children: button });
			}
			return button;
		}, [menuRootElementOriginal, toggleRef, isOpen, menuIndexes, openOnHover]);

		const menuContext: MenuContextType = {
			closeOnSelect,
			upwards,
			setRootMenuOpen: setOpen,
		};

		const content = (
			<div
				className={getClassNames(isOpen, itemAlignment, className, openOnHover)}
				{...rest}
				data-testid="dropdown-button"
			>
				<MenuContext.Provider value={menuContext}>
					{menuButton}
					{isOpen &&
						layoutChildren(
							clonedChildren,
							handleMenuKeyDown,
							handleMenuMouseMove,
							handleMenuBlur,
							menuIndexes,
							cursor,
							cursorAction,
							enterCounter,
							closeOnSelect,
							setOpen,
							menuRef,
							positionToToggle,
							upwards,
						)}
				</MenuContext.Provider>
			</div>
		);
		const closeMenu = useCallback(() => {
			setOpen(false);
		}, []);

		return closeOnBlur ? (
			<ClickAwayListener onClickAway={closeMenu}>{content}</ClickAwayListener>
		) : (
			content
		);
	},
);
Menu.displayName = "Menu";

export const getClassNames = (
	isOpen: boolean,
	itemAlignment: "left" | "right",
	className?: string,
	openOnHover?: boolean, // NOTE: this is _only_ for the tests, it doesn't actually do anything
) => {
	if (isOpen) {
		logger.debug(`isOpen is ${isOpen}`);
	}

	return clsx(
		"neo-dropdown",
		itemAlignment === "right" ? "neo-dropdown--left" : "neo-dropdown--right",
		isOpen && "neo-dropdown--active",
		className,
		openOnHover && "neo-dropdown--onhover",
	);
};
