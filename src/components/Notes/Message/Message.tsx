import { ReactNode } from "react";

export interface CommonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
export const Message = ({ children, ...rest }: CommonProps) => (
  <div {...rest}>{children}</div>
);
Message.displayName = "Message";

export interface TitleProps {
  children: ReactNode;
}
export const Title = ({ children, ...rest }: TitleProps) => (
  <div {...rest}>{children}</div>
);
Title.displayName = "Title";

export interface ContentProps {
  children: ReactNode;
}
export const Content = ({ children, ...rest }: ContentProps) => (
  <div {...rest}>{children}</div>
);
Content.displayName = "Content";

Message.Title = Title;
Message.Content = Content;
