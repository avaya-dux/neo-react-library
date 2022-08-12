import { HTMLAttributes, ReactNode } from "react";

export type TooltipPosition =
  | "auto"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
export type TooltipCSSPosition =
  | "left"
  | "right"
  | "down"
  | "up"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  arrow?: boolean;
  children: ReactNode;
  label: string;
  multiline?: boolean;
  position?: TooltipPosition;
}
