import { createContext } from "react";

import { MenuContextType } from "./MenuTypes";

export const MenuContext = createContext<MenuContextType>({
  closeOnSelect: true,
  up: false,
  setRootMenuOpen: () => null,
});
