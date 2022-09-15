import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef, FunctionComponent } from "react";

import { computeBadge, IconNamesType } from "utils";

export interface NavbarButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  active?: boolean;
  badge?: string;
  icon?: IconNamesType;
  handleClick?: () => Promise<void> | void;
}

export const NavbarButton: FunctionComponent<NavbarButtonProps> = forwardRef(
  (
    {
      "aria-label": ariaLabel,
      active = false,
      badge,
      icon = "menu",
      ...rest
    }: NavbarButtonProps,
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
NavbarButton.displayName = "NavbarButton";
