import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef, Ref } from "react";

import { Button } from "components/Button";
import { computeBadge, handleAccessbilityError } from "utils";

import { TopNavIconButtonProps, TopNavLinkButtonProps } from "../TopNavTypes";

export const TopNavIconButton = forwardRef(
  (
    {
      active = false,
      badge,
      disabled = false,
      className,
      icon,
      ...rest
    }: TopNavIconButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    if (!rest["aria-label"]) {
      handleAccessbilityError(
        "A Icon Button must have descriptive text as an aria-label."
      );
    }

    return (
      <div
        className={clsx(
          "neo-badge__navbutton",
          active && "neo-badge__navbutton--active"
        )}
      >
        <button
          className={clsx(
            "neo-badge__navbutton--content neo-btn",
            !!icon && `neo-icon-${icon}`,
            !!className && className
          )}
          disabled={disabled}
          ref={ref}
          {...rest}
        ></button>

        {badge && (
          <span className="neo-badge__icon" data-badge={computeBadge(badge)} />
        )}
      </div>
    );
  }
);
TopNavIconButton.displayName = "TopNavIconButton";

export const TopNavLinkButton = forwardRef(
  (
    {
      active = false,
      className,
      disabled = false,
      href,
      children,
      ...rest
    }: TopNavLinkButtonProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
    if (!rest["aria-label"] && !children) {
      handleAccessbilityError(
        "Descriptive text must be provided as either `children` as text, or as an aria-label."
      );
    }

    return href && !disabled ? (
      <a
        className={clsx("link-btn", active && "link-btn-active", className)}
        href={href}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    ) : (
      <Button
        className={clsx("link-btn", active && "link-btn-active", className)}
        disabled={disabled}
        variant="tertiary"
        ref={ref as Ref<HTMLButtonElement>}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </Button>
    );
  }
);
TopNavLinkButton.displayName = "TopNavLinkButton";
