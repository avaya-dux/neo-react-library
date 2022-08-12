// TODO: types are all jacked up, need to look into how to fix properly
/* eslint-disable react/prop-types */
import { ReactElement } from "react";

import { Tooltip } from "components/Tooltip";
import { SmallAvatarProps } from "components/Avatar";

import { OneWayChipProps } from "./ChipTypes";
import { getBasicChipClassNames } from "./BasicChip";

// Avatar is on the left
export interface AvatarChipProps extends OneWayChipProps {
  chiptype: "avatar";
  smallAvatar: ReactElement<SmallAvatarProps>;
}

export const AvatarChip: React.FC<AvatarChipProps> = ({
  variant = "default",
  tooltip,
  disabled = false,
  text,
  withinChipContainer = false,
  smallAvatar,
  ...rest
}) => {
  const classes = getBasicChipClassNames(
    variant,
    disabled,
    withinChipContainer
  );
  const chipElement = (
    <div className={classes} {...rest}>
      {smallAvatar}
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
