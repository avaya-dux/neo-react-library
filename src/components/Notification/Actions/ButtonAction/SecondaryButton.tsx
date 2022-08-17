import { Button } from "components/Button";
import { SecondaryButtonProps } from "./ButtonActionTypes";

export const SecondaryButton = ({
  notificationType,
  children,
  ...rest
}: SecondaryButtonProps) => {
  const status = notificationType === "event" ? "default" : notificationType;

  return (
    <Button status={status} variant="secondary" {...rest}>
      {children}
    </Button>
  );
};
