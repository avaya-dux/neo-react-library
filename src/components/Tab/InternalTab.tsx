import log from "loglevel";
import {
  FocusEvent,
  FocusEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";

import { Icon } from "components/Icon";
import { IconNamesType } from "utils";

import "./InternalTab_shim.css";

import {
  handleBlurEvent,
  handleFocusEvent,
  handleKeyDownEvent,
  handleMouseClickEvent,
} from "./EventHandlers";
import { noop } from "./EventHandlers/Helper";
import { InteractiveTabProps, InternalTabProps } from "./InternalTabTypes";

const logger = log.getLogger("tab-head-logger");
logger.disableAll();
export { logger as internalTabLogger };

const hrefNoopString = "#noop";

export const InternalTab = ({
  tabIndex,
  active,
  focus,
  dir,
  disabled,
  closable,
  onClose = noop,
  closableId,
  href = hrefNoopString,
  id,
  name,
  icon,
  content,
  className = "",
  tabs,
  vertical,
  activeTabIndex,
  setActiveTabIndex,
  setActivePanelIndex,
  setFocus,
}: InternalTabProps & InteractiveTabProps) => {
  logger.debug(`debug internalTab ${id}`);
  const ref = useRef<HTMLAnchorElement>(null);

  const isLink = href !== hrefNoopString;
  const handleAnchorMouseClickEvent: MouseEventHandler = (e: MouseEvent) =>
    !isLink &&
    handleMouseClickEvent(e, tabs, tabIndex,
      activeTabIndex, setActiveTabIndex, setActivePanelIndex, onClose);

  const handleAnchorKeyDownEvent: KeyboardEventHandler = (
    e: KeyboardEvent<HTMLAnchorElement>
  ) => {
    return handleKeyDownEvent(
      e,
      vertical,
      tabs,
      activeTabIndex,
      setActiveTabIndex,
      setActivePanelIndex,
      ref,
      onClose
    );
  };

  const handleAnchorFocusEvent: FocusEventHandler = (
    e: FocusEvent<HTMLAnchorElement>
  ) => {
    return handleFocusEvent(e, ref, setFocus);
  };

  const handleAnchorBlurEvent: FocusEventHandler = (
    e: FocusEvent<HTMLAnchorElement>
  ) => {
    return handleBlurEvent(e, ref, setFocus);
  };

  useEffect(() => {
    if (focus && active && !disabled) {
      logger.debug(`focus tab ${id}`);
      ref.current && ref.current.focus();
    }
  }, [focus, active, disabled]);

  // todo: get aria-label if any
  const labelledBy = closable ? `You can press X to close tab ${name}` : name?.toString();

  return (
    <>
      <a
        aria-controls={content?.id}
        aria-disabled={disabled}
        aria-selected={isLink ? undefined : active}
        aria-label={labelledBy}
        role="tab"
        className={getClassNames(className, icon)}
        dir={closable ? "ltr" : dir}
        href={href}
        id={id}
        onBlur={handleAnchorBlurEvent}
        onClick={handleAnchorMouseClickEvent}
        onFocus={handleAnchorFocusEvent}
        onKeyDown={handleAnchorKeyDownEvent}
        ref={ref}
        rel="noreferrer"
        tabIndex={active && !disabled ? 0 : -1}
        target={isLink ? "_blank" : undefined}
      >
        {name}

        {isLink && (
          <Icon
            className="neo-icon-end"
            icon="screenpop-on"
            aria-label="External Link"
          />
        )}

        {closable && (
          <span
            id={closableId}
            className="neo-icon-end"
          ></span>
        )}
      </a>
    </>
  );
};
export function getClassNames(className: string, icon?: IconNamesType) {
  const classes = [className];
  if (icon) {
    classes.push(`neo-icon-${icon}`);
  }
  return classes.join(" ");
}
