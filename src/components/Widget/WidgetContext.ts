import { createContext } from "react";

import type { ContextProps } from "./WidgetTypes";

export const WidgetContext = createContext<ContextProps>({
	loading: false,
	empty: false,
	disabled: false,
});
