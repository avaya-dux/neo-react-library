import clsx from "clsx";
import {
  MouseEventHandler,
  useContext,
  useEffect,
  useId,
  useRef,
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
  id,
  label,
  className,
}: TopLinkItemProps) => {
  const generatedId = useId();
  id = id || generatedId;
  const ctx = useContext(LeftNavContext);
  const [isActive, setIsActive] = useState(false);

  const anchorRef = useRef<HTMLAnchorElement>(null);

  type posType = number | undefined;
  const [xPos, setXPos] = useState<posType>(undefined);
  const [yPos, setYPos] = useState<posType>(undefined);

  const updateItemPosition = () => {
    const x = anchorRef?.current?.offsetLeft;
    console.log("setXPos to ", x)
    setXPos(x);

    const y = anchorRef?.current?.offsetTop;
    console.log("setXPos to ", y);
    setYPos(y);
  };


  useEffect(() => {
    !ctx.isActiveOverride
      ? setIsActive(href === ctx.currentUrl)
      : setIsActive(false);
  }, [ctx.currentUrl, ctx.isActiveOverride, isActive, href]);

  useEffect(() => {
    if (href === ctx.currentUrl) {
      // anchorRef?.current?.scrollIntoView({ block: "nearest", inline: "start" });
      if (xPos !== undefined && yPos !== undefined) {
        console.log("CALLING scrollTo ", xPos, yPos);
        anchorRef?.current?.scrollTo(xPos, yPos);
      }
    }
  }, [ctx.currentUrl, anchorRef, href]);

  const onClick: MouseEventHandler = (e) => {
    console.log(
      "onClick CALLED scrollTo, hasCustomOnNavigate: ",
      ctx.hasCustomOnNavigate,
    );
    updateItemPosition();
    if (ctx.hasCustomOnNavigate) {
      e.preventDefault(); // Override anchor default behavior if a custom event handler is provided
    }
    ctx?.onSelectedLink && ctx.onSelectedLink(id as string, href);
  };

  return (
    <li
      className={clsx(
        "neo-leftnav__main",
        isActive && "neo-leftnav__main--active",
        className,
      )}
    >
      {disabled ? (
        <Button disabled={disabled} variant="tertiary" icon={icon}>
          {label}
        </Button>
      ) : (
        <a
          href={href}
          ref={anchorRef}
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
