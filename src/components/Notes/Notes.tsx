import { ReactNode } from "react";

import { Message } from "./Message";

import "./Notes.css";

export interface CommonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Notes = ({ children, ...rest }: CommonProps) => (
  <div {...rest} className="neo-notes">
    {children}
  </div>
);
Notes.displayName = "Notes";

export const Heading = ({ children, ...rest }: CommonProps) => (
  <div {...rest}>{children}</div>
);
Heading.displayName = "Heading";

export const Interaction = ({ children, ...rest }: CommonProps) => (
  <div {...rest}>{children}</div>
);
Interaction.displayName = "Interaction";

export const InteractionHeading = ({ children, ...rest }: CommonProps) => (
  <div {...rest}>{children}</div>
);
InteractionHeading.displayName = "InteractionHeading";

Interaction.Message = Message;
Interaction.Heading = InteractionHeading;

Notes.Heading = Heading;
Notes.Interaction = Interaction;
