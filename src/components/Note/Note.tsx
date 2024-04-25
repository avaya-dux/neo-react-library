import clsx from "clsx";
import { useMemo } from "react";

import type { NoteProps, ContentProps, TitleProps } from "./NoteTypes";

import "./Note.css";
import { TextArea } from "components/TextArea";
import { genId } from "utils";

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

export const Title = ({ actions, children, ...rest }: TitleProps) => {
  const classNames = useMemo(
    () => clsx("neo-note__title", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      <div>{children}</div>

      <div>{actions}</div>
    </div>
  );
};
Title.displayName = "NoteTitle";

export const Content = ({
  actions,
  author,
  children,
  className,
  editable = false,
  id,
  onTextAreaChange,
  self = false,
  translations = {
    remaining: "remaining",
    over: "over",
  },
  ...rest
}: ContentProps) => {
  const classNames = useMemo(
    () =>
      clsx(
        "neo-note__content",
        self ? "neo-note__content--primary" : "neo-note__content--secondary",
        className,
      ),
    [className, self],
  );

  const authorId = useMemo(() => id || `note-content-${genId()}`, [id]);

  return (
    <div {...rest} className={classNames} id={id}>
      <div className="neo-note__content__author" id={authorId}>
        {author}
      </div>

      {editable ? (
        <>
          <TextArea
            label=""
            defaultValue={children as string}
            htmlFor={authorId}
            maxLength={500}
            translations={translations}
            onChange={(e) => onTextAreaChange?.(e)}
          />

          <div className="neo-note__content__actions">{actions}</div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};
Content.displayName = "NoteContent";

Note.Title = Title;
Note.Content = Content;
