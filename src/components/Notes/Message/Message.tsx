import { ReactNode } from "react";

export interface MessageProps {
  children: ReactNode;
}
export const Message = ({ children }: MessageProps) => <div>{children}</div>;
Message.displayName = "Message";

interface TitleProps {
  children: ReactNode;
}
export const Title = ({ children }: TitleProps) => <div>{children}</div>;
Title.displayName = "Title";

export interface ContentProps {
  children: ReactNode;
}
export const Content = ({ children }: ContentProps) => <div>{children}</div>;
Content.displayName = "Content";

Message.Title = Title;
Message.Content = Content;
