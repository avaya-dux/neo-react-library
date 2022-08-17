import clsx from "clsx";
import {
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useFocusEffect, useRovingTabIndex } from "react-roving-tabindex";

import { Button } from "components/Button";
import { Keys } from "utils";

import { LinkItemProps } from "../LeftNavigationTypes";
import { NavigationContext } from "../NavigationContext";

export const LinkItem = ({
  active = false,
  children,
  className,
  disabled = false,
  href,
  id = useId(),
  onFocus,
  onMouseOver,
  parentHasIcon,

  ...rest
}: LinkItemProps) => {
  const ctx = useContext(NavigationContext);
  const [itemStyle, setItemStyle] = useState({ padding: "8px 28px 8px 20px" });

  const ref = useRef(null);
  const [tabIndex, isActive, handleKeyIndex, handleClick] = useRovingTabIndex(
    ref,
    disabled
  );
  useFocusEffect(isActive, ref);

  useEffect(() => {
    let leftPadding = "20px";

    if (disabled) {
      leftPadding = parentHasIcon ? "72px" : "40px";
    } else if (parentHasIcon) {
      leftPadding = "52px";
    }
    const itemStyle = { padding: `8px 28px 8px ${leftPadding}` };
    setItemStyle(itemStyle);
  }, [disabled, parentHasIcon]);

  const handleOnClick: MouseEventHandler = (e) => {
    handleClick();
    e.preventDefault();
    ctx?.onSelectedLink && ctx.onSelectedLink(id, href);
  };

  const handleKeyDown: KeyboardEventHandler = (
    event: KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key !== Keys.TAB) {
      event.stopPropagation();
      event.preventDefault();
    }

    handleKeyIndex(event);

    if (disabled) return;

    switch (event.key) {
      case Keys.SPACE:
      case Keys.ENTER:
        ctx?.onSelectedLink && ctx.onSelectedLink(id, href);
        break;
    }
  };

  return (
    <li
      {...rest}
      className={clsx(
        "neo-leftnav__sub",
        active && "neo-leftnav__sub--active",
        className
      )}
    >
      {disabled ? (
        <Button
          disabled={disabled}
          ref={ref}
          variant="tertiary"
          style={itemStyle}
          tabIndex={tabIndex}
        >
          {children}
        </Button>
      ) : (
        <a
          href={href}
          onClick={handleOnClick}
          onFocus={onFocus}
          onMouseOver={onMouseOver}
          onKeyDown={handleKeyDown}
          ref={ref}
          style={itemStyle}
          tabIndex={tabIndex}
        >
          {children}
        </a>
      )}
    </li>
  );
};
