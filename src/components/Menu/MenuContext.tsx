import { createContext } from "react";

import { MenuContextType } from "./MenuTypes";

export const MenuContext = createContext<MenuContextType>({
  closeOnSelect: true,
  upwards: false,
  setRootMenuOpen: () => null,
});
