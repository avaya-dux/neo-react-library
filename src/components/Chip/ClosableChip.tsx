import { forwardRef, MouseEvent, useId } from "react";

import { Tooltip } from "components/Tooltip";
import { IconNamesType, Keys } from "utils";

import { getBasicChipClassNames } from "./BasicChip";
import { OneWayChipProps, Variants } from "./ChipTypes";

// Close button on the right only
export interface ClosableChipProps extends OneWayChipProps {
  onClick?: React.MouseEventHandler;
  chiptype: "closable";
  id: string;
  icon?: IconNamesType;
}

export const ClosableChip: React.FC<ClosableChipProps> = forwardRef(
  (
    {
      disabled = false,
      icon,
      id = useId(),
      onClick,
      text,
      tooltip,
      variant = "default",
      withinChipContainer = false,
      ...rest
    }: ClosableChipProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classes = getClosableChipClassNames(
      variant,
      disabled,
      withinChipContainer,
      icon
    );
    const buttonAriaLabel = getButtonAriaLabel(text);

    const chipElement = (
      <div
        id={id}
        ref={ref}
        className={classes}
        tabIndex={0}
        role="button"
        onClick={onClick}
        onKeyDown={(e) => {
          if ([Keys.ENTER, Keys.SPACE].includes(e.key)) {
            onClick?.(e as unknown as MouseEvent<Element>);
          }
        }}
        {...rest}
      >
        {text}
        <section // button is interactive so it can not be used when the parent div is interactive due to the "button" role. Section is a landmark element, which can have an aria-label.
          className="neo-close neo-close--clear"
          aria-label={buttonAriaLabel}
        />
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
  }
);
ClosableChip.displayName = "ClosableChip";

export function getClosableChipClassNames(
  variant: Variants,
  disabled: boolean,
  withinChipContainer: boolean,
  icon?: IconNamesType
) {
  const classNames = [
    getBasicChipClassNames(variant, disabled, withinChipContainer),
  ];
  classNames.push("neo-chip--close");
  classNames.push(`neo-chip--close--${variant}`);
  if (icon) classNames.push(`neo-icon-${icon}`);
  return classNames.join(" ");
}
export function getButtonAriaLabel(text: string) {
  return "remove " + text.toLocaleLowerCase();
}
