import { Tooltip } from "components/Tooltip";
import { IconNamesType } from "utils";

import { getBasicChipClassNames } from "./BasicChip";
import { OneWayChipProps, Variants } from "./ChipTypes";

// Down-pointing arrow should be on the right only
export interface ExpandableChipProps extends OneWayChipProps {
  chiptype: "expandable";
  icon?: IconNamesType;
}

export const ExpandableChip = ({
  variant = "default",
  tooltip,
  disabled = false,
  text,
  withinChipContainer = false,
  icon,
  ...rest
}: ExpandableChipProps) => {
  const classes = getExpandableChipClassNames(
    variant,
    disabled,
    withinChipContainer,
    icon
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

export function getExpandableChipClassNames(
  variant: Variants,
  disabled: boolean,
  withinChipContainer: boolean,
  icon?: IconNamesType
) {
  const classNames = [
    getBasicChipClassNames(variant, disabled, withinChipContainer),
  ];
  classNames.push(`neo-chip--expandable`);

  classNames.push(`neo-chip--expandable--${variant}`);

  if (icon) classNames.push(`neo-icon-${icon}`);

  return classNames.join(" ");
}
