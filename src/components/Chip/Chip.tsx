import { useId } from "react";

import { BasicChip } from "./BasicChip";
import { Variants } from "./ChipTypes";
import { ClosableChip } from "./ClosableChip";

type ChipProps = {
  children: string;
  closable?: boolean;
  id?: string;
  onClick?: React.MouseEventHandler;
  variant?: Variants;
};

export const Chip = ({
  children,
  closable = false,
  id = useId(),
  onClick,
  variant = "default",
}: ChipProps) => {
  return closable ? (
    <ClosableChip
      chiptype="closable"
      id={id}
      onClick={onClick}
      text={children}
      variant={variant}
    />
  ) : (
    <BasicChip chiptype="basic" variant={variant} id={id} text={children} />
  );
};
