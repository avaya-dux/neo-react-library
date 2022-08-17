import log from "loglevel";
import {
  cloneElement,
  FC,
  FocusEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

import {
  handleBlurEvent,
  handleKeyDownEvent,
  handleMouseMoveEvent,
} from "../EventHandlers";
import { addIdToChildren, buildMenuIndexes, layoutChildren } from "../helpers";
import { MenuContext } from "../MenuContext";
import { ActionType, MenuIndexesType, SubMenuProps } from "../MenuTypes";

const logger = log.getLogger("submenu");
logger.disableAll();

/**
 * The SubMenu is meant to be used _only_ with the Menu component
 *
 * @example
 * <Menu menuRootElement={<MenuButton />}>
    <MenuItem>Item1</MenuItem>
    <SubMenu menuRootElement={<MenuItem>SubMenu</MenuItem>}>
      <MenuItem>Sub Item1</MenuItem>
      <MenuItem>Sub Item2</MenuItem>
      <MenuItem>Sub Item3</MenuItem>
      <SubMenu menuRootElement={<MenuItem>Sub SubMenu</MenuItem>}>
        <MenuItem>Sub Sub Item1</MenuItem>
        <MenuItem>Sub Sub Item2</MenuItem>
        <MenuItem>Sub Sub Item3</MenuItem>
      </SubMenu>
    </SubMenu>
    <MenuItem>Item3</MenuItem>
  </Menu>
 *
 * @see https://design.avayacloud.com/components/web/dropdown-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-menu--multi-level-sub-menu
 */
export const SubMenu: FC<SubMenuProps> = ({
  action,
  menuRootElement,
  children,
  counter,
  id = useId(),

  ...rest
}) => {
  const { closeOnSelect, setRootMenuOpen } = useContext(MenuContext);

  const { children: btnChildren, isActive, hasFocus } = menuRootElement.props;
  const subMenuButtonLabel = btnChildren?.toString() || "";
  log.debug(
    `debugging SubMenu: '${subMenuButtonLabel}' isActive=${isActive}, hasFocus=${hasFocus}, action = ${action}, counter=${counter}`
  );
  const [isOpen, setOpen] = useState(false);
  const [enterCounter, setEnterCounter] = useState(1);

  log.debug(`debugging SubMenu open =  ${isOpen}; action = ${action}`);

  useEffect(() => {
    setOpen(action === "ENTER_SUB_MENU");
  }, [action, counter]);

  const clonedChildren = useMemo(
    () => addIdToChildren(children, SubMenu.name),
    [children]
  );

  const menuIndexes: MenuIndexesType = useMemo(
    () => buildMenuIndexes(clonedChildren, SubMenu.name),
    [clonedChildren]
  );
  const [cursor, setCursor] = useState(0);
  const [cursorAction, setCursorAction] = useState<ActionType>("");

  const handleSubMenuKeyDown: KeyboardEventHandler = (
    e: React.KeyboardEvent<HTMLDivElement>
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
      subMenuButtonLabel
    );
  };
  const handleSubMenuMouseMove: MouseEventHandler = (e: MouseEvent) => {
    return handleMouseMoveEvent(
      e,
      menuIndexes,
      cursor,
      setCursor,
      cursorAction,
      setCursorAction,
      enterCounter,
      setEnterCounter
    );
  };
  const handleSubMenuBlur: FocusEventHandler = (
    e: FocusEvent<HTMLDivElement>
  ) => {
    log.debug(`handling submenu blur event`);
    return handleBlurEvent(e, true, setOpen);
  };

  return (
    <div id={id} {...rest} className={getClassNames(action)}>
      {isOpen ? menuRootElement : cloneElement(menuRootElement)}
      {isOpen &&
        layoutChildren(
          clonedChildren,
          SubMenu.name,
          handleSubMenuKeyDown,
          handleSubMenuMouseMove,
          handleSubMenuBlur,
          menuIndexes,
          cursor,
          cursorAction,
          enterCounter,
          closeOnSelect,
          setRootMenuOpen
        )}
    </div>
  );
};

export function getClassNames(action?: ActionType) {
  const classes = ["neo-dropdown__item"];
  if (action === "ENTER_SUB_MENU") {
    classes.push("neo-dropdown--active");
  }
  return classes.join(" ");
}
