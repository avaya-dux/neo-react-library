import clsx from "clsx";
import { forwardRef, useMemo } from "react";

import { Spinner } from "components/Spinner";
import {
  computeBadge,
  getAnimationClass,
  getBadgeClass,
  getSizeClass,
  getVariantClasses,
  handleAccessbilityError,
  IconNamesType,
  rootBtnClass,
  showSpinner,
} from "utils";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  "aria-label": string;
  animation?: "none" | "spinner" | "pulse";
  badge?: string;
  icon: IconNamesType;
  shape?: "circle" | "square";
  size?: "default" | "compact" | "wide" | "large";
  iconSize?: "md" | "lg";
  status?: "default" | "success" | "alert" | "warning" | "info" | "event";
  variant?: "primary" | "secondary" | "tertiary";
}

//https://neo-react-library-storybook.netlify.app/?path=/story/components-iconbutton

/**
 * IconButton is a button that contains an icon and has no text
 *
 * @example
 * <IconButton aria-label="add item" icon="add" />
 * <IconButton aria-label="add item" icon="add" shape="circle" />
 *
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-iconbutton
 */
export const IconButton = forwardRef(
  (
    {
      "aria-label": ariaLabel,
      animation = "none",
      badge,
      className,
      icon,
      shape = "square",
      size = "default",
      iconSize = "md",
      status = "default",
      variant = "primary",
      ...rest
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    if (!ariaLabel) {
      handleAccessbilityError(
        "`aria-label` is REQUIRED by accessibility standards.",
      );
    }

    const displaySpinner = useMemo(() => showSpinner(animation), [animation]);

    const buttonClasses = useMemo(() => {
      const sizeOrShapeClass =
        size === "wide"
          ? `${rootBtnClass}-${size}`
          : `${rootBtnClass}-${shape}`;

      const result = [
        rootBtnClass,
        sizeOrShapeClass,
        getSizeClass(size),
        ...getVariantClasses(shape, variant, status),
      ];

      const animationClass = getAnimationClass(animation);
      if (animationClass) {
        result.push(animationClass);
      }

      const badgeClass = getBadgeClass(badge);
      if (badgeClass) {
        result.push(badgeClass);
      }

      if (className) {
        result.push(className);
      }

      return result.join(" ");
    }, [animation, badge, shape, size, status, variant, className]);

    return (
      <button
        aria-label={ariaLabel}
        className={buttonClasses}
        data-badge={computeBadge(badge)}
        ref={ref}
        {...rest}
      >
        {displaySpinner ? (
          <Spinner style={{ color: "inherit" }} />
        ) : (
          <span
            className={clsx(
              `neo-icon-${icon}`,
              iconSize === "lg" && "neo-icon-state--large",
            )}
          />
        )}
      </button>
    );
  },
);
IconButton.displayName = "IconButton";
