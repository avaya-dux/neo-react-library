import clsx from "clsx";
import { useMemo } from "react";

import { Message } from "../Message";
import { CommonProps } from "../Notes";

export const Interaction = ({ children, ...rest }: CommonProps) => {
  const classNames = useMemo(
    () => clsx("neo-notes__interaction", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Interaction.displayName = "NotesInteraction";

export const Heading = ({ children, ...rest }: CommonProps) => {
  const classNames = useMemo(
    () => clsx("neo-notes__interaction__heading", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Heading.displayName = "NotesInteractionHeading";

Interaction.Message = Message;
Interaction.Heading = Heading;
