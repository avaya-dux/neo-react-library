import { useMemo } from "react";

import { getIconClass, IconNamesType } from "utils/icons";

// import { SizeType } from "utils/size"; TODO https://jira.forge.avaya.com/browse/NEO-645
type SizeType = "sm" | "lg";
export interface IconProps extends React.BaseHTMLAttributes<HTMLElement> {
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
  icon: IconNamesType;
  size?: SizeType;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  status,
  icon,
  size,
  className,
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
  }, [status, icon, size]);

  return <span role="img" {...rest} className={componentClasses} />;
};
