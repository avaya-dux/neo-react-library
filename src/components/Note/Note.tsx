import clsx from "clsx";
import { ReactNode, useMemo } from "react";

import "./Note.css";

export interface NoteProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Note = ({ children, ...rest }: NoteProps) => {
  const classNames = useMemo(
    () => clsx("neo-note", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Note.displayName = "Note";

export interface TitleProps extends NoteProps {}

export const Title = ({ children, ...rest }: TitleProps) => {
  const classNames = useMemo(
    () => clsx("neo-note__title", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Title.displayName = "NoteTitle";

export interface ContentProps extends NoteProps {
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
        "neo-note__content",
        self ? "neo-note__content--primary" : "neo-note__content--secondary",
        rest.className,
      ),
    [rest.className, self],
  );

  return (
    <div {...rest} className={classNames}>
      <p className="neo-note__content__author">{author}</p>

      <p>{children}</p>
    </div>
  );
};
Content.displayName = "NoteContent";

Note.Title = Title;
Note.Content = Content;
