import clsx from "clsx";
import { ReactNode, useMemo } from "react";

import { Message } from "..";

export interface CommonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Interaction = ({ children, ...rest }: CommonProps) => {
  const classNames = useMemo(
    () => clsx("neo-interaction", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Interaction.displayName = "MessageInteraction";

export const Heading = ({ children, ...rest }: CommonProps) => {
  const classNames = useMemo(
    () => clsx("neo-interaction__heading", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Heading.displayName = "MessageInteractionHeading";

Interaction.Message = Message;
Interaction.Heading = Heading;
