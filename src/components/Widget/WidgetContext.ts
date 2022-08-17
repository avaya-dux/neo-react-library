import { createContext } from "react";
import { ContextProps } from "./WidgetTypes";

export const WidgetContext = createContext<ContextProps>({
  loading: false,
  empty: false,
  disabled: false,
});
