import { forwardRef, useMemo } from "react";

import { Spinner } from "components";
import {
  computeBadge,
  getAnimationClass,
  getBadgeClass,
  getIconClass,
  getSizeClass,
  getVariantClasses,
  IconNamesType,
  rootBtnClass,
  showSpinner,
} from "utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  animation?: "none" | "spinner" | "pulse";
  badge?: string;
  icon?: IconNamesType;
  iconPosition?: "left" | "right";
  size?: "default" | "compact" | "wide";
  status?: "default" | "success" | "alert" | "warning" | "info" | "event";
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button = forwardRef(
  (
    {
      animation = "none",
      badge,
      children,
      className,
      icon,
      iconPosition = "left",
      size = "default",
      status = "default",
      variant = "primary",
      ...rest
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const displaySpinner = useMemo(() => showSpinner(animation), [animation]);

    const buttonClasses = useMemo(() => {
      const result = [
        rootBtnClass,
        getSizeClass(size),
        ...getVariantClasses("none", variant, status),
      ];

      const animationClass = getAnimationClass(animation);
      if (animationClass) {
        result.push(animationClass);
      }

      const badgeClass = getBadgeClass(badge);
      if (badgeClass) {
        result.push(badgeClass);
      }

      if (icon) {
        result.push(getIconClass(icon));
      }

      if (className) {
        result.push(className);
      }

      return result.join(" ");
    }, [animation, badge, size, status, variant, icon, className]);

    return (
      <button
        className={buttonClasses}
        data-badge={computeBadge(badge)}
        dir={iconPosition === "left" ? "ltr" : "rtl"}
        ref={ref}
        {...rest}
      >
        {displaySpinner && <Spinner />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
