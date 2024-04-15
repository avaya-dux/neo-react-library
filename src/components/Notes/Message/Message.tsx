import clsx from "clsx";
import { useMemo } from "react";

import { CommonProps } from "../Notes";

export const Message = ({ children, ...rest }: CommonProps) => {
  const classNames = useMemo(
    () => clsx("neo-notes__interaction__message", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Message.displayName = "NotesInteractionMessage";

export const Title = ({ children, ...rest }: CommonProps) => {
  const classNames = useMemo(
    () => clsx("neo-notes__interaction__message__title", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Title.displayName = "NotesInteractionMessageTitle";

export const Content = ({
  children,
  self = false,
  ...rest
}: CommonProps & { self?: boolean }) => {
  const classNames = useMemo(
    () =>
      clsx(
        "neo-notes__interaction__message__content",
        self ? "blue" : "gray",
        rest.className,
      ),
    [rest.className, self],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Content.displayName = "NotesInteractionMessageContent";

Message.Title = Title;
Message.Content = Content;
