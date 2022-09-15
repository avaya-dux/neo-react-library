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

export const TopLinkItem = ({
  label,
  href,
  icon,
  id = useId(),
  disabled,
}: TopLinkItemProps) => {
  const ctx = useContext(LeftNavContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(href === ctx.currentUrl);
  }, [ctx.currentUrl, isActive, href]);

  const onClick: MouseEventHandler = (e) => {
    e.preventDefault();
    ctx?.onSelectedLink && ctx.onSelectedLink(id, href);
  };

  return (
    <li
      className={clsx(
        "neo-leftnav__main",
        isActive && "neo-leftnav__main--active"
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
