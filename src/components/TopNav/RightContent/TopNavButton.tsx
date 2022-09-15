import clsx from "clsx";
import { forwardRef } from "react";

import { computeBadge } from "utils";

import { TopNavButtonProps } from "../TopNavTypes";

export const TopNavButton = forwardRef(
  (
    {
      "aria-label": ariaLabel,
      active = false,
      badge,
      icon = "menu",
      ...rest
    }: TopNavButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <div
        className={clsx(
          "neo-badge__navbutton",
          active && "neo-badge__navbutton--active"
        )}
      >
        <button
          aria-label={ariaLabel}
          className={`neo-badge__navbutton--content neo-btn neo-icon-${icon}`}
          ref={ref}
          {...rest}
        />
        {badge && (
          <span className="neo-badge__icon" data-badge={computeBadge(badge)} />
        )}
      </div>
    );
  }
);
TopNavButton.displayName = "TopNavButton";
