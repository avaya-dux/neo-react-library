import { createContext } from "react";

interface TreeContextType {
  dir?: "ltr" | "rtl";
}

export const TreeContext = createContext<TreeContextType>({
  dir: undefined,
});
