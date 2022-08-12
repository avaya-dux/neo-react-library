import { TooltipPosition } from "components/Tooltip";

export type Variants = "default" | "success" | "info" | "alert" | "warning";
export const WithinChipContainerProp = "withinChipContainer";
export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variants;
  tooltip?: {
    label: string;
    position?: TooltipPosition;
    multiline?: boolean;
  };
  disabled?: boolean;
  text: string;
  /** denotes if this Chip component is inside ChipContainer component */
  [WithinChipContainerProp]?: boolean;
}

export type OneWayChipProps = Omit<ChipProps, "dir">;
