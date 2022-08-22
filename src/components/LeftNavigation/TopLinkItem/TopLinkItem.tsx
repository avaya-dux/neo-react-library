import clsx from "clsx";
import {
  MouseEventHandler,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";

import { Button } from "components/Button";
import { IconNamesType } from "utils";

import { NavigationContext } from "../NavigationContext";

import "./TopLinkItem_shim.css";

export interface TopLinkItemProps {
  label: string;
  href: string;
  icon?: IconNamesType;
  id?: string;
  disabled?: boolean;
}

export const TopLinkItem = ({
  label,
  href,
  icon,
  id = useId(),
  disabled,
}: TopLinkItemProps) => {
  const ctx = useContext(NavigationContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(href === ctx.currentUrl);
  }, [ctx.currentUrl]);

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
