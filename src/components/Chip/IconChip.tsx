import { Tooltip } from "components/Tooltip";
import { IconNamesType } from "utils";

import { getBasicChipClassNames } from "./BasicChip";
import { ChipProps, Variants } from "./ChipTypes";

// Icon can be right or left
export interface IconChipProps extends ChipProps {
  icon: IconNamesType;
  chiptype: "icon";
}

export const IconChip = ({
  variant = "default",
  tooltip,
  disabled = false,
  withinChipContainer = false,
  icon,
  text,
  ...rest
}: IconChipProps) => {
  const classes = getIconChipClassNames(
    variant,
    disabled,
    icon,
    withinChipContainer
  );
  const chipElement = (
    <div className={classes} {...rest}>
      {text}
    </div>
  );
  return tooltip ? (
    <Tooltip
      label={tooltip.label}
      position={tooltip.position}
      multiline={!!tooltip.multiline}
    >
      {chipElement}
    </Tooltip>
  ) : (
    <>{chipElement}</>
  );
};

export function getIconChipClassNames(
  variant: Variants,
  disabled: boolean,
  icon: IconNamesType,
  withinChipContainer: boolean
) {
  const classNames = [
    getBasicChipClassNames(variant, disabled, withinChipContainer),
  ];
  classNames.push(`neo-icon-${icon}`);
  return classNames.join(" ");
}
