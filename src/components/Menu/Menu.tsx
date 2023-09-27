import clsx from "clsx";
import log from "loglevel";
import {
  cloneElement,
  FocusEvent,
  FocusEventHandler,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ClickAwayListener from "react-click-away-listener";

import {
  handleBlurEvent,
  handleButtonKeyDownEvent,
  handleKeyDownEvent,
  handleMenuButtonClickEvent,
  handleMouseMoveEvent,
} from "./EventHandlers";
import { addIdToChildren, buildMenuIndexes, layoutChildren } from "./helpers";
import { MenuContext } from "./MenuContext";
import {
  ActionType,
  MenuContextType,
  MenuIndexesType,
  MenuProps,
} from "./MenuTypes";
import { SubMenu } from "./SubMenu";

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
      menuRootElement,
      onMenuClose = () => null,
      openOnHover = false,
      ...rest
    }: MenuProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    logger.debug("debugging Menu ...");
    const _ref = useRef<HTMLButtonElement>(null)
    const buttonRef = ref || _ref;

    const [isOpen, setOpen] = useState(defaultIsOpen);
    const [enterCounter, setEnterCounter] = useState(1);
    const clonedChildren = useMemo(
      () => addIdToChildren(children, SubMenu.name),
      [children],
    );
    const menuIndexes: MenuIndexesType = useMemo(
      () => buildMenuIndexes(clonedChildren, SubMenu.name),
      [clonedChildren],
    );
    // remember item to have focus
    const [cursor, setCursor] = useState(0);
    const [cursorAction, setCursorAction] = useState<ActionType>("");

    useEffect(() => {
      logger.debug(`calling onMenuClose when open = ${isOpen}`);

      if (isOpen === false && didMount.current) {
        onMenuClose();
      }
    }, [isOpen, onMenuClose]);

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
      logger.debug(`handling menu blur event`);
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
        ref: buttonRef
      } 
      return cloneElement(menuRootElement, buttonProps)
    },
      [menuRootElement, buttonRef, isOpen, menuIndexes, openOnHover]
    );

    const menuContext: MenuContextType = {
      closeOnSelect,
      setRootMenuOpen: setOpen,
    };

    const content = (
      <div
        className={getClassNames(isOpen, itemAlignment, className, openOnHover)}
        role="group"
        {...rest}
      >
        <MenuContext.Provider value={menuContext}>
          {menuButton}
          {isOpen &&
            layoutChildren(
              clonedChildren,
              SubMenu.name,
              handleMenuKeyDown,
              handleMenuMouseMove,
              handleMenuBlur,
              menuIndexes,
              cursor,
              cursorAction,
              enterCounter,
              closeOnSelect,
              setOpen,
            )}
        </MenuContext.Provider>
      </div>
    );
    const closeMenu = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

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
