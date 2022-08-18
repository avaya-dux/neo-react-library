import log from "loglevel";
import { Dispatch, MouseEvent, SetStateAction } from "react";

import { ActionType, MenuIndexesType } from "../MenuTypes";

const logger = log.getLogger("menu-mouse-event-handler");
logger.disableAll();

export const handleMenuButtonClickEvent = (
  e: MouseEvent,
  isOpen: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  e.stopPropagation();
  logger.debug("hanlding mouse click event");
  setOpen(!isOpen);
};

export const handleMouseMoveEvent = (
  e: MouseEvent,
  menuIndexes: MenuIndexesType,
  cursor: number,
  setCursor: Dispatch<SetStateAction<number>>,
  cursorAction: ActionType,
  setCursorAction: Dispatch<SetStateAction<ActionType>>,
  enterCounter: number,
  setEnterCounter: Dispatch<SetStateAction<number>>
) => {
  const target = e.target as HTMLElement;
  const id = target.getAttribute("id");
  logger.debug(`mouse event target id = ${id}`);
  if (id) {
    const desiredCursor = menuIndexes.findIndex(
      (menuItem) => id === menuItem.id
    );
    logger.debug(`desired cursor =${desiredCursor}`);
    if (desiredCursor !== -1) {
      logger.debug(`set cursor to in mouse move to =${desiredCursor}`);
      setCursor(desiredCursor);
      const entry = menuIndexes[desiredCursor];
      if ("length" in entry) {
        if (cursorAction === "ENTER_SUB_MENU") {
          setEnterCounter(enterCounter + 1);
        } else {
          setCursorAction("ENTER_SUB_MENU");
          setEnterCounter(1);
        }
        logger.debug(`mouse event: enterCounter = ${enterCounter}`);
      } else {
        if (desiredCursor === cursor) {
          setEnterCounter(enterCounter + 1);
        } else {
          setEnterCounter(1);
        }
      }
    }
  } else {
    logger.debug(`target has no id attribute`);
  }
};

export const handleMenuItemClick = (
  closeOnSelect: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  if (closeOnSelect) {
    setOpen(false);
  }
};
