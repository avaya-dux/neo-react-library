import clsx from "clsx";

import { getIconClass, IconNamesType } from "utils/icons";

// import { SizeType } from "utils/size"; TODO https://jira.forge.avaya.com/browse/NEO-645
type SizeType = "sm" | "md" | "lg";
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

  return (
    <span
      role="img"
      {...rest}
      className={clsx(
        icon && getIconClass(icon),
        status && `neo-icon-state neo-icon-state--${status}`,
        size === "sm" && "neo-icon--small",
        size === "md" && "neo-icon--medium",
        size === "lg" && "neo-icon--large",
        className
      )}
    />
  );
};
