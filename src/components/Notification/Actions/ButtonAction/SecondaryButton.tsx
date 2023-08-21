import { Button } from "components/Button";
import { SecondaryButtonProps } from "./ButtonActionTypes";

export const SecondaryButton = ({
  children,
  ...rest
}: SecondaryButtonProps) => {
  return (
    <Button
      className="neo-notification__button"
      size="compact"
      variant="secondary"
      {...rest}
    >
      {children}
    </Button>
  );
};
