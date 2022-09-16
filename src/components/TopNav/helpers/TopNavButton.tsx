import clsx from "clsx";
import { forwardRef } from "react";

import { computeBadge, handleAccessbilityError } from "utils";

import { TopNavButtonProps } from "../TopNavTypes";

export const TopNavButton = forwardRef(
  (
    {
      active = false,
      badge,
      children,
      className,
      icon,
      ...rest
    }: TopNavButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    if (!rest["aria-label"] && !children) {
      handleAccessbilityError(
        "A Button must have descriptive text. Either as children or an aria-label."
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
          ref={ref}
          {...rest}
        >
          {children}
        </button>

        {badge && (
          <span className="neo-badge__icon" data-badge={computeBadge(badge)} />
        )}
      </div>
    );
  }
);
TopNavButton.displayName = "TopNavButton";
