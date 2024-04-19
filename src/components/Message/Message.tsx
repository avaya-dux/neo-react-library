import clsx from "clsx";
import { ReactNode, useMemo } from "react";

import "./Message.css";

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Message = ({ children, ...rest }: MessageProps) => {
  const classNames = useMemo(
    () => clsx("neo-message", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Message.displayName = "Message";

export interface TitleProps extends MessageProps {}

export const Title = ({ children, ...rest }: TitleProps) => {
  const classNames = useMemo(
    () => clsx("neo-message__title", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Title.displayName = "MessageTitle";

export interface ContentProps extends MessageProps {
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
        "neo-message__content",
        self
          ? "neo-message__content--primary"
          : "neo-message__content--secondary",
        rest.className,
      ),
    [rest.className, self],
  );

  return (
    <div {...rest} className={classNames}>
      <p className="neo-message__content__author">{author}</p>

      <p>{children}</p>
    </div>
  );
};
Content.displayName = "MessageContent";

Message.Title = Title;
Message.Content = Content;