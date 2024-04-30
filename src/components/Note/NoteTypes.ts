import { FormEvent, ReactNode } from "react";

interface CoreProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface NoteProps extends CoreProps {}

export interface TitleProps extends CoreProps {
  actions?: ReactNode;
}

export interface ContentProps extends CoreProps {
  actions?: ReactNode;
  author: ReactNode;
  id?: string;
  onTextAreaChange?: (event: FormEvent<HTMLTextAreaElement>) => void;
  self?: boolean;
  subtext?: ReactNode;
  translations?: {
    remaining: string;
    over: string;
  };
}
