import { createContext } from "react";

import { LeftNavContextType } from "./LeftNavTypes";

export const LeftNavContext = createContext<LeftNavContextType>({
  currentUrl: "",
  onSelectedLink: () => null,
  hasCustomOnNavigate: false,
});
