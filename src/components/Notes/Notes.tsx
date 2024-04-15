import clsx from "clsx";
import { ReactNode, useMemo } from "react";

import { Interaction } from "./Interaction";

import "./Notes.css";

export interface CommonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Notes = ({ children, ...rest }: CommonProps) => {
  const classNames = useMemo(
    () => clsx("neo-notes", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Notes.displayName = "Notes";

export const Heading = ({ children, ...rest }: CommonProps) => {
  const classNames = useMemo(
    () => clsx("neo-notes__heading", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Heading.displayName = "NotesHeading";

Notes.Heading = Heading;
Notes.Interaction = Interaction;
