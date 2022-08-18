import log from "loglevel";
import {
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  RefObject,
  SetStateAction,
} from "react";

import { isAriaDisabled, Keys } from "utils";

import { InternalTabProps } from "../InternalTabTypes";
import { activateAnotherTabAndPanel } from "./Helper";
import { activatePreviousTab, getNextTabIndex } from "./KeyboardHelper";

const logger = log.getLogger("tab-keyboard-event-handler");
logger.disableAll();

export { logger as tabKeyboardEventHandler };

export const focus = (
  ref: RefObject<HTMLAnchorElement>,
  activeTabId: string
) => {
  logger.debug(`focusing on tab ${activeTabId}`);
  ref.current?.focus();
};

export const handleFocusEvent = (
  e: FocusEvent<HTMLAnchorElement>,
  ref: RefObject<HTMLAnchorElement>
) => {
  const target = e.target as HTMLElement;
  const id = target.getAttribute("id");
  const relatedTarget = e.relatedTarget as HTMLElement;
  const fromId = relatedTarget?.getAttribute("id") || null;
  const disabled = isAriaDisabled(target);
  logger.debug(
    `tab ${id} is ${disabled} and is receiving focus from ${fromId}`
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nonNullId = id!;
  if (!disabled) {
    logger.debug(`focusing ${id}`);
    focus(ref, nonNullId);
  } else {
    blur(ref, nonNullId);
  }
  e.stopPropagation();
  e.preventDefault();
};

export const handleBlurEvent = (
  e: FocusEvent<HTMLAnchorElement>,
  ref: RefObject<HTMLAnchorElement>
) => {
  const target = e.target as HTMLElement;
  const id = target.getAttribute("id");
  const relatedTarget = e.relatedTarget as HTMLElement;
  const toId = relatedTarget?.getAttribute("id") || null;
  logger.debug(`tab ${id} is losing focus to ${toId}`);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  blur(ref, id!);
};

export const blur = (
  ref: RefObject<HTMLAnchorElement>,
  blurredTabId: string
) => {
  logger.debug(`blurring on tab ${blurredTabId}`);
  ref.current?.blur();
};

export const handleCloseElementKeyDownEvent = (
  e: KeyboardEvent<HTMLAnchorElement>,
  tabs: InternalTabProps[],
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex: Dispatch<SetStateAction<number>>,
  ref: RefObject<HTMLAnchorElement>
) => {
  logger.debug(`handle close element key event ${e.key} on ${activeTabIndex}`);
  if (tabs.length === 0) {
    return false;
  }
  switch (e.key) {
    case Keys.ENTER:
    case Keys.SPACE:
      e.preventDefault();
      activateAnotherTabAndPanel(
        tabs,
        activeTabIndex,
        setActiveTabIndex,
        setActivePanelIndex
      );
      e.stopPropagation();
      return true;
    case Keys.TAB:
      e.preventDefault();
      logger.debug("shift pressed is", e.shiftKey);
      if (e.shiftKey) {
        focus(ref, tabs[activeTabIndex].id);
      } else {
        const activated = activateNextTab(
          tabs,
          activeTabIndex,
          setActiveTabIndex
        );
        if (!activated) {
          logger.debug("no next tab to activate, return focus to this tab");
          focus(ref, tabs[activeTabIndex].id);
        }
      }
      e.stopPropagation();
      return false;
  }
  logger.debug("not handled key", e.key);
  return false;
};

export const handleKeyDownEvent = (
  e: KeyboardEvent<HTMLAnchorElement>,
  isTabListVertical: boolean,
  tabs: InternalTabProps[],
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex: Dispatch<SetStateAction<number>>,
  ref: RefObject<HTMLAnchorElement>
) => {
  logger.debug(`handle tab key event ${e.key} on ${activeTabIndex}`);
  if (tabs.length === 0) {
    return;
  }
  switch (e.key) {
    case Keys.RIGHT:
      if (!isTabListVertical) {
        activateNextTab(tabs, activeTabIndex, setActiveTabIndex);
      }
      break;
    case Keys.LEFT:
      if (!isTabListVertical) {
        activatePreviousTab(tabs, activeTabIndex, setActiveTabIndex);
      }
      break;
    case Keys.DOWN:
      if (isTabListVertical) {
        activateNextTab(tabs, activeTabIndex, setActiveTabIndex);
      }
      break;
    case Keys.UP:
      if (isTabListVertical) {
        activatePreviousTab(tabs, activeTabIndex, setActiveTabIndex);
      }
      break;
    case Keys.ENTER:
    case Keys.SPACE:
      e.preventDefault();
      setActivePanelIndex(activeTabIndex);
      focus(ref, tabs[activeTabIndex].id);
      break;
  }
  e.stopPropagation();
};

function activateNextTab(
  tabs: InternalTabProps[],
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>
): boolean {
  const nextTabIndex = getNextTabIndex(tabs, activeTabIndex);
  if (nextTabIndex > activeTabIndex) {
    setActiveTabIndex(nextTabIndex);
    return true;
  } else {
    logger.debug(`no next tab index found.`);
    return false;
  }
}
