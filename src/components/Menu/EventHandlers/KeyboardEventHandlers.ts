import log from "loglevel";
import { Dispatch, FocusEvent, KeyboardEvent, SetStateAction } from "react";

import { Keys } from "utils";

import { ActionType, MenuIndexesType } from "../MenuTypes";

const logger = log.getLogger("menu-keyboard-event-handler");
logger.disableAll();

export const handleButtonKeyDownEvent = (
  e: KeyboardEvent<HTMLButtonElement>,
  menuIndexes: MenuIndexesType,
  setCursor: Dispatch<SetStateAction<number>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  let handled = true;
  switch (e.key) {
    case Keys.ENTER:
    case Keys.SPACE:
    case Keys.DOWN:
      logger.debug("activate menu down/space/enter ...");
      // stop triggering a mouse click event!!
      e.preventDefault();
      setOpen(true);
      if (menuIndexes.length > 0) {
        setCursor(0);
      }
      break;
    case Keys.UP:
      logger.debug("activate menu up...");
      setOpen(true);
      if (menuIndexes.length > 0) {
        setCursor(menuIndexes.length - 1);
      }
      break;
    case Keys.TAB:
      logger.debug("handling TAB in menu");
      setOpen(false);
      handled = false;
      break;
    case Keys.ESC:
      logger.debug("handling ESC in menu");
      setOpen(false);
      break;
  }
  if (handled) {
    e.stopPropagation();
  }
};

export const handleKeyDownEvent = (
  e: React.KeyboardEvent<HTMLDivElement>,
  menuIndexes: MenuIndexesType,
  cursorAction: ActionType,
  setCursorAction: Dispatch<SetStateAction<ActionType>>,
  cursor: number,
  setCursor: Dispatch<SetStateAction<number>>,
  enterCounter: number,
  setEnterCounter: Dispatch<SetStateAction<number>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  closeOnSelect: boolean,
  label: string
) => {
  logger.debug(`handle ${label} key event ${e.key}`);
  let handled = true;
  if (menuIndexes.length === 0) {
    return;
  }
  switch (e.key) {
    case Keys.DOWN:
      setCursorAction("");
      if (cursor + 1 >= menuIndexes.length) {
        setCursor(0);
      } else {
        setCursor(cursor + 1);
      }
      break;

    case Keys.UP:
      setCursorAction("");
      if (cursor - 1 < 0) {
        setCursor(menuIndexes.length - 1);
      } else {
        setCursor(cursor - 1);
      }
      break;
    case Keys.ENTER:
    case Keys.SPACE:
      // pressed enter on submenu:
      if ("length" in menuIndexes[cursor]) {
        if (cursorAction === "ENTER_SUB_MENU") {
          setEnterCounter(enterCounter + 1);
        } else {
          setCursorAction("ENTER_SUB_MENU");
          setEnterCounter(1);
        }
        logger.debug(`enterCounter = ${enterCounter}`);
      } else {
        setCursorAction("ACTIVATE_MENU_ITEM");
        if (closeOnSelect) {
          setOpen(false);
        }
        e.preventDefault();
      }
      break;
    case Keys.RIGHT:
      logger.debug(`right arrow pressed on ${label}`);
      // pressed right arrow on submenu:
      if ("length" in menuIndexes[cursor]) {
        if (cursorAction === "ENTER_SUB_MENU") {
          setEnterCounter(enterCounter + 1);
        } else {
          setCursorAction("ENTER_SUB_MENU");
          setEnterCounter(1);
        }
        logger.debug(`enterCounter = ${enterCounter}`);
      }
      break;
    case Keys.LEFT:
      logger.debug(`left arrow press on ${label}`);
      setCursor(0);
      setCursorAction("");
      setOpen(false);
      break;
    case Keys.TAB:
    case Keys.ESC:
      logger.debug(`handling ${e.key} in submenu`);
      setCursorAction("");
      setOpen(false);
      handled = false;
      break;
  }
  if (handled) {
    e.stopPropagation();
  }
};

export const handleBlurEvent = (
  e: FocusEvent<HTMLDivElement>,
  closeOnBlur: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  logger.debug(`${e.relatedTarget} receiving focus`);
  if (e.relatedTarget === null && closeOnBlur) {
    setOpen(false);
  }
};
