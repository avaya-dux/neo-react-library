import { createContext } from "react";

import type { SideNavigationContextType } from "./SideNavigationTypes";

export const SideNavigationContext = createContext<SideNavigationContextType>({
	currentUrl: "",
	onSelectedLink: () => null,
	hasCustomOnNavigate: false,
});
