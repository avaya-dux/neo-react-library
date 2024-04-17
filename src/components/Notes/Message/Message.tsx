import clsx from "clsx";
import { ReactNode, useMemo } from "react";

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

export interface ContentProps extends CommonProps {
  author: ReactNode;
  self?: boolean;
}
export const Content = ({
  author,
  children,
  self = false,
  ...rest
}: ContentProps) => {
  const classNames = useMemo(
    () =>
      clsx(
        "neo-notes__interaction__message__content",
        self
          ? "neo-notes__interaction__message__content--primary"
          : "neo-notes__interaction__message__content--secondary",
        rest.className,
      ),
    [rest.className, self],
  );

  return (
    <div {...rest} className={classNames}>
      <p className="neo-notes__interaction__message__content__author">
        {author}
      </p>

      <p>{children}</p>
    </div>
  );
};
Content.displayName = "NotesInteractionMessageContent";

Message.Title = Title;
Message.Content = Content;
