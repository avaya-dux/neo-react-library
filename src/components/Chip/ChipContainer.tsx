import {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  useState,
} from "react";

import { AvatarChip, AvatarChipProps } from "./AvatarChip";
import { BasicChip, BasicChipProps } from "./BasicChip";
import { WithinChipContainerProp } from "./ChipTypes";
import { ClosableChip, ClosableChipProps } from "./ClosableChip";
import { IconChip, IconChipProps } from "./IconChip";

type WithinChipContainer = typeof WithinChipContainerProp;

/**
 * @typedef AllChipProps
 */
type AllChipProps =
  | Omit<AvatarChipProps, WithinChipContainer>
  | Omit<BasicChipProps, WithinChipContainer>
  | Omit<ClosableChipProps, WithinChipContainer>
  | Omit<IconChipProps, WithinChipContainer>;

/**
 * @typedef ChipContainerProps
 * @prop { Array<AllChipProps> } chipProps Array of AllChipProps
 */
export interface ChipContainerProps {
  chipProps: Array<AllChipProps>;
}

/**
 * ChipContainer allows end-user to create various Chips by passing in a {@link ChipContainerProps}
 *
 * @example
 * const props = {
 *    chipProps: [
 *       {
 *         text: "Closable Chip One",
 *         chiptype: "closable",
 *         id: "closable-I",
 *         disabled: true,
 *       },
 *       {
 *         text: "Closable Chip Two with Tooltip",
 *         chiptype: "closable",
 *         id: "closable-II",
 *         tooltip: { label: "Tooltip" },
 *       },
 *   ],
 * }
 * <ChipContainer {...props} />
 *
 * @see https://design.avayacloud.com/components/web/chip-web
 */
export const ChipContainer = ({ chipProps }: ChipContainerProps) => {
  const [chipList, updateChipList] = useState(chipProps);
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    const target = event.target as HTMLElement;

    handleClose(target);
  };

  const handleClose = (target: HTMLElement) => {
    const classes = target.getAttribute("class");
    if (!!classes && classes.indexOf("disabled") > -1) {
      return;
    }
    const idToRemove = target.getAttribute("id");
    updateChipList(removeById(chipList, idToRemove));
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    // on mac: press Fn + delete to get "Delete" code
    if (event.code !== "Delete") {
      return;
    }
    const target = event.target as HTMLElement;
    handleClose(target);
  };

  return (
    <div className="neo-chips">
      {chipList.map((chipProp, index) => {
        return createChip(chipProp, handleClick, keyDownHandler, index);
      })}
    </div>
  );
};

function removeById(list: Array<AllChipProps>, idToRemove: string | null) {
  return list.filter((chip) => {
    return idToRemove !== chip.id;
  });
}

export function createChip<T extends AllChipProps>(
  chipProp: T,
  handleClick: MouseEventHandler,
  keyDownHandler: KeyboardEventHandler,
  index: number
): ReactElement<T> | never {
  const chiptype = chipProp.chiptype;
  switch (chiptype) {
    case "avatar":
      return <AvatarChip key={index} {...chipProp} withinChipContainer />;
    case "closable":
      chipProp.onClick = handleClick;
      return (
        <ClosableChip
          key={index}
          onKeyDown={keyDownHandler}
          {...chipProp}
          withinChipContainer
        />
      );
    case "basic":
      return <BasicChip key={index} {...chipProp} withinChipContainer />;
    case "icon":
      return <IconChip key={index} {...chipProp} withinChipContainer />;
    default:
      throw new Error(chiptype);
  }
}
