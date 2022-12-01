import clsx from "clsx";
import {
  MouseEventHandler,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";

import { Button } from "components/Button";

import { LeftNavContext } from "../LeftNavContext";
import { TopLinkItemProps } from "../LeftNavTypes";

import "./TopLinkItem_shim.css";

/**
 * Is meant to be used as a top level link. Eg, one that is not nested.
 *
 * @example
 * <LeftNav
    aria-label="Main Navigation"
    onNavigate={handleClick}
    currentUrl="#active"
  >
    <LeftNav.TopLinkItem label="Active by default" href="#active" />
    <LeftNav.TopLinkItem label="Link 2" href="#test2" />
  </LeftNav>
 */
export const TopLinkItem = ({
  disabled,
  href,
  icon,
  id = useId(),
  label,
  className,
}: TopLinkItemProps) => {
  const ctx = useContext(LeftNavContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    !ctx.isActiveOverride
      ? setIsActive(href === ctx.currentUrl)
      : setIsActive(false);
  }, [ctx.currentUrl, ctx.isActiveOverride, isActive, href]);

  const onClick: MouseEventHandler = (e) => {
    e.preventDefault();
    ctx?.onSelectedLink && ctx.onSelectedLink(id, href);
  };

  return (
    <li
      className={clsx(
        "neo-leftnav__main",
        isActive && "neo-leftnav__main--active",
        className
      )}
    >
      {disabled ? (
        <Button disabled={disabled} variant="tertiary" icon={icon}>
          {label}
        </Button>
      ) : (
        <a
          href={href}
          className={clsx(icon && `neo-icon-${icon}`)}
          onClick={onClick}
        >
          {label}
        </a>
      )}
    </li>
  );
};
TopLinkItem.displayName = "TopLinkItem";
