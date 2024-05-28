import { createContext } from "react";

export interface INoteContext {
	state?: "readonly" | "edit";
}
export const NoteContext = createContext<INoteContext>({ state: "readonly" });
