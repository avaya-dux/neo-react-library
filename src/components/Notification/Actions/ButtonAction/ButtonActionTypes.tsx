import { ButtonHTMLAttributes, MouseEventHandler } from "react";

export type NotificationType =
  | "success"
  | "alert"
  | "warning"
  | "info"
  | "event";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>;
  ref?: React.Ref<HTMLButtonElement>;
}

export interface SecondaryButtonProps extends ButtonProps {
  notificationType: NotificationType;
}
