import { useMemo } from "react";

import { getIconClass, IconNamesType } from "utils/icons";

// import { SizeType } from "utils/size"; TODO https://jira.forge.avaya.com/browse/NEO-645
type SizeType = "sm" | "lg";
export interface IconProps extends React.BaseHTMLAttributes<HTMLElement> {
  "aria-label": string;
  className?: string;
  icon: IconNamesType;
  size?: SizeType;
  status?:
    | "available"
    | "away"
    | "busy"
    | "do-not-disturb"
    | "offline"
    | "lock"
    | "warning"
    | "missed"
    | "connected"
    | "inbound"
    | "outbound";
}

/**
 * The `Icon` component is used to display an icon.
 *
 * @example
 * <Icon icon="available-filled" aria-label="Check Icon" />
 * <Icon icon="check" aria-label="Check Icon" size="lg" />
 */
export const Icon: React.FC<IconProps> = ({
  className,
  icon,
  size,
  status,
  ...rest
}: IconProps) => {
  if (!rest["aria-label"]) {
    console.error(
      "A descriptive label is required for screen readers to identify the button's purpose"
    );
  }

  const componentClasses = useMemo(() => {
    const result = [className];

    if (status) {
      result.push("neo-icon-state");
      result.push(`neo-icon-state--${status}`);
    }

    const getSizeClass = (size?: SizeType) => {
      // TODO-645: css class names to be updated
      switch (size) {
        case undefined:
        case "sm":
          return undefined;
        case "lg":
          return "neo-icon-state--large";
        default:
          console.warn(`Unknown size encountered: ${size}`);
          return undefined;
      }
    };

    const sizeClass = getSizeClass(size);
    if (sizeClass) {
      result.push(sizeClass);
    }

    const iconClass = getIconClass(icon);
    if (iconClass) {
      result.push(iconClass);
    }

    return result.join(" ");
  }, [status, icon, size, className]);

  return <span role="img" {...rest} className={componentClasses} />;
};
