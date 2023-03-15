import clsx from "clsx";
import {
  FC,
  HTMLProps,
  KeyboardEvent,
  MouseEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
} from "react";
import { IconNamesType, Keys, handleAccessbilityError } from "utils";
import "./Link_shim.css";
type InlineOrIconProps =
  | { inline?: boolean; icon?: never; placement?: never }
  | { inline?: never; icon?: IconNamesType; placement?: "left" | "right" };

export type LinkProps = HTMLProps<HTMLAnchorElement> & InlineOrIconProps;
export const Link: FC<LinkProps> = ({
  className,
  disabled,
  href,
  onClick,
  onKeyDown,
  children,
  ...rest
}) => {
  const icon = "icon" in rest ? rest.icon : "";
  const inline = "inline" in rest ? rest.inline : false;
  if (icon && inline) {
    handleAccessbilityError("inline link can NOT have icon.");
  }
  const placement = "placement" in rest ? rest.placement : "left";

  const clickHandler: MouseEventHandler = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
      } else {
        if (onClick) {
          onClick(e);
        }
      }
    },
    [disabled, onClick]
  );

  const keydownHandler: KeyboardEventHandler = useCallback(
    (e: KeyboardEvent<HTMLAnchorElement>) => {
      if (disabled && e.key === Keys.ENTER) {
        e.preventDefault();
      } else {
        if (onKeyDown) {
          onKeyDown(e);
        }
      }
    },
    [disabled, onKeyDown]
  );

  // remove custom property before passing rest to anchor
  if (inline) {
    delete rest.inline;
  }
  if (icon) {
    delete rest.icon;
  }
  if (placement) {
    delete rest.placement;
  }
  return (
    <a
      {...rest}
      className={clsx(
        className,
        "neo-link",
        icon && `neo-icon-${icon}`,
        inline && "neo-link__inline",
        disabled && "neo-link__disabled"
      )}
      dir={placement === "right" ? "rtl" : "ltr"}
      href={href}
      onClick={clickHandler}
      onKeyDown={keydownHandler}
    >
      {children}
    </a>
  );
};

Link.displayName = "Link";
