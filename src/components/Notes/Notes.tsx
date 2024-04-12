import { ReactNode } from "react";

import { Message } from "./Message";

export const Notes = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

Notes.Message = Message;
