import { createContext } from "react";

import { NavigationContextType } from "./LeftNavigationTypes";

export const NavigationContext = createContext<NavigationContextType>({
  currentUrl: "",
  onSelectedLink: () => null,
});
