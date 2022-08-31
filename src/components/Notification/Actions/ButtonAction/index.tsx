import { ButtonProps, NotificationType } from "./ButtonActionTypes";
import { SecondaryButton } from "./SecondaryButton";

export interface ButtonActionProps {
  buttons: ButtonProps[];
}

interface InternalButtonActionProps extends ButtonActionProps {
  type: NotificationType;
}
export const ButtonAction = ({ type, buttons }: InternalButtonActionProps) => {
  return (
    <div className="neo-notification__options">
      {buttons.map((buttonProps, index) => (
        <SecondaryButton
          key={`notification-button-${index}`}
          notificationType={type}
          {...buttonProps}
        />
      ))}
    </div>
  );
};
