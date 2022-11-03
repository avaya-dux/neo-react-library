import clsx from "clsx";
import { MouseEventHandler, useState } from "react";

import { Avatar } from "components/Avatar";
import { IconNamesType } from "utils";

export interface ChipProps {
  avatarInitials?: string;
  children: string;
  className?: string;
  closable?: boolean;
  closeButtonAriaLabel?: string;
  disabled?: boolean;
  icon?: IconNamesType;
  onClose?: MouseEventHandler<HTMLButtonElement>;
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
  className,
  closable = false,
  closeButtonAriaLabel = "Close",
  disabled = false,
  icon,
  onClose,
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
        closable && `neo-chip--close neo-chip--close--${variant}`,
        className
      )}
    >
      {avatarInitials && <Avatar initials={avatarInitials} size="sm" />}
      {children}
      {closable && (
        <button
          className="neo-close neo-close--clear"
          aria-label={closeButtonAriaLabel}
          onClick={(e) => {
            setClosed(true);
            onClose && onClose(e);
          }}
        />
      )}
    </div>
  );
};
