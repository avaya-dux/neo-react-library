import { createContext } from "react";

import type { LeftNavContextType } from "./LeftNavTypes";

export const LeftNavContext = createContext<LeftNavContextType>({
	currentUrl: "",
	onSelectedLink: () => null,
	hasCustomOnNavigate: false,
});
