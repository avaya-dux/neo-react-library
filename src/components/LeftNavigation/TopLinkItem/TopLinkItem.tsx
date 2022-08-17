import clsx from "clsx";
import { MouseEventHandler, useContext, useId } from "react";

import { Button } from "components/Button";
import { IconNamesType } from "utils";

import { NavigationContext } from "../NavigationContext";

import "./TopLinkItem_shim.css";

export interface TopLinkItemProps {
  active?: boolean;
  label: string;
  href: string;
  icon?: IconNamesType;
  id?: string;
  disabled?: boolean;
}

export const TopLinkItem = ({
  active,
  label,
  href,
  icon,
  id = useId(),
  disabled,
}: TopLinkItemProps) => {
  const ctx = useContext(NavigationContext);

  const onClick: MouseEventHandler = (e) => {
    e.preventDefault();
    ctx?.onSelectedLink && ctx.onSelectedLink(id, href);
  };

  return (
    <li
      className={clsx(
        "neo-leftnav__main",
        active && "neo-leftnav__main--active"
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
