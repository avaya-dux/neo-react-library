import clsx from "clsx";

import { Avatar } from "components/Avatar";
import { ButtonProps } from "components/Button";
import { IconButton } from "components/IconButton";
import { useState } from "react";
import { IconNamesType } from "utils";

export interface ChipProps {
  avatarInitials?: string;
  children: string;
  closable?: boolean;
  closeButtonAriaLabel?: string;
  disabled?: boolean;
  icon?: IconNamesType;
  onClose?: ButtonProps["onClick"];
  variant?: "alert" | "default" | "info" | "success" | "warning";
}

/**
 * Used to display a single chip
 *
 * @example
 * <Chip>default</Chip>
 * <Chip disabled>default</Chip>
 * <Chip avatarInitials="TJ">default</Chip>
 * <Chip variant="info" icon="info" closable>default</Chip>
 *
 * @see https://design.avayacloud.com/components/web/chip-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-chips
 */
export const Chip = ({
  avatarInitials,
  children,
  closable = false,
  closeButtonAriaLabel = "Close",
  disabled = false,
  icon,
  variant = "default",
}: ChipProps) => {
  const [closed, setClosed] = useState(false);

  return closed ? (
    <></>
  ) : (
    <div
      className={clsx(
        `neo-chip neo-chip--${variant}`,
        disabled && `neo-chip--${variant}--disabled`,
        icon && `neo-icon-${icon}`,
        closable && `neo-chip--close neo-chip--close--${variant}`
      )}
    >
      {avatarInitials && <Avatar initials={avatarInitials} />}
      {children}
      {closable && (
        <IconButton
          icon="close"
          onClick={() => setClosed(true)}
          aria-label={closeButtonAriaLabel}
        />
      )}
    </div>
  );
};
