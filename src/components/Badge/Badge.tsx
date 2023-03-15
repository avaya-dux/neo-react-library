import { ReactNode } from "react";

import { computeBadge } from "utils";

export interface BadgeProps {
  "aria-label": string;
  children?: ReactNode;
  data: string;
}

export const Badge = ({
  data,
  "aria-label": ariaLabel,
  children,
  ...rest
}: BadgeProps) => {
  // "●" is unicode character U+25CF

  return (
    <span
      className="neo-badge"
      data-badge={!data ? "●" : computeBadge(data)}
      aria-label={ariaLabel}
      role="status"
      {...rest}
    >
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
